"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { WorkingMemory } from "@/lib/types";
import { 
  Database, 
  Brain, 
  FileText, 
  Lightbulb, 
  MemoryStick,
  Activity,
  ListTree
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemoryEventsFeed } from './memory-events-feed';

interface WorkingMemoryPanelProps {
  workingMemory: WorkingMemory;
}

export function WorkingMemoryPanel({ workingMemory }: WorkingMemoryPanelProps) {
  const formatMemorySize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  const getMemoryUsageColor = (usage: number) => {
    if (usage < 50) return "text-green-600";
    if (usage < 80) return "text-yellow-600";
    return "text-red-600";
  };

  const totalMemoryUsage = Object.values(workingMemory.memoryUsage).reduce((a, b) => a + b, 0);
  const maxMemory = 1000; // MB - adjust based on your system

  return (
    <Card className="h-full mind-blowing-card working-memory-panel">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="h-5 w-5 text-visible" />
          <h3 className="text-lg font-semibold gradient-text">Working Memory</h3>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="overview">
              <ListTree className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="events">
               <Activity className="h-4 w-4 mr-2" />
              Live Events
              <Badge variant="secondary" className="ml-2">
                {workingMemory.memoryEvents.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Current Task */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-visible" />
                <span className="font-medium text-visible">Current Task</span>
              </div>
              <div className="p-3 memory-card rounded-lg text-sm text-visible">
                {workingMemory.currentTask || "No active task"}
              </div>
            </div>

            {/* Memory Usage */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-visible">Memory Usage</span>
                <span className={`text-sm text-visible ${getMemoryUsageColor((totalMemoryUsage / maxMemory) * 100)}`}>
                  {((totalMemoryUsage / maxMemory) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={(totalMemoryUsage / maxMemory) * 100} 
                className="h-2 mb-3" 
              />
              
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded"></div>
                    <span>Working</span>
                  </div>
                  <div className="font-medium">
                    {formatMemorySize(workingMemory.memoryUsage.working * 1024 * 1024)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded"></div>
                    <span>Episodic</span>
                  </div>
                  <div className="font-medium">
                    {formatMemorySize(workingMemory.memoryUsage.episodic * 1024 * 1024)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded"></div>
                    <span>Semantic</span>
                  </div>
                  <div className="font-medium">
                    {formatMemorySize(workingMemory.memoryUsage.semantic * 1024 * 1024)}
                  </div>
                </div>
              </div>
            </div>

            {/* Memory Counts */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 memory-card rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Database className="h-4 w-4 text-visible" />
                  <span className="text-sm font-medium text-visible">Episodic</span>
                </div>
                <div className="text-xl font-bold text-visible">
                  {workingMemory.episodicMemoryCount.toLocaleString()}
                </div>
                <div className="text-xs text-visible opacity-70">memories</div>
              </div>
              
              <div className="p-3 memory-card rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-visible" />
                  <span className="text-sm font-medium text-visible">Semantic</span>
                </div>
                <div className="text-xl font-bold text-visible">
                  {workingMemory.semanticMemoryCount.toLocaleString()}
                </div>
                <div className="text-xs text-visible opacity-70">entries</div>
              </div>
            </div>

            {/* Recent Insights */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4" />
                <span className="font-medium">Recent Insights</span>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {workingMemory.recentInsights.length > 0 ? (
                  workingMemory.recentInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-2 insight-card text-sm text-visible"
                    >
                      {insight}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 italic">
                    No recent insights available
                  </div>
                )}
              </div>
            </div>

            {/* Context Data Summary */}
            {Object.keys(workingMemory.contextData).length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MemoryStick className="h-4 w-4" />
                  <span className="font-medium">Context Variables</span>
                  <Badge variant="secondary" className="text-xs">
                    {Object.keys(workingMemory.contextData).length}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs">
                  {Object.entries(workingMemory.contextData).slice(0, 5).map(([key, value]) => (
                    <div key={key} className="flex justify-between context-variable p-2 rounded">
                      <span className="text-visible opacity-70 truncate">{key}</span>
                      <span className="font-medium text-visible text-right ml-2">
                        {typeof value === 'string' ? 
                          (value.length > 20 ? `${value.substring(0, 20)}...` : value) :
                          JSON.stringify(value).substring(0, 20)
                        }
                      </span>
                    </div>
                  ))}
                  {Object.keys(workingMemory.contextData).length > 5 && (
                    <div className="text-gray-500 italic">
                      ... and {Object.keys(workingMemory.contextData).length - 5} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="events">
            <MemoryEventsFeed events={workingMemory.memoryEvents} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 