import { MdClose } from "react-icons/md";
import React, { useRef, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";


const styles = {
  backgroundDiv: {
    width: '100%',
    height: '100%',
    background: "rgba(0, 0, 0, 0.8)",
    position: 'fixed',
    top: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperDiv: {
    width: '550px',
    height: '600px',
    boxShadow: '0 5px 16px rgba(0, 0, 0, 0.2)',
    background: '#fff',
    color: '#000',
    /* display: grid; */
    gridTemplateColumns: '1fr 1fr',
    position: 'relative',
    zIndex: 10,
    borderRadius: '10px',
    padding: "5px",
  },
  closeButton: {
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '32px',
    height: '32px',
    padding: 0,
    zIndex: 10,
  }
  
};

const Modal = ({ showModal, setShowModal, children, classes }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [setShowModal, showModal]);

  return (
    <>
      {showModal ? (
        <div className={classes.backgroundDiv} ref={modalRef} onClick={closeModal}>
          <div className={classes.wrapperDiv}>
            <MdClose
              className={classes.closeButton}
              aria-label="Close"
              onClick={() => setShowModal(false)}
            ></MdClose>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default withStyles(styles)(Modal);
