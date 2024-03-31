import type {
  Adapter,
  AdapterAccount,
  AdapterUser,
  AdapterSession
} from "next-auth/adapters";

type Awaitable<T> = T | PromiseLike<T>;

export default {
  async createUser(user: AdapterUser): Awaitable<AdapterUser> {
    console.log("CREATE_USER", user);
    return user;
  },
  async getUser(id: string): Awaitable<AdapterUser | null> {
    console.log("GET_USER", id);
    return null;
  },
  async getUserByEmail(email: string): Awaitable<AdapterUser | null> {
    console.log("GET_USER_BY_EMAIL", email);
    return null;
  },
  async getUserByAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Awaitable<AdapterUser | null> {
    console.log("GET_USER_BY_ACCOUNT", providerAccountId);
    return null;
  },
  async updateUser(
    user: Partial<AdapterUser> & Pick<AdapterUser, "id">
  ): Awaitable<AdapterUser> {
    console.log("UPDATE_USER", user);
    return user as AdapterUser;
  },
  async deleteUser(
    userId: string
  ): Promise<void> | Awaitable<AdapterUser | null | undefined> {
    console.log("DELETE_USER", userId);
    return;
  },
  async linkAccount(
    account: AdapterAccount
  ): Promise<void> | Awaitable<AdapterAccount | null | undefined> {
    console.log("LINK_ACCOUNT", account);
    return;
  },
  async unlinkAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Promise<void> | Awaitable<AdapterAccount | undefined> {
    console.log("UNLINK_ACCOUNT", providerAccountId);
    return;
  },
  async createSession(session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Awaitable<AdapterSession> {
    console.log("CREATE_SESSION", session);
    return;
  },
  async getSessionAndUser(
    sessionToken: string
  ): Awaitable<{ session: AdapterSession; user: AdapterUser } | null> {
    console.log("GET_SESSION_AND_USER", sessionToken);
    return;
  },
  async updateSession(
    session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
  ): Awaitable<AdapterSession | null | undefined> {
    console.log("UPDATE_SESSION", session);
    return session;
  },
  async deleteSession(
    sessionToken: string
  ): Promise<void> | Awaitable<AdapterSession | null | undefined> {
    console.log("DELETE_SESSION", sessionToken);
    return sessionToken;
  },
  async createVerificationToken({ identifier, expires, token }): Promise<any> {
    console.log("CREATE_VERIFICATION_TOKEN");
    return { identifier, expires, token };
  },
  async useVerificationToken({ identifier, token }): Promise<any> {
    console.log("USE_VERFICATION_TOKEN");
    return { identifier, token };
  }
} satisfies Adapter;
