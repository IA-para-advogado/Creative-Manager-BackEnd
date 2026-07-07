export interface ServiceResponse<T = any> {
  success: boolean;
  status?: number;
  data?: T;
  message?: string;
  error?: string;
}
