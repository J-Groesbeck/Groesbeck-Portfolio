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

$('.hover-card').each(function (index) {
    const $card = $(this);
    const isLeft = $card.hasClass('align-left');
    const $imgCol = $card.find('.col-12');
    const $panel = $card.find('.slide-panel');
    const $panelChildren = $panel.children();

    let openTimer, revealTimer;

    $card.hover(function () {
        clearTimeout(openTimer);
        clearTimeout(revealTimer);

        $card.addClass('z-3');
        if (isLeft) {
            $imgCol.addClass('pe-0');
        } else {
            $imgCol.addClass('ps-0');
        }

        openTimer = setTimeout(() => {
            $card.find('.rounded-4')
                .removeClass('rounded-4')
                .addClass(isLeft ? 'rounded-start-4' : 'rounded-end-4');

            $panel.show().animate({ width: '200px' }, 250);
        }, 1500);

        revealTimer = setTimeout(() => {
            $panelChildren.slideDown();
        }, 1750);

    }, function () {
        clearTimeout(openTimer);
        clearTimeout(revealTimer);

        setTimeout(() => {
            $card.removeClass('z-3');
            $card.find(isLeft ? '.rounded-start-4' : '.rounded-end-4')
                .removeClass(isLeft ? 'rounded-start-4' : 'rounded-end-4')
                .addClass('rounded-4');
        }, 250);

        $panelChildren.stop(true, true).slideUp();
        $panel.stop(true, true).animate({ width: 0 }, 250, function () {
            $(this).hide();
        });

        setTimeout(() => {
            $imgCol.removeClass(isLeft ? 'pe-0' : 'ps-0');
        }, 250);
    });
});
