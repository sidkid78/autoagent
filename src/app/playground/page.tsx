"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable";
import { PromptInput } from "../../components/prompt-input";
import { CodeEditor } from "../../components/code-editor";
import { DiagramDisplay } from "../../components/diagram-display";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { 
  Terminal, 
  Sparkles, 
  Zap, 
  Brain, 
  Code, 
  Cpu, 
  Activity
} from "lucide-react";
import { toast } from "react-hot-toast";

const mockDiagram = `
graph TD
    A[🧠 Neural Prompt] --> B{🔮 AI Core};
    B --> C[⚡ Parse Intent];
    C --> D[🎨 Generate Art];
    D --> E[✨ Code Output];
    B --> F[🌟 Create Diagram];
    F --> G[📊 Visual Output];
    style A fill:#7c77c6,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#ff77c6,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#77ffc6,stroke:#333,stroke-width:2px,color:#fff
`;

const codeTemplates = {
  "Neural Network": `// 🧠 Advanced Neural Network Implementation
import { Matrix, NeuralLayer } from '@ai/core';

class MindBlowingNeuralNet {
  constructor(layers: number[]) {
    this.layers = layers.map((size, i) => 
      new NeuralLayer(size, layers[i + 1] || 0)
    );
    this.initialize();
  }

  async predict(input: number[]): Promise<number[]> {
    let activation = Matrix.from(input);
    
    for (const layer of this.layers) {
      activation = await layer.forward(activation);
      // ✨ Apply quantum-inspired activation
      activation = this.quantumActivation(activation);
    }
    
    return activation.toArray();
  }

  private quantumActivation(matrix: Matrix): Matrix {
    // 🌟 Superposition-based activation function
    return matrix.map(x => Math.tanh(x) * Math.sin(x * Math.PI));
  }
}

// 🚀 Usage Example
const brain = new MindBlowingNeuralNet([784, 256, 128, 10]);
const result = await brain.predict(inputData);
console.log('🎯 Prediction:', result);`,

  "Quantum Algorithm": `// ⚛️ Quantum-Inspired Computing
class QuantumProcessor {
  private qubits: Qubit[];
  private entanglements: Map<string, number>;

  constructor(qubitCount: number) {
    this.qubits = Array.from({ length: qubitCount }, 
      () => new Qubit()
    );
    this.entanglements = new Map();
  }

  // 🌀 Quantum Superposition
  superposition(qubitIndex: number): void {
    const qubit = this.qubits[qubitIndex];
    qubit.state = {
      alpha: Math.sqrt(0.5),
      beta: Math.sqrt(0.5) * Math.exp(Math.PI * 1i)
    };
  }

  // 🔗 Quantum Entanglement
  entangle(qubit1: number, qubit2: number): void {
    const key = \`\${qubit1}-\${qubit2}\`;
    this.entanglements.set(key, Math.random());
    
    // Bell state creation
    this.bellState(qubit1, qubit2);
  }

  // 📊 Quantum Measurement
  measure(qubitIndex: number): 0 | 1 {
    const qubit = this.qubits[qubitIndex];
    const probability = Math.abs(qubit.state.alpha) ** 2;
    
    return Math.random() < probability ? 0 : 1;
  }
}

// 🎯 Quantum Search Algorithm
const processor = new QuantumProcessor(8);
processor.superposition(0);
processor.entangle(0, 1);
const result = processor.measure(0);`,

  "AI Agent": `// 🤖 Autonomous AI Agent System
interface AgentMemory {
  experiences: Experience[];
  knowledge: KnowledgeGraph;
  goals: Goal[];
}

class AutonomousAgent {
  private memory: AgentMemory;
  private cognition: CognitiveEngine;
  private actuators: ActuatorSystem;

  constructor(config: AgentConfig) {
    this.memory = new AgentMemory(config.memorySize);
    this.cognition = new CognitiveEngine(config.modelPath);
    this.actuators = new ActuatorSystem(config.capabilities);
  }

  // 🧠 Cognitive Processing Loop
  async think(): Promise<Action[]> {
    const perception = await this.perceive();
    const reasoning = await this.reason(perception);
    const planning = await this.plan(reasoning);
    
    // 💭 Meta-cognition: thinking about thinking
    const metacognition = await this.reflect(planning);
    
    return this.decideActions(metacognition);
  }

  // 👁️ Environmental Perception
  private async perceive(): Promise<Perception> {
    const sensoryData = await this.sensors.gather();
    const processed = await this.cognition.process(sensoryData);
    
    // 🌟 Pattern recognition with neural attention
    const patterns = this.recognizePatterns(processed);
    
    return new Perception(processed, patterns);
  }

  // 🎯 Goal-oriented Planning
  private async plan(reasoning: ReasoningResult): Promise<Plan> {
    const currentGoals = this.memory.goals.filter(g => g.active);
    const strategies = await this.generateStrategies(currentGoals);
    
    // 🔮 Predictive modeling
    const outcomes = await this.predictOutcomes(strategies);
    
    return this.selectOptimalPlan(outcomes);
  }
}

// 🚀 Agent Deployment
const agent = new AutonomousAgent({
  memorySize: 1000000,
  modelPath: './models/gpt-5-agent.bin',
  capabilities: ['vision', 'language', 'reasoning', 'planning']
});

await agent.activate();`
};

