import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const RedirectPage = () => {
  const [secondsLeft, setSecondsLeft] = useState(4);
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
    <div className="font-poppins bg-white text-gray-800 min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        {/* Logo Section */}
        <div className="mb-8">
          <div className="text-4xl font-bold text-tecnarit-blue">
            TECNARIT
          </div>
        </div>

        {/* Message Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-tecnarit-dark-blue">
            "Not an Uber, but we do drive quality!"
          </h1>
          <p className="text-lg text-gray-600">
            Redirecting to <span className="font-semibold text-tecnarit-blue">tecnarit.com</span> in <span className="font-bold text-tecnarit-blue">{secondsLeft}</span> seconds
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-tecnarit-blue h-2.5 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Manual Redirect Button */}
        <Button 
          onClick={handleManualRedirect}
          className="bg-tecnarit-blue hover:bg-tecnarit-dark-blue text-white font-medium py-2 px-6 rounded-md transition duration-300"
        >
          Go to Tecnarit Now
        </Button>
      </div>
    </div>
  );
};

export default RedirectPage;
