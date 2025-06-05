document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carouselExampleCaptions');
    const innerContainer = carousel.querySelector('.carousel-inner');
    const imgs = carousel.querySelectorAll('.carousel-item img');

    let maxHeight = 0;

    // Helper: once each image is loaded, check its rendered height
    function checkImageHeights() {
        imgs.forEach((img) => {
            // Only measure if the image has actually finished loading
            if (img.complete && img.naturalHeight) {
                maxHeight = Math.max(maxHeight, img.getBoundingClientRect().height);
            }
        });

        // If we've found at least one height > 0, apply it
        if (maxHeight > 0) {
            innerContainer.style.height = maxHeight + 'px';
        }
    }

    // If any image isn’t loaded yet, listen for its load event
    imgs.forEach((img) => {
        if (!img.complete) {
            img.addEventListener('load', function () {
                // After this image loads, recalc all heights
                checkImageHeights();
            });
        }
    });

    // Do one pass in case they were already cached/loaded
    checkImageHeights();
});