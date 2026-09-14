import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { createCharacter, getCharacters, updateCharacter, deleteCharacter } from '../services/character.service';
import type { Character } from '../types/production.types';

export function useCharacters(productionId: string) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCharacters = useCallback(async () => {
    if (!productionId) return;
    try {
      setIsLoading(true);
      const data = await getCharacters(productionId);
      setCharacters(data);
    } catch (error) {
      toast.error('Failed to fetch characters');
    } finally {
      setIsLoading(false);
    }
  }, [productionId]);

  const addCharacter = async (data: Partial<Character>) => {
    try {
      const newChar = await createCharacter(productionId, data);
      setCharacters((prev) => [...prev, newChar]);
      toast.success('Character added successfully');
      return newChar;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add character');
      return null;
    }
  };

  const editCharacter = async (id: string, data: Partial<Character>) => {
    try {
      const updated = await updateCharacter(productionId, id, data);
      setCharacters((prev) => prev.map((c) => (c._id === id ? updated : c)));
      toast.success('Character updated successfully');
      return updated;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update character');
      return null;
    }
  };

  const removeCharacter = async (id: string) => {
    try {
      await deleteCharacter(productionId, id);
      setCharacters((prev) => prev.filter((c) => c._id !== id));
      toast.success('Character deleted successfully');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete character');
      return false;
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return { characters, isLoading, addCharacter, editCharacter, removeCharacter, fetchCharacters };
}
