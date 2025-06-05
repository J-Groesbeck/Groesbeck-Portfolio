function randomRadius() {
    const rand = () => Math.floor(Math.random() * 61) + 40;
    return `${rand()}% ${rand()}% ${rand()}% ${rand()}% / ${rand()}% ${rand()}% ${rand()}% ${rand()}%`;
}

function startMorphing() {
    const elements = document.querySelectorAll('.square > div');

    elements.forEach((element) => {
        element.style.transition = 'border-radius 1.75s ease-in-out';

        function updateRadius() {
            const newRadius = randomRadius();
            element.style.borderRadius = newRadius;
            setTimeout(updateRadius, 1750);
        }
        updateRadius();
    })
}

window.onload = startMorphing;

$(`#navigation`).hide();
var scrollActive = true
$('.smaller-square').on('click', function () {
    $('#navigation').slideToggle();

    // Toggle scroll behavior
    if (scrollActive) {
        $('body').css("overflow", "hidden");
    } else {
        $('body').css("overflow", "visible");
    }
    scrollActive = !scrollActive;

    // Icon morph effect
    const $icon = $('#nav-icon');
    $icon.addClass('icon-morph-out');

    setTimeout(() => {
        // Toggle icon classes
        if ($icon.hasClass('fa-compass')) {
            $icon.removeClass('fa-regular fa-compass').addClass('fa-solid fa-x');
        } else {
            $icon.removeClass('fa-solid fa-x').addClass('fa-regular fa-compass');
        }

        $icon.removeClass('icon-morph-out').addClass('icon-morph-in');

        // Remove morph-in class after animation finishes
        setTimeout(() => {
            $icon.removeClass('icon-morph-in');
        }, 200);
    }, 150);
});



function animateLetters() {
    $('.letters span').each(function () {
        var offsetX = (Math.random() * 2) - 1;
        var offsetY = (Math.random() * 2) - 1;
        $(this).css('transform', 'translate(' + offsetX + 'vw, ' + offsetY + 'vw)');
    });
}

$(document).ready(function () {
    animateLetters()
    setInterval(animateLetters, 3000);
});

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