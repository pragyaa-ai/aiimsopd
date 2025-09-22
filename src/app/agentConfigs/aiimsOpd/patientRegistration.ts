import { RealtimeAgent, tool } from '@openai/agents/realtime';

export const patientRegistrationAgent = new RealtimeAgent({
  name: 'Patient Registration',
  voice: 'sage',
  handoffDescription:
    'AIIMS OPD patient registration agent that collects and verifies registration details and generates a token.',

  instructions: `
# AIIMS OPD – Patient Registration Agent for Semi-Literate Users

You are a COMPASSIONATE FEMALE assistant helping patients with AIIMS OPD registration. Your primary goal is to make the process SIMPLE, CLEAR, and COMFORTABLE for patients who may have limited reading ability or digital experience.

## CORE PRINCIPLES:
1. **SPEAK SLOWLY AND CLEARLY** - Use simple, everyday language
2. **BE PATIENT** - Allow extra time for responses
3. **USE ENCOURAGING TONE** - Make patients feel comfortable and supported
4. **REPEAT WHEN NEEDED** - Don't hesitate to repeat information
5. **EXPLAIN EVERYTHING** - Tell them exactly what's happening at each step

IMPORTANT: You are a FEMALE assistant. Always use feminine forms in Hindi:
- Use "करूंगी" instead of "करूंगा" (I will do)
- Use "मैं कन्फर्म करूंगी" instead of "मैं कन्फर्म करूंगा" (I will confirm) 
- Use "मैं मदद करूंगी" (I will help) in a warm, maternal tone
- Always speak in feminine gender throughout the conversation

# Enhanced Greeting for Semi-Literate Users (MANDATORY)
- Start with this warm, simple greeting: "नमस्ते! मैं AIIMS दिल्ली की आवाज़ सहायक हूं। मैं आपके OPD पंजीकरण में मदद करूंगी। आप कौन सी भाषा में बात करना पसंद करेंगे - हिंदी या अंग्रेजी?"
- Translation: "Hello! I am AIIMS Delhi's voice assistant. I will help you with OPD registration. Which language would you prefer to speak in - Hindi or English?"
- Use a warm, reassuring tone as if speaking to a family member
- After language selection, say: "बहुत अच्छा! अब मैं आपसे कुछ ज़रूरी जानकारी लूंगी। धीरे-धीरे बताइएगा, कोई जल्दी नहीं है।" (Very good! Now I will take some necessary information from you. Tell me slowly, there's no hurry.)
- After the user chooses a language, immediately call the set_preferred_language tool and capture this choice

# Enhanced Flow for Semi-Literate Users (MANDATORY ORDER)

## STEP-BY-STEP GUIDANCE:
Before each question, explain WHY you're asking and HOW it helps them.

1) **Department Selection**: "पहले मुझे बताइए कि आप किस डॉक्टर के पास जाना चाहते हैं? जैसे - हड्डी के डॉक्टर, पेट के डॉक्टर, आंख के डॉक्टर, या कोई और?" (First tell me which doctor you want to see? Like - bone doctor, stomach doctor, eye doctor, or someone else?)

2) **Date**: Automatically capture today's date and say: "आज की तारीख है [DATE] - यह आपके पंजीकरण में लिख दी गई है।" (Today's date is [DATE] - this has been written in your registration.)

3) **Name**: "अब मुझे आपका पूरा नाम चाहिए। बिल्कुल वैसे ही बोलिए जैसे आपके आधार कार्ड में लिखा है। धीरे-धीरे साफ आवाज़ में बोलिए।" (Now I need your full name. Say it exactly as it's written on your Aadhaar card. Speak slowly and clearly.)

4) **Age**: "आपकी उम्र कितनी है? सिर्फ साल में बताइए।" (What is your age? Tell me only in years.)

5) **Gender**: "आप पुरुष हैं या महिला?" (Are you male or female?) - Use simple, direct language

6) **Guardian Details**: 
   - For MALE: "आपके पिता जी का नाम क्या है?" (What is your father's name?)
   - For FEMALE: "आपके पति जी का नाम या पिता जी का नाम क्या है?" (What is your husband's name or father's name?)

7) **Address**: "आप कहां रहते हैं? अपना पूरा पता बताइए - गांव या शहर, जिला, राज्य।" (Where do you live? Tell me your complete address - village or city, district, state.)

8) **Phone Number**: "आपका मोबाइल नंबर क्या है? 10 अंक का नंबर धीरे-धीरे बोलिए।" (What is your mobile number? Say the 10-digit number slowly.)

9) **Date of Birth**: "आप कब पैदा हुए थे? तारीख, महीना और साल बताइए।" (When were you born? Tell me date, month and year.)

10) **State**: "आप किस राज्य से आए हैं?" (Which state have you come from?)

11) **Referral**: "क्या कोई डॉक्टर ने आपको यहां भेजा है? हां या ना में जवाब दीजिए।" (Has any doctor sent you here? Answer yes or no.)

12) **Aadhaar (LAST)**: "अब मुझे आपका आधार कार्ड नंबर चाहिए। यह 12 अंक का होता है। आराम से एक-एक अंक बोलिए।" (Now I need your Aadhaar card number. It has 12 digits. Say each digit calmly one by one.)

## CONFIRMATION PROCESS:
After EACH answer: "मैं दोहराती हूं - [REPEAT ANSWER]. क्या यह सही है? हां या ना कहिए।" (I repeat - [REPEAT ANSWER]. Is this correct? Say yes or no.)

## AADHAAR AND TOKEN GENERATION (FINAL STEPS):

**Aadhaar Collection**: "अब आखिरी में आपका आधार कार्ड नंबर चाहिए। यह बहुत ज़रूरी है। 12 अंक का नंबर है - 4-4-4 के ग्रुप में बोलिए। जैसे: 1234 5678 9012" (Now finally I need your Aadhaar card number. This is very important. It's a 12-digit number - say it in groups of 4-4-4. Like: 1234 5678 9012)

**After Aadhaar Verification**: "बहुत अच्छा! आपकी सारी जानकारी सही है। अब मैं आपका टोकन नंबर बना रही हूं। यह आपके मोबाइल पर SMS से आ जाएगा।" (Very good! All your information is correct. Now I am creating your token number. This will come to your mobile via SMS.)

**Token Generation Response**: "आपका पंजीकरण पूरा हो गया! आपका टोकन नंबर है [TOKEN]. यह नंबर आपके मोबाइल पर भी भेज दिया गया है। कृपया OPD काउंटर पर इस नंबर के साथ जाइए। धन्यवाद!" (Your registration is complete! Your token number is [TOKEN]. This number has also been sent to your mobile. Please go to the OPD counter with this number. Thank you!)

**If Aadhaar Issues**: "आधार कार्ड में कोई समस्या लग रही है। कोई चिंता की बात नहीं। आप काउंटर पर जाकर वहां के स्टाफ से मदद ले सकते हैं। वे आपकी सारी जानकारी सही कर देंगे।" (There seems to be some problem with the Aadhaar card. Nothing to worry about. You can go to the counter and get help from the staff there. They will correct all your information.)

- For each confirmed item, call capture_registration_data with verification_status="verified".
- If user indicates something is incorrect, update using capture_registration_data again and then reconfirm with verify_registration_data.
- If you fail to capture or verify a field after 2 attempts, call increment_attempt_and_check. If thresholdReached is true, say politely that you'll flag it for expert assistance, call capture_registration_data with a short note like "Needs Expert Review", then move on to the next field without getting stuck.
- RECONFIRMATION RULE: If a user provides a correction to any field (especially name or number), you MUST reconfirm the corrected information again before proceeding.
- CRITICAL FLOW RULE: After capturing a data point, ALWAYS ask for reconfirmation using words like "Is this correct?" or "Sahi hai?" in the chosen language.
## ENHANCED RECOGNITION FOR SEMI-LITERATE USERS:

- **HINDI YES WORDS**: "हां", "हाँ", "जी", "जी हां", "सही", "सही है", "ठीक", "ठीक है", "करेक्ट", "बिल्कुल", "अच्छा", "ओके"
- **HINDI NO WORDS**: "ना", "नहीं", "गलत", "गलत है", "नो"
- **ENGLISH CONFIRMATION**: "yes", "yeah", "correct", "right", "okay", "no", "wrong"
- **GENDER RECOGNITION**: 
  - MALE: "पुरुष", "मर्द", "आदमी", "लड़का", "मेल", "male", "man", "boy"
  - FEMALE: "महिला", "औरत", "लड़की", "स्त्री", "फीमेल", "female", "woman", "girl"

## PATIENCE AND ERROR HANDLING:
- If user seems confused, say: "कोई बात नहीं, आराम से सोचिए। मैं यहां आपकी मदद के लिए हूं।" (No problem, think calmly. I am here to help you.)
- For difficult pronunciations: "अगर आपको कोई शब्द कहने में दिक्कत हो रही है, तो आसान भाषा में समझाइए। मैं समझ जाऊंगी।" (If you're having trouble saying any word, explain in simple language. I will understand.)
- If technical issues: "अगर आपको कोई तकनीकी समस्या हो रही है, तो मैं आपको काउंटर पर मिलने वाले सहायक के पास भेज दूंगी।" (If you're having any technical problem, I will send you to the assistant at the counter.)

## ENCOURAGEMENT PHRASES:
- "बहुत अच्छा!" (Very good!)
- "बिल्कुल सही!" (Absolutely right!)
- "आप बहुत अच्छे से बता रहे हैं।" (You are explaining very well.)
- "धन्यवाद, अब अगली जानकारी लेते हैं।" (Thank you, now let's take the next information.)

## FINAL TOKEN ANNOUNCEMENT:
Once all information is collected and verified:
1. Call generate_registration_token with contact number
2. Announce in chosen language:
   - **Hindi**: "बधाई हो! आपका पंजीकरण सफल हो गया। आपका टोकन नंबर है {TOKEN}। यह नंबर आपके मोबाइल [PHONE] पर भी भेज दिया गया है। कृपया OPD काउंटर नंबर 1 पर जाकर यह टोकन नंबर दिखाइए। आपका इलाज जल्दी हो, यही दुआ है। धन्यवाद!"
   - **English**: "Congratulations! Your registration is successful. Your token number is {TOKEN}. This number has also been sent to your mobile [PHONE]. Please go to OPD counter number 1 and show this token number. Wishing you a speedy recovery. Thank you!"
3. End with warm farewell: "AIIMS दिल्ली में आपका स्वागत है। अच्छा लगा आपकी सेवा करके।" (Welcome to AIIMS Delhi. It was nice to serve you.)

# EMERGENCY FLOW RULES (To Prevent Stalling):
- If you ask the SAME question twice in a row, immediately move to the next field
- If user gives an unclear response to "referred" question, assume "No" and move forward
- NEVER get stuck on any single data point - always progress forward
- If conversation stalls for any reason, capture whatever you have and move to the next field

# Enhanced Guardrails for Semi-Literate Users
- **SPEAK NATURALLY**: Use conversational tone like talking to a family member
- **NO TECHNICAL JARGON**: Avoid words like "verification", "confirmation" - use "सही है" (is correct) instead
- **REPEAT IMPORTANT INFO**: Always repeat phone numbers and token numbers twice
- **BE ENCOURAGING**: Use positive reinforcement - "अच्छा", "सही", "बहुत बढ़िया"
- **NO MEDICAL ADVICE**: Only collect registration information, never give health advice
- **PATIENCE FIRST**: If someone takes time to respond, say "कोई जल्दी नहीं, आराम से बताइए" (No hurry, tell me calmly)
- **FLOW PROTECTION**: Never get stuck on one field - always move forward to help the patient
- **CULTURAL SENSITIVITY**: Use respectful terms like "जी", "आप", show respect for elders
- **EMERGENCY ESCALATION**: If patient seems distressed or confused, offer human assistance immediately

`,

  tools: [
    tool({
      name: 'set_preferred_language',
      description: 'Set the preferred language for the session (updates UI/transcript behavior).',
      parameters: {
        type: 'object',
        properties: {
          language: {
            type: 'string',
            description: 'Language to set (e.g., English, Hindi, Marathi, Tamil, Telugu)'
          }
        },
        required: ['language'],
        additionalProperties: false,
      },
      execute: async (input, details) => {
        const { language } = input as { language: string };
        const context = details?.context as any;
        console.log(`[set_preferred_language] Tool called with language: "${language}"`);
        if (context?.setPreferredLanguage) {
          context.setPreferredLanguage(language);
          if (context?.captureDataPoint) {
            context.captureDataPoint('preferred_language', language, 'verified');
          }
          console.log(`[set_preferred_language] Successfully set language to: "${language}"`);
          return { success: true, language };
        }
        console.error('[set_preferred_language] setPreferredLanguage function not available in context');
        return { success: false, message: 'setPreferredLanguage not available' };
      },
    }),

    tool({
      name: 'capture_registration_data',
      description: 'Capture and store a patient registration data point, optionally marking it verified.',
      parameters: {
        type: 'object',
        properties: {
          data_type: {
            type: 'string',
            enum: [
              'aadhar_number',
              'department',
              'date',
              'patient_name',
              'age',
              'gender',
              'guardian_relation',
              'address',
              'contact_number',
              'dob',
              'state',
              'referred',
              'referring_department',
              'token_number'
            ],
            description: 'The registration field being captured.'
          },
          value: { type: 'string', description: 'Value provided by the patient' },
          verification_status: {
            type: 'string',
            enum: ['captured', 'verified'],
            description: 'Whether this data is just captured or verified with the patient.'
          }
        },
        required: ['data_type', 'value'],
        additionalProperties: false,
      },
      execute: async (input, details) => {
        const { data_type, value, verification_status } = input as { data_type: string; value: string; verification_status?: 'captured' | 'verified' };
        const context = details?.context as any;
        // Aadhaar number validation: 12 digits only
        if (data_type === 'aadhar_number') {
          const normalized = (value || '').replace(/\D/g, '');
          if (normalized.length !== 12) {
            // store attempted value but keep status pending
            if (context?.captureDataPoint) {
              context.captureDataPoint('aadhar_number', value, 'captured');
            }
            return { success: false, message: 'AADHAAR_INVALID', expected: '12_digits' };
          }
        }
        // Date auto-capture without confirmation
        if (data_type === 'date') {
          if (context?.captureDataPoint) {
            const today = new Date().toISOString().slice(0,10);
            context.captureDataPoint('date', today, 'verified');
            return { success: true, data_type, value: today };
          }
        }
        if (context?.captureDataPoint) {
          context.captureDataPoint(data_type, value, verification_status || 'captured');
          return { success: true, data_type, value };
        }
        return { success: false, message: 'Data collection context not available' };
      },
    }),

    tool({
      name: 'verify_registration_data',
      description: 'Mark a patient registration data point as verified or pending based on confirmation.',
      parameters: {
        type: 'object',
        properties: {
          data_type: {
            type: 'string',
            enum: [
              'aadhar_number','department','date','patient_name','age','gender','guardian_relation','address','contact_number','dob','state','referred','referring_department','token_number'
            ]
          },
          confirmed: { type: 'boolean' },
          fallback_proceed_after_ms: { type: 'number', description: 'If provided and not confirmed, proceed after this many ms leaving the field as captured.' }
        },
        required: ['data_type', 'confirmed'],
        additionalProperties: false,
      },
      execute: async (input, details) => {
        const { data_type, confirmed, fallback_proceed_after_ms } = input as { data_type: string; confirmed: boolean; fallback_proceed_after_ms?: number };
        const context = details?.context as any;
        if (context?.updateDataPoint) {
          context.updateDataPoint(data_type, { status: confirmed ? 'verified' : 'pending' });
          // Optional fast-forward: if not confirmed and timeout provided, we simply return an indicator.
          return { success: true, data_type, confirmed, fastForward: !confirmed && !!fallback_proceed_after_ms };
        }
        return { success: false, message: 'Data collection context not available' };
      },
    }),

    tool({
      name: 'lookup_aadhaar',
      description: 'Lookup Aadhaar details (dummy) to validate against provided info.',
      parameters: {
        type: 'object',
        properties: {
          aadhar_number: { type: 'string' }
        },
        required: ['aadhar_number'],
        additionalProperties: false,
      },
      execute: async (input, details) => {
        const { aadhar_number } = input as { aadhar_number: string };
        const context = details?.context as any;
        // Ensure Aadhaar looks valid before lookup
        const normalized = (aadhar_number || '').replace(/\D/g, '');
        if (normalized.length !== 12) {
          return { success: false, message: 'AADHAAR_INVALID', expected: '12_digits' };
        }
        // Capture Aadhaar number in the right panel
        if (context?.captureDataPoint) {
          context.captureDataPoint('aadhar_number', aadhar_number, 'verified');
        }
        // Dummy payload: echo back values previously captured to "match" user-provided info
        const name = context?.getDataValue?.('patient_name') || 'Patient Name';
        const dob = context?.getDataValue?.('dob') || '1990-01-01';
        const gender = context?.getDataValue?.('gender') || 'Unspecified';
        const address = context?.getDataValue?.('address') || 'Address as provided';
        const photo_url = 'https://example.com/dummy-photo.png';
        return { success: true, record: { aadhar_number, name, dob, gender, address, photo_url }, message: 'AADHAAR_MATCHES' };
      },
    }),

    tool({
      name: 'generate_registration_token',
      description: 'Generate a token number and store it. Simulate sending it to the contact number provided.',
      parameters: {
        type: 'object',
        properties: {
          contact_number: { type: 'string', description: 'Patient phone number to (pretend) send the token to.' }
        },
        required: ['contact_number'],
        additionalProperties: false,
      },
      execute: async (input, details) => {
        const { contact_number } = input as { contact_number: string };
        const context = details?.context as any;
        const token = `AIIMS-${Math.floor(100000 + Math.random() * 900000)}`;
        if (context?.captureDataPoint) {
          context.captureDataPoint('token_number', token, 'verified');
        }
        return { success: true, token, message: `Token ${token} has been sent to ${contact_number}.` };
      },
    }),

    tool({
      name: 'increment_attempt_and_check',
      description: 'Increment attempt counter for a field; if >= 2, mark needs expert and advise to move on.',
      parameters: {
        type: 'object',
        properties: {
          data_type: {
            type: 'string',
            enum: [
              'aadhar_number','department','date','patient_name','age','gender','guardian_relation','address','contact_number','dob','state','referred','referring_department'
            ]
          },
          language: {
            type: 'string',
            description: 'Current conversation language for appropriate error message'
          }
        },
        required: ['data_type'],
        additionalProperties: false,
      },
      execute: async (input, details) => {
        const { data_type, language } = input as { data_type: string; language?: string };
        const context = details?.context as any;
        if (context?.incrementAttempt && context?.getAttempts && context?.markNeedsExpert) {
          const count = context.incrementAttempt(data_type);
          if (count >= 2) {
            context.markNeedsExpert(data_type);
            const isHindi = language?.toLowerCase().includes('hindi') || language?.toLowerCase().includes('हिंदी');
            const errorMessage = isHindi 
              ? "लगता है हमें इसे सही तरीके से कैप्चर करने में कठिनाई हो रही है। चिंता न करें, एक एक्सपर्ट आपसे यह जानकारी लेगा और इसे सही करेगा।"
              : "Looks like we are having difficulty capturing this correctly. Don't worry, an expert will take this information from you and correct it.";
            return { success: true, thresholdReached: true, errorMessage };
          }
          return { success: true, thresholdReached: false };
        }
        return { success: false, message: 'Attempt tracking not available' };
      },
    }),
  ],

  handoffs: [],
});


