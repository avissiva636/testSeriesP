import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { Button, Card, Stack, Typography } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArchiveIcon from '@mui/icons-material/Archive';

const Welcomepage = () => {
  return (
    <Stack spacing={4}>
      <Stack>
        <Typography variant="h4" sx={{ marginLeft: "150px" }}>
          Welcome Jagan to the Online Examination Portal
        </Typography>
      </Stack>
      <Stack spacing={4} direction={"row"} sx={{}}>
        <Card
          variant="outlined"
          sx={{
            minWidth: "300px",
            minHeight: "300px",
            backgroundColor: "#3498db",
            textAlign: "center",
            color: "#ffffff",
            "&:hover": { transform: "translateY(-5px)", transition: "0.3s" },
          }}
        >
          <Stack direction={"column"} sx={{ alignItems: "center" }}>
            <h1>Mains Test Series</h1>
            <Stack spacing={3}>
              <InsertDriveFileOutlinedIcon sx={{ fontSize: "100px" }} />

              <Button
                sx={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  "&:hover": { backgroundColor: "#ffffff" },
                }}
              >
                View
              </Button>
            </Stack>
          </Stack>
        </Card>
        <Card
          variant="outlined"
          sx={{
            minWidth: "300px",
            minHeight: "300px",
            backgroundColor: "#cb6231",
            textAlign: "center",
            color: "#ffffff",
            "&:hover": { transform: "translateY(-5px)", transition: "0.3s" },
          }}
        >
          <Stack direction={"column"} sx={{ alignItems: "center" }}>
            <h1>Prelims Test Series</h1>
            <Stack spacing={3}>
              <InsertDriveFileOutlinedIcon sx={{ fontSize: "100px" }} />

              <Button
                sx={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  "&:hover": { backgroundColor: "#ffffff" },
                }}
              >
                View
              </Button>
            </Stack>
          </Stack>
        </Card>
        <Card
          variant="outlined"
          sx={{
            minWidth: "300px",
            minHeight: "300px",
            backgroundColor: "#62cb31",
            textAlign: "center",
            color: "#ffffff",
            "&:hover": { transform: "translateY(-5px)", transition: "0.3s" },
          }}
        >
          <Stack direction={"column"} sx={{ alignItems: "center" }}>
            <h1>Purchased Series</h1>
            <Stack spacing={3}>
              <InsertDriveFileOutlinedIcon sx={{ fontSize: "100px" }} />

              <Button
                sx={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  "&:hover": { backgroundColor: "#ffffff" },
                }}
              >
                View
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Stack>
      <Stack spacing={4} direction={"row"}>
        <Card
          variant="outlined"
          sx={{
            minWidth: "300px",
            minHeight: "300px",
            backgroundColor: "#3498db",
            textAlign: "center",
            color: "#ffffff",
            "&:hover": { transform: "translateY(-5px)", transition: "0.3s" },
          }}
        >
          <Stack direction={"column"} sx={{ alignItems: "center" }}>
            <h1>Answer Discussion</h1>
            <Stack spacing={3}>
              <ForumOutlinedIcon sx={{ fontSize: "100px" }} />

              <Button
                sx={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  "&:hover": { backgroundColor: "#ffffff" },
                }}
              >
                View
              </Button>
            </Stack>
          </Stack>
        </Card>
        <Card
          variant="outlined"
          sx={{
            minWidth: "300px",
            minHeight: "300px",
            backgroundColor: "#ffb606",
            textAlign: "center",
            color: "#ffffff",
            "&:hover": { transform: "translateY(-5px)", transition: "0.3s" },
          }}
        >
          <Stack direction={"column"} sx={{ alignItems: "center" }}>
            <h1>Progress Card</h1>
            <Stack spacing={3}>
              <TrendingUpIcon sx={{ fontSize: "100px" }} />

              <Button
                sx={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  "&:hover": { backgroundColor: "#ffffff" },
                }}
              >
                View
              </Button>
            </Stack>
          </Stack>
        </Card>
        <Card
          variant="outlined"
          sx={{
            minWidth: "300px",
            minHeight: "300px",
            backgroundColor: "#9b59b6",
            textAlign: "center",
            color: "#ffffff",
            "&:hover": { transform: "translateY(-5px)", transition: "0.3s" },
          }}
        >
          <Stack direction={"column"} sx={{ alignItems: "center" }}>
            <h1>Archives</h1>
            <Stack spacing={3}>
              <ArchiveIcon sx={{ fontSize: "100px" }} />

              <Button
                sx={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  "&:hover": { backgroundColor: "#ffffff" },
                }}
              >
                View
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};
export default Welcomepage;
