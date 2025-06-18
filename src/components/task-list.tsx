"use client";

import { Task } from "@/lib/task-types";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Loader, 
  AlertCircle, 
  PauseCircle, 
  XCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface TaskListProps {
  tasks: Task[];
  selectedTaskId: string;
  onSelectTask: (taskId: string) => void;
}

const statusConfig = {
  pending: { icon: Clock, color: "text-gray-500", bgColor: "bg-gray-100" },
  running: { icon: Loader, color: "text-blue-500", bgColor: "bg-blue-100" },
  completed: { icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-100" },
  failed: { icon: AlertCircle, color: "text-red-500", bgColor: "bg-red-100" },
  paused: { icon: PauseCircle, color: "text-yellow-500", bgColor: "bg-yellow-100" },
  cancelled: { icon: XCircle, color: "text-gray-600", bgColor: "bg-gray-200" },
};

const priorityConfig = {
  low: { color: "bg-gray-400" },
  medium: { color: "bg-blue-500" },
  high: { color: "bg-yellow-500" },
  critical: { color: "bg-red-500" },
};

export function TaskList({ tasks, selectedTaskId, onSelectTask }: TaskListProps) {
  
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return b.createdAt - a.createdAt;
  });
  
  return (
    <div className="mind-blowing-card rounded-lg h-full">
      <div className="p-4 border-b border-gray-600/30">
        <h3 className="font-semibold gradient-text">Task Queue</h3>
      </div>
      <div className="p-2 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        <AnimatePresence>
          {sortedTasks.map(task => {
            const StatusIcon = statusConfig[task.status].icon;
            const priorityColor = priorityConfig[task.priority].color;

            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => onSelectTask(task.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-colors memory-card",
                    "hover:border-blue-400/50",
                    selectedTaskId === task.id ? "border-l-4 border-blue-400 shadow-lg shadow-blue-400/20" : ""
                  )}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium pr-2 flex-1 text-visible">{task.description}</p>
                    <div className={cn("w-2 h-2 rounded-full mt-1.5", priorityColor)}></div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-visible opacity-70">
                    <div className="flex items-center gap-1.5">
                      <StatusIcon className={cn("h-3 w-3", statusConfig[task.status].color, task.status === 'running' && 'animate-spin')} />
                      <span>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
                    </div>
                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                  {task.status === 'running' && (
                    <div className="mt-2">
                      <Progress value={task.progress} className="h-1" />
                    </div>
                  )}
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  );
} 