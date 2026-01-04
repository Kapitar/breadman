"use client";

import { messages } from "./messages";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Messages() {
  const router = useRouter();
  const [selectedMessage, setSelectedMessage] = useState<
    (typeof messages)[0] | null
  >(null);
  const [viewedMessages, setViewedMessages] = useState<Set<string>>(new Set());
  const [shuffledMessages, setShuffledMessages] = useState<typeof messages>([]);

  useEffect(() => {
    const shuffled = [...messages].sort(() => Math.random() - 0.5);
    setShuffledMessages(shuffled);
  }, []);

  useEffect(() => {
    if (selectedMessage) {
      setViewedMessages((prev) => new Set(prev).add(selectedMessage.author));
    }
  }, [selectedMessage]);

  const allMessagesViewed = viewedMessages.size === messages.length;

  return (
    <>
      <div className="min-h-screen p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 md:mb-12 text-center">
            Messages
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {shuffledMessages.map((message, index) => (
              <button
                key={message.author}
                onClick={() => setSelectedMessage(message)}
                className="group relative cursor-pointer py-4 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-slate-700 hover:border-slate-600 text-left w-full"
              >
                <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border-2 border-slate-500/50 overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {message.image ? (
                      <Image
                        src={`/avatars/${message.image}`}
                        alt={message.author}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        {message.author.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {message.author}
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base font-medium group-hover:text-slate-300 transition-colors duration-300">
                    Click to reveal
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 md:p-8 flex justify-center bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent">
        <button
          onClick={() => {
            window.location.href = "https://meet.google.com/wpj-vcme-ayr";
          }}
          disabled={!allMessagesViewed}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
            allMessagesViewed
              ? "bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 hover:from-slate-500 hover:via-slate-600 hover:to-slate-700 text-white border border-slate-500/50 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer px-16"
              : "bg-slate-700 text-slate-400 cursor-not-allowed opacity-50"
          }`}
        >
          {allMessagesViewed ? (
            <span className="flex items-center gap-2">
              Next
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Read all messages to continue
              <span className="text-xs">
                ({viewedMessages.size}/{messages.length})
              </span>
            </span>
          )}
        </button>
      </div>

      {/* Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-600/50 shadow-2xl transform transition-all duration-200 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border-2 border-slate-500/50 overflow-hidden flex items-center justify-center">
                    {selectedMessage.image ? (
                      <Image
                        src={`/avatars/${selectedMessage.image}`}
                        alt={selectedMessage.author}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {selectedMessage.author.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {selectedMessage.author}
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-slate-500 to-transparent rounded-full"></div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-slate-400 hover:text-white transition-colors duration-200 p-2 hover:bg-slate-800/50 rounded-lg border border-transparent hover:border-slate-600"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Message Content */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-600 rounded-full"></div>
                <div className="pl-8">
                  <p className="text-xl md:text-2xl text-slate-100 leading-relaxed font-light tracking-wide">
                    {selectedMessage.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
