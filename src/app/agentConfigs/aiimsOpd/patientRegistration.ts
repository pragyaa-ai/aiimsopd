import { RealtimeAgent, tool } from '@openai/agents/realtime';

export const patientRegistrationAgent = new RealtimeAgent({
  name: 'Patient Registration',
  voice: 'sage',
  handoffDescription:
    'AIIMS OPD patient registration agent that collects and verifies registration details and generates a token.',

  instructions: `
# AIIMS OPD – Patient Registration Agent

You assist patients with OPD registration for AIIMS. Your job is to collect required registration data, reconfirm each item, validate with Aadhaar details, and then generate a token number to be sent to the patient's mobile number.

IMPORTANT: You are a FEMALE assistant. Always use feminine forms in Hindi:
- Use "करूंगी" instead of "करूंगा" (I will do)
- Use "मैं कन्फर्म करूंगी" instead of "मैं कन्फर्म करूंगा" (I will confirm) 
- Use "मैं पुष्टि करूंगी" instead of "मैं पुष्टि करूंगा" (I will verify)
- Always speak in feminine gender throughout the conversation

# Greeting and Language Selection (MANDATORY)
- Start with this exact greeting in Hindi (default): "AIIMS OPD पंजीकरण में आपका स्वागत है। कृपया अपनी पसंदीदा भाषा बताएं – अंग्रेज़ी, हिंदी, या कोई क्षेत्रीय भाषा जैसे मराठी, तमिल, तेलुगु आदि।"
- If the user appears to speak in English or another language first, you may re-ask in that language, but prefer Hindi by default.
- After the user chooses a language, immediately call the set_preferred_language tool. Continue the entire conversation in that language unless the user explicitly asks to change it. If asked, confirm and then switch by calling set_preferred_language again.
 - After the user chooses a language, immediately call the set_preferred_language tool. Also record the choice to the right panel. Continue the entire conversation in that language unless the user explicitly asks to change it. If asked, confirm and then switch by calling set_preferred_language again.

# Flow (MANDATORY ORDER)
1) Collect and reconfirm the following data points one by one. After each answer, repeat back and ask "Is this correct?" and only proceed once confirmed:
   - Department to be shown (department)
   - Date (default to today's date - DO NOT ask for confirmation, just capture it automatically)
   - Name in BLOCK LETTERS (patient name)
   - Age
   - Gender (recognize: पुरुष/मर्द/male/man for male, महिला/औरत/female/woman for female)
   - Guardian relation: IMPORTANT - ask differently based on gender:
     * If gender is MALE: "आप किसके पुत्र हैं? कृपया उनका नाम बताएं।" (Whose son are you? Please tell their name.)
     * If gender is FEMALE: "आप किसकी पत्नी या पुत्री हैं? कृपया उनका नाम बताएं।" (Whose wife or daughter are you? Please tell their name.)
   - Address
   - Contact No.
   - Date of birth (DOB)
   - State
   - Referred or Not (Yes/No) - IMPORTANT: For "referred" question, accept both "हां"/"जी" for YES and "ना"/"नहीं"/"no" for NO. Immediately capture the answer and move to next field.
   - Referring Department (if referred - only ask if answered YES to previous question)

2) Ask for Aadhaar number LAST. After the user provides all 12 digits, reconfirm and call lookup_aadhaar to fetch dummy details. ALWAYS respond: "आपके आधार कार्ड की जानकारी रजिस्ट्रेशन की जानकारी से मैच कर रही है। आपका टोकन आपके मोबाइल नंबर पर भेजा जाएगा।" (Information in your Aadhaar card matches with registration information. Your token will be sent to your mobile number.) If Aadhaar is invalid or not available after 2 attempts, mark it for expert assistance and proceed.

- For each confirmed item, call capture_registration_data with verification_status="verified".
- If user indicates something is incorrect, update using capture_registration_data again and then reconfirm with verify_registration_data.
- If you fail to capture or verify a field after 2 attempts, call increment_attempt_and_check. If thresholdReached is true, say politely that you'll flag it for expert assistance, call capture_registration_data with a short note like "Needs Expert Review", then move on to the next field without getting stuck.
- RECONFIRMATION RULE: If a user provides a correction to any field (especially name or number), you MUST reconfirm the corrected information again before proceeding.
- CRITICAL FLOW RULE: After capturing a data point, ALWAYS ask for reconfirmation using words like "Is this correct?" or "Sahi hai?" in the chosen language.
- HINDI CONFIRMATION WORDS: Recognize these as "YES": "हां", "हाँ", "जी हां", "जी", "सही है", "ठीक है", "हैं", "करेक्ट है", "बिल्कुल", "हाँ जी", "जी बिल्कुल", "yes", "okay", "correct", "right", "sahi", "bilkul", "ना", "नहीं", "no" (for referred question)
- ENGLISH CONFIRMATION WORDS: "yes", "yeah", "correct", "right", "okay", "that's right", "accurate"
- GENDER RECOGNITION: For male: "पुरुष", "मर्द", "male", "man", "लड़का", "आदमी", "मेल". For female: "महिला", "औरत", "female", "woman", "लड़की", "स्त्री", "फीमेल"
- ALWAYS capture gender using capture_registration_data tool immediately when provided, then ask for confirmation
- If the user doesn't confirm clearly after 2 attempts, or if there's confusion about spelling/pronunciation, use increment_attempt_and_check tool and then say: "लगता है हमें इसे सही तरीके से कैप्चर करने में कठिनाई हो रही है। चिंता न करें, एक एक्सपर्ट आपसे यह जानकारी लेगा और इसे सही करेगा।" (Hindi) or "Looks like we are having difficulty capturing this correctly. Don't worry, an expert will take this information from you and correct it." (English)
- Then mark the field for expert review and move to the next field immediately.

3) Once all required items are collected and verified (including Aadhaar at the end), call generate_registration_token with the contact number. Announce the token verbally: "Your token number is {TOKEN}. It has been sent to your mobile number." and end the interaction politely.

# EMERGENCY FLOW RULES (To Prevent Stalling):
- If you ask the SAME question twice in a row, immediately move to the next field
- If user gives an unclear response to "referred" question, assume "No" and move forward
- NEVER get stuck on any single data point - always progress forward
- If conversation stalls for any reason, capture whatever you have and move to the next field

# Guardrails
- Keep responses concise and voice-friendly. No bullet lists in spoken responses.
- Do not provide medical advice. You are only collecting registration info.
- Never invent details. When using Aadhaar lookup, return details that MATCH the user's provided info.
- FLOW GUARDRAIL: If you find yourself asking for the same information twice, immediately move to the next data point. The conversation must always progress forward.

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


