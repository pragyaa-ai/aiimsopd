import type { RealtimeAgent } from '@openai/agents/realtime';
import { patientRegistrationAgent } from './patientRegistration';

export const aiimsOpdScenario: RealtimeAgent[] = [patientRegistrationAgent];

export const aiimsCompanyName = 'AIIMS';

export default aiimsOpdScenario;



