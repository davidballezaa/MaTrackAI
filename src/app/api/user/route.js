import { userInfo } from "../../../../lib/spotify";

export async function GET(request) {
  const response = await userInfo();

  const data = await response.json();

  return Response.json({
    name: data?.display_name,
    image: data?.images[0]?.url,
  });
}
