export interface User {
  id: string;
  firstName: string;
  lastName: string;
  profile_picture: string;
  profile_pic_id: string;
  bio: string;

  // Authentication & Security
  email: string;
  password: string;
  token: string;
  role: string;
  blocked: boolean;

  activeTradeAccountId: string;
}
