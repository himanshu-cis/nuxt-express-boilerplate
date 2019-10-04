
export default function ({ $axios, store, redirect }) {

    $axios.onError(({ response }) => {
        if (!response.data.status) {
            store.dispatch('account/notification', {
                message: response.data.message,
                type: "ERROR"
            })
        }
    });

    $axios.onResponse((response) => {
        if (response.data.status) {
            store.dispatch('account/notification', {
                message: response.data.message,
                type: "SUCCESS"
            });
        }
    });
}