import React, { useState, useCallback, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, Download } from 'lucide-react';

// --- Data: 8 Local Screenshots ---
// IMPORTANT: Ensure you have an 'assets' folder in your 'public' directory
// and place 1.png, 2.png, ..., 8.png inside it.
const generateScreenshotUrl = (index) =>
  // Referencing local images from the public/assets folder
  `/assets/${index}.png`;


const detailedScreenshots = [
  {
    id: 1,
    url: generateScreenshotUrl(1),
    title: '🚀 Welcome Page – Sign in with Google',
    description:
      'Start your fitness journey instantly with secure Google SSO login. No hassle, just one tap to begin!',
  },
  {
    id: 2,
    url: generateScreenshotUrl(2),
    title: '👤 Choose Your Google Account',
    description:
      'Select your preferred Google profile to connect and sync your health data seamlessly.',
  },
  {
    id: 3,
    url: generateScreenshotUrl(3),
    title: '🏠 Home Dashboard – Google Fit Integration, Overview and much more!',
    description:
      'Log your weight, body fat, and muscle mass effortlessly. The clean and intuitive dashboard keeps your fitness data organized and visualized beautifully.',
  },
  {
    id: 4,
    url: generateScreenshotUrl(4),
    title: '📅 Daily Body Weight Logger',
    description:
      'Track your daily progress with ease. Every log updates your chart automatically for a clear view of your journey.',
  },
  {
    id: 5,
    url: generateScreenshotUrl(5),
    title: '🎯 Set Your Fitness Goals',
    description:
      'Whether it’s losing weight, gaining muscle, or building strength — set personalized goals and stay motivated every day!',
  },
  {
    id: 6,
    url: generateScreenshotUrl(6),
    title: '🤖 AI Fitness Insights & 📈 Monthly Weight Trend',
    description:
      'Get smart, AI-generated summaries of your progress with clear charts showing your monthly weight trends and goals.',
  },
  {
    id: 7,
    url: generateScreenshotUrl(7),
    title: '📜 Weight History – Full Log View',
    description:
      'Access your complete weight history to review your consistency and progress over time.',
  },
  {
    id: 8,
    url: generateScreenshotUrl(8),
    title: '🏆 Goals Tracker',
    description:
      'Monitor each goal’s journey from start to success! Stay accountable and celebrate milestones along the way.',
  },
];

// Reassign the variable used in the component to the detailed data
const screenshots = detailedScreenshots;

