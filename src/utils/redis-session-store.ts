import session from "express-session";

class RedisSessionStore extends session.Store {
  override get(
    sid: string,
    callback: (err: any, session?: session.SessionData | null) => void,
  ): void {
    throw new Error("Method not implemented.");
  }
  override set(
    sid: string,
    session: session.SessionData,
    callback?: (err?: any) => void,
  ): void {
    throw new Error("Method not implemented.");
  }
  override destroy(sid: string, callback?: (err?: any) => void): void {
    throw new Error("Method not implemented.");
  }
}
