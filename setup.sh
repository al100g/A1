#!/bin/bash

# Install dependencies
if [ -f package.json ]; then
    npm install
elif [ -f yarn.lock ]; then
    yarn install
else
    echo "No package.json or yarn.lock found. Please install dependencies manually."
    exit 1
fi

# Set up environment variables
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env from .env.example. Please update it with your actual values."
else
    echo ".env already exists, skipping."
fi

# Notify user of completion
echo "Setup complete. Please review your .env file and fill in the required values."