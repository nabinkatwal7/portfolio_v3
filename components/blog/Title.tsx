import { PropsWithChildren } from "react";

export function Title(props: PropsWithChildren) {
  return (
    <h1 className="heading-display">
      {props.children}
    </h1>
  );
}
