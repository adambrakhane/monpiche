package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/DamnWidget/goqueue"
	"github.com/gorilla/websocket"
)

const (
	// Time allowed to write the file to the client.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the client.
	pongWait = 60 * time.Second

	// Send pings to client with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Poll file for changes with this period.
	cisternPeriod = 1 * time.Second
)

var (
	// Queue where we load updates to the cistern level
	cisternDataQueue *goqueue.Queue
)

func init() {
	cisternDataQueue = goqueue.New()

}

var upgrader = websocket.Upgrader{
	// HandshakeTimeout specifies the duration for the handshake to complete.
	// HandshakeTimeout time.Duration

	// ReadBufferSize and WriteBufferSize specify I/O buffer sizes in bytes. If a buffer
	// size is zero, then buffers allocated by the HTTP server are used. The
	// I/O buffer sizes do not limit the size of the messages that can be sent
	// or received.
	// ReadBufferSize, WriteBufferSize int

	// WriteBufferPool is a pool of buffers for write operations. If the value
	// is not set, then write buffers are allocated to the connection for the
	// lifetime of the connection.
	//
	// A pool is most useful when the application has a modest volume of writes
	// across a large number of connections.
	//
	// Applications should use a single pool for each unique value of
	// WriteBufferSize.
	// WriteBufferPool BufferPool

	// Subprotocols specifies the server's supported protocols in order of
	// preference. If this field is not nil, then the Upgrade method negotiates a
	// subprotocol by selecting the first match in this list with a protocol
	// requested by the client. If there's no match, then no protocol is
	// negotiated (the Sec-Websocket-Protocol header is not included in the
	// handshake response).
	// Subprotocols []string

	// Error specifies the function for generating HTTP error responses. If Error
	// is nil, then http.Error is used to generate the HTTP response.
	// Error func(w http.ResponseWriter, r *http.Request, status int, reason error)

	// CheckOrigin returns true if the request Origin header is acceptable. If
	// CheckOrigin is nil, then a safe default is used: return false if the
	// Origin request header is present and the origin host is not equal to
	// request Host header.
	//
	// A CheckOrigin function should carefully validate the request origin to
	// prevent cross-site request forgery.
	// CheckOrigin func(r *http.Request) bool
	CheckOrigin: everyOriginIsMyFriend,

	// EnableCompression specify if the server should attempt to negotiate per
	// message compression (RFC 7692). Setting this value to true does not
	// guarantee that compression will be supported. Currently only "no context
	// takeover" modes are supported.
	// EnableCompression bool
}

func everyOriginIsMyFriend(r *http.Request) bool {
	return true
}

func serveWs(w http.ResponseWriter, r *http.Request) {
	log.Println("Serve Websocket")
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		if _, ok := err.(websocket.HandshakeError); !ok {
			log.Println(err)
		}
		return
	}

	log.Println("WS Upgraded")

	go writer(ws)
	reader(ws)
}

func reader(ws *websocket.Conn) {
	defer ws.Close()
	ws.SetReadLimit(512)
	ws.SetReadDeadline(time.Now().Add(pongWait))
	ws.SetPongHandler(func(string) error { ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, _, err := ws.ReadMessage()
		if err != nil {
			break
		}
	}
}

func writer(ws *websocket.Conn) {
	pingTicker := time.NewTicker(pingPeriod)
	cisternTicker := time.NewTicker(cisternPeriod)
	defer func() {
		pingTicker.Stop()
		cisternTicker.Stop()
		ws.Close()
	}()
	for {
		select {
		case <-cisternTicker.C:
			// Pop off queue until we have sent all data
			for cisternDataQueue.Len() > 0 {
				ws.SetWriteDeadline(time.Now().Add(writeWait))
				data, _ := json.Marshal(cisternDataQueue.Pop())
				err := ws.WriteMessage(websocket.TextMessage, data)
				if err != nil {
					return
				}
			}

		case <-pingTicker.C:
			ws.SetWriteDeadline(time.Now().Add(writeWait))
			if err := ws.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}
