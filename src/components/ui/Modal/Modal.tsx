import { MouseEvent as ReactMouseEvent, useLayoutEffect, useRef } from "react"
import styles from "./Modal.module.scss"
import { useAppStore } from "../../../stores/useAppStore"


const Modal = () => {

  const modalRef = useRef<HTMLDivElement | null>(null)

  const setModalRef = useAppStore(state=>state.setModalRef)
  const title = useAppStore(state=>state.modalTitle)
  const content = useAppStore(state=>state.modalContent)
  const closeModal = useAppStore(state=>state.closeModal)
  
  useLayoutEffect(() => { //Se ejecuta después de que el DOM se ha renderizado, pero antes de que el navegador pinte la pantalla.
    if(modalRef.current) { //Esto asegura que solo se ejecuta setModalRef cuando el <div> con ref={modalRef} ya está en el DOM
      setModalRef(modalRef)
    }
  }, []) 


  const handlecloseModal = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {   
    if(e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div className={styles.bgWrapper} onClick={(e) => handlecloseModal(e)} ref={modalRef}>
      <div className={styles.modal} id="modal">
        <div className={styles.closeIcon} onClick={closeModal}>
          <img src="/icons/close-icon.svg" alt="close modal" />
        </div>
        <h3>{title}</h3>
        <div className={styles.contentWrap}>
          {content}
        </div>
      </div>
    </div>
  )
}

export default Modal