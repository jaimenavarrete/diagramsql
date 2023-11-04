<script context="module">
    import toast, { Toaster } from 'svelte-french-toast';

    const defaultToast = (message) => {
        toast(message, {
            position: 'top-center',
            duration: 3500,
        });
    };

    const successToast = (message) => {
        toast.success(message, {
            style: 'background: #29B564; color: #FFFFFF; font-weight: bold; padding: 16px',
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#29B564',
            },
            position: 'top-center',
            duration: 3500,
        });
    };

    const errorToast = (message) => {
        toast.error(message, {
            style: 'background: #E14D45; color: #FFFFFF; font-weight: bold; padding: 16px',
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#E14D45',
            },
            position: 'top-center',
            duration: 3500,
        });
    };

    const warningToast = (message) => {
        toast(message, {
            icon: '⚠️',
            style: 'background: #ED991D; color: #FFFFFF; font-weight: bold; padding: 16px',
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#ED991D',
            },
            position: 'top-center',
            duration: 3500,
        });
    };

    const infoToast = (message) => {
        toast(message, {
            icon: 'ℹ️',
            style: 'background: #3C90D1; color: #FFFFFF; font-weight: bold; padding: 16px',
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#3C90D1',
            },
            position: 'top-center',
            duration: 3500,
        });
    };

    const toastTypeHandlers = {
        success: successToast,
        error: errorToast,
        warning: warningToast,
        info: infoToast,
    };

    export const showToast = (type, message) => {
        const toastHandler = toastTypeHandlers[type];

        toastHandler ? toastHandler(message) : defaultToast(message);
    };
</script>

<!-- Toasts container -->
<Toaster />
