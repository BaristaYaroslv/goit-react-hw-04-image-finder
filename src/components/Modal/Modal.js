import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalWindow, Overlay } from './Modal.styled';

const Modal = ({ modalInfo, handlerOnCloseModal }) => {
  const { src, alt } = modalInfo;

  const handlerOnClickModal = event => {
    if (event.currentTarget === event.target) handlerOnCloseModal();
  };

  useEffect(() => {
    const handlerKeyDownESC = event => {
      if (event.key === 'Escape') handlerOnCloseModal();
    };

    window.addEventListener('keydown', handlerKeyDownESC);

    return () => {
      window.removeEventListener('keydown', handlerKeyDownESC);
    };
  }, [handlerOnCloseModal]);

  return(
    <Overlay onClick={handlerOnClickModal}>
      <ModalWindow>
        <img src={src} alt={alt} />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  modalInfo: PropTypes.exact({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};

export default Modal;