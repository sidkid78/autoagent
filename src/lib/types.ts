export interface CognitiveRole {
  name: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  progress: number;
  startTime?: number;
  endTime?: number;
  processingTime?: number;
  output?: string;
  error?: string;
}

export interface CognitiveState {
  currentCycle: string;
  currentRole: string | null;
  roles: {
    perception: CognitiveRole;
    reasoning: CognitiveRole;
    planning: CognitiveRole;
    execution: CognitiveRole;
    reflection: CognitiveRole;
    communication: CognitiveRole;
  };
  workingMemory: WorkingMemory;
  tools: ToolStatus[];
  safetyAlerts: SafetyAlert[];
  metadata: {
    cycleStartTime: number;
    totalCycles: number;
    averageProcessingTime: number;
  };
  safetyStatus: SafetyStatus;
  currentPhase: CognitiveStep;
  performanceMetrics: {
    latency: number;
    accuracy: number;
    memoryEfficiency: number;
    toolUtilization: number;
  };
}

export interface WorkingMemory {
  currentTask: string;
  memoryUsage: MemoryUsage;
  episodicMemoryCount: number;
  semanticMemoryCount: number;
  recentInsights: string[];
  contextData: Record<string, unknown>;
  memoryEvents: MemoryEvent[];
}

export interface ToolStatus {
  name: string;
  status: 'available' | 'busy' | 'error' | 'offline';
  role: string;
  lastUsed?: number;
  successRate: number;
  averageExecutionTime: number;
  currentOperation?: string;
}

export interface SafetyAlert {
  id: string;
  level: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: number;
  resolved: boolean;
  source: string;
}

export interface AgentMetrics {
  uptime: number;
  tasksCompleted: number;
  successRate: number;
  averageCycleTime: number;
  memoryEfficiency: number;
  toolUtilization: number;
}

export type MemoryEvent = {
  id: string;
  type: 'read' | 'write';
  store: 'working' | 'episodic' | 'semantic' | 'short_term';
  timestamp: number;
  content: string;
}

export type MemoryUsage = {
  working: number; // in MB
  episodic: number; // in MB
  semantic: number; // in MB
}

export type SafetyStatus = 'nominal' | 'caution' | 'critical';

export type CognitiveStep = 
  | 'perceiving' 
  | 'reasoning' 
  | 'planning' 
  | 'executing' 
  | 'reflecting' 
  | 'communicating' 
  | 'idle'; 