"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useDataCollection } from '../contexts/DataCollectionContext';
import { SessionStatus } from "@/app/types";
import VoiceHelpGuide from './VoiceHelpGuide';
import DoctorImage from './DoctorImage';
import CameraCapture from './CameraCapture';

interface SimpleOPDInterfaceProps {
  sessionStatus: SessionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
  isAudioEnabled: boolean;
  setIsAudioEnabled: (enabled: boolean) => void;
}

export default function SimpleOPDInterface({
  sessionStatus,
  onConnect,
  onDisconnect,
  isAudioEnabled,
  setIsAudioEnabled,
}: SimpleOPDInterfaceProps) {
  const { capturedData, getCompletionPercentage } = useDataCollection();
  const [currentStep, setCurrentStep] = useState(0);
  const [showHelpGuide, setShowHelpGuide] = useState(false);
  const [largeTextMode, setLargeTextMode] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  
  const isConnected = sessionStatus === "CONNECTED";
  const isConnecting = sessionStatus === "CONNECTING";
  const completionPercentage = getCompletionPercentage();

  // Define the registration steps with visual icons
  const registrationSteps = [
    { id: 'preferred_language', icon: '🗣️', title: 'भाषा चुनें', subtitle: 'Choose Language', completed: false },
    { id: 'department', icon: '🏥', title: 'विभाग', subtitle: 'Department', completed: false },
    { id: 'patient_name', icon: '👤', title: 'नाम', subtitle: 'Name', completed: false },
    { id: 'age', icon: '📅', title: 'उम्र', subtitle: 'Age', completed: false },
    { id: 'gender', icon: '⚧', title: 'लिंग', subtitle: 'Gender', completed: false },
    { id: 'contact_number', icon: '📞', title: 'फोन नंबर', subtitle: 'Phone Number', completed: false },
    { id: 'aadhar_number', icon: '🆔', title: 'आधार कार्ड', subtitle: 'Aadhaar Card', completed: false },
    { id: 'token_number', icon: '🎫', title: 'टोकन', subtitle: 'Token', completed: false },
  ];

  // Update step completion status
  const updatedSteps = registrationSteps.map(step => ({
    ...step,
    completed: capturedData.find(data => data.id === step.id)?.status === 'verified' || 
               capturedData.find(data => data.id === step.id)?.status === 'captured'
  }));

  // Find current active step
  useEffect(() => {
    const activeStepIndex = updatedSteps.findIndex(step => !step.completed);
    setCurrentStep(activeStepIndex >= 0 ? activeStepIndex : updatedSteps.length - 1);
  }, [capturedData]);

  const handleToggleConnection = async () => {
    console.log('[SimpleOPD] Button clicked, current status:', sessionStatus);
    
    if (isConnected) {
      console.log('[SimpleOPD] Disconnecting...');
      onDisconnect();
    } else {
      console.log('[SimpleOPD] Connecting...');
      
      // Check microphone permissions first
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          console.log('[SimpleOPD] Checking microphone permission...');
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log('[SimpleOPD] Microphone permission granted');
          stream.getTracks().forEach(track => track.stop()); // Stop the test stream
        }
      } catch (permissionError) {
        console.error('[SimpleOPD] Microphone permission denied:', permissionError);
        alert('🎤 माइक्रोफोन की अनुमति चाहिए। कृपया ब्राउज़र में माइक्रोफोन की अनुमति दें।\n\n🎤 Microphone permission required. Please allow microphone access in your browser.');
        return;
      }
      
      try {
        console.log('[SimpleOPD] Calling onConnect...');
        await onConnect();
        console.log('[SimpleOPD] onConnect completed');
      } catch (error) {
        console.error('[SimpleOPD] Connection failed:', error);
        alert('कनेक्शन में समस्या हो रही है। कृपया पेज रीफ्रेश करके फिर से कोशिश करें।\n\nConnection issue. Please refresh the page and try again.');
      }
    }
  };

  const handlePhotoCapture = (photoData: string) => {
    console.log('[SimpleOPD] Photo captured, data length:', photoData.length);
    setCapturedPhoto(photoData);
    // You can also store this in context or send to backend here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-4 border-red-500">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">🏥</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AIIMS दिल्ली</h1>
              <p className="text-lg text-gray-600">OPD पंजीकरण / OPD Registration</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-800">आज की तारीख / Today's Date</div>
            <div className="text-lg font-semibold text-gray-800">{new Date().toLocaleDateString('hi-IN')}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Camera Section - Left */}
          <div className="lg:col-span-1">
            <CameraCapture 
              onPhotoCapture={handlePhotoCapture} 
              largeTextMode={largeTextMode}
            />
          </div>
          
          {/* Main Interaction Panel - Center */}
          <div className="lg:col-span-2">
            {/* Welcome Message */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-l-8 border-green-500">
              <div className="text-center">
                <DoctorImage />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  स्वागत है! Welcome!
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  आवाज़ से पंजीकरण करें • Voice Registration
                </p>
                
                {/* Connection Status */}
                <div className="mb-8">
                  {!isConnected && !isConnecting && (
                    <div className="text-center">
                      <p className="text-lg text-gray-700 mb-4">
                        🗣️ बोलकर अपना पंजीकरण शुरू करें<br/>
                        <span className="text-base text-gray-500">Start your registration by speaking</span>
                      </p>
                    </div>
                  )}
                  
                  {isConnected && (
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold">सुन रहा है • Listening</span>
                      </div>
                    </div>
                  )}
                  
                  {isConnecting && (
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-spin"></div>
                        <span className="font-semibold">जुड़ रहा है • Connecting</span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          OpenAI Realtime API से कनेक्ट हो रहे हैं...<br/>
                          <span className="text-xs">यह कुछ सेकंड लग सकते हैं</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Action Button */}
                <button
                  onClick={handleToggleConnection}
                  disabled={isConnecting}
                  className={`
                    w-full max-w-md mx-auto py-6 px-8 rounded-2xl text-2xl font-bold mb-4
                    transition-all duration-300 transform hover:scale-105
                    ${isConnected 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                    }
                    ${isConnecting ? 'opacity-50 cursor-not-allowed' : 'shadow-lg hover:shadow-xl'}
                  `}
                >
                  {isConnecting ? (
                    <span className="flex items-center justify-center space-x-3">
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>जुड़ रहा है...</span>
                    </span>
                  ) : isConnected ? (
                    <span className="flex items-center justify-center space-x-3">
                      <span>🔴</span>
                      <span>बंद करें • Stop</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-3">
                      <span>🎙️</span>
                      <span>शुरू करें • Start</span>
                    </span>
                  )}
                </button>

                {/* Help Button */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowHelpGuide(true)}
                    className="w-full max-w-md mx-auto py-3 px-6 rounded-xl text-lg font-semibold bg-blue-100 hover:bg-blue-200 text-blue-800 border-2 border-blue-300 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>❓</span>
                    <span>कैसे करें? • How to Use?</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">🔊</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">आवाज़ सेटिंग • Audio Settings</h3>
                    <p className="text-sm text-gray-600">आवाज़ चालू/बंद करें</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAudioEnabled}
                    onChange={(e) => setIsAudioEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Panel - Progress */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  पंजीकरण प्रगति • Registration Progress
                </h3>
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - completionPercentage / 100)}`}
                      className="text-green-500 transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">{Math.round(completionPercentage)}%</span>
                  </div>
                </div>
              </div>

              {/* Registration Steps with Data */}
              <div className="space-y-3">
                {updatedSteps.map((step, index) => {
                  const dataPoint = capturedData.find(data => data.id === step.id);
                  const hasValue = dataPoint?.value && dataPoint.value !== null;
                  
                  return (
                    <div
                      key={step.id}
                      className={`
                        p-4 rounded-xl transition-all duration-300 border-2
                        ${step.completed 
                          ? 'bg-green-50 border-green-200' 
                          : index === currentStep 
                          ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100' 
                          : 'bg-gray-50 border-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-lg
                          ${step.completed 
                            ? 'bg-green-500 text-white' 
                            : index === currentStep 
                            ? 'bg-blue-500 text-white animate-pulse' 
                            : 'bg-gray-200 text-gray-600'
                          }
                        `}>
                          {step.completed ? '✓' : step.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">{step.title}</div>
                          <div className="text-sm text-gray-600">{step.subtitle}</div>
                        </div>
                      </div>
                      
                      {/* Show captured data */}
                      {hasValue && (
                        <div className="ml-13 mt-2 p-2 bg-white rounded-lg border border-gray-200">
                          <div className="text-sm font-medium text-gray-700">कैप्चर किया गया:</div>
                          <div className="text-base text-gray-900 font-semibold">{dataPoint.value}</div>
                          <div className="text-xs text-green-600">✓ सही कैप्चर हुआ</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick Settings */}
              <div className="mt-6">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">🔍 बड़े अक्षर</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={largeTextMode}
                        onChange={(e) => setLargeTextMode(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Help Guide Modal */}
      <VoiceHelpGuide 
        isVisible={showHelpGuide} 
        onClose={() => setShowHelpGuide(false)} 
      />
    </div>
  );
}
