import { ListItem, Stack } from "@mui/material";
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArchiveIcon from '@mui/icons-material/Archive';
import SettingsIcon from '@mui/icons-material/Settings';
import Welcomepage from "./Welcomepage";
import Customlistitem from "./Customlistitem";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../state/stateSlice";
import { useSelector } from "react-redux";



const Explorer = () => {
  const currentUserName = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const handleClick = (name) => {
    navigate(`/${name}`)
  }
  return (
    // <Stack direction={"row"} spacing={4} sx={{backgroundColor:'#fafafa'}}>
    <Stack spacing={0} direction="column" alignItems="flex-start" sx={{ width: 'fit-content', minWidth: '255px', cursor: 'pointer' }}>
      <ListItem variant="none" sx={{ width: '100%', borderRadius: '0px', borderColor: 'white', fontSize: '1.2rem', height: '60px', border: "1px solid black", justifyContent: 'center', }} ><b>{currentUserName}</b></ListItem>
      <Customlistitem icon={<ImportantDevicesIcon />} name="Dashboard" onClick={() => handleClick("Dashboard")} />
      <Customlistitem icon={<ListAltIcon />} name="Purchased Test Series" onClick={() => handleClick("PurchasedTestSeries")} />
      <Customlistitem icon={<FileCopyIcon />} name="Prelims Test Store" onClick={() => handleClick("PrelimsTestStore")} />
      <Customlistitem icon={<FileCopyIcon />} name="Mains Test Store" onClick={() => handleClick("MainsTestStore")} />
      {/* <Customlistitem icon={<ScheduleIcon />} name="Scheduled Test Store" onClick={() => handleClick("ScheduledTestStore")} /> */}
      {/* <Customlistitem icon={<ScheduleIcon />} name="Previous Years QP's" onClick={() => handleClick("PreviousYearsQP")} /> */}
      <Customlistitem icon={<ForumRoundedIcon />} name="Discussion" onClick={() => handleClick("DiscussionMainPage")} />
      <Customlistitem icon={<TrendingUpIcon />} name="Progress Card" onClick={() => handleClick("ProgressCardMain")} />
      <Customlistitem icon={<ArchiveIcon />} name="Archives" onClick={() => handleClick("ArchivesMainPage")} />
      {/* <Customlistitem icon={<SettingsIcon />} name="Settings" onClick={() => handleClick("Settings")} /> */}
      <ListItem sx={{ paddingLeft: '20px', border: "1px solid black", width: '100%', borderbottom: 'none' }}>#433, Second Floor<br /> 13th Main, M.C Layout<br /> Opp. Vijayanagar Post Office<br /> Vijayanagar<br /> Bangalore - 560040</ListItem>
    </Stack>
    // <Welcomepage />
    // </Stack>
  );
};
export default Explorer;
