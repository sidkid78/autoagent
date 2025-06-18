"use client";

import Editor, { OnChange } from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Play, 
  RotateCcw, 
  Download, 
  Share, 
  Brain,
  Sparkles,
  FileCode,
  Cpu,
  Activity
} from "lucide-react";
import { toast } from "react-hot-toast";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  onRun?: (code: string) => void;
}

const languages = [
  { value: "typescript", label: "TypeScript", icon: "🔷", color: "#3178c6" },
  { value: "javascript", label: "JavaScript", icon: "🟨", color: "#f7df1e" },
  { value: "python", label: "Python", icon: "🐍", color: "#3776ab" },
  { value: "rust", label: "Rust", icon: "🦀", color: "#000000" },
  { value: "go", label: "Go", icon: "🐹", color: "#00add8" },
  { value: "cpp", label: "C++", icon: "⚡", color: "#00599c" },
  { value: "java", label: "Java", icon: "☕", color: "#ed8b00" },
  { value: "csharp", label: "C#", icon: "🔷", color: "#239120" },
  { value: "html", label: "HTML", icon: "🌐", color: "#e34f26" },
  { value: "css", label: "CSS", icon: "🎨", color: "#1572b6" },
  { value: "json", label: "JSON", icon: "📄", color: "#000000" },
];

