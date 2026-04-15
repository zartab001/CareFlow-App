import * as React from "react";
import { VariantProps } from "tailwind-variants";
import { buttonStyles } from "./button.styles";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;