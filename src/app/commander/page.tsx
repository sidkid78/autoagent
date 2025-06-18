"use client";

import { useState, useEffect } from "react";
import { TaskInputForm } from "../../components/task-input-form";
import { TaskList } from "../../components/task-list";
import { TaskDetails } from "../../components/task-details";
import { Task, TaskTemplate } from "../../lib/task-types";
import { generateMockTask, generateMockTaskTemplates } from "../../lib/task-mock-data";
import { 
  Bot, 
  PlusCircle, 
  History,
  LayoutGrid,
  Loader2
} from "lucide-react";

export default function TaskCommanderPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [taskTemplates, setTaskTemplates] = useState<TaskTemplate[] | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Generate mock data on the client to avoid hydration mismatch
    const initialTasks = Array.from({ length: 5 }, () => generateMockTask());
    const initialTemplates = generateMockTaskTemplates();
    setTasks(initialTasks);
    setTaskTemplates(initialTemplates);
    setSelectedTask(initialTasks[0]);
    setIsInitialized(true);
  }, []);

  const handleCreateTask = (description: string, priority: Task['priority']) => {
    const newTask = generateMockTask({ 
      description,
      priority,
      status: 'pending',
      createdAt: Date.now(),
      progress: 0,
    });
    setTasks(prev => [newTask, ...(prev || [])]);
    setSelectedTask(newTask);
  };

  const handleSelectTask = (taskId: string) => {
    const task = tasks?.find(t => t.id === taskId);
    setSelectedTask(task || null);
  };
  
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="text-xl font-semibold">Loading Task Commander...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen neural-network-bg text-visible">
      {/* Header */}
      <header className="mind-blowing-card border-b border-gray-600/30 p-4 sticky top-0 z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="h-7 w-7 text-blue-400 animate-pulse" />
            <h1 className="text-2xl font-bold gradient-text">
              Interactive Task Commander
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-visible hover:text-blue-400 transition-colors">
              <LayoutGrid className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-visible hover:text-blue-400 transition-colors">
              <History className="h-4 w-4" />
              <span>History</span>
            </button>
            <button className="cyber-button px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold">
              <PlusCircle className="h-4 w-4" />
              <span>New Task</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-8">
        {/* Left Panel: Task List */}
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <TaskList
            tasks={tasks || []}
            selectedTaskId={selectedTask?.id || ""}
            onSelectTask={handleSelectTask}
          />
        </div>
        
        {/* Right Panel: Task Input and Details */}
        <div className="col-span-12 lg:col-span-8 xl:col-span-9">
          <div className="space-y-8">
            <TaskInputForm 
              templates={taskTemplates || []}
              onCreateTask={handleCreateTask}
            />
            
            {/* Divider */}
            <div className="border-b border-gray-600/30 data-stream"></div>

            {selectedTask ? (
              <TaskDetails task={selectedTask} />
            ) : (
              <div className="text-center py-20 memory-card rounded-lg">
                <Bot className="h-12 w-12 mx-auto mb-4 text-blue-400 animate-pulse" />
                <h3 className="text-lg font-semibold text-visible">No Task Selected</h3>
                <p className="text-sm text-visible opacity-70">Please select a task from the list to see its details.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 