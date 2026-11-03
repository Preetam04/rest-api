import { Store, type SessionData } from "express-session";
import { prisma } from "../db/prisma";

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;

export class PrismaSessionStore extends Store {
  override get(
    sid: string,
    callback: (err: any, session?: SessionData | null) => void,
  ): void {
    prisma.session
      .findUnique({
        where: {
          sid,
        },
      })
      .then((row) => {
        if (!row || row.expiresAt <= new Date()) return callback(null, null);

        const data = JSON.parse(JSON.stringify(row.data));
        callback(null, data as SessionData);
      })
      .catch(callback);
  }

  override set(
    sid: string,
    session: SessionData,
    callback?: (err?: any) => void,
  ): void {
    const data = JSON.parse(JSON.stringify(session));
    const expiresAt = this.getExpiry(session);
    // console.log("[store] get", sid);

    // console.log(data);

    prisma.session
      .upsert({
        where: {
          sid,
        },
        create: {
          sid: sid,
          data,
          expiresAt,
        },
        update: {
          data,
          expiresAt,
        },
      })
      .then(() => {
        callback?.(null);
      })
      .catch((err) => {
        callback?.(err);
      });
  }

  override destroy(sid: string, callback?: (err?: any) => void): void {
    prisma.session
      .deleteMany({
        where: {
          sid,
        },
      })
      .then(() => callback?.(null))
      .catch((err) => callback?.(err));
  }

  override touch(
    sid: string,
    session: SessionData,
    callback?: () => void,
  ): void {
    prisma.session
      .updateMany({
        where: {
          sid,
        },
        data: {
          expiresAt: this.getExpiry(session),
        },
      })
      .then(() => callback?.())
      .catch((err) => callback?.());
  }

  private getExpiry(session: SessionData): Date {
    const date = session.cookie.expires;
    return date instanceof Date ? date : new Date(Date.now() + DEFAULT_TTL_MS);
  }
}
