import { LoadingManager } from 'three';

export function initLoadingManager() {
    const loadingManager = new LoadingManager();

    loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
        console.log(
            'Started loading file: ' +
                url +
                '.\nLoaded ' +
                itemsLoaded +
                ' of ' +
                itemsTotal +
                ' files.'
        );
    };

    loadingManager.onLoad = function () {
        console.log('Loading complete!');
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');

        // optional: remove loader from DOM via event listener
        loadingScreen.addEventListener('transitionend', onTransitionEnd);
    };

    loadingManager.onProgress = function (url, loaded, total) {
        console.log(url, loaded, total);
        console.log('Loaded:', Math.round((loaded / total) * 100, 2) + '%');
        // bar.animate(1.0);
    };

    loadingManager.onError = function (url) {
        console.log('There was an error loading ' + url);
    };

    return loadingManager;
}

function onTransitionEnd(event) {
    const element = event.target;
    element.remove();
}
