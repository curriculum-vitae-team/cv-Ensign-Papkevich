export const modalStyles = {
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiTypography-root": {
      flexGrow: 1,
    },
    marginBottom: "16px",
  },
}
