import React, { useState, useEffect } from 'react';
import { FormModal } from '../../../shared/components/ui/Modal/FormModal';
import { useAssignments } from '../hooks/useAssignments';
import { useCharacters } from '../hooks/useCharacters';
import { getAvailableTalent } from '../../users/services/user.service';

interface AssignCastModalProps {
  productionId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AssignCastModal({ productionId, isOpen, onClose }: AssignCastModalProps) {
  const { addCastAssignment } = useAssignments(productionId);
  const { characters } = useCharacters(productionId);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getAvailableTalent('CAST').then(setAvailableUsers);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await addCastAssignment({ userId: selectedUser, characterId: selectedCharacter });
    setIsSubmitting(false);
    if (success) onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Cast Member"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitText="Confirm Assignment"
      submitDisabled={characters.length === 0}
    >
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Select Actor</label>
        <select
          required
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
        >
          <option value="" disabled>-- Choose an actor --</option>
          {availableUsers.map((user) => (
            <option key={user._id} value={user._id}>{user.fullName} ({user.email})</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Select Character</label>
        <select
          required
          value={selectedCharacter}
          onChange={(e) => setSelectedCharacter(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
        >
          <option value="" disabled>-- Choose a character --</option>
          {characters.map((char) => (
            <option key={char._id} value={char._id}>{char.name}</option>
          ))}
        </select>
        {characters.length === 0 && (
          <p className="text-xs text-red-400 mt-1">Please create a character first before assigning.</p>
        )}
      </div>
    </FormModal>
  );
}
