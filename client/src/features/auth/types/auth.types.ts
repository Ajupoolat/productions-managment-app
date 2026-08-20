// Auth feature types

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      fullName: string;
      email: string;
      status: string;
      isActive: boolean;
      roleId?: any;
      contractorType?: string;
    };
  };
}
