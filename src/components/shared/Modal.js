import React from "react"
import { Dialog, DialogTitle, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const Modal = props => (
  <Dialog
    open={props.isOpen}
    onClose={props.onRequestClose}
    maxWidth="md"
    fullWidth={true}
  >
    <DialogTitle>
      {props.contentLabel}
      {props.onRequestClose
        ? <IconButton
          aria-label="close"
          onClick={props.onRequestClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        : null
      }
    </DialogTitle>
    {props.children}
  </Dialog>
)

export default Modal
