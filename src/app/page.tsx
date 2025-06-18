"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CognitiveFlowDiagram } from "../components/cognitive-flow-diagram";
import { WorkingMemoryPanel } from "../components/working-memory-panel";
import { ToolUsageVisualization } from "../components/tool-usage-visualization";
import { SafetyMonitor } from "../components/safety-monitor";
import { generateMockCognitiveState } from "../lib/mock-data";
import { CognitiveState } from "../lib/types";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  Brain, 
  Play, 
  Pause, 
  RotateCcw,
  Activity,
  Cpu,
  Shield,
  Database,
  Loader2,
  Zap,
  Sparkles,
  Eye,
  Target,
  Lightbulb,
  MessageSquare
} from "lucide-react";
import { toast } from "react-hot-toast";

function DashboardSkeleton() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="neural-network-bg" />
      
      {/* Loading particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="flex items-center gap-4 text-foreground z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-12 w-12 text-primary" />
        </motion.div>
        <div className="text-center">
          <motion.h1 
            className="text-3xl font-bold gradient-text"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Initializing Cognitive Systems...
          </motion.h1>
          <motion.p 
            className="text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            🧠 Loading neural networks • ⚡ Activating quantum processors • 🌟 Synchronizing consciousness
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

export default function CognitiveDashboard() {
  const [cognitiveState, setCognitiveState] = useState<CognitiveState | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<number>(0);

  // Generate initial state and subsequent updates on the client side to avoid hydration mismatch
  useEffect(() => {
    const updateState = () => {
      setCognitiveState(generateMockCognitiveState());
      setLastUpdate(Date.now());
    };

    if (!cognitiveState) {
      updateState(); // Initial state generation
    }

    if (!isLive) return;

    const interval = setInterval(updateState, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isLive, cognitiveState]);

  const toggleLiveUpdates = () => {
    setIsLive(!isLive);
    toast.success(isLive ? "🔄 Live updates paused" : "🚀 Live updates resumed", {
      style: {
        background: 'linear-gradient(135deg, #7c77c6, #ff77c6)',
        color: 'white',
      }
    });
  };

  const forceRefresh = () => {
    setCognitiveState(generateMockCognitiveState());
    setLastUpdate(Date.now());
    toast.success("🔄 Cognitive state refreshed!", {
      style: {
        background: 'linear-gradient(135deg, #77ffc6, #7c77c6)',
        color: 'white',
      }
    });
  };

  if (!cognitiveState) {
    return <DashboardSkeleton />;
  }
  
  const formatUptime = () => {
    const uptime = Date.now() - (cognitiveState.metadata.cycleStartTime - 3600000); // Simulate 1 hour uptime
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const roleIcons = {
    "Perception": Eye,
    "Reasoning": Brain,
    "Planning": Target,
    "Execution": Zap,
    "Reflection": Lightbulb,
    "Communication": MessageSquare,
  };

  const currentRoleIcon = roleIcons[cognitiveState.currentRole as keyof typeof roleIcons] || Brain;
  const CurrentRoleIcon = currentRoleIcon;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background with neural network */}
      <div className="neural-network-bg" />
      
      {/* Matrix-style background particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20 text-xs font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          >
            {Math.random() > 0.5 ? '01' : '10'}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Enhanced Header */}
        <motion.div 
          className="mb-8"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.div 
                className="flex items-center gap-4 floating-element"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full opacity-30"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Brain className="h-12 w-12 text-primary glow-on-hover relative z-10" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text">
                    🧠 Autonomous Agent Command Center
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Real-time cognitive architecture monitoring
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                className="flex items-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <Badge variant="outline" className="text-lg px-4 py-2 hologram-effect">
                  <CurrentRoleIcon className="h-5 w-5 mr-2" />
                  {cognitiveState.currentCycle}
                </Badge>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex items-center gap-4"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-sm text-muted-foreground data-stream">
                Last update: {new Date(lastUpdate).toLocaleTimeString()}
              </div>
              <Button
                variant={isLive ? "cyber" : "outline"}
                size="sm"
                onClick={toggleLiveUpdates}
                className="glow-on-hover"
              >
                {isLive ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </>
                )}
              </Button>
              <Button
                variant="neon"
                size="sm"
                onClick={forceRefresh}
                className="glow-on-hover"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </motion.div>
          </div>

          {/* Enhanced Status Bar */}
          <motion.div 
            className="mt-6 grid grid-cols-4 gap-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              {
                icon: Activity,
                label: "Status",
                value: cognitiveState.currentRole ? `Processing ${cognitiveState.currentRole}` : 'Idle',
                color: "text-green-400",
                bgColor: "bg-green-500/10",
                borderColor: "border-green-500/30"
              },
              {
                icon: Cpu,
                label: "Uptime",
                value: formatUptime(),
                color: "text-blue-400",
                bgColor: "bg-blue-500/10",
                borderColor: "border-blue-500/30"
              },
              {
                icon: Shield,
                label: "Safety",
                value: `${cognitiveState.safetyAlerts.filter(a => !a.resolved).length} alerts`,
                color: "text-orange-400",
                bgColor: "bg-orange-500/10",
                borderColor: "border-orange-500/30"
              },
              {
                icon: Database,
                label: "Memory",
                value: `${(
                  Object.values(cognitiveState.workingMemory.memoryUsage)
                    .reduce((a, b) => a + b, 0) / 10
                ).toFixed(1)}% used`,
                color: "text-purple-400",
                bgColor: "bg-purple-500/10",
                borderColor: "border-purple-500/30"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className={`mind-blowing-card p-4 ${item.bgColor} ${item.borderColor} data-stream`}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <Icon className={`h-6 w-6 ${item.color}`} />
                    </motion.div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className={`font-bold ${item.color}`}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Main Dashboard Grid with staggered animations */}
        <motion.div 
          className="grid grid-cols-12 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {/* Cognitive Flow - Takes up full width on top */}
          <motion.div 
            className="col-span-12"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="mind-blowing-card p-6 hologram-effect">
              <CognitiveFlowDiagram cognitiveState={cognitiveState} />
            </div>
          </motion.div>

          {/* Working Memory - Left side */}
          <motion.div 
            className="col-span-12 lg:col-span-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="mind-blowing-card h-full data-stream">
              <WorkingMemoryPanel workingMemory={cognitiveState.workingMemory} />
            </div>
          </motion.div>

          {/* Tool Usage - Center */}
          <motion.div 
            className="col-span-12 lg:col-span-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <div className="mind-blowing-card h-full neon-border">
              <ToolUsageVisualization tools={cognitiveState.tools} />
            </div>
          </motion.div>

          {/* Safety Monitor - Right side */}
          <motion.div 
            className="col-span-12 lg:col-span-4"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <div className="mind-blowing-card h-full glow-on-hover">
              <SafetyMonitor safetyAlerts={cognitiveState.safetyAlerts} />
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Footer with Live Indicator */}
        <motion.div 
          className="mt-8 flex items-center justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div 
            className="flex items-center gap-3 text-sm text-muted-foreground mind-blowing-card px-6 py-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-400'}`}
              animate={isLive ? { 
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 5px rgba(34, 197, 94, 0.5)',
                  '0 0 20px rgba(34, 197, 94, 0.8)',
                  '0 0 5px rgba(34, 197, 94, 0.5)'
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="gradient-text font-medium">
              {isLive ? '🚀 Live neural monitoring active' : '⏸️ Live updates paused'}
            </span>
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
