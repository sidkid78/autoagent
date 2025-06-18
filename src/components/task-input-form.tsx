"use client";

import { useState } from "react";
import { Task, TaskTemplate } from "@/lib/task-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, 
  Bot,
  Sparkles,
  FileText,
  ChevronRight
} from "lucide-react";

interface TaskInputFormProps {
  templates: TaskTemplate[];
  onCreateTask: (description: string, priority: Task['priority']) => void;
}

export function TaskInputForm({ templates, onCreateTask }: TaskInputFormProps) {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onCreateTask(description, priority);
      setDescription("");
    }
  };

  const handleTemplateClick = (template: TaskTemplate) => {
    setDescription(template.template);
  };
  
  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <Card className="mind-blowing-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-visible" />
          <span className="gradient-text">Create New Task</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scratch">
          <TabsList className="grid w-full grid-cols-2 hologram-effect">
            <TabsTrigger value="scratch" className="text-visible">
              <Sparkles className="h-4 w-4 mr-2" />
              From Scratch
            </TabsTrigger>
            <TabsTrigger value="template" className="text-visible">
              <FileText className="h-4 w-4 mr-2" />
              From Template
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scratch" className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Describe the task for the autonomous agent... e.g., 'Analyze the latest market trends for AI in healthcare and generate a summary report.'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="focus-visible:ring-blue-400 memory-card text-visible"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-visible">Priority:</span>
                  {(['low', 'medium', 'high', 'critical'] as Task['priority'][]).map(p => (
                    <Button
                      key={p}
                      type="button"
                      variant={priority === p ? "cyber" : "outline"}
                      size="sm"
                      onClick={() => setPriority(p)}
                      className="capitalize"
                    >
                      {p}
                    </Button>
                  ))}
                </div>
                <Button type="submit" variant="cyber" className="cyber-button">
                  <Bot className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="template" className="pt-4">
            <div className="space-y-4">
              {categories.map(category => (
                <div key={category}>
                  <h4 className="font-semibold mb-2 text-sm text-visible opacity-70">{category}</h4>
                  <div className="space-y-2">
                    {templates.filter(t => t.category === category).map(template => (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateClick(template)}
                        className="w-full text-left p-3 memory-card rounded-lg hover:border-blue-400/50 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-sm text-visible">{template.name}</p>
                          <p className="text-xs text-visible opacity-70">{template.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-visible opacity-50" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 