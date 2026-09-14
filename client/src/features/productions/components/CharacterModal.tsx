import React, { useState, useEffect } from 'react';
import { FormModal } from '../../../shared/components/ui/Modal/FormModal';
import { useCharacters } from '../hooks/useCharacters';
import type { Character } from '../types/production.types';

interface CharacterModalProps {
  productionId: string;
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterModal({ productionId, character, isOpen, onClose }: CharacterModalProps) {
  const { addCharacter, editCharacter } = useCharacters(productionId);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (character) {
      setName(character.name);
      setDescription(character.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [character]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let success = false;

    if (character) {
      success = !!(await editCharacter(character._id, { name, description }));
    } else {
      success = !!(await addCharacter({ name, description }));
    }

    setIsSubmitting(false);
    if (success) onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={character ? 'Edit Character' : 'Add Character'}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitText="Save Character"
    >
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
          placeholder="E.g., John Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
          placeholder="Brief description of the character"
          rows={3}
        />
      </div>
    </FormModal>
  );
}
