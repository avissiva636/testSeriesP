import { Stack } from "@mui/material";
import Explorer from "./Explorer";
import Navigationbar from "./Navigationbar";

const Homepage = () => {
  return (
    
    <Stack direction="column" spacing={8}>
      <Navigationbar />
      <Explorer />
    
  </Stack>
  );
};
export default Homepage;