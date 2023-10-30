import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import ButtonCommon from "~/components/common/ButtonCommon";
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
            404
          </Typography>
          <Typography variant="h6" className="text-neutral-09 py-9">
            The page you’re looking for doesn’t exist.
          </Typography>
          <ButtonCommon
            variant="contained"
            className="rounded-3xl"
            color="primary"
            onClick={(e: any) => router.push("/")}
          >
            Back Home
          </ButtonCommon>
      </Box>
    </>
  );
};
export default App;
