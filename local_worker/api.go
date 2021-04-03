package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

/*

This file defines the API by which the Monpiche UI can access the worker data

*/

func startAPI(db *sql.DB) {
	// Set up logging
	logger := log.New(os.Stdout, "", 0)

	// Register handlers
	http.Handle("/", withMetrics(logger, statusHandler(db)))
	http.Handle("/dataStream", stream())
	http.Handle("/cistern/last3days", withMetrics(logger, cisternLastDays(db, 3)))

	// Run server
	http.ListenAndServe(":8080", nil)
}

func stream() http.Handler {
	return http.HandlerFunc(serveWs)
}

func statusHandler(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Check the DB stats (last data points?)

		// Check which other workers are on the network

		// Status of connected devices?

		// Return
		fmt.Fprintf(w, "All good!")
	})
}
func cisternLastDays(db *sql.DB, days int) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		data, err := CisternLastDays(db, days)
		if err != nil {
			log.Printf("Error getting cistern data from db: %v", err)
		}

		dataBytes, err := json.Marshal(data)
		// Return
		fmt.Fprintf(w, string(dataBytes))
	})
}

func withMetrics(l *log.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		began := time.Now()
		next.ServeHTTP(w, r)
		l.Printf("%s %s took %s", r.Method, r.URL, time.Since(began))
	})
}
