export async function getAccessToken(client_id: string, client_secret: string) {
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
  });

  const data = await response.json();
  return data.access_token;
}
