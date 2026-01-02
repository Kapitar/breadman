"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Marquee } from "@/components/ui/marquee";
import { useRef } from "react";
import { Confetti, ConfettiRef } from "@/components/ui/confetti";

export default function Home() {
	const confettiRef = useRef<ConfettiRef>(null);
	const [photos, setPhotos] = useState<string[]>([]);

	useEffect(() => {
		const fetchPhotos = async () => {
			const response = await fetch("/api/photos");
			const data = await response.json();
			setPhotos(data);
		};
		fetchPhotos();
		setTimeout(() => {
			confettiRef.current?.fire({});
		}, 500);
	}, []);

	const renderPhotos = (photoList: string[], rowKey: string) =>
		photoList.map((photo, index) => (
			<div
				key={`${rowKey}-${index}`}
				className="relative bg-gray-300 rounded overflow-hidden w-80 h-full flex-shrink-0"
			>
				<Image
					src={`/photos/${photo}`}
					alt={`Photo ${index}`}
					fill
					className="object-cover"
					quality={65}
					priority={false}
					sizes="320px"
				/>
				<div className="absolute inset-0 bg-black/20" />
			</div>
		));

	const rows = [
		{ duration: "50s", start: 0, end: 1 / 5 },
		{ duration: "60s", start: 1 / 5, end: 2 / 5 },
		{ duration: "55s", start: 2 / 5, end: 3 / 5 },
		{ duration: "45s", start: 3 / 5, end: 4 / 5 },
		{ duration: "65s", start: 4 / 5, end: 1 },
	];

	return (
		<>
			<div className="relative flex items-center justify-center min-h-screen overflow-hidden">
				<div className="absolute inset-0 flex flex-col gap-2 p-2 -z-10">
					{rows.map((row, i) => {
						const startIdx = Math.ceil(photos.length * row.start);
						const endIdx = Math.ceil(photos.length * row.end);
						const rowPhotos = photos.slice(startIdx, endIdx);

						return (
							<Marquee
								key={`row-${i}`}
								pauseOnHover
								reverse
								className="flex-1"
								style={
									{
										"--duration": row.duration,
									} as React.CSSProperties
								}
							>
								{renderPhotos(rowPhotos, `row${i + 1}`)}
							</Marquee>
						);
					})}
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
						<a
							href="/messages"
							className="inline-block px-8 py-3.5 bg-gradient-to-r from-blue-950 via-purple-950 to-pink-950 text-white font-semibold rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
						>
							Continue
						</a>
					</div>
				</div>
			</div>
			<Confetti
				ref={confettiRef}
				className="absolute top-0 left-0 z-0 size-full"
				onClick={() => {
					confettiRef.current?.fire({});
				}}
			/>
		</>
	);
}
