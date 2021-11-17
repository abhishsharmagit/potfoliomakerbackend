export interface JWTPayload {
  id: string;
  username: string;
}
export const dev = process.env.NODE_ENV !== 'production';
