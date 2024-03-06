// UserData.ts
export interface UserData {
  id: number;
  admin: string;
  firstName: string;
  lastName: string;
  startTime: string;
  endTime: string;
  department: string;
  skills: string[];
  email: string;
  avatar: string | null;
}
