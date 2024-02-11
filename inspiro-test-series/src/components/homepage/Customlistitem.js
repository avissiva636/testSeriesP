import { ListItem, Stack } from "@mui/material";

const Customlistitem = ({icon, name, onClick}) => {
    return(<ListItem variant="outlined" sx={{ width: '100%', borderRadius: '0px', borderColor: 'white', fontSize: '1.2rem', height: '60px', border: "1px solid black", "&:hover": { backgroundColor: "secondary.main", color: "#FFFFFF", fontWeight: 'bold' } }} onClick={onClick} >
    <Stack direction={'row'} spacing={2}>
      {icon}
      <span>{name}</span>
    </Stack>
  </ListItem>)
}
export default Customlistitem;