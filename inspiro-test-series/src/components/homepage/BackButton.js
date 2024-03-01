import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    };
  
    return (
      <Button variant="contained" color="success" onClick={handleGoBack}>
        Back
      </Button>
    );
}
export default BackButton;