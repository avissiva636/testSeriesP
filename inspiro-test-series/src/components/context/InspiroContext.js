import { createContext, useContext } from "react";
import {
  prelimsTest,
  mainsTest,
  purchasedTest,
  prelimsQuestions,
  progressCardDetails,
  discussionCardDetailsPrelims,
  discussionCardDetailsMains,
  prelimsAnswers,
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
        progressCardDetails,
        discussionCardDetailsPrelims,
        discussionCardDetailsMains,
        prelimsAnswers
      }}
    >
      {children}
    </inspiroContext.Provider>
  );
};
export function useInspiroCrud() {
  return useContext(inspiroContext);
}
