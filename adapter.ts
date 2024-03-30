import type { Adapter, AdapterAccount, AdapterUser } from "next-auth/adapters";

type Awaitable<T> = T | PromiseLike<T>;

export default {
  async createUser(user: AdapterUser): Awaitable<AdapterUser> {
    return user;
  },
  async getUser(id: string): Awaitable<AdapterUser | null> {
    return null;
  },
  async getUserByEmail(email: string): Awaitable<AdapterUser | null> {
    return null;
  },
  async getUserByAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Awaitable<AdapterUser | null> {
    return null;
  },
  async updateUser(user): Promise<AdapterUser> {
    return user as AdapterUser;
  },
  async deleteUser(userId) {
    return;
  },
  async linkAccount(account) {
    return;
  },
  async unlinkAccount({ providerAccountId, provider }) {
    return;
  },
  async createSession({ sessionToken, userId, expires }): Promise<any> {
    return { sessionToken, userId, expires };
  },
  async getSessionAndUser(sessionToken): Promise<any> {
    return sessionToken;
  },
  async updateSession({ sessionToken }): Promise<any> {
    return sessionToken;
  },
  async deleteSession(sessionToken): Promise<any> {
    return sessionToken;
  },
  async createVerificationToken({ identifier, expires, token }): Promise<any> {
    return { identifier, expires, token };
  },
  async useVerificationToken({ identifier, token }): Promise<any> {
    return { identifier, token };
  }
} satisfies Adapter;
