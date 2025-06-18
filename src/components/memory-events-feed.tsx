import { motion } from "framer-motion";
import { MemoryEvent } from "@/lib/types";
import { Database, Pencil, Eye } from "lucide-react";

interface MemoryEventsFeedProps {
  events: MemoryEvent[];
}

const eventConfig = {
  read: { icon: Eye, color: "text-blue-500", bgColor: "bg-blue-50" },
  write: { icon: Pencil, color: "text-green-500", bgColor: "bg-green-50" },
};

const storeConfig = {
  working: { name: "Working" },
  episodic: { name: "Episodic" },
  semantic: { name: "Semantic" },
  short_term: { name: "Short-Term" },
};

export function MemoryEventsFeed({ events }: MemoryEventsFeedProps) {
  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 5) return "just now";
    if (seconds < 60) return `${seconds}s ago`;
    return `${Math.floor(seconds / 60)}m ago`;
  };

  return (
    <div>
      <h4 className="font-medium mb-3 flex items-center gap-2">
        <Database className="h-4 w-4" />
        <span>Memory Events</span>
      </h4>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {events.map((event, index) => {
          const { icon: Icon, color, bgColor } = eventConfig[event.type];
          const storeName = storeConfig[event.store].name;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-2.5 rounded-lg ${bgColor}`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-semibold capitalize ${color}`}>
                      {event.type} to {storeName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {timeAgo(event.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">
                    {event.content}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 