import React, { useEffect, useState } from 'react';

const codeSnippets = [
  `function testQuality() {
  const result = runTests();
  if (result.passed) {
    return "Quality Driven!";
  }
}`,
  `class QualityAssurance {
  constructor() {
    this.testsPassed = 0;
    this.testsTotal = 0;
  }
  
  runTests() {
    // Runs automated tests
  }
}`,
  `// Integration testing
export const validateSystem = async () => {
  const modules = await loadComponents();
  const results = modules.map(m => testModule(m));
  return results.every(r => r.success);
};`,
  `// Performance testing
const benchmark = () => {
  console.time('operation');
  // Operation being measured
  processLargeDataset();
  console.timeEnd('operation');
};`
];

const CodeAnimation: React.FC = () => {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [visibleCode, setVisibleCode] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);

  // Typing animation effect
  useEffect(() => {
    if (typingComplete) return;
    
    const codeToType = codeSnippets[currentSnippet];
    let currentPosition = 0;
    
    const typingInterval = setInterval(() => {
      if (currentPosition < codeToType.length) {
        setVisibleCode(codeToType.substring(0, currentPosition + 1));
        currentPosition++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
        
        // Set a timeout to move to the next snippet
        setTimeout(() => {
          setTypingComplete(false);
          setVisibleCode("");
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
        }, 1500); // Wait for 1.5 seconds before changing snippets
      }
    }, 30); // Adjust typing speed here
    
    return () => clearInterval(typingInterval);
  }, [currentSnippet, typingComplete]);
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="code-animation bg-gray-900 rounded-lg p-4 max-w-md w-full text-sm sm:text-base md:text-lg font-mono text-left overflow-hidden">
      <div className="flex items-center mb-2">
        <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <pre className="text-green-400 whitespace-pre-wrap">
        {visibleCode}
        <span className={`inline-block w-2 h-4 bg-green-400 ml-0.5 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
      </pre>
    </div>
  );
};

export default CodeAnimation;