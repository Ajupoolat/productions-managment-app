import React, { useEffect } from 'react';
import { FormModal } from '../../../shared/components/ui/Modal/FormModal';
import { Select } from '../../../shared/components/ui/Form/Select';
import { useAssignCastModal } from '../hooks/useAssignCastModal';
import { Loader2 } from 'lucide-react';

interface AssignCastModalProps {
  productionId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AssignCastModal({
  productionId,
  isOpen,
  onClose,
}: AssignCastModalProps) {
  const {
    availableUsers,
    characters,

    selectedUser,
    selectedCharacter,

    setSelectedUser,
    setSelectedCharacter,

    isLoadingUsers,
    isLoadingCharacters,
    isSubmitting,

    error,

    handleSubmit,
    resetForm,
  } = useAssignCastModal(productionId, isOpen);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  if (!isOpen) return null;

  const isLoadingData =
    isLoadingUsers || isLoadingCharacters;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await handleSubmit();

    if (success) {
      resetForm();
      onClose();
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Cast Member"
      onSubmit={handleFormSubmit}
      isSubmitting={isSubmitting}
      submitText="Confirm Assignment"
      submitDisabled={
        isLoadingData ||
        !selectedUser ||
        !selectedCharacter ||
        characters.length === 0
      }
    >
      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Actor */}
      <div>
        <label
          htmlFor="cast-user"
          className="mb-1 block text-sm font-medium text-slate-400"
        >
          Select Actor
        </label>

        {isLoadingUsers ? (
          <div className="flex h-10 items-center gap-2 rounded-md border border-slate-600 bg-slate-900 px-3 text-sm text-slate-400">
            <Loader2 size={16} className="animate-spin" />
            Loading actors...
          </div>
        ) : (
          <Select
            id="cast-user"
            required
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="" disabled>
              Choose an actor
            </option>

            {availableUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullName} ({user.email})
              </option>
            ))}
          </Select>
        )}
        {!isLoadingUsers && availableUsers.length === 0 && (
          <p className="mt-1 text-xs text-red-400">
            No available cast members found.          </p>
        )}
      </div>

      {/* Character */}
      <div>
        <label
          htmlFor="character"
          className="mb-1 block text-sm font-medium text-slate-400"
        >
          Select Character
        </label>

        {isLoadingCharacters ? (
          <div className="flex h-10 items-center gap-2 rounded-md border border-slate-600 bg-slate-900 px-3 text-sm text-slate-400">
            <Loader2 size={16} className="animate-spin" />
            Loading characters...
          </div>
        ) : (
          <Select
            id="character"
            required
            value={selectedCharacter}
            onChange={(e) => setSelectedCharacter(e.target.value)}
            error={characters.length === 0}
          >
            <option value="" disabled>
              Choose a character
            </option>

            {characters.map((character) => (
              <option key={character._id} value={character._id}>
                {character.name}
              </option>
            ))}
          </Select>
        )}

        {!isLoadingCharacters && characters.length === 0 && (
          <p className="mt-1 text-xs text-red-400">
           No characters created yet. Please create a character first before assigning cast.
          </p>
        )}
      </div>
    </FormModal>
  );
}