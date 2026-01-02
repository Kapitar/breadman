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
					<div
						key={index}
						className="relative bg-gray-300 rounded overflow-hidden"
					>
						<Image
							src={`/photos/${photo}`}
							alt={`Photo ${index}`}
							fill
							className="object-cover"
							quality={65}
							priority={false}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
						<div className="absolute inset-0 bg-black/20" />
					</div>
				))}
			</div>
			<div className="text-center backdrop-blur-xl bg-white/80 p-10 rounded-3xl shadow-2xl relative z-10 border border-white/50 max-w-lg mx-4">
				<div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-orange-500 rounded-full blur-xl opacity-60" />
				<div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full blur-xl opacity-60" />

				<div className="relative">
					<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-950 via-purple-950 to-pink-950 bg-clip-text text-transparent mb-3">
						Happy Birthday, Brendan! 🎉
					</h1>
					<p className="text-lg text-gray-700 mb-6 leading-relaxed">
						We have a small surprise for you. Complete all the tasks for a
						surprise!!!
					</p>
					<a className="inline-block px-8 py-3.5 bg-gradient-to-r from-blue-950 via-purple-950 to-pink-950 text-white font-semibold rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
						Continue
					</a>
				</div>
			</div>
		</div>
	);
}
