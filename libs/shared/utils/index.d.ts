export interface SessionTokenPayload {
  sessionId: string;
  siteId: string;
  accountId: string;
  domain: string;
  iat?: number;
  exp?: number;
}

declare module 'express' {
  interface Request {
    session?: SessionTokenPayload
  }
}
