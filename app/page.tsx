"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch("/api/photos");
      const data = await response.json();
      setPhotos(data);
    };
    fetchPhotos();
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-2 p-2 -z-10">
        {photos.map((photo, index) => (
          <div key={index} className="relative bg-gray-300 rounded overflow-hidden">
            <Image
              src={`/photos/${photo}`}
              alt={`Photo ${index}`}
              fill
              className="object-cover"
              quality={65}
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg relative z-10">
        <h1 className="text-2xl font-bold">Happy Birthday, Brendan</h1>
        <p className="mb-4">We have a small suprise for you. Please make sure to complete all the tasks.</p>
        <a className="px-4 py-2.5 bg-amber-900 text-white rounded-xl cursor-pointer">Continue</a>
      </div>
    </div>
  );
}
