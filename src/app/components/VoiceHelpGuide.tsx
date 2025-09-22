"use client";

import React, { useState } from 'react';

interface VoiceHelpGuideProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function VoiceHelpGuide({ isVisible, onClose }: VoiceHelpGuideProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">🎙️</span>
              <div>
                <h2 className="text-2xl font-bold">आवाज़ सहायता • Voice Help</h2>
                <p className="text-blue-100">कैसे बोलकर पंजीकरण करें</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step 1 */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-2">
                  🔵 "शुरू करें" बटन दबाएं • Press "Start" Button
                </h3>
                <p className="text-green-700">
                  बड़े हरे बटन को दबाएं जिस पर लिखा है "शुरू करें • Start"
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  🗣️ भाषा चुनें • Choose Language
                </h3>
                <p className="text-blue-700 mb-2">
                  आवाज़ कहेगी: "कौन सी भाषा में बात करना पसंद करेंगे?"
                </p>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <strong>आप कहें:</strong> "हिंदी" या "अंग्रेजी" या "English"
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-800 mb-2">
                  📝 जानकारी बताएं • Give Information
                </h3>
                <p className="text-purple-700 mb-3">
                  आवाज़ एक-एक करके पूछेगी। हर सवाल के बाद धीरे-धीरे जवाब दें:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <span className="text-2xl">🏥</span> <strong>विभाग:</strong><br/>
                    "हड्डी के डॉक्टर" या "पेट के डॉक्टर"
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <span className="text-2xl">👤</span> <strong>नाम:</strong><br/>
                    "राम कुमार शर्मा" (पूरा नाम)
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <span className="text-2xl">📅</span> <strong>उम्र:</strong><br/>
                    "पैंतीस साल" या "35"
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <span className="text-2xl">📞</span> <strong>मोबाइल:</strong><br/>
                    "9876543210" (धीरे-धीरे)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-orange-800 mb-2">
                  ✅ पुष्टि करें • Confirm
                </h3>
                <p className="text-orange-700 mb-2">
                  हर जानकारी के बाद आवाज़ दोहराएगी और पूछेगी: "क्या यह सही है?"
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-100 p-3 rounded-lg border border-green-300 text-center">
                    <strong className="text-green-800">सही है तो कहें:</strong><br/>
                    "हां", "जी", "सही है", "ठीक है"
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg border border-red-300 text-center">
                    <strong className="text-red-800">गलत है तो कहें:</strong><br/>
                    "नहीं", "गलत है", "ना"
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                5
              </div>
              <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-2">
                  🎫 टोकन मिलेगा • Get Token
                </h3>
                <p className="text-yellow-700">
                  सब जानकारी सही होने पर आपको टोकन नंबर मिलेगा। यह आपके मोबाइल पर भी आएगा।
                </p>
                <div className="bg-white p-3 rounded-lg border border-yellow-300 mt-2">
                  <strong>फिर:</strong> OPD काउंटर पर जाकर टोकन नंबर दिखाएं
                </div>
              </div>
            </div>
          </div>

          {/* Important Tips */}
          <div className="bg-gray-50 border-2 border-gray-300 p-4 rounded-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">💡</span>
              महत्वपूर्ण बातें • Important Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg border">
                <strong>🔊 आवाज़ साफ रखें:</strong><br/>
                धीरे-धीरे, साफ आवाज़ में बोलें
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <strong>⏱️ कोई जल्दी नहीं:</strong><br/>
                आराम से सोचकर जवाब दें
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <strong>🆔 आधार कार्ड तैयार रखें:</strong><br/>
                12 अंक का नंबर चाहिए
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <strong>📞 सहायता:</strong><br/>
                समस्या हो तो काउंटर पर जाएं
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="text-center pt-4">
            <button
              onClick={onClose}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-colors"
            >
              समझ गया, शुरू करते हैं • Got it, Let's Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


