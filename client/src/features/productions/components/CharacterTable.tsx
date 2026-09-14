import { useState, useMemo } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { CharacterModal } from './CharacterModal';
import { ConfirmModal } from '../../../shared/components/ui/Modal/ConfirmModal';
import { DataTable } from '../../../shared/components/ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { Character } from '../types/production.types';
import { features } from '../../../shared/components/ui/DataTable';

export function CharacterTable({ productionId }: { productionId: string }) {
  const { characters, isLoading, removeCharacter } = useCharacters(productionId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [characterToDelete, setCharacterToDelete] = useState<Character | null>(null);

  const columns = useMemo<ColumnDef<typeof features,Character>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <span className="text-slate-400">{row.original.description || '-'}</span>,
      },
      {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-end">
            <button
              onClick={() => { setSelectedCharacter(row.original); setIsModalOpen(true); }}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => setCharacterToDelete(row.original)}
              className="p-2 text-red-500/70 hover:text-red-400 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Characters</h3>
        <button
          onClick={() => { setSelectedCharacter(null); setIsModalOpen(true); }}
          className="btn-primary px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={16} /> Add Character
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={characters} 
        isLoading={isLoading} 
        emptyMessage="No characters found. Create one to get started!" 
      />

      {isModalOpen && (
        <CharacterModal
          productionId={productionId}
          character={selectedCharacter}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {characterToDelete && (
        <ConfirmModal
          isOpen={!!characterToDelete}
          onClose={() => setCharacterToDelete(null)}
          onConfirm={() => removeCharacter(characterToDelete._id)}
          title="Delete Character"
          message={`Are you sure you want to delete ${characterToDelete.name}? This action cannot be undone.`}
          isDestructive={true}
        />
      )}
    </div>
  );
}
