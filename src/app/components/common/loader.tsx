import { Box, CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Ocupa toda la altura de la pantalla
        width: "100vw", // Ocupa todo el ancho de la pantalla
      }}
    >
      <CircularProgress />
    </Box>
  );
};
