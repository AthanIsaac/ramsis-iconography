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

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "🔗 Your site is available at: https://AthanIsaac.github.io/ramsis-iconography"