"use client";

import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import { useRef } from "react";
import Image from "next/image";

export default function Home() {
	const photos = Array.from({ length: 25 }, (_, i) => i + 1);
	const confettiRef = useRef<ConfettiRef>(null);

	return (
		<div className="relative flex items-center justify-center min-h-screen overflow-hidden">
			<div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-2 p-2 -z-10">
				{photos.map((photo) => (
					<div
						key={photo}
						className="relative bg-gray-300 rounded overflow-hidden"
					>
						<Image
							src={`https://picsum.photos/200/200?random=${photo}`}
							alt={`Photo ${photo}`}
							fill
							className="object-cover"
						/>
					</div>
				))}
			</div>

			<div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg relative z-10">
				<h1 className="text-2xl font-bold">Happy Birthday, Brendan</h1>
				<p className="mb-4">
					We have a small suprise for you. Please make sure to complete all the
					tasks.
				</p>
				<a className="px-4 py-2.5 bg-amber-900 text-white rounded-xl cursor-pointer">
					Continue
				</a>
			</div>
			<Confetti
				ref={confettiRef}
				className="absolute top-0 left-0 z-0 size-full"
				onMouseEnter={() => {
					confettiRef.current?.fire({});
				}}
			/>
		</div>
	);
}
