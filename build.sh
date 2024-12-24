#!/bin/bash

# Exit on error
set -e

echo "Building frontend..."
cd packages/frontend
npm install
npm run build

echo "Installing backend dependencies..."
cd ../backend
npm install

echo "Starting backend server..."
npm start
