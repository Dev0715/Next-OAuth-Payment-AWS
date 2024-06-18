import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export interface EpicGamesProfile {
  id: string;
  name: string;
  email: string;
}

export default function EpicGamesProvider<P extends EpicGamesProfile>(
  config?: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "epicgames",
    name: "Epic Games",
    type: "oauth"
  };
}
