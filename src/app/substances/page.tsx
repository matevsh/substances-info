import { AppSidebar } from "~/components/app-sidebar";
import { api } from "~/trpc/server";

export default async function SubstancesPage() {
  const substances = await api.substances.get();

  console.log(substances);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex h-screen flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
          substances<span className="text-[#66ffa3]">.</span>info
        </h1>
        <div>
          <AppSidebar />
        </div>
      </div>
    </main>
  );
}
