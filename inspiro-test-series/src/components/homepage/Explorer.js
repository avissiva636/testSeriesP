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



const Explorer = () => {
const navigate = useNavigate();
  const handleClick = (name) => {
    navigate(`/${name}`)
  }
  return (
    <Stack direction={"row"} spacing={4} sx={{backgroundColor:'#fafafa'}}>
    <Stack spacing={0} direction="column" alignItems="flex-start" sx={{ width: 'fit-content', minWidth: '255px', cursor:'pointer' }}>
      <ListItem variant="none" sx={{ width: '100%', borderRadius: '0px', borderColor:'white', fontSize: '1.2rem', height:'60px', border: "1px solid black", justifyContent:'center',}} ><b>HARISH</b></ListItem>
      <Customlistitem icon={<ImportantDevicesIcon />} name="Dashboard" onClick={() => handleClick("Dashboard")} />
      <Customlistitem icon={<ListAltIcon />} name="Purchased Test Series" onClick={() => handleClick("Purchased Test Series")} />
      <Customlistitem icon={<FileCopyIcon />} name="Prelims Test Store" onClick={() => handleClick("Prelims Test Store")} />
      <Customlistitem icon={<FileCopyIcon />} name="Mains Test Store" onClick={() => handleClick("Mains Test Store")} />
      <Customlistitem icon={<ScheduleIcon />} name="Scheduled Test Store" onClick={() => handleClick("Scheduled Test Store")} />
      <Customlistitem icon={<ForumRoundedIcon />} name="Discussion" onClick={() => handleClick("Discussion")} />
      <Customlistitem icon={<TrendingUpIcon />} name="Progress Card" onClick={() => handleClick("Progress Card")} />
      <Customlistitem icon={<ArchiveIcon />} name="Archives" onClick={() => handleClick("Archives")} />
      <Customlistitem icon={<SettingsIcon />} name="Settings" onClick={() => handleClick("Settings")} />
     <ListItem sx={{paddingLeft:'20px',border: "1px solid black", width:'100%', borderbottom:'none'}}>#433, Second Floor<br/> 13th Main, M.C Layout<br/> Opp. Vijayanagar Post Office<br/> Vijayanagar<br/> Bangalore - 560040</ListItem>
    </Stack>
      <Welcomepage />
    </Stack>
  );
};
export default Explorer;
