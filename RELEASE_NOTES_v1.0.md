# AIIMS OPD VoiceAgent - Release v1.0.0

**Release Date:** December 19, 2024  
**Version:** 1.0.0  

## 🎉 Initial Release - AIIMS OPD Patient Registration System

This is the first stable release of the AIIMS OPD VoiceAgent, a sophisticated voice-first AI system designed specifically for patient registration at All India Institute of Medical Sciences (AIIMS) Outpatient Department.

## ✨ Key Features

### 🗣️ **Multilingual Voice Interface**
- **Default Language**: Hindi with automatic greeting
- **Supported Languages**: English, Hindi, and regional languages (Marathi, Tamil, Telugu, etc.)
- **Real-time Language Switching**: Seamless language preference selection and switching
- **Voice Recognition**: Advanced speech-to-text with Hindi language optimization

### 📋 **Comprehensive Patient Registration**
Complete data collection workflow including:
- **Department Selection**: Target medical department for appointment
- **Personal Information**: Name (block letters), Age, Gender, Guardian relation
- **Contact Details**: Address, Contact number, Date of birth, State
- **Referral Information**: Referral status and referring department (if applicable)
- **Aadhaar Verification**: 12-digit Aadhaar number validation with dummy verification system
- **Token Generation**: Automatic registration token generation and mobile notification

### 🔄 **Intelligent Conversation Flow**
- **Auto-greet**: Immediate conversation initiation upon connection
- **Smart Reconfirmation**: Each data point is captured and reconfirmed for accuracy
- **Error Recovery**: Automatic escalation to expert review after 2 failed attempts
- **Flow Protection**: Multiple safeguards prevent conversation stalling
- **Progressive Data Collection**: Structured, step-by-step information gathering

### 🎯 **Advanced Recognition Systems**
- **Hindi Confirmation Words**: Comprehensive recognition of Hindi affirmatives ("हां", "हाँ", "जी", "सही है", "ठीक है", "हैं", etc.)
- **Gender Recognition**: Multi-variant recognition for male ("पुरुष", "मर्द", "male") and female ("महिला", "औरत", "female") 
- **Gender-Specific Questions**: Contextual guardian relationship questions based on patient gender
- **Correction Handling**: Intelligent reconfirmation when users provide corrections

### 🛡️ **Safety & Reliability**
- **Content Moderation**: Built-in guardrails for appropriate responses
- **Expert Escalation**: Automatic flagging for human review when needed
- **Session Management**: Robust connection handling and error recovery
- **Data Validation**: Real-time validation of critical information (Aadhaar, phone numbers)

### 🎨 **User Interface**
- **Real-time Visualization**: Live display of collected data points in right panel
- **Status Tracking**: Clear indication of pending, captured, verified, and expert review statuses
- **Modern Design**: Clean, accessible interface built with React and Tailwind CSS
- **Responsive Layout**: Optimized for various screen sizes and devices

## 🔧 **Technical Specifications**

### **Core Technologies**
- **Frontend**: Next.js 14.2.3, React 18.2.0, TypeScript 5.x
- **AI/ML**: OpenAI Realtime SDK v0.0.5, GPT-4o-mini for content moderation
- **Styling**: Tailwind CSS 3.4.1 with modern component design
- **Audio**: Real-time audio streaming with WebRTC
- **Validation**: Zod 3.24.1 for schema validation and type safety

### **Agent Architecture**
- **Primary Agent**: `patient_registration` with comprehensive AIIMS OPD workflow
- **Voice Profile**: Female assistant persona using OpenAI 'sage' voice
- **Tools**: 6 specialized tools for data capture, validation, and token generation
- **Context Management**: React Context providers for language, data collection, and transcript management

### **Data Collection Schema**
```
1. Preferred Language (Hindi default)
2. Date (Auto-captured - today's date)
3. Department 
4. Patient Name (Block Letters)
5. Age
6. Gender
7. Guardian Relation (S/W/D of)
8. Address
9. Contact Number
10. Date of Birth
11. State
12. Referred or Not
13. Referring Department (conditional)
14. Registration Token (auto-generated)
15. Aadhaar Number (final verification)
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 20.x or higher
- OpenAI API key with Realtime API access
- Modern web browser with microphone permissions

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd AIIMSVoiceAgent2.0

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your OPENAI_API_KEY

# Start development server
npm run dev
```

### **Production Deployment**
```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🔄 **Usage Workflow**

1. **Connection**: Application auto-connects and greets in Hindi
2. **Language Selection**: User selects preferred language (Hindi/English/Regional)
3. **Data Collection**: Systematic collection of 15 registration data points
4. **Validation**: Real-time validation and reconfirmation of each field
5. **Aadhaar Verification**: Final verification using 12-digit Aadhaar number
6. **Token Generation**: Automatic generation and mobile notification of registration token
7. **Completion**: Polite conversation closure with all required information captured

## 🛠️ **Configuration**

### **Agent Selection**
- Default agent: "AIIMS OPD" (Patient Registration)
- Alternative agents: Currently disabled ("Topik" scenario removed)

### **Language Settings**
- Default language preference: Hindi
- Automatic language detection and switching
- Script correction for Hindi text display

### **Validation Rules**
- Aadhaar: Exactly 12 digits required
- Contact: Valid phone number format
- Names: Block letters preferred for official records
- Age: Numeric validation

## 🔍 **Known Limitations**

1. **Aadhaar Verification**: Currently uses dummy validation system (not connected to real UIDAI database)
2. **Token System**: Generates mock tokens (not integrated with AIIMS appointment system)
3. **Language Scripts**: Hindi script correction is client-side implemented
4. **Expert Escalation**: Flags for expert review but doesn't trigger actual human handoff

## 🔮 **Future Enhancements**

- **Real Aadhaar Integration**: Connect to UIDAI verification system
- **AIIMS Backend Integration**: Direct integration with AIIMS appointment and patient management systems
- **Advanced Language Support**: Enhanced regional language processing
- **Voice Biometrics**: Patient identity verification through voice patterns
- **Queue Management**: Real-time appointment slot management
- **SMS/WhatsApp Integration**: Automated notifications for appointment confirmations

## 📝 **Changelog**

### v1.0.0 (December 19, 2024)
- ✅ Initial release with complete AIIMS OPD registration workflow
- ✅ Hindi-first multilingual voice interface
- ✅ 15-point comprehensive data collection system
- ✅ Gender-aware conversation flow with proper Hindi forms
- ✅ Robust error handling and conversation stall prevention
- ✅ Real-time data visualization and status tracking
- ✅ Aadhaar validation and token generation system
- ✅ Content moderation and safety guardrails
- ✅ Expert escalation for complex cases
- ✅ Modern React-based user interface

## 🤝 **Contributing**

This is a specialized healthcare application for AIIMS OPD. For feature requests or bug reports, please contact the development team.

## 📄 **License**

Licensed under the MIT License. See LICENSE file for details.

## 📞 **Support**

For technical support or deployment assistance, please refer to the DEPLOYMENT.md file or contact the development team.

---

**Built with ❤️ for AIIMS OPD Patient Registration**




