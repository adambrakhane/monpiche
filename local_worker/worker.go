package main

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

type Config struct {
	SQLLiteFile string
	Server      bool // Is this the main server (where the db is) or one of the client interfaces?

	CisternWatcherURL string
}

var config Config

func init() {

	// Config defaults
	config = Config{
		SQLLiteFile:       "./store.db",
		Server:            true,
		CisternWatcherURL: "http://192.168.4.90/",
	}

	// Load from env
	sqlLiteFileLoc := os.Getenv("SQLLITE_FILE_LOCATION")
	if sqlLiteFileLoc != "" {
		config.SQLLiteFile = sqlLiteFileLoc
	}
}

func main() {
	// Connect to DB
	db, err := sql.Open("sqlite3", "./store.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Start running the metric watchers (if we're the main server in charge of that)
	if config.Server {
		startCisternWatcher(db)
	}

	// Connect instances of monpiche on the network

	// Start up our REST API
	startAPI(db)

}
