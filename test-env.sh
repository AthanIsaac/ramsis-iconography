#!/bin/bash

echo "🧪 Testing Environment Variables Setup"
echo "======================================"

# Test 1: Check if .env file exists and has correct content
echo "📁 Test 1: Checking .env file..."
if [ -f ".env" ]; then
    echo "✅ .env file exists"
    echo "📄 Contents:"
    cat .env
else
    echo "❌ .env file not found!"
fi

echo ""
echo "🏗️  Test 2: Testing local build with environment variables..."

# Create a test .env.production file
echo "📝 Creating test .env.production..."
cat > .env.production << EOF
REACT_APP_EMAILJS_SERVICE_ID=service_1pazkqa
REACT_APP_EMAILJS_TEMPLATE_ID=template_jr8tm6p
REACT_APP_EMAILJS_PUBLIC_KEY=LgFDBjwNqV8c65u6t
EOF

echo "✅ Created .env.production with:"
cat .env.production

echo ""
echo "🔨 Building project..."
npm run build

echo ""
echo "🔍 Test 3: Checking if variables are in built files..."
if [ -d "build" ]; then
    echo "📦 Build directory exists"
    echo "🔍 Searching for EmailJS service ID in built files..."
    if grep -r "service_1pazkqa" build/static/js/ 2>/dev/null; then
        echo "✅ Found EmailJS service ID in built files!"
    else
        echo "❌ EmailJS service ID NOT found in built files"
    fi
    
    echo "🔍 Searching for template ID in built files..."
    if grep -r "template_jr8tm6p" build/static/js/ 2>/dev/null; then
        echo "✅ Found EmailJS template ID in built files!"
    else
        echo "❌ EmailJS template ID NOT found in built files"
    fi
    
    echo "🔍 Searching for public key in built files..."
    if grep -r "LgFDBjwNqV8c65u6t" build/static/js/ 2>/dev/null; then
        echo "✅ Found EmailJS public key in built files!"
    else
        echo "❌ EmailJS public key NOT found in built files"
    fi
else
    echo "❌ Build directory not found!"
fi

echo ""
echo "🧹 Cleaning up test file..."
rm -f .env.production

echo ""
echo "📋 Test Results Summary:"
echo "- If all variables were found in built files: Environment setup is working"
echo "- If variables were NOT found: There's an issue with the build process"
echo ""
echo "Next steps:"
echo "1. If test passed: Run ./deploy.sh to deploy"
echo "2. If test failed: Check your .env file and Node.js version"