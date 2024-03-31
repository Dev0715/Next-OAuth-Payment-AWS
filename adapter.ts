import type {
  Adapter,
  AdapterAccount,
  AdapterUser,
  AdapterSession
} from "next-auth/adapters";

type Awaitable<T> = T | PromiseLike<T>;

export default {
  async createUser(user: AdapterUser): Awaitable<AdapterUser> {
    console.log("CREATE_USER");
    return user;
  },
  async getUser(id: string): Awaitable<AdapterUser | null> {
    console.log("GET_USER");
    return null;
  },
  async getUserByEmail(email: string): Awaitable<AdapterUser | null> {
    console.log("GET_USER_BY_EMAIL");
    return null;
  },
  async getUserByAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Awaitable<AdapterUser | null> {
    console.log("GET_USER_BY_ACCOUNT");
    return null;
  },
  async updateUser(
    user: Partial<AdapterUser> & Pick<AdapterUser, "id">
  ): Awaitable<AdapterUser> {
    console.log("UPDATE_USER");
    return user as AdapterUser;
  },
  async deleteUser(
    userId: string
  ): Promise<void> | Awaitable<AdapterUser | null | undefined> {
    console.log("DELETE_USER");
    return;
  },
  async linkAccount(
    account: AdapterAccount
  ): Promise<void> | Awaitable<AdapterAccount | null | undefined> {
    console.log("LINK_ACCOUNT");
    return;
  },
  async unlinkAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Promise<void> | Awaitable<AdapterAccount | undefined> {
    console.log("UNLINK_ACCOUNT");
    return;
  },
  async createSession(session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Awaitable<AdapterSession> {
    console.log("CREATE_SESSION");
    return;
  },
  async getSessionAndUser(
    sessionToken: string
  ): Awaitable<{ session: AdapterSession; user: AdapterUser } | null> {
    console.log("GET_SESSION_AND_USER");
    return;
  },
  async updateSession({ sessionToken }): Promise<any> {
    console.log("UPDATE_SESSION");
    return sessionToken;
  },
  async deleteSession(sessionToken): Promise<any> {
    console.log("DELETE_SESSION");
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
