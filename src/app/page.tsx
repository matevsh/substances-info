import Link from "next/link";

import { api } from "~/trpc/server";

export default async function HomePage() {
  const groups = await api.substances.get();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
        Psychoactive Substance Index
      </h1>

      {/* Reverting to CSS Columns for true vertical stacking without grid row alignment */}
      {/* This avoids horizontal gaps but might lead to slightly less balanced column heights */}
      <div className="gap-8 space-y-8 md:columns-2 lg:columns-3 xl:columns-4">
        {groups.map((group) => (
          <div
            key={group.id}
            // Add 'break-inside-avoid' to prevent items from breaking across columns
            className="break-inside-avoid rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-primary">
              <Link href={group.value} className="hover:underline">
                {group.name}
              </Link>
            </h2>
            {group.subGroups?.length ? (
              <ul className="space-y-4">
                {/* Type should be inferred from group.subGroups */}
                {group.subGroups.map((subgroup) => (
                  <li key={subgroup.id}>
                    <h3 className="mb-2 font-medium text-muted-foreground">
                      <Link href={subgroup.value} className="hover:underline">
                        {subgroup.name}
                      </Link>
                    </h3>
                    <ul className="ml-4 list-disc space-y-1 pl-2 text-sm">
                      {/* Type should be inferred from subgroup.substances */}
                      {subgroup.substances.map((substance) => (
                        <li key={substance.id}>
                          <Link
                            href={substance.value}
                            className="hover:text-primary hover:underline"
                          >
                            {substance.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No subgroups available for this category.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
