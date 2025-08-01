#!/bin/bash

# Name of the production archive
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ARCHIVE_NAME=${1:-"dothtml_${TIMESTAMP}.tar.gz"}

echo "Starting Next.js build..."
npm run build

echo "Preparing files to archive..."

# Create a temporary folder to gather necessary files
TEMP_DIR="nextjs-prod"
rm -rf $TEMP_DIR
mkdir $TEMP_DIR

# Copy required items
cp -r .next $TEMP_DIR/
cp -r public $TEMP_DIR/
cp package.json $TEMP_DIR/
cp package-lock.json $TEMP_DIR 2>/dev/null || cp yarn.lock $TEMP_DIR/ 2>/dev/null

echo "Creating archive $ARCHIVE_NAME..."
tar -czf "$ARCHIVE_NAME" -C $TEMP_DIR .

# Optional: clean up temporary folder
rm -rf $TEMP_DIR

echo "Archive created successfully: $ARCHIVE_NAME"
echo "You can now transfer this archive to your server for deployment."
