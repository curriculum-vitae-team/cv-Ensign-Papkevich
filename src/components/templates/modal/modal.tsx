import { Box, Button, Modal, Typography } from "@mui/material"
import { modalStyles } from "./modal.styles"

export const BasicModal = ({ open, onClose, modalTitle, modalComponent }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={modalTitle}
        component={modalComponent}
      >
        <Box sx={modalStyles.wrapper}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          {modalComponent}
          <Box sx={modalStyles.buttons}>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
