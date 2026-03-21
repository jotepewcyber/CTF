export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string | null;
  course?: string;
  branch?: string;
  year?: number | null;
  role?: string;
};
