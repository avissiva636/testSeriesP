import { InspiroContext } from "./components/context/InspiroContext";
import Prelimspage from "./components/prelimsTestSeries/Prelimspage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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


function App() {
  return (
    <div>
      <Router>
        <InspiroContext>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="Dashboard" element={<Dashboard />}/>
            <Route path="/PrelimsTestStore" element={<Prelimspage />} />
            <Route path="/MainsTestStore" element={<Mainspage />} />
            <Route path="/Purchasedtestseries" element={<Purchasedtestseries />} />
            <Route path="/ViewTest" element={<ViewTest />} />
            <Route path="/InstructionPage" element={<InstructionPage />} />
            <Route path="/TestPage" element={<TestPage />}/>
            <Route path="/ProgressCardMain" element={<ProgressCardMain />}/>
          </Routes>
        </InspiroContext>
      </Router>
    </div>
  );
}
export default App;