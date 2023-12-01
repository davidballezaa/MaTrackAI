const getAccessToken = async (refresh_token) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const userInfo = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);

  return fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getSongs = async (refresh_token, queries) => {
  const { access_token } = await getAccessToken(refresh_token);

  return await Promise.all(
    queries.map(async (query) => {
      const searchQuery = query.title + " " + query.artist;
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = await response.json();

      // If there is a track found on spotify
      if (data.tracks.items) {
        // Get image
        const image = data.tracks.items[0].album.images[0].url;
        return {
          title: query.title,
          artist: query.artist,
          image: image,
        };
      }
    })
  );
};
