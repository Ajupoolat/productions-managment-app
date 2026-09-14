import { useState } from 'react';
import { useParams, Link, useNavigate, Outlet, NavLink } from 'react-router-dom';
import { Film, ArrowLeft, Edit2, Trash2, LayoutDashboard, Users, HardHat, MapPin, DollarSign, Shirt } from 'lucide-react';
import { useProductions } from '../../features/productions/hooks/useProductions';
import LoadingSpinner from '../../shared/components/ui/Loading/LoadingSpinner';
import { getStatusColor } from '../../features/admin/utils/statusColor.utils';
import { ConfirmModal } from '../../shared/components/ui/Modal/ConfirmModal';
import { CreateProductionModal } from '../../features/productions/components/CreateProductionModal';

export default function ProductionDashboardLayout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { production, isLoading, deleteProduction, fetchProductionById } = useProductions({ id });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isLoading) {
    return <LoadingSpinner className='text-violet-500' size={32} classNameContainer='h-[80vh]' />;
  }

  if (!production) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <p className="text-slate-400">Production not found.</p>
        <Link to="/productions" className="text-violet-400 hover:underline mt-4 inline-block">
          Return to productions list
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    const success = await deleteProduction(production._id);
    if (success) {
      navigate('/productions');
    }
  };

  const navItems = [
    { label: 'Overview', path: `/productions/${id}`, icon: LayoutDashboard, end: true },
    { label: 'Cast', path: `/productions/${id}/cast`, icon: Users, end: false },
    { label: 'Crew', path: `/productions/${id}/crew`, icon: HardHat, end: false },
    { label: 'Locations', path: `/productions/${id}/locations`, icon: MapPin, end: false },
    { label: 'Fund Requests', path: `/productions/${id}/funds`, icon: DollarSign, end: false },
    { label: 'Costumes', path: `/productions/${id}/costumes`, icon: Shirt, end: false },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between shrink-0">
        <div>
          <Link
            to="/productions"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 text-sm"
          >
            <ArrowLeft size={16} />
            Back to Productions
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <Film className="text-violet-400" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">{production.name}</h1>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border tracking-wide uppercase ${getStatusColor(production.status)}`}>
                {production.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors font-medium text-sm"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors font-medium text-sm border border-red-500/20"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="shrink-0 border-b border-slate-800/60 overflow-x-auto pb-1">
        <nav className="flex items-center gap-2 min-w-max">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-colors text-sm font-medium border-b-2 ${
                  isActive
                    ? 'border-violet-500 text-violet-400 bg-violet-500/10'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pb-12">
        <Outlet context={{ production }} />
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Production"
        message={`Are you sure you want to delete ${production.name}? This action cannot be undone and will permanently remove all associated data.`}
        confirmText="Delete Production"
        isDestructive={true}
      />

      {isEditModalOpen && (
        <CreateProductionModal
          initialData={production}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            if (id) {
              fetchProductionById(id);
            }
          }}
        />
      )}
    </div>
  );
}
