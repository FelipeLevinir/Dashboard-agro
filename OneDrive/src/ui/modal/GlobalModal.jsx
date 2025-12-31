import React, { useState } from 'react';
import { useModal } from './useModal';
import { Dialog } from 'primereact/dialog';

export const GlobalModal = () => {
    const { isOpen, config, closeModal, updateModalConfig } = useModal();
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        if (config.hasUnSavedChanges) {
          if (!confirm("Seguro de que quieres salir? Tienes cambios sin guardar.")) {
            return;
          }
        }
        closeModal();
    }

    const contentWithProps = React.isValidElement(config.content)
      ? React.cloneElement(config.content, {
        onClose: handleClose,
        modalActions: {
          setTitle: (newTitle) => updateModalConfig({ title: newTitle }),
          setLoading: (loading) => updateModalConfig({ isLoading: loading }),
          setHasUnSavedChanges: (hasChanges) => updateModalConfig({ hasUnSavedChanges: hasChanges }),
        }
      }): config.content;

  return (
    <Dialog
        header={config.title}
        visible={isOpen}
        onHide={handleClose}
        modal
        style={{ width: config.size === 'lg' ? '50vw' : '30vw' }}
        closable = {!config.isLoading}
    >
        {config.isLoading ? (
          <div className='p-4 text-center'>
            <i className='pi pi-spin pi-spinner mr-2' />
            Cargando…
          </div> 
        ) : (
          contentWithProps
        )}
    </Dialog>
  )
}
