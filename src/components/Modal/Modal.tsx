import { MouseEvent as ReactMouseEvent, useLayoutEffect, useRef } from "react"
import FormPreferencies from "../FormPreferencies/FormPreferencies"
import styles from "./Modal.module.scss"
import { useAppStore } from "../../stores/useAppStore"


const Modal = () => {

  const modalRef = useRef<HTMLDivElement | null>(null)

  const setModalRef = useAppStore(state=>state.setModalRef)
  const closeModal = useAppStore(state=>state.closeModal)
  
  useLayoutEffect(() => {
    if(modalRef) {
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
          <img src="/public/icons/close-icon.svg" alt="close modal" />
        </div>
        <h3>Search Preferences</h3>
        <FormPreferencies />
      </div>
    </div>
  )
}

export default Modal