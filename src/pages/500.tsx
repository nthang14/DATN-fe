import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
const App: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h1" className="text-neutral-09 font-semibold">
          500
        </Typography>
        <Typography variant="h6" className="text-neutral-09 py-9">
          Woops! Something went wrong !
        </Typography>
        <Typography variant="h6" className="text-neutral-09">
          Have you tried turning it off and on again?
        </Typography>
      </Box>
    </>
  );
};
export default App;
