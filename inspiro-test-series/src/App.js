import { InspiroContext } from "./components/context/InspiroContext";
import Prelimspage from "./components/prelimsTestSeries/Prelimspage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Explorer from "./components/homepage/Explorer";
import Homepage from "./components/homepage/Homepage";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <InspiroContext>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="Dashboard" element={<Dashboard />}/>
            <Route path="/PrelimsTestStore" element={<Prelimspage />} />
          </Routes>
        </InspiroContext>
      </Router>
    </div>
  );
}
export default App;