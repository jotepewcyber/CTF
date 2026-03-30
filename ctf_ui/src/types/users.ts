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
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
};

// ✅ Only editable fields
export type EditableUserFields = Pick<
  User,
  | "username"
  | "first_name"
  | "last_name"
  | "email"
  | "branch"
  | "course"
  | "year"
  | "avatar_url"
>;

// ✅ Read-only fields (cannot be edited)
export type ReadOnlyUserFields = Pick<
  User,
  "role" | "is_active" | "is_staff" | "is_superuser" | "last_login"
>;
