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
    };

    // Initial setup
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Line setup
    const fontSize = 14;
    ctx.font = `${fontSize}px 'Courier New', monospace`;
    const lineHeight = fontSize * 1.2;
    
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
      let y = -lineHeight;
      
      // Create enough lines to fill the screen plus some overflow
      while (y < canvas.height + 200) {
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const snippetLines = snippet.split('\n');
        
        for (const line of snippetLines) {
          // Random horizontal position
          const x = Math.random() * (canvas.width + 300) - 150;
          
          // Random transparency
          const alpha = 0.05 + Math.random() * 0.15;
          
          // Random green shade
          const colorValue = 100 + Math.floor(Math.random() * 155);
          const color = `rgb(0, ${colorValue}, 50)`;
          
          lines.push({ text: line, x, y, alpha, color });
          y += lineHeight;
        }
        
        // Add some space between code snippets
        y += lineHeight * 2;
      }
    };

    // Draw frame
    const drawFrame = () => {
      // Clear canvas with dark background
      ctx.fillStyle = 'rgba(23, 35, 52, 0.2)';  // Dark blue with slight transparency for trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Move and draw lines
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Slowly move the line
        line.y += 0.3;  // Slow vertical movement
        line.x -= 0.1;  // Very slight horizontal drift
        
        // Reset line if it went out of view
        if (line.y > canvas.height + 50) {
          line.y = -50;
          line.x = Math.random() * (canvas.width + 300) - 150;
          line.alpha = 0.05 + Math.random() * 0.15;
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
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 0.8 }}
    />
  );
};

export default CodeBackground;