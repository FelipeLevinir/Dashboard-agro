import React, { useState } from "react";
import { ModalContext } from "./ModalContext";

export const ModalProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState({});

    const openModal = (newConfig) => {
        setConfig(newConfig);
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
        setConfig({});
    }

    const updateModalConfig = (updates) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            ...updates
        }));
      
    };

  return (
    <ModalContext.Provider value={{isOpen, config, openModal, closeModal, updateModalConfig}}>
        {children}
    </ModalContext.Provider>
  )
}
