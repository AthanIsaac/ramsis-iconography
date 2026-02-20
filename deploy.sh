#!/bin/bash

# Check if commit message parameter is provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide a commit message"
    echo "Usage: ./deploy.sh \"Your commit message\""
    exit 1
fi

# Store the commit message
COMMIT_MESSAGE="$1"

echo "🚀 Starting deployment process..."
echo "📝 Commit message: $COMMIT_MESSAGE"

# Set environment variables for build
export REACT_APP_EMAILJS_SERVICE_ID=service_1pazkqa
export REACT_APP_EMAILJS_TEMPLATE_ID=template_jr8tm6p
export REACT_APP_EMAILJS_PUBLIC_KEY=LgFDBjwNqV8c65u6t

# Add all changes
echo "📦 Adding all changes..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "⚠️  No changes to commit"
else
    # Commit with the provided message
    echo "💾 Committing changes..."
    git commit -m "$COMMIT_MESSAGE"
    
    # Push to main branch
    echo "⬆️  Pushing to GitHub..."
    git push origin main
fi

# Build with environment variables
echo "🏗️  Building with environment variables..."
npm run build

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "🔗 Your site is available at: https://AthanIsaac.github.io/ramsis-iconography"