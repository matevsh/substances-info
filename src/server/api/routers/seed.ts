import * as fs from "node:fs/promises";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { slugify } from "~/server/utils/slugify";

interface JsonSubstance {
  name: string;
  hover: string;
  group: string;
  subgroup: string;
  url: string;
  common: boolean;
}

export const seedRouter = createTRPCRouter({
  substances: publicProcedure.mutation(async ({ ctx }) => {
    const substancesFileRaw = await fs.readFile(
      "seed/substances.json",
      "utf-8",
    );
    const substances: Array<JsonSubstance> = JSON.parse(substancesFileRaw);

    const groupMap: Record<string, string> = {};
    const subGroupMap: Record<string, string> = {};

    for (const substance of substances) {
      const groupSlug = slugify(substance.group);
      if (!groupMap[groupSlug]) {
        const group = await ctx.db.substanceGroup.upsert({
          where: { value: groupSlug },
          create: { name: substance.group, value: groupSlug },
          update: {},
        });
        groupMap[groupSlug] = group.id;
      }

      const subSlug = slugify(substance.subgroup);
      if (!subGroupMap[subSlug]) {
        const sub = await ctx.db.substanceSubGroup.upsert({
          where: { value: subSlug },
          create: {
            name: substance.subgroup,
            value: subSlug,
            groupId: groupMap[groupSlug],
          },
          update: {},
        });
        subGroupMap[subSlug] = sub.id;
      }

      // 3. Create substance
      const substanceSlug = slugify(substance.name);
      await ctx.db.substance.upsert({
        where: { value: substanceSlug },
        create: {
          name: substance.name,
          value: substanceSlug,
          hover: substance.hover,
          url: substance.url ?? "",
          groupId: groupMap[groupSlug],
          subGroupId: subGroupMap[subSlug],
        },
        update: {},
      });
    }
  }),
});
