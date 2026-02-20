#!/usr/bin/env node

// Set environment variables and run build
process.env.REACT_APP_EMAILJS_SERVICE_ID = 'service_1pazkqa';
process.env.REACT_APP_EMAILJS_TEMPLATE_ID = 'template_jr8tm6p';
process.env.REACT_APP_EMAILJS_PUBLIC_KEY = 'LgFDBjwNqV8c65u6t';

console.log('🔧 Setting environment variables...');
console.log('SERVICE_ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID);
console.log('TEMPLATE_ID:', process.env.REACT_APP_EMAILJS_TEMPLATE_ID);
console.log('PUBLIC_KEY:', process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

// Run the build
const { spawn } = require('child_process');

console.log('🏗️ Running React build...');
const build = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  env: process.env
});

build.on('close', (code) => {
  console.log(`Build process exited with code ${code}`);
  process.exit(code);
});