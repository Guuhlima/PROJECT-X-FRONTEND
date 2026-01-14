export type ToastProps = {
    message: string;
    variant?: "error" | "success" | "info";
    onClose?: () => void;
};

