import LoadingSpinner from '../../../shared/components/ui/Loading/LoadingSpinner';
import { Pagination } from '../../../shared/components/ui/DataView/Pagination';

import { useProductions } from '../hooks/useProductions';

import { ProductionCard } from './ProductionCard';
import { EmptyProductions } from './EmptyProductions';

interface ProductionListProps {
  refreshTrigger?: number;
  paramsObject?: any;
}

export function ProductionList({
  refreshTrigger = 0,
  paramsObject,
}: ProductionListProps) {
  const {
    productions,
    isLoading,
    meta,
  } = useProductions({
    refreshTrigger,
    paramsObject,
  });

  if (isLoading) {
    return (
      <div className="glass-panel p-12 rounded-xl text-center">
        <LoadingSpinner
          size={32}
          className="text-violet-500"
          classNameContainer=""
        />

        <p className="text-slate-400 mt-4">
          Loading your productions...
        </p>
      </div>
    );
  }

  if (productions.length === 0) {
    return <EmptyProductions />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">      
      {productions.map((production) => (
        <ProductionCard
          key={production._id}
          production={production}
        />
      ))}
      </div>
      
      {meta && meta.totalPages > 1 && (
        <div className="mt-6 max-w-5xl">
          <Pagination totalPages={meta.totalPages} />
        </div>
      )}
    </>
  );
}