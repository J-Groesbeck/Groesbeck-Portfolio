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
    $(`#navigation`).slideToggle();
    if (scrollActive) {
        $(`body`).css("overflow", "hidden")
    } else {
        $(`body`).css("overflow", "visible")
    }
    scrollActive = !scrollActive
});



$(document).ready(function () {
    setInterval(function () {
        $('.letters span').each(function () {
            // Random x/y between -20 and +20 px
            var offsetX = (Math.random() * 40) - 20;
            var offsetY = (Math.random() * 40) - 20;
            $(this).css('transform', 'translate(' + offsetX + 'px, ' + offsetY + 'px)');
        });
    }, 3000);
});