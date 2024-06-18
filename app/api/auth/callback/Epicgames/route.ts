import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    console.error("Authorization code not found in the request");
    return NextResponse.redirect("/error");
  }

  try {
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: process.env.WEALTHBOX_CLIENT_ID as string,
        client_secret: process.env.WEALTHBOX_CLIENT_SECRET as string,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.WEALTHBOX_CALLBACK_URL as string
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to exchange code for token:", errorText);
      return NextResponse.redirect("/error");
    }

    const data = await response.json();

    // Store the access token and refresh token securely (this can be a session, database, etc.)
    console.log("Access Token:", data.access_token);
    console.log("Refresh Token:", data.refresh_token);

    // Set cookies or handle session management here if needed
    // Example: setting a cookie (this is optional and depends on your needs)
    // const responseWithCookie = NextResponse.redirect('/success');
    // responseWithCookie.cookies.set('token', data.access_token, { httpOnly: true });
    // return responseWithCookie;

    // Redirect to the success page
    return NextResponse.redirect("/success");
  } catch (error) {
    console.error("Error during token exchange:", error);
    return NextResponse.redirect("/error");
  }
}
