import { useState } from 'react'

export const useModal = (isVisible: boolean = false) => {
  const [showModal, setShowModal] = useState<boolean>(isVisible)

  const handleToggleModal = () => setShowModal(!showModal)
  const handleShowModal = () => setShowModal(true)
  const handleHideModal = () => setShowModal(false)

  return {
    showModal,
    handleToggleModal,
    handleShowModal,
    handleHideModal,
  }
}