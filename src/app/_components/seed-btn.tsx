"use client";

import { api } from "~/trpc/react";

export function SeedButton() {
  const { mutate } = api.seed.substances.useMutation();

  return (
    <div>
      <button type="button" onClick={() => mutate()}>
        Seed substances
      </button>
    </div>
  );
}
