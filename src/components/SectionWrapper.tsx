import { css } from "@emotion/css";
import React, { FunctionComponent, ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  state: "nautral" | "error" | "success";
};

const SectionWrapper: FunctionComponent<SectionWrapperProps> = ({
  children,
  state = "neutral",
}) => {
  const getBackgroundColor = () =>
    state === "neutral"
      ? "#f0f0f0"
      : state === "error"
      ? "#fad9d9"
      : state === "success"
      ? "#e3f5e1"
      : "#f0f0f0";

  const geBorderColor = () =>
    state === "neutral"
      ? "#d9d9d9"
      : state === "error"
      ? "#f4acac"
      : state === "success"
      ? "#ade2a8"
      : "#d9d9d9";

  return (
    <section
      className={css`
        border: 2px solid ${geBorderColor()};
        margin: 12px;
        padding: 12px;
        background-color: ${getBackgroundColor()};
      `}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
