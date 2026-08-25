  export const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'DEVELOPMENT': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'PRE_PRODUCTION': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      'PRODUCTION': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'POST_PRODUCTION': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'COMPLETED': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
      'ARCHIVED': 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    return colors[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  };