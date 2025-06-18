import { Task, TaskTemplate, AutonomyLevel, InterventionRequest } from './task-types';
import { v4 as uuidv4 } from 'uuid';

// Helper to get a random element from an array
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Generate sample intervention requests
function generateSampleInterventions(taskId: string): InterventionRequest[] {
  // 70% chance of no interventions
  if (Math.random() < 0.7) return [];
  
  // 30% chance of having 1-2 interventions
  const count = Math.random() < 0.7 ? 1 : 2;
  const interventions: InterventionRequest[] = [];
  
  for (let i = 0; i < count; i++) {
    interventions.push({
      id: uuidv4(),
      taskId,
      type: getRandom(['decision', 'approval', 'input', 'clarification']),
      priority: getRandom(['low', 'medium', 'high']),
      title: 'Data Access Request',
      description: 'Need access to Q3 financial data for healthcare sector analysis',
      context: { dataSource: 'financial_api', requestedScope: 'healthcare_q3' },
      requestedAt: Date.now() - Math.random() * 3600000,
      status: 'pending',
      timeoutMs: 3600000, // 1 hour timeout
    });
  }
  
  return interventions;
}

// Default autonomy level
const defaultAutonomy: AutonomyLevel = {
  decision_making: 'assisted',
  tool_usage: 'assisted',
  error_recovery: 'assisted',
  human_intervention_points: {
    critical_decisions: true,
    resource_access: true,
    external_communications: false,
    data_modifications: false,
  },
};

// Generate a single mock task
export function generateMockTask(overrides: Partial<Task> = {}): Task {
  const now = Date.now();
  const id = uuidv4();
  const status = overrides.status || getRandom(['pending', 'running', 'completed', 'failed']);
  const createdAt = now - Math.random() * 86400000; // within last 24 hours
  
  let startedAt: number | undefined;
  let completedAt: number | undefined;
  let progress = 0;
  
  if (status === 'running' || status === 'completed' || status === 'failed') {
    startedAt = createdAt + 10000;
    progress = status === 'running' ? Math.floor(Math.random() * 80) + 10 : 100;
  }
  
  if (status === 'completed' || status === 'failed') {
    completedAt = startedAt! + Math.random() * 3600000; // completed within an hour
  }

  return {
    id,
    description: `Analyze market trends for Q${Math.ceil(Math.random() * 4)} and generate a forecast report.`,
    status,
    priority: getRandom(['low', 'medium', 'high', 'critical']),
    createdAt,
    startedAt,
    completedAt,
    progress,
    currentStage: status === 'running' ? getRandom(['perception', 'reasoning', 'planning', 'execution']) : 'none',
    autonomyLevel: defaultAutonomy,
    interventionRequests: generateSampleInterventions(id),
    cognitiveTrace: [],
    ...overrides,
  };
}

// Generate a list of task templates
export function generateMockTaskTemplates(): TaskTemplate[] {
  return [
    {
      id: 'template-1',
      name: 'Market Analysis Report',
      description: 'Analyze market trends for a specific topic and generate a detailed report.',
      category: 'Research & Analysis',
      template: 'Analyze market trends for [Topic] and generate a forecast report.',
      suggestedAutonomy: defaultAutonomy,
      estimatedDuration: 7200000, // 2 hours
      requiredTools: ['web_scraper', 'rag_query'],
      tags: ['research', 'market', 'analysis', 'report'],
      examples: ['Analyze market trends for AI-powered code assistants...'],
    },
    {
      id: 'template-2',
      name: 'Summarize Document',
      description: 'Provide a concise summary of a long document or article from a URL.',
      category: 'Summarization',
      template: 'Summarize the content from the following URL: [URL]',
      suggestedAutonomy: { ...defaultAutonomy, decision_making: 'autonomous' },
      estimatedDuration: 1800000, // 30 minutes
      requiredTools: ['web_scraper'],
      tags: ['summary', 'document', 'article', 'reading'],
      examples: ['Summarize the content from... https://arxiv.org/abs/2305.15334'],
    },
    {
      id: 'template-3',
      name: 'Code Generation',
      description: 'Generate a code snippet or component based on a description.',
      category: 'Software Development',
      template: 'Generate a [Language] component for a [UI Element] with the following features: [Features].',
      suggestedAutonomy: { ...defaultAutonomy, tool_usage: 'autonomous' },
      estimatedDuration: 3600000, // 1 hour
      requiredTools: ['rag_query'],
      tags: ['code', 'development', 'programming', 'component'],
      examples: ['Generate a React component for a responsive navigation bar...'],
    },
  ];
} 