"use client";

import { useEffect, useRef, useState } from "react";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { CornerDownLeft } from "lucide-react";
import { Loader } from "./loader";

type Inputs = {
  prompt: string;
};

export function Form() {
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { isSubmitting } = formState;

  const submit: SubmitHandler<FieldValues> = async (data) => {
    const { prompt } = data;
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  return (
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
  );
}
