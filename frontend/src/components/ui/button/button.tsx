import * as React from "react";
import { buttonStyles } from "./button.styles";
import { ButtonProps } from "./button.types";

export function Button({
  className,
  variant,
  size,
  focused,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, focused, className })}
      {...props}
    />
  );
}