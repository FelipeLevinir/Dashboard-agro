import React from "react";
import { useModal } from "../ui/modal/useModal";
import { Alertas } from "../ui/alertas/Alertas";
export const useAlertas = () => {
    const { openModal } = useModal();

    const openAlertas = () => {
        openModal({
            title: "Alertas activas",
            content: React.createElement(Alertas),
            size: "80vw",
            hasUnssavedChanges: false,
            isLoading: false
        });
    };
    return { openAlertas }
}