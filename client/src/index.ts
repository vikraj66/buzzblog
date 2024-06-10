import router from './router/router';

document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app');

    if (appElement) {
        const path = window.location.pathname;
        router.navigate(path);
    } else {
        console.error('App element not found');
    }
});
