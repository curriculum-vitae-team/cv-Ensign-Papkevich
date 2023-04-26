import { Box, Button, Modal, Typography } from "@mui/material"
import { modalStyles } from "./modal.styles"

export const BasicModal = ({ open, onClose, modalTitle, children }) => {
  return (
    <>
      <Modal open={open} onClose={onClose} title={modalTitle}>
        <Box sx={modalStyles.wrapper}>
          <Box sx={modalStyles.header}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalTitle}
            </Typography>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Close
            </Button>
          </Box>
          {children}
        </Box>
      </Modal>
    </>
  )
}
