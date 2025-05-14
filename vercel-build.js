// vercel-build.js
import { execSync } from 'child_process';

// Only build the frontend when deploying to Vercel
try {
  console.log('Building frontend for Vercel deployment...');
  execSync('vite build', { stdio: 'inherit' });
  console.log('Frontend build completed successfully!');
} catch (error) {
  console.error('Frontend build failed:', error);
  process.exit(1);
}