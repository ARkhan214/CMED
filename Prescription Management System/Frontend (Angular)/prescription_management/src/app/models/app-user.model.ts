import { Status } from "./status.enum";

export interface AppUser {
  id?: number;
  username: string;
  password: string;
  role?: string;          // Optional, default "USER"
  email: string;
  phone?: string;
  gender?: string;
  status?: Status;        // Enum
  study?: string;
  chamber?: string;
}
