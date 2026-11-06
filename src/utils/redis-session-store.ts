import session, { type SessionData } from "express-session";
import { redis } from "..";

const PREFIX = "sess:";
const DEFAULT_TTL_SECONDS = 24 * 60 * 60;

export default class RedisSessionStore extends session.Store {
  private key(sid: string): string {
    return PREFIX + sid;
  }

  private ttl(session: SessionData): number {
    const exp = session.cookie.expires;
    if (!exp) return DEFAULT_TTL_SECONDS;
    const seconds = Math.ceil((new Date(exp).getTime() - Date.now()) / 1000);
    return Math.max(seconds, 1);
  }

  override get(
    sid: string,
    callback: (err: any, session?: session.SessionData | null) => void,
  ): void {
    redis.get(this.key(sid)).then(
      (raw) => {
        if (!raw) return callback(null, null);
        let data: SessionData;
        try {
          data = JSON.parse(raw);
        } catch (err) {
          return callback(err);
        }
        callback(null, data);
      },
      (err) => callback(err),
    );
  }

  override set(
    sid: string,
    session: session.SessionData,
    callback?: (err?: any) => void,
  ): void {
    redis
      .set(this.key(sid), JSON.stringify(session), { EX: this.ttl(session) })
      .then(
        () => callback?.(null),
        (err) => callback?.(err),
      );
  }
  override destroy(sid: string, callback?: (err?: any) => void): void {
    redis.del(this.key(sid)).then(
      () => callback?.(null),
      (err) => callback?.(err),
    );
  }

  override touch(
    sid: string,
    session: SessionData,
    callback?: () => void,
  ): void {
    redis.expire(this.key(sid), this.ttl(session)).then(
      () => callback?.(),
      () => callback?.(),
    );
  }
}
