import React from 'react'
import ReactModal from 'react-modal'

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9,
  },
  content: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
  },
}

// ReactModal: https://github.com/reactjs/react-modal
const Modal = props => (
  <ReactModal
    contentLabel={props.contentLabel}
    style={modalStyles}
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    onAfterOpen={props.onAfterOpen}
    //className={{ base: props.customClass ? props.customClass : 'modal-dialog' }}
    //overlayClassName={{ base: '' }}
  >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {props.contentLabel}
        </h5>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => props.onRequestClose()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body modal-body-responsive">{props.children}</div>
    </div>
  </ReactModal>
)

export default Modal
