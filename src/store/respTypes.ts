import { ActionPayload } from './index'
export interface RespData<T = {}> {
  errno: number;
  data: T;
  message?: string;
  payload?: ActionPayload;
}