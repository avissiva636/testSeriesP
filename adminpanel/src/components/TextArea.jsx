import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => ({
        boxSizing: "border-box",
        width: "320px",
        fontFamily: 'sans-serif',
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.5',
        padding: '8px 12px',
        borderRadius: '8px',
        color: theme.palette.primary[100],
        background: theme.palette.background.default,
        border: `1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]}`,
        boxShadow: `0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]}`
    })
);

export default Textarea;