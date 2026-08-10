"use client";

import { useState, useEffect } from "react";
import BrowserMockup from "./BrowserMockup";
import LaptopMockup from "./LaptopMockup";
import PhoneMockup from "./PhoneMockup";
import { FiMonitor, FiSmartphone, FiVideo } from "react-icons/fi";

export default function ProjectMedia({ media, title, liveUrl, deviceMockup = "browser" }) {
  const [viewMode, setViewMode] = useState("desktop");

  // Reset to desktop view whenever project changes
  useEffect(() => {
    setViewMode("desktop");
  }, [media]);

  const hasVideo = Boolean(media?.video);
  const hasMobile = Boolean(media?.mobile);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* View Mode Switcher */}
      {(hasVideo || hasMobile) && (
        <div className="flex items-center space-x-1 p-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl shadow-lg select-none self-center">
          <button
            onClick={() => setViewMode("desktop")}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
              viewMode === "desktop"
                ? "bg-white/15 text-white shadow-sm border border-white/20"
                : "text-white/40 hover:text-white/80"
            }`}
          >
            <FiMonitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          {hasMobile && (
            <button
              onClick={() => setViewMode("mobile")}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                viewMode === "mobile"
                  ? "bg-white/15 text-white shadow-sm border border-white/20"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              <FiSmartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          )}

          {hasVideo && (
            <button
              onClick={() => setViewMode("video")}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                viewMode === "video"
                  ? "bg-white/15 text-white shadow-sm border border-white/20"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              <FiVideo className="w-3.5 h-3.5" />
              <span>Demo</span>
            </button>
          )}
        </div>
      )}

      {/* Mockup Display — no fixed height wrapper, let content size naturally */}
      <div className="w-full flex justify-center">
        {viewMode === "mobile" && hasMobile ? (
          <PhoneMockup imageSrc={media.mobile} title={title} />
        ) : viewMode === "video" && hasVideo ? (
          <BrowserMockup videoSrc={media.video} title={title} url={liveUrl} />
        ) : deviceMockup === "laptop" ? (
          <LaptopMockup imageSrc={media.dashboard || media.thumbnail} title={title} />
        ) : (
          <BrowserMockup imageSrc={media.dashboard || media.thumbnail} title={title} url={liveUrl} />
        )}
      </div>
    </div>
  );
}
