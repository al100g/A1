#!/bin/bash

# Clone the repository
git clone https://github.com/al100g/A1.git
cd A1 || exit

# Install dependencies
if [ -f package.json ]; then
    npm install
elif [ -f yarn.lock ]; then
    yarn install
else
    echo "No package.json or yarn.lock found. Please install dependencies manually."
    exit 1
fi

# Generate secrets
# You should improve this section as per your secret generation logic
echo "GENERATED_SECRET=$(openssl rand -hex 16)" > .env.local

# Notify user of completion
echo "Setup complete. .env.local has been created with secrets."