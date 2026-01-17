export interface UserDTO {
  id: number;
  name: string | null;
  messengerId: string;
  isActive: boolean;
  createdAt: Date;
}
