"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { 
  Send, 
  Sparkles, 
  Cpu, 
  Loader2,
  Mic,
  MicOff,
  Wand2,
  Bot,
  MessageSquare
} from "lucide-react";
import { toast } from "react-hot-toast";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
}

const promptSuggestions = [
  "🧠 Create a neural network that learns to paint",
  "⚛️ Build a quantum algorithm for optimization",
  "🤖 Design an autonomous agent system",
  "🌟 Generate a self-modifying AI architecture",
  "🔮 Create a consciousness simulation framework",
  "🚀 Build a distributed AI swarm intelligence",
];

const aiPersonalities = [
  { name: "Einstein", icon: "🧠", style: "Theoretical physicist approach" },
  { name: "Tesla", icon: "⚡", style: "Innovative engineer mindset" },
  { name: "Turing", icon: "🔢", style: "Computer science pioneer" },
  { name: "Curie", icon: "⚛️", style: "Scientific research focus" },
  { name: "Hawking", icon: "🌌", style: "Cosmological thinking" },
  { name: "Jobs", icon: "🍎", style: "Design-first philosophy" },
];

export function PromptInput({ onSubmit, isLoading = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState(aiPersonalities[0]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCharCount(prompt.length);
    setIsTyping(prompt.length > 0);
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim() || isLoading) return;
    
    toast.success(`🧠 ${selectedPersonality.name} is processing your request...`, {
      style: {
        background: 'linear-gradient(135deg, #7c77c6, #ff77c6)',
        color: 'white',
      }
    });
    
    onSubmit(prompt);
    setPrompt("");
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const insertSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
    toast.success("💡 Suggestion applied!");
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast.success("🎤 Voice input activated");
      // Simulate voice input
      setTimeout(() => {
        setPrompt("Create an AI that can understand human emotions");
        setIsListening(false);
        toast.success("🎤 Voice input complete");
      }, 3000);
    } else {
      toast.success("🎤 Voice input stopped");
    }
  };

  const generateRandomPrompt = () => {
    const randomSuggestion = promptSuggestions[Math.floor(Math.random() * promptSuggestions.length)];
    setPrompt(randomSuggestion);
    toast.success("🎲 Random prompt generated!");
  };

  return (
    <div className="space-y-6">
      {/* AI Personality Selector */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Bot className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium gradient-text">AI Personality</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {aiPersonalities.map((personality, index) => (
            <motion.button
              key={personality.name}
              className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                selectedPersonality.name === personality.name
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
              onClick={() => {
                setSelectedPersonality(personality);
                toast.success(`🧠 ${personality.name} personality selected!`);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{personality.icon}</span>
                <div>
                  <div className="font-medium text-sm">{personality.name}</div>
                  <div className="text-xs text-muted-foreground">{personality.style}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Main Input Area */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative">
          {/* Input Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium gradient-text">Neural Prompt Interface</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hologram-effect">
                <Cpu className="h-3 w-3 mr-1" />
                {charCount}/1000
              </Badge>
              {isTyping && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-primary rounded-full animate-pulse"
                />
              )}
            </div>
          </div>

          {/* Enhanced Textarea */}
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask ${selectedPersonality.name} to create something extraordinary...`}
              className="min-h-[120px] resize-none cyber-button text-base p-4 pr-12"
              maxLength={1000}
              disabled={isLoading}
            />
            
            {/* Animated border effect */}
            <motion.div
              className="absolute inset-0 border-2 border-primary/30 rounded-lg pointer-events-none"
              animate={isTyping ? {
                boxShadow: [
                  '0 0 0 rgba(120, 119, 198, 0.3)',
                  '0 0 20px rgba(120, 119, 198, 0.6)',
                  '0 0 0 rgba(120, 119, 198, 0.3)'
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Voice Input Indicator */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="flex items-center gap-2 text-primary"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Mic className="h-6 w-6" />
                    <span className="font-medium">Listening...</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="cyber-button"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Suggestions
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={generateRandomPrompt}
                className="cyber-button"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Random
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={isListening ? "destructive" : "outline"}
                size="sm"
                onClick={toggleVoiceInput}
                className={isListening ? "animate-pulse" : "cyber-button"}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Voice
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            animate={isLoading ? { scale: [1, 1.05, 1] } : {}}
            transition={isLoading ? { duration: 1, repeat: Infinity } : {}}
          >
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isLoading}
              className={`cyber-button glow-on-hover ${isLoading ? 'animate-pulse' : ''}`}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Suggestions Panel */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium gradient-text">Suggested Prompts</span>
            </div>
            <div className="grid gap-2">
              {promptSuggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  className="p-3 text-left border border-border hover:border-primary/50 hover:bg-primary/5 rounded-lg transition-all duration-300 text-sm"
                  onClick={() => insertSuggestion(suggestion)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Indicator */}
      <motion.div 
        className="flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span>Neural interface ready • {selectedPersonality.name} personality active</span>
        </div>
      </motion.div>
    </div>
  );
} 