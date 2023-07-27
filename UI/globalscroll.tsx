// CustomScrollbarWrapper.tsx

import React from "react";
import { Global, css } from "@emotion/react";
interface props{
    children:React.ReactNode
}

const CustomScrollbarWrapper: React.FC<props> = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          /* Custom scrollbar styles */
          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background-color: #111315;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #ffc0cb;
            border-radius: 4px;
          }
        `}
      />
      {children}
    </>
  );
};

export default CustomScrollbarWrapper;
