import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export interface WealthboxProfile {
  id: string;
  name: string;
  email: string;
}

export default function WealthboxProvider<P extends WealthboxProfile>(
  config?: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    authorization: {
      url: "https://app.crmworkspace.com/oauth/authorize",
      params: {
        response_type: "code",
        scope: "login data",
        client_id: process.env.WEALTHBOX_CLIENT_ID as string,
        redirect_uri: process.env.WEALTHBOX_CALLBACK_URL as string
      }
    },
    // authorization: `https://app.crmworkspace.com/oauth/authorize?client_id=${process.env.WEALTHBOX_CLIENT_ID}&redirect_uri=${process.env.WEALTHBOX_CALLBACK_URL}&response_type=code&scope=login+data`,
    token: {
      url: "https://app.crmworkspace.com/oauth/token",
      async request(context: {
        provider: { clientId: string; clientSecret: string };
        params: { code: string };
      }) {
        const response = await fetch(
          "https://app.crmworkspace.com/oauth/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              client_id: context.provider.clientId as string,
              client_secret: context.provider.clientSecret as string,
              code: context.params.code,
              grant_type: "authorization_code",
              redirect_uri: process.env.WEALTHBOX_CALLBACK_URL as string
            })
          }
        );

        if (!response.ok) {
          throw new Error("Failed to exchange code for token");
        }

        return await response.json();
      }
    },
    clientId: process.env.WEALTHBOX_CLIENT_ID,
    clientSecret: process.env.WEALTHBOX_CLIENT_SECRET,
    name: "Wealthbox",
    type: "oauth",
    id: "wealthbox",
    profile(profile) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email
      };
    }
    // options: config
  };
}
