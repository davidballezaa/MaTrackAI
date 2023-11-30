"use client";

import { useState } from "react";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { CornerDownLeft } from "lucide-react";
import { Loader } from "./loader";

import Song from "./song";

type Inputs = {
  prompt: string;
};

type SongType = {
  title: string;
  artist: string;
  image: string;
};

export function Form() {
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const [data, setData] = useState<SongType[]>([]);
  const { isSubmitting } = formState;

  const submit: SubmitHandler<FieldValues> = async (data, e) => {
    e?.preventDefault();
    const { prompt } = data;
    const response = await fetch("api/openai", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { spotifySongs } = await response.json();
    setData(spotifySongs);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-1 items-center w-full"
      >
        <input
          type="text"
          placeholder="cat"
          className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
          {...register("prompt", { required: true })}
        />

        <button
          // ref={ref}
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-8 h-8 aspect-square flex items-center justify-center ring-0 outline-0"
        >
          {isSubmitting ? (
            <Loader />
          ) : (
            <CornerDownLeft size={16} className="-ml-px" />
          )}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {data.map((song: SongType) => (
          <Song artist={song.artist} title={song.title} image={song.image} />
        ))}
      </div>
    </>
  );
}
