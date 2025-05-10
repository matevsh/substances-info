import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const substancesRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.substanceGroup.findMany({
      include: {
        subGroups: {
          include: {
            substances: true,
          },
        },
      },
    });
  }),

  getByValue: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const substance = await ctx.db.substance.findUnique({
        where: {
          value: input,
        },
      });

      if (substance)
        return {
          type: "SUBSTANCE",
          data: substance,
        };

      const group = await ctx.db.substanceGroup.findUnique({
        where: {
          value: input,
        },
      });

      if (group) {
        return {
          type: "GROUP",
          data: group,
        };
      }

      const subgroup = await ctx.db.substanceGroup.findUnique({
        where: {
          value: input,
        },
      });

      if (subgroup) {
        return {
          type: "SUBGROUP",
          value: subgroup,
        };
      }

      return {
        type: "NOT_FOUND",
      };
    }),
});
