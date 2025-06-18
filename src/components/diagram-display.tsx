"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Share2 } from "lucide-react";

mermaid.initialize({
  startOnLoad: true,
  theme: "neutral",
  securityLevel: "loose",
});

interface DiagramDisplayProps {
  diagram: string;
}

export function DiagramDisplay({ diagram }: DiagramDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && diagram && containerRef.current) {
      mermaid.render(`mermaid-graph-${Date.now()}`, diagram)
        .then(({ svg }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        })
        .catch(e => console.error("Mermaid rendering error:", e));
    }
  }, [diagram, isClient]);

  const renderContent = () => {
    if (!isClient) {
      return <div className="text-center text-gray-500">Loading diagram...</div>;
    }
    if (!diagram) {
        return <div className="text-center text-gray-500">No diagram generated.</div>
    }
    return <div ref={containerRef} className="w-full h-full" />;
  };

  return (
    <Card className="h-full">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5"/>
                <span>Architecture Diagram</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            {renderContent()}
        </CardContent>
    </Card>
  );
} 