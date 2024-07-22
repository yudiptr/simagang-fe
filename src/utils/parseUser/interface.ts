export type ParsedUser = {
    id: string;
    username: string;
    role: 'Admin' | 'USER';
    is_complete: boolean;
  };
  