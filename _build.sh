#!/bin/bash

# Build script for Vercel deployment
echo "Preparing for Vercel deployment..."

# Create output directory
mkdir -p dist

# Copy the standalone HTML file to the dist folder
cp vercel-index.html dist/index.html

# Copy assets
mkdir -p dist/assets
cp -r public/* dist/assets/
cp attached_assets/Color\ logo\ -\ no\ background.png dist/assets/tecnarit-logo-transparent.png
cp attached_assets/Color\ logo\ with\ background.png dist/assets/tecnarit-logo.png

echo "Build completed successfully!"