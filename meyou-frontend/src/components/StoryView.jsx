import { BadgeCheck, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const StoryView = ({ viewStory, setViewStory }) => {
  // State to manage progress bar percentage (0 → 100)
  const [progress, setProgress] = useState(0);

  // Effect to handle progress bar increment for non-video stories
  useEffect(() => {
    // Declare timer and interval variables so they can be cleared later
    let timer;
    let progressInterval;

    // Only run progress logic if a story exists and it's NOT a video
    if (viewStory && viewStory.media_type !== 'video') {
      // Reset progress bar at the start
      setProgress(0);

      // Duration settings (adjustable between 10–15 seconds)
      const duration = 15000; // 15,000 ms = 15 seconds
      const setTime = 100;    // Update every 100ms
      let elapsed = 0;        // Track elapsed time

      // Interval: update progress bar every `setTime` ms
      progressInterval = setInterval(() => {
        elapsed += setTime;
        setProgress((elapsed / duration) * 100); // progress in %
      }, setTime);

      // Timeout: automatically close story after `duration` ms
      timer = setTimeout(() => {
        setViewStory(null);              // Close story
        clearInterval(progressInterval); // Stop progress updates
      }, duration);
    }

    // Cleanup function: clears timers/intervals when component unmounts
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [viewStory, setViewStory]); // Re-run effect when story changes

  // Close handler to manually reset the story view
  const handleClose = () => {
    setViewStory(null);
  };

  // If no story is being viewed, render nothing
  if (!viewStory) return null;

  // Render content based on media type
  const renderContent = () => {
    switch (viewStory.media_type) {
      case 'image':
        return (
          <img
            src={viewStory.media_url}
            alt=""
            className="max-w-full max-h-screen object-contain"
          />
        );

      case 'video':
        return (
          <video
            onEnded={() => setViewStory(null)} // Close when video ends
            src={viewStory.media_url}
            className="max-h-screen"
            controls
            autoPlay
          />
        );

      case 'text':
        return (
          <div className="text-white text-lg p-4">
            {viewStory.content}
          </div>
        );

      default:
        return null;
    }
  };
// Main render of the StoryView component with overlay, progress bar, user info, and content
  return (
    <div
      className="fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center"
      style={{
        backgroundColor:
          viewStory.media_type === 'text'
            ? viewStory.background_color
            : 'rgba(0, 0, 0, 0.9)',
      }}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
        <div
          className="h-full bg-white transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* User Info - Top Left */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50">
        <img
          src={viewStory.user?.profile_picture}
          alt=""
          className="size-7 sm:size-8 rounded-full object-cover border border-white"
        />
        <div className="text-white font-medium flex items-center gap-1.5">
          <span>{viewStory.user?.full_name}</span>
          <BadgeCheck size={18} />
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
      >
        <X className="w-8 h-8 hover:scale-110 transition cursor-pointer" />
      </button>

      {/* Content wrapper */}
      <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoryView;