"use client";

import { useState, useEffect } from "react";
import { AgentFleetOverview } from "../../components/agent-fleet-overview";
import { CognitiveState } from "../../lib/types";
import { generateMockCognitiveState } from "../../lib/mock-data";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Bot, Users, Activity, Shield, Zap, Settings } from "lucide-react";

export default function OrchestraPage() {
  const [agentFleet, setAgentFleet] = useState<CognitiveState[]>([]);
  const [orchestraStats, setOrchestraStats] = useState({
    totalAgents: 0,
    activeAgents: 0,
    totalTasks: 0,
    avgPerformance: 0,
    safetyStatus: 'optimal' as 'optimal' | 'caution' | 'critical'
  });

  useEffect(() => {
    // Generate a fleet of mock agents
    const fleet = Array.from({ length: 8 }, () => generateMockCognitiveState());
    setAgentFleet(fleet);
    
    // Calculate orchestra statistics
    const activeCount = fleet.filter(agent => agent.currentPhase !== 'idle').length;
    const avgLatency = fleet.reduce((sum, agent) => sum + agent.performanceMetrics.latency, 0) / fleet.length;
    const totalAlerts = fleet.reduce((sum, agent) => sum + agent.safetyAlerts.length, 0);
    
    setOrchestraStats({
      totalAgents: fleet.length,
      activeAgents: activeCount,
      totalTasks: Math.floor(Math.random() * 50) + 20,
      avgPerformance: Math.round((200 - avgLatency) / 2), // Convert latency to performance score
      safetyStatus: totalAlerts > 10 ? 'critical' : totalAlerts > 5 ? 'caution' : 'optimal'
    });
  }, []);

  if (!agentFleet.length) {
    return (
      <div className="min-h-screen neural-network-bg flex items-center justify-center">
        <div className="mind-blowing-card p-8 text-center">
          <Bot className="h-16 w-16 mx-auto mb-4 text-blue-400 animate-pulse" />
          <div className="text-xl font-semibold text-visible mb-2">Initializing Agent Fleet...</div>
          <div className="text-visible opacity-70">Orchestrating autonomous intelligence</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen neural-network-bg">
      {/* Header Section */}
      <div className="mind-blowing-card mx-4 mt-4 mb-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Multi-Agent Orchestra</h1>
            <p className="text-visible opacity-70 text-lg">
              Conducting a symphony of autonomous intelligence across distributed cognitive systems
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Bot className="h-12 w-12 text-blue-400 animate-float" />
            <div className="flex flex-col gap-2">
              <Button variant="cyber" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configure
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Monitor
              </Button>
            </div>
          </div>
        </div>

        {/* Orchestra Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="memory-card p-4 rounded-lg text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-visible">{orchestraStats.totalAgents}</div>
            <div className="text-xs text-visible opacity-70">Total Agents</div>
          </div>
          
          <div className="memory-card p-4 rounded-lg text-center">
            <Activity className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-visible">{orchestraStats.activeAgents}</div>
            <div className="text-xs text-visible opacity-70">Active Now</div>
          </div>
          
          <div className="memory-card p-4 rounded-lg text-center">
            <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-visible">{orchestraStats.totalTasks}</div>
            <div className="text-xs text-visible opacity-70">Tasks Queued</div>
          </div>
          
          <div className="memory-card p-4 rounded-lg text-center">
            <Bot className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-visible">{orchestraStats.avgPerformance}%</div>
            <div className="text-xs text-visible opacity-70">Avg Performance</div>
          </div>
          
          <div className="memory-card p-4 rounded-lg text-center">
            <Shield className={`h-6 w-6 mx-auto mb-2 ${
              orchestraStats.safetyStatus === 'optimal' ? 'text-green-400' :
              orchestraStats.safetyStatus === 'caution' ? 'text-yellow-400' : 'text-red-400'
            }`} />
            <Badge className={`hologram-effect ${
              orchestraStats.safetyStatus === 'optimal' ? 'text-green-400' :
              orchestraStats.safetyStatus === 'caution' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {orchestraStats.safetyStatus.toUpperCase()}
            </Badge>
            <div className="text-xs text-visible opacity-70 mt-1">Safety Status</div>
          </div>
        </div>
      </div>

      {/* Agent Fleet */}
      <div className="px-4 pb-8">
        <AgentFleetOverview agents={agentFleet} />
      </div>
    </div>
  );
} 