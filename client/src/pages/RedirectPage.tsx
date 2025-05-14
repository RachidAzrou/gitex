import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CodeAnimation from "../components/CodeAnimation";
import CodeBackground from "../components/CodeBackground";

const RedirectPage = () => {
  const [secondsLeft, setSecondsLeft] = useState(6);
  const [progress, setProgress] = useState(0);
  const redirectUrl = "https://www.tecnarit.com";

  useEffect(() => {
    // Set up smooth progress bar update
    const totalDuration = secondsLeft * 1000; // total duration in ms
    const interval = 10; // update every 10ms
    let elapsed = 0;
    
    const timer = setInterval(() => {
      elapsed += interval;
      const currentProgress = (elapsed / totalDuration) * 100;
      setProgress(currentProgress);
      
      // Update countdown text (only when second changes)
      const currentSecond = Math.ceil((totalDuration - elapsed) / 1000);
      if (currentSecond !== secondsLeft) {
        setSecondsLeft(currentSecond);
      }
      
      // Redirect when timer completes
      if (elapsed >= totalDuration) {
        clearInterval(timer);
        window.location.href = redirectUrl;
      }
    }, interval);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const handleManualRedirect = () => {
    window.location.href = redirectUrl;
  };

  return (
    <div className="font-poppins text-white min-h-screen flex flex-col relative overflow-hidden">
      {/* Code Background Animation */}
      <CodeBackground />
      
      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 z-10 relative">
        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 w-full max-w-[300px] sm:max-w-[300px] h-auto">
            <img 
              src="/assets/tecnarit-logo-transparent.png" 
              alt="Tecnarit Logo" 
              className="w-full h-auto"
              onError={(e) => {
                console.error("Logo failed to load");
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Message Section */}
        <div className="text-center mb-6 backdrop-blur-md bg-secondary/60 p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
            "Not an Uber, but we do drive quality!"
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-tecnarit-green mb-3">
            Can't wait!
          </p>
          <p className="text-base sm:text-lg text-gray-200">
            Redirecting to <span className="font-semibold text-tecnarit-green">tecnarit.com</span> in <span className="font-bold text-tecnarit-green">{secondsLeft}</span> seconds
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md bg-gray-700 bg-opacity-50 rounded-full h-3 mb-8">
          <div 
            className="bg-tecnarit-gradient h-3 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Manual Redirect Button */}
        <Button 
          onClick={handleManualRedirect}
          className="bg-tecnarit-green hover:bg-tecnarit-green/90 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-md transition duration-300 text-base sm:text-lg shadow-lg"
        >
          Take The Wheel!
        </Button>
      </div>
    </div>
  );
};

export default RedirectPage;
