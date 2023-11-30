import Image from "next/image";
import { Form } from "./components/form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="font-medium text-4xl text-black mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out">
        Welcome to Moody!
      </h1>
      <p className="text-gray-500 mb-12 text-base animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
        Insert how you feel
      </p>
      <div className="max-w-lg space-y-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
        <Form />
      </div>
    </main>
  );
}
