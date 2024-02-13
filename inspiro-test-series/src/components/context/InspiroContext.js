import { createContext, useContext } from "react";
import { prelimsTest, viewPrelimsQuestionPaper, mainsTest } from "../context/data";
console.log(prelimsTest);

const inspiroContext = createContext();

export const InspiroContext = ({ children }) => {
  return (
    <inspiroContext.Provider value={{ prelimsTest, viewPrelimsQuestionPaper, mainsTest }}>
      {children}
    </inspiroContext.Provider>
  );
};
export function useInspiroCrud() {
  return useContext(inspiroContext);
}
