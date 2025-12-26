import React from 'react'
import { useModal } from './useModal';
import { Dialog } from 'primereact/dialog';

export const GlobalModal = () => {
    const { isOpen, config, closeModal } = useModal();
  return (
    <Dialog
        header={config.title}
        visible={isOpen}
        onHide={closeModal}
        modal
        style={{ width: '50vw' }}
    >
        {config.content}
    </Dialog>
  )
}
