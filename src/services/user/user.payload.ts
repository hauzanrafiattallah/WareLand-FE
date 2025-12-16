export interface UpdateUserPayload {
  name: string;
  email: string;
  phoneNumber: string;
  oldPassword?: string;
  newPassword?: string;
}
