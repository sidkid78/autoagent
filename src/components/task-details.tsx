"use client";

import { Task } from "@/lib/task-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Play,
  Pause,
  StopCircle,
  Eye,
  Lightbulb,
  Target,
  Cog,
  RotateCcw,
  MessageSquare,
  Clock,
  Calendar,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader,
  PauseCircle,
  XCircle
} from "lucide-react";

interface TaskDetailsProps {
  task: Task;
}



const statusConfig = {
  pending: { icon: Clock, color: "text-gray-500" },
  running: { icon: Loader, color: "text-blue-500" },
  completed: { icon: CheckCircle, color: "text-green-500" },
  failed: { icon: AlertCircle, color: "text-red-500" },
  paused: { icon: PauseCircle, color: "text-yellow-500" },
  cancelled: { icon: XCircle, color: "text-gray-600" },
};

const stageIcons = {
  perception: Eye,
  reasoning: Lightbulb,
  planning: Target,
  execution: Cog,
  reflection: RotateCcw,
  communication: MessageSquare,
  none: Bot,
}

export function TaskDetails({ task }: TaskDetailsProps) {
  const StatusIcon = statusConfig[task.status]?.icon || Bot;
  const statusColor = statusConfig[task.status]?.color || "text-gray-500";
  const StageIcon = stageIcons[task.currentStage as keyof typeof stageIcons] || Bot;
  
  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
    return `${(ms / 60000).toFixed(2)}m`;
  };

  return (
    <Card className="mind-blowing-card">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="mb-1 gradient-text">{task.description}</CardTitle>
            <CardDescription className="text-visible opacity-70">Task ID: {task.id}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="cyber" size="icon"><Play className="h-4 w-4"/></Button>
            <Button variant="outline" size="icon"><Pause className="h-4 w-4"/></Button>
            <Button variant="destructive" size="icon"><StopCircle className="h-4 w-4"/></Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Status and Progress */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-5 w-5 ${statusColor} ${task.status === 'running' ? 'animate-spin' : ''}`} />
            <span className={`font-semibold capitalize ${statusColor}`}>{task.status}</span>
          </div>
          <div className="flex-1">
            <Progress value={task.progress} className="h-2"/>
            <div className="text-xs text-right mt-1 text-visible opacity-70">{task.progress}%</div>
          </div>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-visible opacity-70" />
            <div>
              <div className="text-visible opacity-70">Priority</div>
              <div className="font-semibold capitalize text-visible">{task.priority}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-visible opacity-70" />
            <div>
              <div className="text-visible opacity-70">Created</div>
              <div className="font-semibold text-visible">{new Date(task.createdAt).toLocaleString()}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-visible opacity-70" />
            <div>
              <div className="text-visible opacity-70">Duration</div>
              <div className="font-semibold text-visible">
                {task.completedAt ? formatDuration(task.completedAt - task.startedAt!) : (task.startedAt ? `${formatDuration(Date.now() - task.startedAt)}...` : 'N/A')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StageIcon className="h-4 w-4 text-visible opacity-70" />
            <div>
              <div className="text-visible opacity-70">Current Stage</div>
              <div className="font-semibold capitalize text-visible">{task.currentStage}</div>
            </div>
          </div>
        </div>

        {/* Tabs for detailed info */}
        <Tabs defaultValue="trace">
          <TabsList className="hologram-effect">
            <TabsTrigger value="trace" className="text-visible">Cognitive Trace</TabsTrigger>
            <TabsTrigger value="interventions" className="text-visible">
              Interventions <Badge className="ml-2 hologram-effect"> {task.interventionRequests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="results" className="text-visible">Results & Artifacts</TabsTrigger>
            <TabsTrigger value="config" className="text-visible">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="trace" className="mt-4">
            {/* Cognitive Trace Implementation */}
            <div className="space-y-4">
              <div className="memory-card p-4 rounded-lg">
                <h4 className="font-semibold text-visible mb-3 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-400" />
                  Perception Stage
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-visible opacity-70">Processing Time:</span>
                    <span className="text-visible">2.34s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-visible opacity-70">Data Sources:</span>
                    <span className="text-visible">3 inputs processed</span>
                  </div>
                  <div className="context-variable p-2 rounded text-xs">
                    <span className="text-visible opacity-70">Output:</span>
                    <span className="text-visible ml-2">Market data analyzed, 15 trends identified</span>
                  </div>
                </div>
              </div>

              <div className="memory-card p-4 rounded-lg">
                <h4 className="font-semibold text-visible mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  Reasoning Stage
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-visible opacity-70">Processing Time:</span>
                    <span className="text-visible">1.82s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-visible opacity-70">Logical Steps:</span>
                    <span className="text-visible">7 inferences made</span>
                  </div>
                  <div className="context-variable p-2 rounded text-xs">
                    <span className="text-visible opacity-70">Output:</span>
                    <span className="text-visible ml-2">Healthcare AI market shows 34% growth potential</span>
                  </div>
                </div>
              </div>

              <div className="memory-card p-4 rounded-lg">
                <h4 className="font-semibold text-visible mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-400" />
                  Planning Stage
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-visible opacity-70">Processing Time:</span>
                    <span className="text-visible">1.63s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-visible opacity-70">Action Items:</span>
                    <span className="text-visible">5 tasks planned</span>
                  </div>
                  <div className="context-variable p-2 rounded text-xs">
                    <span className="text-visible opacity-70">Output:</span>
                    <span className="text-visible ml-2">Report structure defined with 4 key sections</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interventions" className="mt-4">
            {/* Interventions Implementation */}
            <div className="space-y-4">
              {task.interventionRequests.length > 0 ? (
                task.interventionRequests.map((intervention, index) => (
                  <div key={index} className="memory-card p-4 rounded-lg border border-yellow-500/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-400" />
                        <span className="font-semibold text-visible">Intervention Required</span>
                      </div>
                      <Badge className="hologram-effect text-yellow-400">Pending</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-visible opacity-70">Type:</span>
                        <span className="text-visible ml-2">Data Clarification</span>
                      </div>
                      <div>
                        <span className="text-visible opacity-70">Request:</span>
                        <span className="text-visible ml-2">Need access to Q3 financial data for healthcare sector</span>
                      </div>
                      <div>
                        <span className="text-visible opacity-70">Urgency:</span>
                        <span className="text-visible ml-2">Medium</span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="cyber" size="sm">Approve</Button>
                      <Button variant="outline" size="sm">Modify</Button>
                      <Button variant="destructive" size="sm">Reject</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="memory-card p-6 rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-3 text-green-400" />
                  <h4 className="font-semibold text-visible mb-2">No Interventions Required</h4>
                  <p className="text-visible opacity-70 text-sm">The agent is operating autonomously without human intervention.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-4">
            {/* Results & Artifacts Implementation */}
            <div className="space-y-4">
              <div className="memory-card p-4 rounded-lg">
                <h4 className="font-semibold text-visible mb-3 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-blue-400" />
                  Generated Artifacts
                </h4>
                <div className="space-y-3">
                  <div className="context-variable p-3 rounded border border-blue-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-visible">Market Analysis Report</span>
                      <Badge className="hologram-effect">PDF</Badge>
                    </div>
                    <p className="text-xs text-visible opacity-70 mb-2">
                      Comprehensive analysis of AI healthcare market trends for Q4 2024
                    </p>
                    <div className="flex gap-2">
                      <Button variant="cyber" size="sm">Download</Button>
                      <Button variant="outline" size="sm">Preview</Button>
                    </div>
                  </div>

                  <div className="context-variable p-3 rounded border border-green-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-visible">Data Visualization</span>
                      <Badge className="hologram-effect">Chart</Badge>
                    </div>
                    <p className="text-xs text-visible opacity-70 mb-2">
                      Interactive charts showing growth trends and market segments
                    </p>
                    <div className="flex gap-2">
                      <Button variant="cyber" size="sm">View Chart</Button>
                      <Button variant="outline" size="sm">Export</Button>
                    </div>
                  </div>

                  <div className="context-variable p-3 rounded border border-purple-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-visible">Executive Summary</span>
                      <Badge className="hologram-effect">DOC</Badge>
                    </div>
                    <p className="text-xs text-visible opacity-70 mb-2">
                      Key findings and recommendations for stakeholders
                    </p>
                    <div className="flex gap-2">
                      <Button variant="cyber" size="sm">Download</Button>
                      <Button variant="outline" size="sm">Share</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="memory-card p-4 rounded-lg">
                <h4 className="font-semibold text-visible mb-3">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-visible opacity-70">Accuracy Score:</span>
                    <div className="text-visible font-semibold">94.2%</div>
                  </div>
                  <div>
                    <span className="text-visible opacity-70">Confidence Level:</span>
                    <div className="text-visible font-semibold">High</div>
                  </div>
                  <div>
                    <span className="text-visible opacity-70">Data Sources:</span>
                    <div className="text-visible font-semibold">12 verified</div>
                  </div>
                  <div>
                    <span className="text-visible opacity-70">Quality Score:</span>
                    <div className="text-visible font-semibold">A+</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="config" className="mt-4">
            {/* Configuration Implementation */}
            <div className="space-y-4">
              <div className="memory-card p-4 rounded-lg">
                <h4 className="font-semibold text-visible mb-3 flex items-center gap-2">
                  <Cog className="h-4 w-4 text-blue-400" />
                  Autonomy Settings
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-visible font-medium">Auto-approve low-risk actions</span>
                      <p className="text-xs text-visible opacity-70">Allow agent to proceed with routine tasks</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-visible font-medium">Require confirmation for data access</span>
                      <p className="text-xs text-visible opacity-70">Human approval needed for external data sources</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-visible font-medium">Enable creative reasoning</span>
                      <p className="text-xs text-visible opacity-70">Allow agent to make innovative connections</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="memory-card p-4 rounded-lg">
                <h4 className="font-semibold text-visible mb-3">Resource Limits</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-visible opacity-70">Max Processing Time</span>
                      <span className="text-visible">30 minutes</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-visible opacity-70">Memory Usage Limit</span>
                      <span className="text-visible">2GB</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-visible opacity-70">API Call Budget</span>
                      <span className="text-visible">$50</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="memory-card p-4 rounded-lg">
                <h4 className="font-semibold text-visible mb-3">Safety Constraints</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-visible">No personal data access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-visible">Read-only database operations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-visible">Audit trail enabled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-visible">Content filtering active</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

      </CardContent>
    </Card>
  );
}

// Dummy icons to fix import error until we add them
/*
const Loader = ({className}:{className?:string}) => <div className={className}>L</div>;
const CheckCircle = ({className}:{className?:string}) => <div className={className}>C</div>;
const XCircle = ({className}:{className?:string}) => <div className={className}>X</div>;
const PauseCircle = ({className}:{className?:string}) => <div className={className}>P</div>;
*/ 