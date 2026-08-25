import { useState } from 'react';
import { Film, Plus } from 'lucide-react';
import { CreateProductionModal } from '../components/CreateProductionModal';
import { ProductionList } from '../components/ProductionList';
import { useQueryParams } from '../../../shared/hooks/useQueryParams';
import { SearchBar } from '../../../shared/components/ui/DataView/SearchBar';
import { FilterDropdown } from '../../../shared/components/ui/DataView/FilterDropdown';
import { ProductionStatus } from '../../../constants/production-status';

export default function ProductionsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { paramsObject } = useQueryParams();

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setIsCreateModalOpen(false);
  };

  const statusOptions = Object.values(ProductionStatus).map(status => ({
    label: status.replace(/_/g, ' '),
    value: status
  }));

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
            <Film className="text-violet-400" size={22} />
          </div>
          <h1 className="text-2xl font-bold text-white">Productions</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <FilterDropdown 
            paramKey="status" 
            options={statusOptions} 
            placeholder="All Statuses"
            className="w-40"
          />
          <SearchBar placeholder="Search productions..." />
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary flex items-center gap-2 whitespace-nowrap ml-2"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Create Production</span>
          </button>
        </div>
      </div>

      <ProductionList refreshTrigger={refreshTrigger} paramsObject={paramsObject} />

      {isCreateModalOpen && (
        <CreateProductionModal
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
