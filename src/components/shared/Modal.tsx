import React from "react"
import { Dialog, DialogTitle, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const Modal = ({ isOpen, onRequestClose, contentLabel, children}: {
  isOpen: boolean,
  onRequestClose: () => any,
  contentLabel: string,
  children: JSX.Element
}) => (
  <Dialog open={isOpen} onClose={onRequestClose} maxWidth="md" fullWidth={true}>
    <DialogTitle>
      {contentLabel}
      <IconButton
        aria-label="close"
        onClick={onRequestClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    {children}
  </Dialog>
)

export default Modal
