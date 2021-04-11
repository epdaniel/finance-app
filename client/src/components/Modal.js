import { MdClose } from "react-icons/md";
import React, { useRef, useEffect } from "react";

//TODO: useStyles instead bro
import "../css/DetailedEntry.css";

export const Modal = ({ showModal, setShowModal, children }) => {
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
        <div className="backgroundDiv" ref={modalRef} onClick={closeModal}>
          <div className="wrapperDiv">
            <MdClose
              className="closeButton"
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
