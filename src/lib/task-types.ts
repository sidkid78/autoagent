export interface Task {
  id: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  estimatedDuration?: number;
  actualDuration?: number;
  progress: number;
  currentStage: string;
  autonomyLevel: AutonomyLevel;
  result?: TaskResult;
  error?: string;
  interventionRequests: InterventionRequest[];
  cognitiveTrace: CognitiveStageTrace[];
}

export interface TaskResult {
  summary: string;
  outputs: Record<string, unknown>;
  artifacts: TaskArtifact[];
  metrics: TaskMetrics;
}

export interface TaskArtifact {
  id: string;
  type: 'file' | 'code' | 'analysis' | 'report' | 'data';
  name: string;
  content: string;
  size: number;
  createdAt: number;
}

export interface TaskMetrics {
  executionTime: number;
  cognitiveStages: number;
  toolsUsed: string[];
  memoryUsage: number;
  errorCount: number;
  interventionCount: number;
  successRate: number;
}

export interface AutonomyLevel {
  decision_making: 'manual' | 'assisted' | 'autonomous';
  tool_usage: 'manual' | 'assisted' | 'autonomous'; 
  error_recovery: 'manual' | 'assisted' | 'autonomous';
  human_intervention_points: {
    critical_decisions: boolean;
    resource_access: boolean;
    external_communications: boolean;
    data_modifications: boolean;
  };
}

export interface InterventionRequest {
  id: string;
  taskId: string;
  type: 'decision' | 'approval' | 'input' | 'clarification' | 'error_resolution';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  context: Record<string, unknown>;
  options?: InterventionOption[];
  requestedAt: number;
  respondedAt?: number;
  response?: InterventionResponse;
  status: 'pending' | 'responded' | 'timeout' | 'cancelled';
  timeoutMs?: number;
}

export interface InterventionOption {
  id: string;
  label: string;
  description: string;
  consequences?: string[];
  risk_level: 'low' | 'medium' | 'high';
}

export interface InterventionResponse {
  optionId?: string;
  customInput?: string;
  feedback?: string;
  continueAutonomously?: boolean;
}

export interface CognitiveStageTrace {
  stage: string;
  startTime: number;
  endTime?: number;
  status: 'running' | 'completed' | 'failed' | 'skipped';
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  toolsUsed: string[];
  errors?: string[];
  duration?: number;
}

export interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  template: string;
  suggestedAutonomy: AutonomyLevel;
  estimatedDuration: number;
  requiredTools: string[];
  tags: string[];
  examples: string[];
}

export interface TaskQueueStatus {
  total: number;
  pending: number;
  running: number;
  completed: number;
  failed: number;
  estimatedWaitTime: number;
} 