"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function DoctorImage() {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback to styled emoji if real image fails to load
    return (
      <div className="w-56 h-48 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <div className="w-48 h-40 bg-white rounded-xl flex items-center justify-center shadow-inner">
          <span className="text-6xl">👩‍⚕️</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-56 h-48 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white flex items-center justify-center bg-white">
      <Image
        src="/doctor-image.png"
        alt="Female Doctor - AIIMS Voice Assistant"
        width={200}
        height={180}
        className="w-52 h-44 object-contain"
        priority
        onError={() => setImageError(true)}
      />
    </div>
  );
}
