import { css } from "@emotion/css";
import React, { FunctionComponent, ReactNode } from "react";

type HelperTextProps = {
  children: ReactNode;
};

const HelperText: FunctionComponent<HelperTextProps> = ({ children }) => {
  return (
    <label
      className={css`
        color: red;
        display: block;
        font-size: 12px;
      `}
    >
      {children}
    </label>
  );
};

export default HelperText;
