import { createContext, useContext, useState } from "react";

export type SnackbarSeverity = "success" | "error" | "warning" | "info";


interface SnackbarState {
    open: boolean;
    message: string;
    severity?: SnackbarSeverity;
    duration?: number;
}

interface SnackbarContextProps {
    snackbar: SnackbarState;
    showSnackbar: (
        message: string,
        severity?: SnackbarSeverity,
        duration?: number
    ) => void;
    closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);


export const useSnackbar = (): SnackbarContextProps => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error("useSnackbar must be used inside SnackbarProvider");
    }
    return context;
};

export const SnackbarProvider = ({ children }: any) => {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: "",
        severity: "info",
        duration: 2000
    });


    const showSnackbar = (
        message: string,
        severity: SnackbarSeverity = "info",
        duration: number = 2000
    ) => {
        setSnackbar({
            open: true,
            message,
            severity,
            duration,
        });
    };

    const closeSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }

    return (
        <SnackbarContext.Provider
            value={{
                snackbar,
                showSnackbar,
                closeSnackbar,
            }}
        >
            {children}
        </SnackbarContext.Provider>
    )
}

