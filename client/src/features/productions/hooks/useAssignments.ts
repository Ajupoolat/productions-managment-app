import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { assignCast, getCastAssignments, assignCrew, getCrewAssignments } from '../services/production.service';
import type { CastAssignment, CrewAssignment } from '../types/production.types';

export function useAssignments(productionId: string) {
  const [castAssignments, setCastAssignments] = useState<CastAssignment[]>([]);
  const [crewAssignments, setCrewAssignments] = useState<CrewAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCast = useCallback(async () => {
    if (!productionId) return;
    try {
      const data = await getCastAssignments(productionId);
      setCastAssignments(data);
    } catch (error) {
      toast.error('Failed to fetch cast assignments');
    }
  }, [productionId]);

  const fetchCrew = useCallback(async () => {
    if (!productionId) return;
    try {
      const data = await getCrewAssignments(productionId);
      setCrewAssignments(data);
    } catch (error) {
      toast.error('Failed to fetch crew assignments');
    }
  }, [productionId]);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([fetchCast(), fetchCrew()]);
    setIsLoading(false);
  }, [fetchCast, fetchCrew]);

  const addCastAssignment = async (data: { userId: string, characterId: string }) => {
    try {
      const newAssignment = await assignCast(productionId, data);
      await fetchCast(); // Re-fetch to get populated fields
      toast.success('Cast assigned successfully');
      return newAssignment;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to assign cast');
      return null;
    }
  };

  const addCrewAssignment = async (data: { userId: string, departmentId: string, workId: string }) => {
    try {
      const newAssignment = await assignCrew(productionId, data);
      await fetchCrew(); // Re-fetch to get populated fields
      toast.success('Crew assigned successfully');
      return newAssignment;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to assign crew');
      return null;
    }
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    castAssignments,
    crewAssignments,
    isLoading,
    addCastAssignment,
    addCrewAssignment,
    fetchCast,
    fetchCrew
  };
}
