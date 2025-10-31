#!/bin/bash

set -e

echo "Building React app..."
npm run build

echo "Syncing to S3..."
aws s3 sync dist/ s3://amazon-cloudfront-secure-static-site--s3bucketroot-hm1thldfjbgk \
  --delete \
  --exclude "projects/*" \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html" \

echo "Uploading index.html with no-cache..."
aws s3 cp dist/index.html s3://amazon-cloudfront-secure-static-site--s3bucketroot-hm1thldfjbgk/index.html \
  --cache-control "no-cache, no-store, must-revalidate"

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id EO892OWB4MLKK \
  --paths "/*"

echo "✅ Deployment complete!"
