import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function DetailsPage({
  params,
}: { params: Promise<{ value: string }> }) {
  const { value } = await params;
  const data = await api.substances.getByValue(value);

  if (data.type === "NOT_FOUND") {
    return redirect("/");
  }

  return <div className="min-h-screen">{data?.value?.name}</div>;
}
