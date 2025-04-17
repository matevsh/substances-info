import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1e543c] to-[#0f1c16] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
            substances<span className="text-[#66ffa3]">.</span>info
          </h1>
        </div>
      </main>
    </HydrateClient>
  );
}
