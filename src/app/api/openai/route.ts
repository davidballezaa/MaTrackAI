import OpenAI from "openai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { getSongs } from "../../../../lib/spotify";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Song = {
  title: string;
  artist: string;
};

export async function POST(request: Request) {
  const {
    token: { accessToken },
  } = await getServerSession(authOptions);
  const { prompt } = await request.json();
  const response = await getResponse(prompt);
  const songs = JSON.parse(response.choices[0].message.content || "");

  const spotifySongs = await getSongs(accessToken, Array.from(songs.songs));

  return Response.json({
    spotifySongs,
  });
}

async function getResponse(prompt: string) {
  const length = 9;
  return openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an assistant that only responds in JSON. 
      Create a list of ${length} unique songs based off the following 
      statement: "${prompt}". Include "title" and "artist" 
      in your response. An example response is: "
      [
        {
            "title": "Hey Jude",
            "artist": "The Beatles",
        }, 
        {
          "title": "Bohemian Rhapsody",
          "artist": "Queen",
        }
      ]".`,
      },
    ],
    model: "gpt-3.5-turbo-1106",
    temperature: 0,
    max_tokens: 1000,
    response_format: { type: "json_object" },
  });
}
