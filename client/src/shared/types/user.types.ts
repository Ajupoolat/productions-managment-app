export interface User {
  _id: string;
  fullName: string;
  email: string;
  status: string;
  isActive: boolean;
  roleId?: {
    _id: string;
    name: string;
    permissionIds?: Array<{ _id: string; key: string; description?: string }>;
  };
  contractorType?: string;
}