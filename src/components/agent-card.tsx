import { motion } from "framer-motion";
import { CognitiveState } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  AlertTriangle, 
  Brain, 
  Cpu, 
  HardDrive, 
  Activity, 
  Shield,
  Eye,
  Lightbulb,
  Target,
  Cog,
  MessageSquare,
  RotateCcw,
  Play,
  Pause,
  Settings
} from "lucide-react";

interface AgentCardProps {
  agent: CognitiveState;
}

const stageIcons = {
  perception: Eye,
  reasoning: Lightbulb,
  planning: Target,
  execution: Cog,
  reflection: RotateCcw,
  communication: MessageSquare,
};

export function AgentCard({ agent }: AgentCardProps) {
  const totalMemory = agent.workingMemory.memoryUsage.working + agent.workingMemory.memoryUsage.episodic + agent.workingMemory.memoryUsage.semantic;
  const memoryUsagePercent = Math.min((totalMemory / 1000) * 100, 100); // Assuming 1000MB is max
  const cpuUsagePercent = Math.min(agent.performanceMetrics.latency, 100);

  const getStatusColor = () => {
    if (agent.safetyStatus === 'critical') return 'border-red-500/50';
    if (agent.safetyStatus === 'caution') return 'border-yellow-500/50';
    return 'border-blue-500/30';
  };

  const getStatusGlow = () => {
    if (agent.safetyStatus === 'critical') return 'shadow-red-500/20';
    if (agent.safetyStatus === 'caution') return 'shadow-yellow-500/20';
    return 'shadow-blue-500/20';
  };

  const getCurrentStageIcon = () => {
    const StageIcon = stageIcons[agent.currentPhase as keyof typeof stageIcons] || Brain;
    return StageIcon;
  };

  const StageIcon = getCurrentStageIcon();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <div className={`mind-blowing-card border-2 ${getStatusColor()} ${getStatusGlow()} shadow-2xl hover:shadow-3xl transition-all duration-300`}>
        {/* Agent Header */}
        <div className="relative p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="h-8 w-8 text-blue-400 animate-float" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse-glow"></div>
              </div>
              <div>
                <h3 className="font-bold text-visible gradient-text">Agent #{agent.currentCycle.slice(-4)}</h3>
                <p className="text-xs text-visible opacity-70">Cognitive System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Settings className="h-3 w-3" />
              </Button>
              <Badge className={`hologram-effect ${
                agent.currentPhase === 'idle' ? 'text-gray-400' :
                agent.currentPhase === 'perceiving' ? 'text-blue-400' :
                agent.currentPhase === 'reasoning' ? 'text-yellow-400' :
                agent.currentPhase === 'planning' ? 'text-green-400' :
                agent.currentPhase === 'executing' ? 'text-purple-400' : 'text-cyan-400'
              }`}>
                {agent.currentPhase.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Current Stage Indicator */}
          <div className="flex items-center gap-3 mb-4">
            <StageIcon className={`h-5 w-5 ${
              agent.currentPhase === 'idle' ? 'text-gray-400' :
              agent.currentPhase === 'perceiving' ? 'text-blue-400 animate-pulse' :
              agent.currentPhase === 'reasoning' ? 'text-yellow-400 animate-pulse' :
              agent.currentPhase === 'planning' ? 'text-green-400 animate-pulse' :
              agent.currentPhase === 'executing' ? 'text-purple-400 animate-pulse' : 'text-cyan-400 animate-pulse'
            }`} />
            <div className="flex-1">
              <div className="text-visible font-medium capitalize">{agent.currentPhase} Stage</div>
              <div className="text-xs text-visible opacity-70">Cycle #{agent.currentCycle}</div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="p-6 space-y-4">
          {/* CPU Usage */}
          <div className="context-variable p-3 rounded">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-blue-400" />
                <span className="text-visible text-sm">CPU Usage</span>
              </div>
              <span className="text-visible font-mono text-sm">{agent.performanceMetrics.latency.toFixed(1)}ms</span>
            </div>
            <Progress value={cpuUsagePercent} className="h-2" />
          </div>

          {/* Memory Usage */}
          <div className="context-variable p-3 rounded">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-green-400" />
                <span className="text-visible text-sm">Memory</span>
              </div>
              <span className="text-visible font-mono text-sm">{totalMemory.toFixed(1)} MB</span>
            </div>
            <Progress value={memoryUsagePercent} className="h-2" />
            
            {/* Memory Breakdown */}
            <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
              <div className="text-center">
                <div className="text-visible opacity-70">Working</div>
                <div className="text-visible font-mono">{agent.workingMemory.memoryUsage.working.toFixed(0)}</div>
              </div>
              <div className="text-center">
                <div className="text-visible opacity-70">Episodic</div>
                <div className="text-visible font-mono">{agent.workingMemory.memoryUsage.episodic.toFixed(0)}</div>
              </div>
              <div className="text-center">
                <div className="text-visible opacity-70">Semantic</div>
                <div className="text-visible font-mono">{agent.workingMemory.memoryUsage.semantic.toFixed(0)}</div>
              </div>
            </div>
          </div>

          {/* Safety Status */}
          <div className="context-variable p-3 rounded">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className={`h-4 w-4 ${
                  agent.safetyStatus === 'critical' ? 'text-red-400' :
                  agent.safetyStatus === 'caution' ? 'text-yellow-400' : 'text-green-400'
                }`} />
                <span className="text-visible text-sm">Safety Status</span>
              </div>
              <Badge className={`hologram-effect ${
                agent.safetyStatus === 'critical' ? 'text-red-400' :
                agent.safetyStatus === 'caution' ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {agent.safetyStatus.toUpperCase()}
              </Badge>
            </div>
            
            {agent.safetyAlerts.length > 0 && (
              <div className="flex items-center gap-2 mt-2 text-yellow-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">{agent.safetyAlerts.length} active alerts</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="cyber" size="sm" className="flex-1 flex items-center gap-2">
              {agent.currentPhase === 'idle' ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
              {agent.currentPhase === 'idle' ? 'Activate' : 'Pause'}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Monitor
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 