import { createContext, useContext } from "react";
import { prelimsTest, viewPrelimsQuestionPaper } from "../context/data";
console.log(prelimsTest);

const inspiroContext = createContext();

export const InspiroContext = ({ children }) => {
  return (
    <inspiroContext.Provider value={{ prelimsTest, viewPrelimsQuestionPaper }}>
      {children}
    </inspiroContext.Provider>
  );
};
export function useInspiroCrud() {
  return useContext(inspiroContext);
}