// --- Main App Component ---
const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = screenshots.length;

  // State for touch swiping
  const touchStartX = useRef(0);

  // --- Navigation Handlers ---
  const handlePrev = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  // --- Touch Swipe Handlers for Mobile ---

  const handleTouchStart = (e) => {
    // Record the starting X position of the touch
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const difference = touchStartX.current - touchEndX;

    // Define a minimum distance for a swipe to register
    const swipeThreshold = 50;

    if (difference > swipeThreshold) {
      // Swiped Left (move to next slide)
      handleNext();
    } else if (difference < -swipeThreshold) {
      // Swiped Right (move to previous slide)
      handlePrev();
    }
  };

  // --- Screenshot Display Component (Replaced Phone Mockup) ---
  const ScreenshotDisplay = useMemo(() => {
    const activeScreenshot = screenshots[activeIndex];

    return (
      <div
        // Aspect ratio maintained, using max-w-xs/md for responsiveness
        className="w-full max-w-xs sm:max-w-md mx-auto aspect-[9/19.5] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[1.03] cursor-grab"
        style={{
          // Set the image directly as background
          backgroundImage: `url(${activeScreenshot.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* No phone frame elements needed here */}
      </div>
    );
  }, [activeIndex]);

  // --- Rendered Content ---
  return (
    <div className="min-h-screen bg-gray-950 text-white font-inter flex flex-col items-center justify-center p-4 sm:p-8">
      {/* 1. HEADER & MAIN DESCRIPTION */}
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-500 mb-4">
          🏋️‍♂️ BodiQ – Your Smart Fitness & Progress Tracker
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          BodiQ is a modern, intelligent fitness tracking app that helps you log, visualize, and improve your body progress with AI-powered insights.
          It integrates seamlessly with Google Fit to automatically sync your daily activity data and provides powerful tools to stay on track with your goals.
          With interactive charts, a Goal Creator, a Body Weight Logger, and AI-driven summaries, BodiQ transforms your fitness data into clear, motivational feedback.
          Whether you’re aiming to lose weight, gain muscle, or simply maintain a healthy lifestyle — BodiQ keeps you focused, consistent, and inspired.
        </p>
      </header>

      {/* --- CALL TO ACTION (CTA) BUTTON - Download Now --- */}
      <div className="mb-12 text-center">
        <a
          href="https://drive.google.com/file/d/1tDDgnBmipdyBT_HgyiH-WYX6ACCwhemn/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-10 py-4 text-2xl font-black rounded-full text-white shadow-2xl transition duration-300 ease-in-out transform 
                     hover:scale-[1.05] hover:shadow-teal-500/50 focus:outline-none focus:ring-4 focus:ring-teal-500/50 uppercase"
          style={{
            background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
            boxShadow: '0 15px 30px rgba(6, 182, 212, 0.4)'
          }}
          aria-label="Download BodiQ Now"
        >
          <Download size={28} className="mr-3" />
          Download Now
        </a>
      </div>

      {/* 2. KEY FEATURES SECTION */}
      <section className="w-full max-w-5xl mb-12 px-2">
        <h2 className="text-center text-3xl font-bold text-teal-400 mb-6">
          Key Features
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {/* Feature 1: Progress Tracking */}
          <div className="bg-gray-800 p-4 rounded-xl shadow-xl border-b-4 border-blue-500 hover:scale-[1.02] transition-transform duration-200">
            <p className="text-3xl mb-2">📊</p>
            <p className="font-bold text-lg text-blue-300">Progress Tracking</p>
            <p className="text-sm text-gray-400 mt-1">Log and visualize daily weight and goals.</p>
          </div>
          {/* Feature 2: AI Fitness Summary */}
          <div className="bg-gray-800 p-4 rounded-xl shadow-xl border-b-4 border-teal-500 hover:scale-[1.02] transition-transform duration-200">
            <p className="text-3xl mb-2">🧠</p>
            <p className="font-bold text-lg text-teal-300">AI Fitness Summary</p>
            <p className="text-sm text-gray-400 mt-1">Get concise, motivational analysis of your progress.</p>
          </div>
          {/* Feature 3: Goal Insights */}
          <div className="bg-gray-800 p-4 rounded-xl shadow-xl border-b-4 border-blue-500 hover:scale-[1.02] transition-transform duration-200">
            <p className="text-3xl mb-2">💪</p>
            <p className="font-bold text-lg text-blue-300">Goal Insights</p>
            <p className="text-sm text-gray-400 mt-1">Monitor improvements and receive actionable tips.</p>
          </div>
          {/* Feature 4: Smooth UI & Real-time Updates (Combined) */}
          <div className="bg-gray-800 p-4 rounded-xl shadow-xl border-b-4 border-teal-500 hover:scale-[1.02] transition-transform duration-200">
            <p className="text-3xl mb-2">⚡</p>
            <p className="font-bold text-lg text-teal-300">Smooth UI & Real-time</p>
            <p className="text-sm text-gray-400 mt-1">Built with React Native + Tamagui for responsive, real-time data flow.</p>
          </div>
        </div>
      </section>

      {/* 3. CAROUSEL AREA (Screenshot Display) */}
      <div
        className="relative w-full max-w-4xl flex items-center justify-center group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Navigation Button (Hidden on XS screens for better touch experience) */}
        <button
          onClick={handlePrev}
          className="hidden sm:block absolute left-0 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white shadow-lg backdrop-blur-sm -ml-8"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Screenshot Display (Main Image) */}
        <div className="w-full max-w-sm md:max-w-md mx-auto py-8">
          {ScreenshotDisplay}
        </div>

        {/* Right Navigation Button (Hidden on XS screens for better touch experience) */}
        <button
          onClick={handleNext}
          className="hidden sm:block absolute right-0 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white shadow-lg backdrop-blur-sm -mr-8"
          aria-label="Next slide"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* 4. CONTENT DESCRIPTION (for current slide) */}
      <div className="text-center w-full max-w-md">
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">
          {screenshots[activeIndex].title}
        </h2>
        <p className="text-gray-400 mb-4">
          {screenshots[activeIndex].description}
        </p>

        {/* --- Indicator Dots and Mobile Controls --- */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                ? 'bg-teal-400 w-6'
                : 'bg-gray-700 hover:bg-gray-500'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Explicit Mobile Swipe Hint */}
        <p className="sm:hidden text-xs text-gray-500 mt-4 flex items-center justify-center">
          <Smartphone className="w-4 h-4 mr-1" />
          Swipe image left or right to navigate
        </p>
      </div>
    </div>
  );
};

export default App;