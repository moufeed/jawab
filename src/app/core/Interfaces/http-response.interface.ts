/**
 * http Response Provider
 */
export interface ResponseProvider<T> {
  data: T;
  success: boolean;
  status: string;
  status_code: number;
  message: any;
  trace_id: any;
  error_code: any;
  errors: any;
}
