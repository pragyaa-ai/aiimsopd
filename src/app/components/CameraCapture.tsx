"use client";

import React, { useState, useRef, useCallback } from 'react';

interface CameraCaptureProps {
  onPhotoCapture: (photoData: string) => void;
  largeTextMode: boolean;
}

export default function CameraCapture({ onPhotoCapture, largeTextMode }: CameraCaptureProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt' | 'checking'>('prompt');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const takePhoto = useCallback(async () => {
    try {
      console.log('[CameraCapture] Starting photo capture process...');
      setError(null);
      setPermissionStatus('checking');
      
      // Start camera temporarily just for photo capture
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      });
      
      console.log('[CameraCapture] Camera stream obtained');
      streamRef.current = stream;
      setPermissionStatus('granted');
      
      if (videoRef.current) {
        console.log('[CameraCapture] Setting video source...');
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        
        // Wait for video to be ready
        await new Promise<void>((resolve) => {
          const video = videoRef.current!;
          const onLoadedMetadata = () => {
            console.log('[CameraCapture] Video metadata loaded');
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            resolve();
          };
          video.addEventListener('loadedmetadata', onLoadedMetadata);
        });
        
        console.log('[CameraCapture] Video ready, waiting 2 seconds before capture...');
        // Longer delay to see the camera preview
        setTimeout(() => {
          capturePhotoFromStream();
        }, 2000);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setPermissionStatus('denied');
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('कैमरा अनुमति नहीं दी गई। कृपया कैमरा एक्सेस की अनुमति दें।');
        } else if (err.name === 'NotFoundError') {
          setError('कैमरा नहीं मिला। कृपया जांचें कि आपका कैमरा कनेक्ट है।');
        } else {
          setError('कैमरा एक्सेस में समस्या। कृपया पुन: प्रयास करें।');
        }
      }
    }
  }, []);

  const capturePhotoFromStream = useCallback(() => {
    console.log('[CameraCapture] Attempting to capture photo...');
    
    if (!videoRef.current || !canvasRef.current) {
      console.error('[CameraCapture] Video or canvas ref is null');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('[CameraCapture] Cannot get canvas context');
      return;
    }

    console.log('[CameraCapture] Video dimensions:', video.videoWidth, 'x', video.videoHeight);

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64 image data
    const photoData = canvas.toDataURL('image/jpeg', 0.8);
    
    console.log('[CameraCapture] Photo captured, data length:', photoData.length);
    
    setCapturedPhoto(photoData);
    onPhotoCapture(photoData);
    
    // Stop camera immediately after capture
    stopCamera();
  }, [onPhotoCapture]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  const retakePhoto = useCallback(() => {
    setCapturedPhoto(null);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col" style={{ height: '420px' }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-semibold text-gray-800 ${largeTextMode ? 'text-base' : 'text-sm'}`}>
          📸 फोटो • Photo
        </h3>
        {capturedPhoto && (
          <button
            onClick={retakePhoto}
            className="text-blue-600 hover:text-blue-700 text-xs font-medium"
          >
            🔄 पुन: लें
          </button>
        )}
      </div>

      {/* Camera View or Captured Photo */}
      <div className="bg-gray-100 rounded-lg overflow-hidden relative mb-3" style={{ height: '200px' }}>
        {capturedPhoto ? (
          // Show captured photo
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={capturedPhoto} 
              alt="Captured patient photo" 
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        ) : (
          // Show camera stream or placeholder
          <div className="w-full h-full flex items-center justify-center">
            {isStreaming ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }} // Mirror the video for selfie effect
                onLoadedMetadata={() => {
                  console.log('[CameraCapture] Video metadata loaded in UI');
                }}
                onCanPlay={() => {
                  console.log('[CameraCapture] Video can start playing');
                }}
                onError={(e) => {
                  console.error('[CameraCapture] Video element error:', e);
                }}
              />
            ) : (
              <div className="text-center p-4">
                <div className="text-4xl mb-2">📷</div>
                <p className={`text-gray-600 mb-2 ${largeTextMode ? 'text-sm' : 'text-xs'}`}>
                  फोटो लेने के लिए नीचे बटन दबाएं
                </p>
                <p className={`text-gray-500 ${largeTextMode ? 'text-xs' : 'text-xs'}`}>
                  Click button below to take photo
                </p>
              </div>
            )}
          </div>
        )}

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className={`text-red-700 ${largeTextMode ? 'text-base' : 'text-sm'}`}>
            ⚠️ {error}
          </p>
        </div>
      )}

      {/* Camera Controls */}
      <div className="space-y-2">
        {!capturedPhoto && (
          <button
            onClick={takePhoto}
            disabled={permissionStatus === 'checking' || isStreaming}
            className={`w-full py-2 px-3 rounded-lg font-medium transition-colors
              ${permissionStatus === 'checking' || isStreaming
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 text-white'
              }
              ${largeTextMode ? 'text-sm' : 'text-xs'}
            `}
          >
            {permissionStatus === 'checking' || isStreaming
              ? '📸 फोटो ली जा रही है...' 
              : '📸 फोटो लें • Take Photo'
            }
          </button>
        )}

        {isStreaming && (
          <button
            onClick={stopCamera}
            className={`w-full py-1 px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors
              ${largeTextMode ? 'text-xs' : 'text-xs'}
            `}
          >
            ❌ रद्द करें • Cancel
          </button>
        )}

        {capturedPhoto && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className={`text-green-700 text-center ${largeTextMode ? 'text-base' : 'text-sm'}`}>
              ✅ फोटो सफलतापूर्वक कैप्चर हुई • Photo captured successfully
            </p>
          </div>
        )}
      </div>

      {/* Camera Guidelines */}
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
        <p className={`text-blue-800 font-medium mb-1 ${largeTextMode ? 'text-xs' : 'text-xs'}`}>
          📋 दिशा-निर्देश • Guidelines:
        </p>
        <ul className={`text-blue-700 space-y-0 ${largeTextMode ? 'text-xs' : 'text-xs'} leading-tight`}>
          <li>• कैमरे की तरफ देखें • Look at camera</li>
          <li>• अच्छी रोशनी • Good lighting</li>
          <li>• चेहरा साफ दिखे • Clear face</li>
        </ul>
      </div>
    </div>
  );
}
