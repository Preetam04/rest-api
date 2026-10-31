import type { PrismaClient } from "@prisma/client/extension";
import session, { type SessionData } from "express-session";
import { prisma } from "../db/prisma";

export class PrismaSessionStore extends session.Store {
  get(
    sid: string,
    callback: (err: any, session?: session.SessionData | null) => void,
  ): void {
    prisma.session
      .findUnique({ where: { sid } })
      .then((row) => {
        if (!row || row.expiresAt <= new Date()) return callback(null, null);
        callback(null, row.data as unknown as SessionData);
      })
      .catch(callback);
  }

  set(sid: string, session: SessionData, callback?: (err?: any) => void): void {
    const data = JSON.parse(JSON.stringify(session)); // plain JSON for the Json column    const expiresAt = session.cookie.
  }
}
