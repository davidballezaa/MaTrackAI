import { userInfo } from "../../../../lib/spotify";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  const {
    token: { accessToken },
  } = await getServerSession(authOptions);
  const response = await userInfo(accessToken);

  const data = await response.json();

  return Response.json({
    name: data?.display_name,
    image: data?.images[0]?.url,
  });
}
