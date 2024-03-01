import { createContext, useContext } from "react";
import {
  prelimsTest,
  mainsTest,
  purchasedTest,
  prelimsQuestions,
} from "../context/data";

const inspiroContext = createContext();

export const InspiroContext = ({ children }) => {
  return (
    <inspiroContext.Provider
      value={{
        prelimsTest,
        mainsTest,
        purchasedTest,
        prelimsQuestions,
      }}
    >
      {children}
    </inspiroContext.Provider>
  );
};
export function useInspiroCrud() {
  return useContext(inspiroContext);
}
