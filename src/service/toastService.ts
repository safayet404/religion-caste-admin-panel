import { toasts } from 'svelte-toasts';

// Define a custom type for toast options
export type ToastOptions = {
    duration?: number;
    placement?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-left';
    theme?: 'light' | 'dark';
};

// Define a type for the toast type options ('success', 'error', 'info', etc.)
type ToastType = 'success' | 'error' | 'info' | 'warning';

// Define the showToast function
export const showToast = (
    message: string,
    type: ToastType = 'success',
    options: ToastOptions = {}
) => {
    const defaults: ToastOptions = {
        duration: 3000, // Default duration
        placement: 'top-center', // Default placement
        theme: 'dark', // Default theme
    };

    const settings = { ...defaults, ...options };

    toasts.add({
        title: message,
        type: type,
        duration: settings.duration,
        placement: settings.placement,
        theme: settings.theme,
    });
};
