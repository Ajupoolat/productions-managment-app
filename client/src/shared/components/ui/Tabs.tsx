import type { ReactNode } from 'react';
import { useQueryParams } from '../../hooks/useQueryParams';

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  paramKey?: string;
}

export function Tabs({ tabs, defaultTab, paramKey = 'tab' }: TabsProps) {
  const { getParam, setParam } = useQueryParams();
  
  const activeTabId = getParam(paramKey) || defaultTab || (tabs.length > 0 ? tabs[0].id : '');
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const handleTabChange = (id: string) => {
    setParam(paramKey, id);
  };

  if (!activeTab) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'bg-violet-500/20 text-violet-400' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="animate-in fade-in zoom-in duration-300">
        {activeTab.content}
      </div>
    </div>
  );
}
