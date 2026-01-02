import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const photosDir = path.join(process.cwd(), "public/photos");
    const files = fs.readdirSync(photosDir);
    
    // Filter for JPG files only
    const jpgPhotos = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === ".jpg" || ext === ".jpeg";
    });
    
    // Shuffle and limit to 80 photos
    const shuffled = jpgPhotos
      .sort(() => Math.random() - 0.5)
      .slice(0, 80);
    
    return NextResponse.json(shuffled);
  } catch (error) {
    console.error("Error loading photos:", error);
    return NextResponse.json([], { status: 200 });
  }
}
