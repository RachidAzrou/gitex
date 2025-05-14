import React, { useEffect, useRef } from 'react';

// Array of code snippets to display in the background
const codeSnippets = [
  `// Quality Assurance Test Suite
function runQualityTests() {
  const modules = ['auth', 'api', 'database', 'ui'];
  const results = modules.map(testModule);
  return results.every(r => r.passed);
}`,

  `// Component Testing
describe('UserInterface', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});`,

  `// Integration Tests
test('API communication', async () => {
  const response = await api.fetchData();
  expect(response.status).toBe(200);
  expect(response.data).toHaveProperty('results');
});`,

  `// Performance Benchmark
function benchmark() {
  const start = performance.now();
  // Critical operation
  processData(largeDataset);
  const end = performance.now();
  console.log(\`Operation took \${end - start}ms\`);
}`,

  `// Security Testing
function testSecurity() {
  const vulnerabilities = scanForVulnerabilities();
  expect(vulnerabilities.length).toBe(0);
  if (vulnerabilities.length > 0) {
    reportSecurityIssues(vulnerabilities);
  }
  return vulnerabilities.length === 0;
}`,

  `// CI/CD Pipeline
pipeline {
  agent any
  stages {
    stage('Build') {
      steps { sh 'npm install' }
    }
    stage('Test') {
      steps { sh 'npm test' }
    }
    stage('Deploy') {
      when { branch 'main' }
      steps { sh './deploy.sh' }
    }
  }
}`,

  `// Database Testing
async function testDatabaseConnection() {
  try {
    await db.connect();
    const result = await db.query('SELECT 1');
    return result.rows.length > 0;
  } catch (err) {
    console.error('Database test failed', err);
    return false;
  }
}`,

  `// Accessibility Testing
function testAccessibility() {
  const violations = axe.run(document);
  expect(violations.length).toBe(0);
  violations.forEach(v => {
    console.error(\`Accessibility issue: \${v.description}\`);
  });
  return violations.length === 0;
}`,
];

const CodeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to fill the screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reset font size based on screen width for better mobile responsiveness
      const isMobile = window.innerWidth < 768;
      const fontSize = isMobile ? 12 : 16; // Smaller font on mobile
      ctx.font = `${fontSize}px 'Courier New', monospace`;
    };

    // Initial setup
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Line setup - this initial font setup will be overridden by setCanvasSize
    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? 12 : 16; // Responsive font size
    ctx.font = `${fontSize}px 'Courier New', monospace`;
    const getLineHeight = () => fontSize * 1.3; // Function to recalculate line height
    
    // Create an array of text lines with their positions
    const lines: Array<{
      text: string;
      x: number;
      y: number;
      alpha: number;
      color: string;
    }> = [];

    // Initialize lines
    const initLines = () => {
      lines.length = 0;
      let y = -getLineHeight();
      
      // Create enough lines to fill the screen plus some overflow
      while (y < canvas.height + 200) {
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const snippetLines = snippet.split('\n');
        
        for (const line of snippetLines) {
          // Random horizontal position
          const x = Math.random() * (canvas.width + 300) - 150;
          
          // More visible transparency
          const alpha = 0.3 + Math.random() * 0.3;
          
          // Brighter green shade for better visibility
          const colorValue = 150 + Math.floor(Math.random() * 105);
          const color = `rgb(0, ${colorValue}, 80)`;
          
          lines.push({ text: line, x, y, alpha, color });
          y += getLineHeight();
        }
        
        // Add some space between code snippets
        y += getLineHeight() * 2;
      }
    };

    // Draw frame
    const drawFrame = () => {
      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fill with dark background
      ctx.fillStyle = 'rgba(23, 35, 52, 0.95)';  // Dark blue background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate movement speed based on screen size for consistent feel across devices
      const isSmallScreen = window.innerWidth < 768;
      const verticalSpeed = isSmallScreen ? 0.4 : 0.5; // Slightly slower on mobile
      const horizontalSpeed = isSmallScreen ? 0.05 : 0.1; // Half the horizontal drift on mobile
      
      // Move and draw lines
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Slowly move the line with responsive speeds
        line.y += verticalSpeed;
        line.x -= horizontalSpeed;
        
        // Reset line if it went out of view
        if (line.y > canvas.height + 50) {
          line.y = -50;
          line.x = Math.random() * (canvas.width + 300) - 150;
          line.alpha = 0.15 + Math.random() * 0.25;  // Higher opacity
        }
        
        // Draw the line
        ctx.globalAlpha = line.alpha;
        ctx.fillStyle = line.color;
        ctx.fillText(line.text, line.x, line.y);
      }
      
      ctx.globalAlpha = 1;
      
      // Request next frame
      animationFrameRef.current = requestAnimationFrame(drawFrame);
    };

    // Initialize and start animation
    initLines();
    drawFrame();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full"
      style={{ opacity: 0.8, zIndex: 0 }}
    />
  );
};

export default CodeBackground;