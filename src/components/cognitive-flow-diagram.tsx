"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CognitiveState, CognitiveRole } from "@/lib/types";
import { 
  Brain, 
  Eye, 
  Lightbulb, 
  Target, 
  Cog, 
  RotateCcw, 
  MessageSquare,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";

interface CognitiveFlowDiagramProps {
  cognitiveState: CognitiveState;
}

const roleIcons = {
  perception: Eye,
  reasoning: Lightbulb,
  planning: Target,
  execution: Cog,
  reflection: RotateCcw,
  communication: MessageSquare,
};



const statusIcons = {
  idle: Clock,
  processing: Brain,
  completed: CheckCircle,
  error: AlertCircle,
};

export function CognitiveFlowDiagram({ cognitiveState }: CognitiveFlowDiagramProps) {
  const roles = [
    'perception', 'reasoning', 'planning', 
    'execution', 'reflection', 'communication'
  ] as const;

  const getRoleStatus = (roleName: string): CognitiveRole => {
    return cognitiveState.roles[roleName as keyof typeof cognitiveState.roles];
  };

  const formatProcessingTime = (time?: number) => {
    if (!time) return "—";
    return `${(time / 1000).toFixed(2)}s`;
  };

  return (
    <Card className="h-full mind-blowing-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="h-5 w-5 text-visible" />
          <h3 className="text-lg font-semibold gradient-text">Cognitive Flow</h3>
          <Badge variant="outline" className="ml-auto hologram-effect">
            Cycle {cognitiveState.currentCycle}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {roles.map((roleName, index) => {
            const role = getRoleStatus(roleName);
            const Icon = roleIcons[roleName];
            const StatusIcon = statusIcons[role.status];
            const isActive = cognitiveState.currentRole === roleName;

            return (
              <motion.div
                key={roleName}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-300 memory-card
                    ${isActive ? 'border-blue-400 shadow-lg shadow-blue-400/20' : 'border-gray-600/30'}
                  `}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-visible" />
                      <span className="font-medium capitalize text-visible">{roleName}</span>
                    </div>
                    <StatusIcon className={`h-4 w-4 ${
                      role.status === 'processing' ? 'text-blue-400 animate-pulse' :
                      role.status === 'completed' ? 'text-green-400' :
                      role.status === 'error' ? 'text-red-400' :
                      'text-visible opacity-50'
                    }`} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-visible opacity-70">Progress</span>
                      <span className="text-visible font-medium">{role.progress}%</span>
                    </div>
                    <Progress value={role.progress} className="h-2" />
                    
                    <div className="text-xs text-visible opacity-70">
                      Time: {formatProcessingTime(role.processingTime)}
                    </div>

                    {role.error && (
                      <div className="text-xs text-red-400 context-variable p-2 rounded border border-red-500/30">
                        {role.error}
                      </div>
                    )}

                    {role.status === 'completed' && role.output && (
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {Object.keys(role.output).length} outputs generated
                      </div>
                    )}
                  </div>
                </div>

                {/* Flow Arrow */}
                {index < roles.length - 1 && (
                  <div className="hidden lg:flex absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
                    <motion.div
                      animate={{
                        x: role.status === 'completed' ? [0, 10, 0] : 0,
                      }}
                      transition={{
                        duration: 1,
                        repeat: role.status === 'completed' ? Infinity : 0,
                      }}
                    >
                      <ArrowRight 
                        className={`h-4 w-4 ${
                          role.status === 'completed' 
                            ? 'text-green-400' 
                            : 'text-visible opacity-30'
                        }`} 
                      />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Cycle Summary */}
        <div className="mt-6 p-4 memory-card rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-visible opacity-70">Total Cycles:</span>
              <div className="font-medium text-visible">{cognitiveState.metadata.totalCycles}</div>
            </div>
            <div>
              <span className="text-visible opacity-70">Avg Processing:</span>
              <div className="font-medium text-visible">
                {(cognitiveState.metadata.averageProcessingTime / 1000).toFixed(2)}s
              </div>
            </div>
            <div>
              <span className="text-visible opacity-70">Current Duration:</span>
              <div className="font-medium text-visible">
                {((Date.now() - cognitiveState.metadata.cycleStartTime) / 1000).toFixed(1)}s
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 