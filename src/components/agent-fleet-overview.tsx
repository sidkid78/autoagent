import { CognitiveState } from "@/lib/types";
import { AgentCard } from "./agent-card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Grid, List, Filter, Search } from "lucide-react";
import { useState } from "react";

interface AgentFleetOverviewProps {
  agents: CognitiveState[];
}

export function AgentFleetOverview({ agents }: AgentFleetOverviewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAgents = agents.filter(agent => {
    if (filterStatus === 'all') return true;
    return agent.currentPhase === filterStatus;
  });

  const statusCounts = agents.reduce((acc, agent) => {
    acc[agent.currentPhase] = (acc[agent.currentPhase] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Fleet Controls */}
      <div className="mind-blowing-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold gradient-text">Agent Fleet</h2>
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-black/20">
              <Button
                variant={viewMode === 'grid' ? 'cyber' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'cyber' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge
            className={`cursor-pointer transition-colors ${
              filterStatus === 'all' ? 'hologram-effect text-blue-400' : 'text-visible opacity-70 hover:opacity-100'
            }`}
            onClick={() => setFilterStatus('all')}
          >
            All ({agents.length})
          </Badge>
          {Object.entries(statusCounts).map(([status, count]) => (
            <Badge
              key={status}
              className={`cursor-pointer transition-colors capitalize ${
                filterStatus === status ? 'hologram-effect text-blue-400' : 'text-visible opacity-70 hover:opacity-100'
              }`}
              onClick={() => setFilterStatus(status)}
            >
              {status} ({count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Agent Grid */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
      }>
        {filteredAgents.map((agent, index) => (
          <AgentCard key={agent.currentCycle + index} agent={agent} />
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="mind-blowing-card p-8 text-center">
          <Search className="h-12 w-12 mx-auto mb-4 text-blue-400 opacity-50" />
          <h3 className="text-lg font-semibold text-visible mb-2">No agents found</h3>
          <p className="text-visible opacity-70">Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  );
} 