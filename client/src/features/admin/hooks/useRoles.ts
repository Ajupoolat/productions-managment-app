import { useState, useEffect } from 'react';
import * as adminService from '../services/admin.service';
import { toast } from 'sonner';

export interface Role {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await adminService.getAllRoles();
        setRoles(rolesData);
      } catch (error) {
        toast.error('Failed to fetch available roles');
        console.error('Error fetching roles:', error);
      } finally {
        setIsLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, isLoadingRoles };
};
