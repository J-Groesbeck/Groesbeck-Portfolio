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
            $('.slide-panel').hide().children().hide();
            $('.hover-card').each(function () {
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
                        $card.find(isLeft ? '.rounded-start-4' : '.rounded-end-4')
                            .removeClass(isLeft ? 'rounded-start-4' : 'rounded-end-4')
                            .addClass('rounded-4');
                    }, 250);

                    setTimeout(() => {
                        $card.removeClass('z-3');
                    }, 1500);

                    $panelChildren.stop(true, true).slideUp();
                    $panel.stop(true, true).animate({ width: 0 }, 250, function () {
                        $(this).hide();
                    });

                    setTimeout(() => {
                        $imgCol.removeClass(isLeft ? 'pe-0' : 'ps-0');
                    }, 250);
                });
            });
        }
    }
});

vue_app.mount("#vue_app");
