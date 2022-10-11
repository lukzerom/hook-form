import { css } from "@emotion/css";
import React, { FunctionComponent, ReactNode } from "react";

type FormItemProps = {
  children: ReactNode;
};

const FormItem: FunctionComponent<FormItemProps> = ({ children }) => {
  return (
    <div
      className={css`
        min-height: 48px;
      `}
    >
      {children}
    </div>
  );
};

export default FormItem;
