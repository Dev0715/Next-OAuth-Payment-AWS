import type {
  Adapter,
  AdapterAccount,
  AdapterUser,
  AdapterSession
} from "next-auth/adapters";

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
  async updateUser(
    user: Partial<AdapterUser> & Pick<AdapterUser, "id">
  ): Awaitable<AdapterUser> {
    return user as AdapterUser;
  },
  async deleteUser(
    userId: string
  ): Promise<void> | Awaitable<AdapterUser | null | undefined> {
    return;
  },
  async linkAccount(
    account: AdapterAccount
  ): Promise<void> | Awaitable<AdapterAccount | null | undefined> {
    return;
  },
  async unlinkAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Promise<void> | Awaitable<AdapterAccount | undefined> {
    return;
  },
  async createSession(session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Awaitable<AdapterSession> {
    return;
  },
  async getSessionAndUser(
    sessionToken: string
  ): Awaitable<{ session: AdapterSession; user: AdapterUser } | null> {
    return;
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
