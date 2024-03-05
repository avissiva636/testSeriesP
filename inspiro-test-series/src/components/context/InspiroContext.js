import { createContext, useContext } from "react";
import {
  prelimsTest,
  mainsTest,
  purchasedTest,
  prelimsQuestions,
  mainsQuestions,
  progressCardDetailsPrelims,
  progressCardDetailsMains,
  discussionCardDetailsPrelims,
  discussionCardDetailsMains,
  prelimsAnswers,
  archives,
  archiveQuestions,
  scheduled,
  scheduledQuestions,
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
        mainsQuestions,
        progressCardDetailsPrelims,
        progressCardDetailsMains,
        discussionCardDetailsPrelims,
        discussionCardDetailsMains,
        prelimsAnswers,
        archives,
        archiveQuestions,
        scheduled,
        scheduledQuestions,
      }}
    >
      {children}
    </inspiroContext.Provider>
  );
};
export function useInspiroCrud() {
  return useContext(inspiroContext);
}
