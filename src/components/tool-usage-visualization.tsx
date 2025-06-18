"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ToolStatus } from "@/lib/types";
import { 
  Wrench, 
  Globe, 
  Database, 
  Search,
  CheckCircle, 
  AlertCircle, 
  Wifi,
  WifiOff,
  Loader2
} from "lucide-react";

interface ToolUsageVisualizationProps {
  tools: ToolStatus[];
}

const toolIcons = {
  web_scraper: Globe,
  supabase_store: Database,
  rag_query: Search,
};

const statusIcons = {
  available: CheckCircle,
  busy: Loader2,
  error: AlertCircle,
  offline: WifiOff,
};



export function ToolUsageVisualization({ tools }: ToolUsageVisualizationProps) {
  const formatTime = (milliseconds: number) => {
    if (milliseconds < 1000) return `${milliseconds}ms`;
    return `${(milliseconds / 1000).toFixed(2)}s`;
  };

  const formatLastUsed = (timestamp?: number) => {
    if (!timestamp) return "Never";
    const elapsed = Date.now() - timestamp;
    if (elapsed < 60000) return `${Math.floor(elapsed / 1000)}s ago`;
    if (elapsed < 3600000) return `${Math.floor(elapsed / 60000)}m ago`;
    return `${Math.floor(elapsed / 3600000)}h ago`;
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="h-full mind-blowing-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Wrench className="h-5 w-5 text-visible" />
          <h3 className="text-lg font-semibold gradient-text">Tool Usage</h3>
          <Badge variant="outline" className="ml-auto hologram-effect">
            {tools.filter(t => t.status === 'available').length}/{tools.length} available
          </Badge>
        </div>

        <div className="space-y-4">
          {tools.map((tool, index) => {
            const Icon = toolIcons[tool.name as keyof typeof toolIcons] || Wrench;
            const StatusIcon = statusIcons[tool.status];
            
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border-2 transition-all duration-300 memory-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-visible" />
                    <span className="font-medium capitalize text-visible">
                      {tool.name.replace('_', ' ')}
                    </span>
                    <Badge variant="secondary" className="text-xs hologram-effect">
                      {tool.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`h-4 w-4 text-visible ${tool.status === 'busy' ? 'animate-spin' : ''}`} />
                    <span className="text-xs capitalize text-visible">{tool.status}</span>
                  </div>
                </div>

                {/* Current Operation */}
                {tool.currentOperation && (
                  <div className="mb-3 p-2 context-variable rounded text-xs">
                    <span className="text-visible opacity-70">Current: </span>
                    <span className="font-medium text-visible">{tool.currentOperation}</span>
                  </div>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-visible opacity-70 mb-1">Success Rate</div>
                    <div className={`font-medium text-visible ${getSuccessRateColor(tool.successRate)}`}>
                      {tool.successRate.toFixed(1)}%
                    </div>
                    <Progress 
                      value={tool.successRate} 
                      className="h-1 mt-1" 
                    />
                  </div>
                  
                  <div>
                    <div className="text-visible opacity-70 mb-1">Avg Time</div>
                    <div className="font-medium text-visible">
                      {formatTime(tool.averageExecutionTime)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-visible opacity-70 mb-1">Last Used</div>
                    <div className="font-medium text-visible">
                      {formatLastUsed(tool.lastUsed)}
                    </div>
                  </div>
                </div>

                {/* Performance Indicator */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    {tool.status === 'available' && (
                      <>
                        <Wifi className="h-3 w-3 text-green-500" />
                        <span className="text-green-600">Ready</span>
                      </>
                    )}
                    {tool.status === 'busy' && (
                      <>
                        <Loader2 className="h-3 w-3 text-blue-500 animate-spin" />
                        <span className="text-blue-600">Processing</span>
                      </>
                    )}
                    {tool.status === 'error' && (
                      <>
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <span className="text-red-600">Error</span>
                      </>
                    )}
                    {tool.status === 'offline' && (
                      <>
                        <WifiOff className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-600">Offline</span>
                      </>
                    )}
                  </div>
                  
                  {/* Performance Rating */}
                  <div className="text-xs">
                    {tool.successRate >= 90 && tool.averageExecutionTime < 5000 && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Excellent
                      </Badge>
                    )}
                    {tool.successRate >= 70 && tool.successRate < 90 && (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        Good
                      </Badge>
                    )}
                    {tool.successRate < 70 && (
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        Needs Attention
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Overall Tool Health */}
        <div className="mt-6 p-4 memory-card rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-visible opacity-70">Overall Health:</span>
              <div className="font-medium text-visible">
                {(() => {
                  const avgSuccess = tools.reduce((acc, tool) => acc + tool.successRate, 0) / tools.length;
                  if (avgSuccess >= 90) return "Excellent";
                  if (avgSuccess >= 70) return "Good";
                  return "Needs Attention";
                })()}
              </div>
            </div>
            <div>
              <span className="text-visible opacity-70">Active Tools:</span>
              <div className="font-medium text-visible">
                {tools.filter(t => t.status === 'busy').length}
              </div>
            </div>
            <div>
              <span className="text-visible opacity-70">Total Ops:</span>
              <div className="font-medium text-visible">
                {tools.reduce((acc, tool) => acc + (tool.lastUsed ? 1 : 0), 0)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 