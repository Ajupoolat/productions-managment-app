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

export interface Character {
  _id: string;
  productionId: string;
  name: string;
  description?: string;
}

export interface Department {
  _id: string;
  productionId: string;
  name: string;
  description?: string;
}

export interface Work {
  _id: string;
  productionId: string;
  departmentId: string | Department;
  title: string;
  description?: string;
}

export interface CastAssignment {
  _id: string;
  productionId: string;
  userId: any; // User type
  characterId: Character;
  status: string;
  assignedAt: string;
}

export interface CrewAssignment {
  _id: string;
  productionId: string;
  userId: any; // User type
  departmentId: Department;
  workId: Work;
  status: string;
  assignedAt: string;
}
