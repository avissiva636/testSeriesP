import { InspiroContext } from "./components/context/InspiroContext";
import Prelimspage from "./components/prelimsTestSeries/Prelimspage";
import { Route, Routes } from "react-router-dom";
// import Explorer from "./components/homepage/Explorer";
import Homepage from "./components/homepage/Homepage";
import Dashboard from "./components/dashboard/Dashboard";
import Mainspage from "./components/mainsTestSeries/Mainspage";
import Purchasedtestseries from "./components/purchasedTestSeries/Purchasedtestseries";
import ViewTest from "./components/purchasedTestSeries/ViewTest";
import InstructionPage from "./components/purchasedTestSeries/InstructionPage";
import TestPage from "./components/examPage/TestPage";
import ProgressCard from "./components/progresscard/ProgressCard";
import ProgressCardMain from "./components/progresscard/ProgressCardMain.js";
import DiscussionMainPage from "./components/discussionPage/DiscussionMainPage.js";
import DiscussionCard from "./components/discussionPage/DiscussionCard.js";
import ArchivesMainPage from "./components/archives/ArchivesMainPage.js";
import PreviousYearsQP from "./components/previousQP/PreviousYearsQP.js";
import ScheduledTest from "./components/scheduledTest/ScheduledTest.js";
import MainsTestPage from "./components/examPage/MainsTestPage.js";


function App() {
  return (
    <div>
      <InspiroContext>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="/PrelimsTestStore" element={<Prelimspage />} />
          <Route path="/MainsTestStore" element={<Mainspage />} />
          <Route path="/Purchasedtestseries" element={<Purchasedtestseries />} />
          <Route path="/ScheduledTestStore" element={<ScheduledTest />} />
          <Route path="PreviousYearsQP" element={<PreviousYearsQP />} />
          <Route path="/ViewTest" element={<ViewTest />} />
          <Route path="/InstructionPage" element={<InstructionPage />} />
          <Route path="/TestPage" element={<TestPage />} />
          <Route path="/MainsTestPage" element={<MainsTestPage />} />
          <Route path="/ProgressCardMain" element={<ProgressCardMain />} />
          <Route path="/ProgressCard" element={<ProgressCard />} />
          <Route path="/DiscussionMainPage" element={<DiscussionMainPage />} />
          <Route path="/DiscussionCard" element={<DiscussionCard />} />
          <Route path="/ArchivesMainPage" element={<ArchivesMainPage />} />
        </Routes>
      </InspiroContext>
    </div>
  );
}
export default App;