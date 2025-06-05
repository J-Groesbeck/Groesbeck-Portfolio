const vue_app = Vue.createApp({
    created() {
        fetch('js/junior_projects.json')
            .then(response => response.json())
            .then(json => {
                this.junior_projects = json;
                this.$nextTick(this.initHoverCards);
            });

        fetch('js/senior_projects.json')
            .then(response => response.json())
            .then(json => {
                this.senior_projects = json;
                this.$nextTick(this.initHoverCards);
            });
    },
    data() {
        return {
            junior_projects: [],
            senior_projects: []
        }
    },
    methods: {
        initHoverCards() {
            // Hide every panel + its children before attaching handlers
            $('.slide-panel').hide().children().hide();

            // Check current viewport width
            const isSmallScreen = $(window).width() < 768;

            if (!isSmallScreen) {
                // ─── Large screens (≥ md): unchanged hover‐to‐slide‐out logic ───
                $('.hover-card').each(function () {
                    const $card = $(this);
                    const isLeft = $card.hasClass('align-left');
                    const $imgCol = $card.find('.col-12');
                    const $panel = $card.find('.slide-panel');
                    const $panelChildren = $panel.children();
                    let openTimer, revealTimer;

                    // Remove any leftover click bindings (just in case)
                    $card.off('click');

                    $card.hover(
                        function () {
                            $('.hover-card').removeClass('z-1').addClass('z-0');
                            clearTimeout(openTimer);
                            clearTimeout(revealTimer);

                            $card.removeClass('z-0').addClass('z-3');
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
                        },
                        function () {
                            clearTimeout(openTimer);
                            clearTimeout(revealTimer);

                            setTimeout(() => {
                                $card.find(isLeft ? '.rounded-start-4' : '.rounded-end-4')
                                    .removeClass(isLeft ? 'rounded-start-4' : 'rounded-end-4')
                                    .addClass('rounded-4');
                            }, 250);

                            setTimeout(() => {
                                $card.removeClass('z-3').addClass('z-1');
                            }, 1500);

                            $panelChildren.slideUp();
                            $panel.animate({ width: '0px' }, 250, function () {
                                $(this).hide();
                            });

                            setTimeout(() => {
                                $imgCol.removeClass(isLeft ? 'pe-0' : 'ps-0');
                            }, 250);
                        }
                    );
                });

            } else {
                // ─── Small screens (< md): “click to slide‐down/up from under the image” ───
                $('.hover-card').each(function () {
                    const $card = $(this);
                    const $panel = $card.find('.slide-panel');
                    const $panelChildren = $panel.children();

                    // Remove large-screen hover handlers & any leftover width animations
                    $card.off('mouseenter mouseleave');
                    $panel.stop(true, true).css({ width: '100%' });

                    // Ensure the panel starts with full rounding when closed
                    $panel
                        .removeClass('rounded-start-4 rounded-end-4 rounded-bottom-4')
                        .addClass('rounded-4');

                    // On tap: toggle panel’s visibility
                    $card.off('click').on('click', function (e) {
                        e.preventDefault();

                        if ($panel.is(':visible')) {
                            // Hide children first, then collapse the panel, then restore rounding
                            $panelChildren.slideUp(200, function () {
                                $panel.slideUp(200, function () {
                                    $panel
                                        .removeClass('rounded-bottom-4')
                                        .addClass('rounded-4');
                                    $card.removeClass('rounded-4').addClass('rounded-top-4')
                                });
                            });
                        } else {
                            // Before showing: remove any previous rounding and add bottom-only rounding
                            $panel
                                .removeClass('rounded-start-4 rounded-end-4 rounded-4')
                                .addClass('rounded-bottom-4');
                            $card
                                .removeClass('rounded-top-4')
                                .addClass('rounded-4');
                            // Slide the panel down, then reveal its contents
                            $panel.slideDown(200, function () {
                                $panelChildren.slideDown(200);
                            });
                        }
                    });
                });
            }
        },
        changeDisplayed(section) {
            if (section === "all") {
                $('#sophomore, #junior, #senior').slideDown();
            } else {
                $('#sophomore, #junior, #senior')
                    .not(`#${section}`)
                    .slideUp();
                $(`#${section}`).slideDown();
            }

            if (typeof animateLetters === 'function') {
                animateLetters();
            }
            $('.filter-btn').removeClass('active');
            $(`.filter-btn[data-section="${section}"]`).addClass('active');
        }

    }
});

vue_app.mount("#vue_app");
