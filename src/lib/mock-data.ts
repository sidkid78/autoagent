import { CognitiveState, CognitiveRole, WorkingMemory, ToolStatus, SafetyAlert, MemoryEvent } from './types';
import { v4 as uuidv4 } from 'uuid';

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateMemoryEvents = (count: number): MemoryEvent[] => {
  const events: MemoryEvent[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    events.push({
      id: uuidv4(),
      type: getRandom(['read', 'write']),
      store: getRandom(['working', 'episodic', 'semantic']),
      timestamp: now - randomInt(1000, 60000 * 5), // within last 5 mins
      content: `Accessed memory for key: '${getRandom(['user_preferences', 'market_data', 'api_keys', 'internal_state'])}'`,
    });
  }
  return events.sort((a, b) => b.timestamp - a.timestamp);
};

// Generate mock cognitive state for demonstration
export function generateMockCognitiveState(): CognitiveState {
  const currentTime = Date.now();
  const cycleStartTime = currentTime - Math.random() * 30000; // Started up to 30s ago
  
  // Simulate different stages of cognitive processing
  const roles = ['perception', 'reasoning', 'planning', 'execution', 'reflection', 'communication'] as const;
  const currentRoleIndex = Math.floor(Math.random() * roles.length);
  const currentRole = roles[currentRoleIndex];

  const generateRole = (roleName: string, index: number): CognitiveRole => {
    let status: CognitiveRole['status'];
    let progress = 0;
    let processingTime = undefined;
    let output = undefined;

    if (index < currentRoleIndex) {
      // Completed roles
      status = 'completed';
      progress = 100;
      processingTime = 1000 + Math.random() * 3000;
      output = `Mock output from ${roleName} module`;
    } else if (index === currentRoleIndex) {
      // Current role
      status = 'processing';
      progress = 20 + Math.random() * 60;
      if (roleName === 'perception') {
        output = "Processing document from URL: https://arxiv.org/abs/2305.15334...";
      }
    } else {
      // Future roles
      status = 'idle';
      progress = 0;
    }

    return {
      name: roleName,
      status,
      progress,
      processingTime,
      output
    };
  };

  const cognitiveRoles = {
    perception: generateRole('perception', 0),
    reasoning: generateRole('reasoning', 1),
    planning: generateRole('planning', 2),
    execution: generateRole('execution', 3),
    reflection: generateRole('reflection', 4),
    communication: generateRole('communication', 5),
  };

  const workingMemory: WorkingMemory = {
    currentTask: "Analyze the latest research papers on autonomous agents and summarize key findings",
    contextData: {
      user_preferences: "technical_depth: high, format: summary",
      search_domain: "arxiv.org",
      last_query: "autonomous agents cognitive architecture",
      session_id: "sess_" + Math.random().toString(36).substr(2, 9),
      user_id: "usr_12345",
      active_tools: ["web_scraper", "rag_query"],
      permissions_level: "admin"
    },
    episodicMemoryCount: randomInt(1000, 5000),
    semanticMemoryCount: randomInt(500, 2000),
    recentInsights: Array.from({ length: randomInt(2, 5) }, () => getRandom([
      "Discovered correlation between user engagement and feature X.",
      "Identified new API endpoint for data enrichment.",
      "Learned user preference for dark mode.",
      "Optimized internal data parsing logic."
    ])),
    memoryUsage: {
      working: 45.2, // MB
      episodic: 128.7,
      semantic: 234.1
    },
    memoryEvents: generateMemoryEvents(15),
  };

  const tools: ToolStatus[] = [
    {
      name: "web_scraper",
      status: Math.random() > 0.8 ? 'busy' : 'available',
      role: "perception",
      lastUsed: currentTime - Math.random() * 300000, // Last used within 5 minutes
      successRate: 94.2,
      averageExecutionTime: 2340,
      currentOperation: Math.random() > 0.7 ? "Scraping arxiv.org research papers" : undefined
    },
    {
      name: "supabase_store",
      status: 'available',
      role: "execution", 
      lastUsed: currentTime - Math.random() * 600000, // Last used within 10 minutes
      successRate: 98.7,
      averageExecutionTime: 450
    },
    {
      name: "rag_query",
      status: Math.random() > 0.9 ? 'busy' : 'available',
      role: "reasoning",
      lastUsed: currentTime - Math.random() * 120000, // Last used within 2 minutes
      successRate: 91.5,
      averageExecutionTime: 1800,
      currentOperation: Math.random() > 0.8 ? "Searching knowledge base for relevant patterns" : undefined
    }
  ];

  const safetyAlerts: SafetyAlert[] = [];
  
  // Occasionally add some safety alerts
  if (Math.random() > 0.7) {
    safetyAlerts.push({
      id: "alert_" + Math.random().toString(36).substr(2, 9),
      level: 'info',
      message: "Memory usage approaching 80% threshold - consider episodic cleanup",
      timestamp: currentTime - Math.random() * 60000,
      resolved: false,
      source: "memory_manager"
    });
  }

  if (Math.random() > 0.9) {
    safetyAlerts.push({
      id: "alert_" + Math.random().toString(36).substr(2, 9),
      level: 'warning',
      message: "Web scraper timeout detected - implementing retry strategy",
      timestamp: currentTime - Math.random() * 30000,
      resolved: false,
      source: "tool_monitor"
    });
  }

  // Add some resolved alerts
  for (let i = 0; i < 2; i++) {
    safetyAlerts.push({
      id: "alert_resolved_" + i,
      level: Math.random() > 0.5 ? 'info' : 'warning',
      message: `Previous issue resolved: ${Math.random() > 0.5 ? 'Memory optimization completed' : 'Network connectivity restored'}`,
      timestamp: currentTime - Math.random() * 3600000, // Within last hour
      resolved: true,
      source: "safety_system"
    });
  }

  return {
    currentCycle: `cycle_${Math.floor(Math.random() * 1000)}`,
    currentRole: currentRole,
    roles: cognitiveRoles,
    workingMemory,
    tools,
    safetyAlerts,
    metadata: {
      cycleStartTime,
      totalCycles: 147,
      averageProcessingTime: 12500 // 12.5 seconds average
    },
    safetyStatus: 'nominal',
    currentPhase: 'perceiving',
    performanceMetrics: {
      latency: 120, // ms
      accuracy: 0.98,
      memoryEfficiency: 0.85,
      toolUtilization: 0.75,
    },
  };
}

// You can import this hook in your components if needed
// import { useState, useEffect } from 'react';
// 
// export function useMockRealTimeData(updateInterval = 2000) {
//   const [cognitiveState, setCognitiveState] = useState<CognitiveState>(() => 
//     generateMockCognitiveState()
//   );
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCognitiveState(generateMockCognitiveState());
//     }, updateInterval);
//
//     return () => clearInterval(interval);
//   }, [updateInterval]);
//
//   return cognitiveState;
// } 