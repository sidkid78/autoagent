"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SafetyAlert } from "@/lib/types";
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck,
  AlertTriangle,
  Info,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

interface SafetyMonitorProps {
  safetyAlerts: SafetyAlert[];
}

const alertIcons = {
  info: Info,
  warning: AlertTriangle,
  critical: AlertCircle,
};



const alertBadgeColors = {
  info: "bg-blue-500",
  warning: "bg-yellow-500", 
  critical: "bg-red-500",
};

export function SafetyMonitor({ safetyAlerts }: SafetyMonitorProps) {
  const formatTimestamp = (timestamp: number) => {
    const elapsed = Date.now() - timestamp;
    if (elapsed < 60000) return `${Math.floor(elapsed / 1000)}s ago`;
    if (elapsed < 3600000) return `${Math.floor(elapsed / 60000)}m ago`;
    return `${Math.floor(elapsed / 3600000)}h ago`;
  };

  const activeAlerts = safetyAlerts.filter(alert => !alert.resolved);
  const resolvedAlerts = safetyAlerts.filter(alert => alert.resolved);
  
  const criticalCount = activeAlerts.filter(alert => alert.level === 'critical').length;
  const warningCount = activeAlerts.filter(alert => alert.level === 'warning').length;
  const infoCount = activeAlerts.filter(alert => alert.level === 'info').length;

  const getOverallStatus = () => {
    if (criticalCount > 0) return { status: 'critical', icon: ShieldAlert, text: 'Critical Issues' };
    if (warningCount > 0) return { status: 'warning', icon: ShieldAlert, text: 'Warnings Active' };
    return { status: 'safe', icon: ShieldCheck, text: 'All Systems Safe' };
  };

  const overallStatus = getOverallStatus();

  return (
    <Card className="h-full mind-blowing-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-5 w-5 text-visible" />
          <h3 className="text-lg font-semibold gradient-text">Safety Monitor</h3>
          <div className="ml-auto flex items-center gap-2">
            <overallStatus.icon 
              className={`h-4 w-4 ${
                overallStatus.status === 'critical' ? 'text-red-500' :
                overallStatus.status === 'warning' ? 'text-yellow-500' :
                'text-green-500'
              }`}
            />
            <Badge 
              variant="outline"
              className={`hologram-effect ${
                overallStatus.status === 'critical' ? 'border-red-500 text-red-700' :
                overallStatus.status === 'warning' ? 'border-yellow-500 text-yellow-700' :
                'border-green-500 text-green-700'
              }`}
            >
              {overallStatus.text}
            </Badge>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3 memory-card rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-visible">Critical</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{criticalCount}</div>
          </div>
          
          <div className="p-3 memory-card rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-visible">Warning</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{warningCount}</div>
          </div>
          
          <div className="p-3 memory-card rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-visible">Info</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{infoCount}</div>
          </div>
        </div>

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-3 flex items-center gap-2 text-visible">
              <AlertTriangle className="h-4 w-4 text-visible" />
              Active Alerts ({activeAlerts.length})
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {activeAlerts
                .sort((a, b) => {
                  const levelOrder = { critical: 0, warning: 1, info: 2 };
                  return levelOrder[a.level] - levelOrder[b.level];
                })
                .map((alert, index) => {
                  const Icon = alertIcons[alert.level];
                  
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 rounded-lg border-2 transition-all duration-300 memory-card"
                    >
                                              <div className="flex items-start gap-3">
                        <Icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-visible" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${alertBadgeColors[alert.level]}`}></div>
                            <span className="text-xs font-medium uppercase tracking-wide text-visible">
                              {alert.level}
                            </span>
                            <div className="text-xs text-visible opacity-70 ml-auto">
                              {formatTimestamp(alert.timestamp)}
                            </div>
                          </div>
                          <div className="text-sm font-medium mb-1 text-visible">{alert.message}</div>
                          <div className="text-xs text-visible opacity-70">
                            Source: {alert.source}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        )}

        {/* No Active Alerts */}
        {activeAlerts.length === 0 && (
          <div className="mb-6 p-4 memory-card rounded-lg border border-green-500/30">
            <div className="flex items-center gap-2 text-green-400">
              <ShieldCheck className="h-5 w-5" />
              <span className="font-medium">All systems operating safely</span>
            </div>
            <div className="text-sm text-green-300 mt-1">
              No active safety alerts or interventions required.
            </div>
          </div>
        )}

        {/* Recent Resolved Alerts */}
        {resolvedAlerts.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2 text-visible">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Recently Resolved ({resolvedAlerts.slice(0, 3).length})
            </h4>
            <div className="space-y-2">
              {resolvedAlerts
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 3)
                .map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-2 context-variable rounded border border-green-500/20"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                      <span className="flex-1 text-visible truncate">{alert.message}</span>
                      <span className="text-xs text-visible opacity-70">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Safety System Status */}
        <div className="mt-6 p-4 memory-card rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-visible opacity-70">Safety System:</span>
              <div className="font-medium text-green-400">Active</div>
            </div>
            <div>
              <span className="text-visible opacity-70">Last Check:</span>
              <div className="font-medium text-visible">Just now</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 