export function CodeEditor({ 
  initialCode = "// ✨ Start coding something amazing...\n// 🚀 The future is in your hands!", 
  language = "typescript",
  onChange,
  onRun 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isRunning, setIsRunning] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isAIMode, setIsAIMode] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    const lines = code.split('\n').length;
    const chars = code.length;
    setLineCount(lines);
    setCharCount(chars);
  }, [code]);

  const handleEditorChange: OnChange = (value) => {
    const newCode = value || "";
    setCode(newCode);
    if (onChange) {
      onChange(value);
    }
  };

  const handleRun = async () => {
    if (!onRun) return;
    
    setIsRunning(true);
    toast.success("🚀 Executing quantum code...", {
      style: {
        background: 'linear-gradient(135deg, #7c77c6, #ff77c6)',
        color: 'white',
      }
    });

    try {
      await onRun(code);
    } finally {
      setIsRunning(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${selectedLanguage === 'typescript' ? 'ts' : selectedLanguage === 'javascript' ? 'js' : selectedLanguage}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("📁 Code downloaded successfully!");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("📋 Code copied to clipboard!");
    } catch {
      toast.error("Failed to copy code");
    }
  };

  const handleReset = () => {
    setCode("// ✨ Fresh start...\n// 🚀 Create something extraordinary!");
    toast.success("🔄 Editor reset!");
  };

  const toggleAIMode = () => {
    setIsAIMode(!isAIMode);
    toast.success(isAIMode ? "🤖 AI Mode disabled" : "🧠 AI Mode activated!");
  };

  const formatCode = () => {
    // Simulate code formatting
    toast.success("✨ Code formatted!");
  };

  const selectedLang = languages.find(lang => lang.value === selectedLanguage);

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="neural-network-bg" />
      </div>

      {/* Enhanced Toolbar */}
      <motion.div 
        className="flex items-center justify-between p-4 border-b border-border/20 backdrop-blur-xl bg-background/80"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-48 cyber-button">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{selectedLang?.icon}</span>
                    <span>{selectedLang?.label}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="mind-blowing-card">
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} className="hover:bg-primary/20">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang.icon}</span>
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={isAIMode ? "default" : "outline"}
              size="sm"
              onClick={toggleAIMode}
              className={`cyber-button ${isAIMode ? 'glow-on-hover' : ''}`}
            >
              <Brain className="h-4 w-4 mr-2" />
              AI Mode
            </Button>
          </motion.div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="hologram-effect">
            <FileCode className="h-3 w-3 mr-1" />
            {lineCount} lines
          </Badge>
          <Badge variant="outline" className="hologram-effect">
            <Activity className="h-3 w-3 mr-1" />
            {charCount} chars
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={formatCode}
              className="cyber-button"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="cyber-button"
            >
              <Download className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="cyber-button"
            >
              <Share className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="cyber-button"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            animate={isRunning ? { scale: [1, 1.1, 1] } : {}}
            transition={isRunning ? { duration: 1, repeat: Infinity } : {}}
          >
            <Button
              onClick={handleRun}
              disabled={isRunning}
              className={`cyber-button glow-on-hover ${isRunning ? 'animate-pulse' : ''}`}
              size="sm"
            >
              {isRunning ? (
                <>
                  <Cpu className="h-4 w-4 mr-2 animate-spin" />
                  Running
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Editor Container with glow effects */}
      <div className="flex-1 relative">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Editor
            height="100%"
            language={selectedLanguage}
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
              wordWrap: "on",
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              renderLineHighlight: "all",
              lineNumbers: "on",
              glyphMargin: true,
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
              scrollbar: {
                vertical: "auto",
                horizontal: "auto",
                verticalScrollbarSize: 12,
                horizontalScrollbarSize: 12,
              },
              suggest: {
                showIcons: true,
                showSnippets: true,
                showWords: true,
                showColors: true,
                showFiles: true,
                showReferences: true,
                showFolders: true,
                showTypeParameters: true,
                showIssues: true,
                showUsers: true,
                showValues: true,
                showMethods: true,
                showFunctions: true,
                showConstructors: true,
                showFields: true,
                showVariables: true,
                showClasses: true,
                showStructs: true,
                showInterfaces: true,
                showModules: true,
                showProperties: true,
                showEvents: true,
                showOperators: true,
                showUnits: true,
                showKeywords: true,
              },
              quickSuggestions: {
                other: true,
                comments: true,
                strings: true,
              },
              acceptSuggestionOnCommitCharacter: true,
              acceptSuggestionOnEnter: "on",
              accessibilitySupport: "auto",
              autoIndent: "full",
              automaticLayout: true,
              codeLens: true,
              colorDecorators: true,
              contextmenu: true,
              copyWithSyntaxHighlighting: true,
              dragAndDrop: true,
              emptySelectionClipboard: true,
              find: {
                addExtraSpaceOnTop: true,
                autoFindInSelection: "never",
                seedSearchStringFromSelection: "always",
              },
              formatOnPaste: true,
              formatOnType: true,
              hover: {
                enabled: true,
                delay: 300,
                sticky: true,
              },
              links: true,
              mouseWheelZoom: true,
              multiCursorMergeOverlapping: true,
              multiCursorModifier: "alt",
              peekWidgetDefaultFocus: "tree",
              quickSuggestionsDelay: 10,
              renderControlCharacters: false,
              renderFinalNewline: "on",
              renderWhitespace: "selection",
              revealHorizontalRightPadding: 30,
              roundedSelection: true,
              rulers: [],
              scrollBeyondLastColumn: 5,
              selectOnLineNumbers: true,
              selectionClipboard: true,
              selectionHighlight: true,
              showFoldingControls: "mouseover",
              showUnused: true,
              snippetSuggestions: "top",
              tabCompletion: "on",
              useTabStops: true,
              wordBasedSuggestions: "matchingDocuments",
              wordSeparators: "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",
              wrappingIndent: "indent",
              wrappingStrategy: "advanced",
            }}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </motion.div>

        {/* AI Mode Overlay */}
        <AnimatePresence>
          {isAIMode && (
            <motion.div
              className="absolute top-4 right-4 bg-primary/20 backdrop-blur-md rounded-lg p-3 border border-primary/30"
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 text-sm">
                <Brain className="h-4 w-4 text-primary animate-pulse" />
                <span className="gradient-text font-medium">AI Assistant Active</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Press Ctrl+Space for suggestions
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status indicators */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-muted-foreground">Ready</span>
        </div>
      </div>
    </div>
  );
} 