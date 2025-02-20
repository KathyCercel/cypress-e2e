#!/bin/bash

# Set script to exit on error
set -e

# Define report directory
REPORT_DIR="mochawesome-report"
MERGED_REPORT="$REPORT_DIR/merged-report.json"
FINAL_REPORT="$REPORT_DIR/merged-report.html"

# Function to clean up Docker containers on exit
cleanup() {
    echo "🛑 Stopping and removing Cypress containers..."
    docker-compose down
    echo "✅ Cypress containers stopped."
}

# Trap exit signals to ensure cleanup runs when the script exits
trap cleanup EXIT

echo "🚀 Starting Cypress tests in parallel..."
docker-compose up --abort-on-container-exit

echo "✅ Cypress tests completed!"
echo "📝 Merging Mochawesome reports..."

# Ensure mochawesome-report directory exists
mkdir -p "$REPORT_DIR"

# Merge all Mochawesome JSON reports
npx mochawesome-merge "$REPORT_DIR"/*.json -o "$MERGED_REPORT"

# Generate the final HTML report
echo "📊 Generating final Mochawesome HTML report..."
npx mochawesome-report-generator "$MERGED_REPORT" -o "$REPORT_DIR"

# Open the report
echo "✅ Report generated successfully! Opening it now..."
open "$FINAL_REPORT"
