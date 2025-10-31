#!/bin/bash

# Configuration
BUCKET_NAME="your-content-bucket-name"  # Replace with your actual bucket name
DISTRIBUTION_ID="your-cloudfront-distribution-id"  # Replace with your CloudFront distribution ID
BUILD_DIR="./build"  # Directory containing your built static files (adjust as needed)

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting deployment...${NC}"

# Step 1: Build your site (uncomment if needed)
# echo -e "${BLUE}Building site...${NC}"
# npm run build  # Or whatever your build command is

# Step 2: Sync files to S3
echo -e "${BLUE}Syncing files to S3...${NC}"
aws s3 sync $BUILD_DIR s3://$BUCKET_NAME \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "service-worker.js"

# Upload HTML files with shorter cache
echo -e "${BLUE}Uploading HTML files with short cache...${NC}"
aws s3 sync $BUILD_DIR s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public, max-age=0, must-revalidate"

# Step 3: Invalidate CloudFront cache
echo -e "${BLUE}Invalidating CloudFront cache...${NC}"
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${GREEN}Your site will be updated shortly.${NC}"