export default function PlaygroundPage() {
  const [generatedCode, setGeneratedCode] = useState("// ✨ Your mind-blowing code will appear here...\n// 🚀 Get ready for something extraordinary!");
  const [generatedDiagram, setGeneratedDiagram] = useState("");
  const [executionOutput, setExecutionOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);


  // Particle system for background effects
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-50),
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        }
      ]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    setGeneratedCode("// 🧠 AI is thinking...\n// ⚡ Generating extraordinary code...");
    setGeneratedDiagram("");
    setExecutionOutput("");
    
    toast.success("🚀 Prompt received! Generating mind-blowing code...", {
      style: {
        background: 'linear-gradient(135deg, #7c77c6, #ff77c6)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }
    });
    
    // Simulate advanced AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Determine code type based on prompt
    let codeTemplate = codeTemplates["Neural Network"];
    if (prompt.toLowerCase().includes("quantum")) {
      codeTemplate = codeTemplates["Quantum Algorithm"];
    } else if (prompt.toLowerCase().includes("agent") || prompt.toLowerCase().includes("ai")) {
      codeTemplate = codeTemplates["AI Agent"];
    }
    
    setGeneratedCode(`// 🎯 Prompt: "${prompt}"\n// 🌟 Generated by Advanced AI System\n\n${codeTemplate}`);
    setGeneratedDiagram(mockDiagram);
    setIsLoading(false);
    
    toast.success("✨ Code generation complete!", {
      style: {
        background: 'linear-gradient(135deg, #77ffc6, #7c77c6)',
        color: 'white',
      }
    });
  };

  const handleCodeRun = async (code: string) => {
    setIsRunning(true);
    setExecutionOutput("🚀 Initializing quantum processors...\n⚡ Loading neural networks...\n🧠 Activating AI systems...\n");
    
    toast.loading("🔥 Executing mind-blowing code...", {
      style: {
        background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
        color: 'white',
      }
    });
    
    // Simulate advanced execution
    const steps = [
      "🔮 Quantum state initialization... COMPLETE",
      "🌟 Neural pathway activation... COMPLETE", 
      "⚡ Synaptic firing patterns... OPTIMAL",
      "🧠 Consciousness simulation... ACTIVE",
      "🎯 Pattern recognition... 99.7% accuracy",
      "🚀 Execution finished... MIND = BLOWN! 🤯"
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setExecutionOutput(prev => prev + `\n${steps[i]}`);
    }
    
    const lines = code.split('\n').length;
    const finalOutput = `\n\n📊 EXECUTION SUMMARY:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n✅ Lines processed: ${lines}\n⚡ Processing speed: 1.21 GIGAWATTS\n🧠 AI efficiency: 142.7%\n🌟 Quantum coherence: STABLE\n🎯 Success rate: 100%\n💫 Mind-blown level: MAXIMUM\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    
    setExecutionOutput(prev => prev + finalOutput);
    setIsRunning(false);
    
    toast.dismiss();
    toast.success("🎉 Execution complete! Mind = Blown! 🤯");
  };

  const loadTemplate = (templateName: string) => {
    setSelectedTemplate(templateName);
    setGeneratedCode(codeTemplates[templateName as keyof typeof codeTemplates]);
    toast.success(`🎨 Loaded ${templateName} template!`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
            initial={{ x: particle.x, y: particle.y, scale: 0 }}
            animate={{ 
              y: particle.y - 100, 
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{ duration: 3, ease: "easeOut" }}
            style={{ left: particle.x, top: particle.y }}
          />
        ))}
      </div>

      {/* Neural network background */}
      <div className="neural-network-bg" />

      {/* Header with floating title */}
      <motion.div 
        className="relative z-10 p-6 border-b border-border/20 backdrop-blur-xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-4 floating-element"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Brain className="h-10 w-10 text-primary glow-on-hover" />
              <motion.div
                className="absolute inset-0 bg-primary rounded-full opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">
                🚀 AI Code Playground
              </h1>
              <p className="text-muted-foreground">Where imagination meets intelligence</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            {Object.keys(codeTemplates).map((template, index) => (
              <motion.div
                key={template}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={selectedTemplate === template ? "default" : "outline"}
                  size="sm"
                  onClick={() => loadTemplate(template)}
                  className={`cyber-button ${selectedTemplate === template ? 'glow-on-hover' : ''}`}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {template}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <ResizablePanelGroup
        direction="horizontal"
        className="h-[calc(100vh-120px)] relative z-10"
      >
        <ResizablePanel defaultSize={25} minSize={20}>
          <motion.div 
            className="h-full p-4"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mind-blowing-card h-full p-6 data-stream">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold gradient-text">Neural Prompt Interface</h3>
              </div>
              <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />
            </div>
          </motion.div>
        </ResizablePanel>
        
        <ResizableHandle withHandle className="bg-border hover:bg-primary/50 transition-colors" />
        
        <ResizablePanel defaultSize={50} minSize={30}>
          <motion.div 
            className="h-full relative"
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-2 mind-blowing-card code-editor-glow">
              <div className="flex items-center justify-between p-4 border-b border-border/20">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span className="font-semibold gradient-text">Quantum Code Editor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="hologram-effect">
                    <Activity className="h-3 w-3 mr-1" />
                    {isRunning ? "EXECUTING" : "READY"}
                  </Badge>
                </div>
              </div>
              <div className="h-[calc(100%-60px)]">
                <CodeEditor 
                  initialCode={generatedCode} 
                  key={generatedCode}
                  onRun={handleCodeRun}
                  language="typescript"
                />
              </div>
            </div>
          </motion.div>
        </ResizablePanel>
        
        <ResizableHandle withHandle className="bg-border hover:bg-primary/50 transition-colors" />
        
        <ResizablePanel defaultSize={25} minSize={20}>
          <motion.div 
            className="h-full p-4"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Tabs defaultValue="output" className="h-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 neon-border">
                <TabsTrigger value="output" className="data-stream">
                  <Terminal className="h-4 w-4 mr-1" />
                  Output
                </TabsTrigger>
                <TabsTrigger value="diagram" className="data-stream">
                  <Brain className="h-4 w-4 mr-1" />
                  Neural
                </TabsTrigger>
                <TabsTrigger value="metrics" className="data-stream">
                  <Cpu className="h-4 w-4 mr-1" />
                  Metrics
                </TabsTrigger>
                <TabsTrigger value="quantum" className="data-stream">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Quantum
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="output" className="h-[calc(100%-60px)]">
                <Card className="h-full mind-blowing-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 gradient-text">
                      <Terminal className="h-5 w-5" />
                      <span>Quantum Execution Terminal</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-80px)]">
                    <div className="terminal-glow h-full p-4 rounded-lg font-mono text-sm overflow-auto">
                      <AnimatePresence>
                        {executionOutput ? (
                          <motion.pre
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-green-400 whitespace-pre-wrap"
                          >
                            {executionOutput}
                          </motion.pre>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-green-400/60 italic"
                          >
                            🌟 Quantum terminal ready...\n💫 Awaiting your commands...\n🚀 Prepare for mind-blowing results!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="diagram" className="h-[calc(100%-60px)]">
                <div className="mind-blowing-card h-full hologram-effect">
                  <DiagramDisplay diagram={generatedDiagram} />
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="h-[calc(100%-60px)]">
                <Card className="h-full mind-blowing-card">
                  <CardHeader>
                    <CardTitle className="gradient-text">🧠 Neural Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div 
                      className="space-y-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex justify-between">
                        <span className="text-sm">🔥 Processing Power</span>
                        <span className="text-sm font-mono">1.21 GW</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-primary to-chart-2"
                          initial={{ width: 0 }}
                          animate={{ width: "97%" }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="space-y-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex justify-between">
                        <span className="text-sm">🧠 AI Intelligence</span>
                        <span className="text-sm font-mono">142.7%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-chart-3 to-chart-4"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, delay: 0.7 }}
                        />
                      </div>
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex justify-between">
                        <span className="text-sm">⚛️ Quantum Coherence</span>
                        <span className="text-sm font-mono">STABLE</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-chart-5 to-primary"
                          initial={{ width: 0 }}
                          animate={{ width: "89%" }}
                          transition={{ duration: 2, delay: 0.9 }}
                        />
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="quantum" className="h-[calc(100%-60px)]">
                <Card className="h-full mind-blowing-card">
                  <CardHeader>
                    <CardTitle className="gradient-text flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Quantum State Monitor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <motion.div 
                        className="text-center p-4 border border-primary/30 rounded-lg hologram-effect"
                        animate={{ 
                          boxShadow: [
                            "0 0 20px rgba(120, 119, 198, 0.3)",
                            "0 0 40px rgba(120, 119, 198, 0.6)",
                            "0 0 20px rgba(120, 119, 198, 0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="text-2xl font-mono gradient-text">|ψ⟩ = α|0⟩ + β|1⟩</div>
                        <div className="text-sm text-muted-foreground mt-2">Superposition Active</div>
                      </motion.div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-muted/20 rounded">
                          <div className="font-mono">α: 0.707</div>
                          <div className="text-xs text-muted-foreground">Amplitude 0</div>
                        </div>
                        <div className="p-2 bg-muted/20 rounded">
                          <div className="font-mono">β: 0.707i</div>
                          <div className="text-xs text-muted-foreground">Amplitude 1</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
} 