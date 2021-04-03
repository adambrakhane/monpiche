package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

// Start a worker that checks the cistern level every 30 seconds and loggs it
func startCisternWatcher(db *sql.DB) {
	go func() {
		for {
			checkCisternData(db)
			time.Sleep(30 * time.Second)
		}
	}()

}

func checkCisternData(db *sql.DB) {
	// Handle
	defer func() {
		if r := recover(); r != nil {
			// We paniced!
			log.Println("Cistern watcher panic recovered")
		}
	}()

	// Request data from device
	volume, err := getCisternLevel()
	if err != nil {
		log.Printf("error reading cistern level: %v\n", err)
		return
	}

	// Add this data to the queue to send to the UI
	cisternDataQueue.Push(CisternData{
		Volume:    volume,
		Timestamp: time.Now(), // This isn't actually what the DB will reflect, but it's close enough for realtime purposes
	})

	// Stick the result in the DB
	stmt, err := db.Prepare(`
		INSERT INTO cistern (
			timestamp,
			volume
		)
		VALUES (
			datetime('now'),
			?
		);
	`)
	if err != nil {
		log.Printf("error writing cistern data to DB (prepare): %v\n", err)
	}
	stmt.Exec(volume)
	if err != nil {
		log.Printf("error writing cistern data to DB (exec): %v\n", err)
	}
}

func getCisternLevel() (int, error) {
	log.Println("Getting Cistern Level")
	// Create client
	client := &http.Client{}

	// Create request
	req, err := http.NewRequest("GET", config.CisternWatcherURL, nil)
	if err != nil {
		return 0, err
	}

	// Fetch Request
	resp, err := client.Do(req)
	if err != nil {
		return 0, err
	}

	// Read Response Body
	respBody, _ := ioutil.ReadAll(resp.Body)

	if resp.StatusCode != http.StatusOK {
		return 0, fmt.Errorf("Error %v %v: %v", resp.StatusCode, resp.Status, respBody)
	}

	/*
		Example:
		{
			"variables": {
				"distance": 23.01,
				"tankLevel": 100,
					"volume": 5000,
					"rssi": -73
				},
				"id": "1",
				"name": "cistern-watcher",
				"hardware": "esp8266",
				"connected": true
			}
	*/
	type Resp struct {
		Variables struct {
			Volume int `json:"volume"`
		} `json:"variables`
	}
	var response Resp
	err = json.Unmarshal(respBody, &response)
	if err != nil {
		return 0, err
	}

	log.Printf("Got Cistern Level: %v\n", response.Variables.Volume)
	return response.Variables.Volume, nil
}

type CisternData struct {
	ID        int       `json:"id"`
	Timestamp time.Time `json:"timestamp"`
	Volume    int       `json:"volume"`
}

func CisternLastDays(db *sql.DB, days int) ([]CisternData, error) {
	data := make([]CisternData, 0)
	rows, err := db.Query(`
	SELECT
		id,
		timestamp,
		volume
	FROM cistern
	WHERE
		timestamp < datetime('now')
		AND timestamp > datetime('now', '-3 days')
	SORT BY timestamp DESC
	`) // `, variable)`
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var id int
		var volume int
		var timestamp time.Time
		err := rows.Scan(&id, &timestamp, &volume)
		if err != nil {
			return nil, err
		}
		data = append(data, CisternData{
			ID:        id,
			Timestamp: timestamp,
			Volume:    volume,
		})
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return data, nil
}
