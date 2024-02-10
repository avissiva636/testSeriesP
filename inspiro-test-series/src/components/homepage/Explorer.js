import { Box, Button, ListItem, Stack, Typography } from "@mui/material";
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArchiveIcon from '@mui/icons-material/Archive';
import SettingsIcon from '@mui/icons-material/Settings';
import Welcomepage from "./Welcomepage";


const Explorer = () => {
  return (
    <Stack direction={"row"} spacing={4} sx={{backgroundColor:'#fafafa'}}>
    <Stack spacing={0} direction="column" alignItems="flex-start" sx={{ width: 'fit-content', minWidth: '255px', cursor:'pointer' }}>
      <ListItem variant="none" sx={{ width: '100%', borderRadius: '0px', borderColor:'white', fontSize: '1.2rem', height:'60px', border: "1px solid black", justifyContent:'center',}}><b>HARISH</b></ListItem>
      <ListItem variant="outlined" sx={{ width: '100%', borderRadius: '0px', borderColor:'white', fontSize: '1.2rem', height:'60px', border: "1px solid black", "&:hover": {backgroundColor: "secondary.main", color: "#FFFFFF", fontWeight: 'bold'}}}><Stack direction={'row'} spacing={2} ><ImportantDevicesIcon /><span>Dashboard</span></Stack></ListItem>
      <ListItem variant="outlined" sx={{ width: '100%', borderRadius: '0px', borderColor:'white', fontSize: '1.2rem', height:'60px', border: "1px solid black", "&:hover": {backgroundColor: "secondary.main", color: "#FFFFFF", fontWeight: 'bold'}}}><Stack direction={'row'} spacing={2}><ListAltIcon /><span>Purchased Test Series</span></Stack></ListItem>
      <ListItem variant="outlined" sx={{ width: '100%', borderRadius: '0px', borderColor:'white', fontSize: '1.2rem', height:'60px',border: "1px solid black", "&:hover": {backgroundColor: "secondary.main", color: "#FFFFFF", fontWeight: 'bold'}}}><Stack direction={'row'} spacing={2}><FileCopyIcon /><span>Prelims Test Store</span></Stack></ListItem>
      <ListItem variant="outlined" sx={{ width: '100%', borderRadius: '0px', borderColor:'white', fontSize: '1.2rem', height:'60px',border: "1px solid black", "&:hover": {backgroundColor: "secondary.main", color: "#FFFFFF", fontWeight: 'bold'}}}><Stack direction={'row'} spacing={2}><FileCopyIcon /><span>Mains Test Store</span></Stack></ListItem>
      <ListItem variant="outlined" sx={{ width: '100%', borderRadius: '0px', borderColor:'white', fontSize: '1.2rem', height:'60px',border: "1px solid black", "&:hover": {backgroundColor: "secondary.main", color: "#FFFFFF", fontWeight: 'bold'}}}><Stack direction={'row'} spacing={2}><ScheduleIcon /> <span>Scheduled Test Store</span></Stack></ListItem>
      <ListItem variant="outlined" sx={{ width: '100%', borderRadius: '0px', borderColor:'white', fontSize: '1.2rem', height:'60px',border: "1px solid black", "&:hover": {backgroundColor: "secondary.main", color: "#FFFFFF", fontWeight: 'bold'}}}><Stack direction={'row'} spacing={2}><ForumRoundedIcon /><span>Discussion</span></Stack></ListItem>
      <ListItem variant="outlined" sx={{ width: '100%', borderRadius: '0px', borderColor:'white', fontSize: '1.2rem', height:'60px',border: "1px solid black", "&:hover": {backgroundColor: "secondary.main", color: "#FFFFFF", fontWeight: 'bold'}}}><Stack direction={'row'} spacing={2}><TrendingUpIcon /><span>Progress Card</span></Stack></ListItem>
      <ListItem variant="outlined" sx={{ width: '100%', borderRadius: '0px', borderColor:'white', fontSize: '1.2rem', height:'60px',border: "1px solid black", "&:hover": {backgroundColor: "secondary.main", color: "#FFFFFF", fontWeight: 'bold'}}}><Stack direction={'row'} spacing={2}><ArchiveIcon /><span>Archives</span></Stack></ListItem>
      <ListItem variant="outlined" sx={{ width: '100%', borderRadius: '0px', borderColor:'white', fontSize: '1.2rem', height:'60px',border: "1px solid black", "&:hover": {backgroundColor: "secondary.main", color: "#FFFFFF", fontWeight: 'bold'}}}><Stack direction={'row'} spacing={2}><SettingsIcon /><span>Settings</span></Stack></ListItem>
      <ListItem sx={{paddingLeft:'20px',border: "1px solid black", width:'100%', borderbottom:'none'}}>#433, Second Floor<br/> 13th Main, M.C Layout<br/> Opp. Vijayanagar Post Office<br/> Vijayanagar<br/> Bangalore - 560040</ListItem>
    </Stack>
      <Welcomepage />
    </Stack>
  );
};
export default Explorer;
