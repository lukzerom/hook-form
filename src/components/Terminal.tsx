import { css } from "@emotion/css";
import React, { FunctionComponent } from "react";

type TerminalProps = {
  children: any;
};

const Terminal: FunctionComponent<TerminalProps> = ({ children }) => {
  return (
    <div>
      <pre
        className={css`
          background-color: #272b2e;
          color: #d4ebfc;
          padding: 12px;
          margin: 12px;
          border-radius: 3px;
        `}
      >
        {children}
      </pre>
    </div>
  );
};

export default Terminal;
