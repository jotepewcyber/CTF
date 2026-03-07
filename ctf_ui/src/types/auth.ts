export type SignupForm = {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar_url?: string; // optional
  course?: string; // optional
  branch?: string; // optional
  year?: string; // optional, or use number if you want, e.g. year?: number
  role?: string; // optional
};
