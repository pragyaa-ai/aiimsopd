# Topik VoiceAgent v1.0.0

**AI-Powered Personalized Teacher for Topik Platform Onboarding**

An intelligent voice agent that guides new team members through the Topik platform onboarding experience with personalized, conversational support in English and French.

## 🎯 What is Topik VoiceAgent?

Topik VoiceAgent transforms traditional onboarding into an engaging, conversational experience. Our **Personalized Teacher** agent adapts to each user's role, background, and learning style while introducing them to Topik's collaborative learning platform.

### 🌟 Key Features

- **🗣️ Conversational Language Selection**: Natural English/French language choice during conversation
- **🎓 Personalized Teaching**: Adapts to user's role, experience level, and learning preferences  
- **🤝 Community Focus**: Emphasizes Topik's "On avance ensemble" (We move forward together) philosophy
- **📊 Comprehensive Onboarding**: Tracks 17 data points for complete user profiling
- **🔄 Real-time Progress**: Live onboarding progress monitoring and export
- **🎨 Professional UI**: Clean, focused interface with Topik branding

## 🤖 Meet Your Personalized Teacher

The **Personalized Teacher** agent is your dedicated onboarding companion that:

- **Greets authentically**: Welcomes users with role-specific guidance
- **Speaks your language**: Asks for English/French preference and maintains consistency
- **Knows Topik deeply**: Integrates real platform knowledge from [topik.space](https://topik.space/)
- **Compares intelligently**: Explains Topik's advantages over traditional tools (Trello, Slack, etc.)
- **Tracks progress**: Captures onboarding data and recommends next steps

### Sample Interaction
```
Teacher: "Welcome to Topik! Before we begin your onboarding, do you prefer English or French?"
User: "English please"
Teacher: "Perfect! Welcome, and great to have you on the team! 🎉
I've gone through all your onboarding materials and matched them to your role.
We'll move step by step, focusing on what's most relevant to you as a [ROLE].
To begin, here's the core idea behind our platform in simple terms:
'Topik reinvents community learning by creating spaces where people grow together — 
it's not just training you follow, it's learning you experience collaboratively.'
Does that make sense so far? Want to dive deeper into how it compares to tools you may have used before?"
```

## 📊 Onboarding Data Collection

The agent captures 17 comprehensive data points for complete user profiling:

### User Profile
- Preferred Language (English/French)
- Employee Name & Contact
- Job Role/Position
- Department/Team
- Experience Level

### Learning Preferences  
- Learning Style Preference
- Prior LMS Experience
- Primary Topik Use Case

### Platform Configuration
- Community Role (Admin/Instructor/Learner)
- Training Goals & Objectives
- Collaboration Requirements
- Content Creation Needs

### Technical Requirements
- Analytics & Reporting Needs
- Integration Requirements

### Progress Tracking
- Onboarding Module Progress
- Questions Answered
- Recommended Next Steps

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key with Realtime API access

### Quick Start
```bash
# Clone the repository
git clone <your-repo-url>
cd TopikVoiceAgent2.0

# Install dependencies
npm install

# Set up environment variables
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here" >> .env

# Start development server
npm run dev
```

### Environment Configuration
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Production Deployment
```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🚀 Using Topik VoiceAgent

### Accessing the Application
1. Open your browser to [http://localhost:3000](http://localhost:3000)
2. The **Personalised Teacher** agent is pre-selected
3. Click "Connect" to start your voice conversation
4. Follow the conversational onboarding flow

### Features Overview
- **🎤 Voice Interaction**: Natural speech conversation with the AI teacher
- **📱 Clean Interface**: Focused onboarding experience without distractions
- **📊 Progress Monitoring**: Real-time tracking in the Onboarding Progress Center
- **💾 Data Export**: Download complete onboarding profiles as JSON
- **🔄 Session Management**: Seamless connection and session handling

### Onboarding Flow
1. **Language Selection**: Choose English or French conversationally
2. **Welcome & Introduction**: Role-specific greeting and Topik overview
3. **Profile Building**: Natural conversation to capture user details
4. **Platform Comparison**: Understanding Topik vs. other tools
5. **Goal Setting**: Training objectives and collaboration needs
6. **Progress Summary**: Next steps and recommendations

## 🎨 User Interface

### Main Components
- **Left Panel**: Live conversation transcript with the Personalized Teacher
- **Right Panel**: Onboarding Progress Center with data collection status
- **Bottom Toolbar**: Voice controls and session management
- **Top Header**: Clean navigation focused on the onboarding experience

### Progress Center Features
- **Live Status**: "ONBOARDING" indicator with real-time updates
- **Data Points**: Visual tracking of all 17 onboarding categories
- **Progress Bar**: Completion percentage and status indicators
- **Export Function**: Download `topik-onboarding-data-YYYY-MM-DD.json`

## 🔧 Technical Architecture

### Agent Configuration
- **Instructions**: Comprehensive Topik platform knowledge and conversation flow
- **Tools**: `capture_onboarding_data` and `update_onboarding_progress`
- **Context**: Integration with DataCollectionContext for real-time updates

### Data Management
- **Real-time Collection**: Captures data points during natural conversation
- **Type Safety**: Full TypeScript support for onboarding data structure
- **State Management**: Efficient tracking of user progress and preferences

### Integration Points
- **OpenAI Realtime API**: Powers the conversational voice interface
- **Next.js Framework**: Full-stack application with API routes
- **React Context**: Global state management for onboarding data

## 🌟 Topik Platform Integration

### Authentic Knowledge Base
The agent incorporates real Topik platform information:
- **Mission**: "Empowering communities through collaborative learning"
- **Key Features**: AI-adaptive learning, native community integration, neuroatypical support
- **Value Propositions**: 100% user satisfaction, 2-minute setup, free start, French hosting
- **User Testimonials**: Real Trustpilot 5.0/5 reviews

### Competitive Differentiation
Explains how Topik differs from traditional tools:
- **vs. Trello**: Beyond task management to collaborative learning experiences
- **vs. Slack**: Native learning community vs. communication-only platform
- **vs. Traditional LMS**: AI-adaptive content vs. static course delivery

## 📋 Version History

### v1.0.0 (Current) - Topik VoiceAgent
- **🎯 Complete Transformation**: From generic verification to Topik onboarding
- **🤖 Personalized Teacher**: Dedicated onboarding agent with authentic Topik knowledge
- **🗣️ Conversational Language**: Natural English/French selection
- **📊 17 Data Points**: Comprehensive onboarding data collection
- **🎨 Clean UI**: Focused, distraction-free onboarding experience

## 🚀 Future Roadmap

- **Advanced Analytics**: Enhanced progress tracking and reporting
- **Platform Integration**: Direct API connections to Topik platform
- **Additional Agents**: Specialized agents for sales and support use cases
- **Mobile Support**: Responsive design for mobile onboarding
- **Audio Processing**: Enhanced audio upload and transcription features

## 🤝 Support & Contribution

### Getting Help
- Review the installation instructions above
- Check that your OpenAI API key has Realtime API access
- Ensure Node.js 18+ is installed
- Verify `.env` file configuration

### Contributing
This project focuses on demonstrating conversational onboarding patterns for the Topik platform. Contributions that enhance the core onboarding experience are welcome.

---

**Ready to transform your onboarding experience?** Start with Topik VoiceAgent and see how conversational AI can make platform adoption engaging, personalized, and effective! 🎉