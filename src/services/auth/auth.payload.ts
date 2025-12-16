export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterApiPayload = {
  username: string;
  password: string;
  email: string;
  role: "BUYER" | "SELLER";
  name: string;
  phoneNumber: string;
};
