export interface ProductionManager {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Production {
  _id: string;
  name: string;
  description?: string;
  status: 'DEVELOPMENT' | 'PRE_PRODUCTION' | 'PRODUCTION' | 'POST_PRODUCTION' | 'COMPLETED' | 'ARCHIVED';
  startDate?: string;
  endDate?: string;
  budget?: number;
  productionManagerId?: string | ProductionManager;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
