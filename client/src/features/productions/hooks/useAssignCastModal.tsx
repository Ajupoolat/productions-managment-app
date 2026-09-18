import { useEffect, useState,useCallback } from 'react';
import { useAssignments } from '../hooks/useAssignments';
import { useCharacters } from '../hooks/useCharacters';
import { getAvailableTalent } from '../../users/services/user.service';
import type { User } from '../../../shared/types/user.types';

export function useAssignCastModal(productionId: string, isOpen: boolean) {
  const { addCastAssignment } = useAssignments(productionId);

  const {
    characters,
    isLoading: isLoadingCharacters,
  } = useCharacters(productionId);

  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('');

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      setError(null);

      try {
        const users = await getAvailableTalent('CAST');
        setAvailableUsers(users);
      } catch (err) {
        console.error(err);
        setError('Failed to load available actors. Please try again.');
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedUser || !selectedCharacter) {
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const success = await addCastAssignment({
        userId: selectedUser,
        characterId: selectedCharacter,
      });

      if (success) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      setError('Failed to assign cast member. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

 const resetForm = useCallback(() => {
  setSelectedUser('');
  setSelectedCharacter('');
  setError(null);
}, []);

  return {
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
  };
}