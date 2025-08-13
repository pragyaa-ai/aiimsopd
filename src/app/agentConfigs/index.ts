import { simpleHandoffScenario } from './simpleHandoff';
// import { customerServiceRetailScenario } from './customerServiceRetail';
import { chatSupervisorScenario } from './chatSupervisor';
import { aiimsOpdScenario } from './aiimsOpd';

import type { RealtimeAgent } from '@openai/agents/realtime';

// Map of scenario key -> array of RealtimeAgent objects
export const allAgentSets: Record<string, RealtimeAgent[]> = {
  'AIIMS OPD': aiimsOpdScenario,
  // simpleHandoff: simpleHandoffScenario,
  // Topik: customerServiceRetailScenario,
  // chatSupervisor: chatSupervisorScenario,
};

export const defaultAgentSetKey = 'AIIMS OPD';
