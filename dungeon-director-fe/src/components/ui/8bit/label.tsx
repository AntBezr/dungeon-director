"use client";

import type * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "utils";

import { Label as ShadcnLabel } from "ui/label";

import "ui/8bit/styles/retro.css";

export const inputVariants = cva("", {
  variants: {
    font: {
      normal: "",
      retro: "retro",
    },
  },
  defaultVariants: {
    font: "retro",
  },
});

interface BitLabelProps
  extends React.ComponentProps<typeof ShadcnLabel>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

function Label({ className, font, ...props }: BitLabelProps) {
  return (
    <ShadcnLabel
      className={cn(className, font !== "normal" && "retro")}
      {...props}
    />
  );
}

export { Label };
