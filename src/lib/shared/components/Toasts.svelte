<script context="module">
    import toast, { Toaster } from 'svelte-french-toast';

    const defaultData = {
        getStyle: (color) =>
            `background: ${color}; color: #FFFFFF; font-weight: bold; padding: 16px`,
        position: /** @type {import("svelte-french-toast").ToastPosition} */ (
            'top-right'
        ),
        duration: 3500,
    };

    const defaultToast = (message) => {
        toast(message, {
            position: defaultData.position,
            duration: defaultData.duration,
        });
    };

    const successToast = (message) => {
        toast.success(message, {
            style: defaultData.getStyle('#29B564'),
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#29B564',
            },
            position: defaultData.position,
            duration: defaultData.duration,
        });
    };

    const errorToast = (message) => {
        toast.error(message, {
            style: defaultData.getStyle('#E14D45'),
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#E14D45',
            },
            position: defaultData.position,
            duration: defaultData.duration,
        });
    };

    const warningToast = (message) => {
        toast(message, {
            icon: '⚠️',
            style: defaultData.getStyle('#ED991D'),
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#ED991D',
            },
            position: defaultData.position,
            duration: defaultData.duration,
        });
    };

    const infoToast = (message) => {
        toast(message, {
            icon: 'ℹ️',
            style: defaultData.getStyle('#3C90D1'),
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#3C90D1',
            },
            position: defaultData.position,
            duration: defaultData.duration,
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
