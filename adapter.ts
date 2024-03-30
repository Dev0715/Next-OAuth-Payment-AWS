import type { Adapter, AdapterUser } from "next-auth/adapters";

export default {
  async createUser(user): Promise<AdapterUser> {
    return user;
  },
  async getUser(id): Promise<AdapterUser | null> {
    return null;
  },
  async getUserByEmail(email): Promise<AdapterUser | null> {
    return null;
  },
  async getUserByAccount({
    providerAccountId,
    provider
  }): Promise<AdapterUser | null> {
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
