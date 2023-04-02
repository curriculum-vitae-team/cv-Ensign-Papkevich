import { styled } from "@mui/material"

export const Form = styled("form")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  marginTop: "16px",
  alignItems: "center",

  "& > button": {
    gridColumn: "1 / -1",
    width: "100%",
  },

  "@media (max-width: 960px)": {
    gridTemplateColumns: "1fr",
    "& > button": {
      gridColumn: "1",
      width: "100%",
    },
  },
})
