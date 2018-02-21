$(document).ready(function () {
    //Slick-slider settings
    $('.tablet').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
        rows: 0
    });

    //wow init
    new WOW().init();

    //countUp init


    //Toggle mobile-burger
    $('#burger-menu').click(function () {
        $(this).toggleClass('open');
        $('header').toggleClass('show_mobile-menu');
    });
    $('.scrollTo').click(function () {
        $('header').removeClass('show_mobile-menu');
        $('#burger-menu').removeClass('open');
    });

    //Toggle language class
    $('.choose-lang_dropdown_wrapp').on('click', function () {
        $('.choose-lang_dropdown_wrapp').toggleClass('open');
    });

    //Click on toTop button
    $('.toTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 800);
    });

    //Toggle accordion function
    $('body').on('click', '.single-accordion', function () {
        $(this).hasClass('open') ? $(this).removeClass('open').find('.single-accordion_text').slideUp() : $(this).addClass('open').find('.single-accordion_text').slideDown();
    });

    //Scroll down || scroll to link
    $(".scrollDown, .scrollTo").click(function (e) {
        e.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top - 50
        }, 1000);
    });

    headerPosition();
    activeMenu();
    checkPosition();
    showToTop();
    animateBar();
    progressbar2();

    //Functions with scroll
    $(window).scroll(function () {
        activeMenu();
        checkPosition();
        showToTop();
        headerPosition();
        animateBar();
        addActiveClass();

        $('header').removeClass('show_mobile-menu');
        $('#burger-menu').removeClass('open');
    });


    var gadgetsOffset = $('.gadgets').offset().top - $(window).height() + 250;
    var apiOffset = $('.api').offset().top - $(window).height() + 100;
    var exchangeOffset = $('.exchange').offset().top - $(window).height() + 100;
    var specsOffset = $('.specs-block').offset().top - $(window).height() + 500;
    var gadgetsSourceOffset = $('.gadgets-sources').offset().top - $(window).height() + 100;
    var secondBlockBg = $('.ico_second-block').offset().top - $(window).height() + 500;
    var funds = $('#funds').offset().top - $(window).height() + 100;
    var options = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '..'
    };
    var aim = +($('#funds').html());

    function addActiveClass() {
        if($(window).width() > '1150' && $(this).scrollTop() > secondBlockBg){
            $('.ico_second-block').css( "background-position-x", "0, -5px" );
        }
        if($(this).scrollTop() > gadgetsOffset){
            $('.gadgets').addClass('gadgets-activate');
        }

        if($(this).scrollTop() > funds && !$('#funds').hasClass('counted')){
            var demo = new CountUp('funds', 0, aim, 0, 2.5, options);
            if (!demo.error) {
                demo.start();
            } else {
                console.error(demo.error);
            }
            $('#funds').addClass('counted');

        }

        if($(this).scrollTop() > specsOffset){
            $('.specs-block').addClass('specs-block-activate');
        }
        if($(this).scrollTop() > exchangeOffset){
            $('.exchange').addClass('exchange-activate');
        }
        if($(this).scrollTop() > apiOffset){
            $('.api').addClass('exchange-activate');
        }
        if ($(this).scrollTop() > gadgetsSourceOffset) {
            $('.gadgets-sources').addClass('gadgets-sources-activate');
        }
    }

    //vars for headerPosition()
    var tempScrollTop, currentScrollTop = 0;

    //Check header position
    function headerPosition() {
        currentScrollTop = $(window).scrollTop();
        if (tempScrollTop < currentScrollTop) {
            $('header').addClass('is-fixed');
            $('.choose-lang_dropdown_wrapp').removeClass('open');
        }
        else if (tempScrollTop > currentScrollTop) {
            $('header').removeClass('is-fixed');
        }
        tempScrollTop = currentScrollTop;
    }


    //Show || Hide toTop button
    function showToTop() {
        if ($(this).scrollTop() >= 1) {
            $('.toTop').fadeIn(300);
        } else {
            $('.toTop').fadeOut(300);
        }
    }

    //Check position of user (header settings)
    function checkPosition() {
        if ($(this).scrollTop() >= 50) {
            $('header').addClass('colorize');
        } else {
            $('header').removeClass('colorize');
        }
    }

    //Activate header menu on current position
    function activeMenu() {
        var thisST = +($(this).scrollTop()).toFixed(),
            theApp = +($('#app').offset().top - 101).toFixed(),
            theIco = +($('#ico').offset().top - 102).toFixed(),
            theTeam = +($('#team').offset().top - 101).toFixed(),
            theDocuments = +($('#documents').offset().top - 200).toFixed(),
            theFaq = +($('#faq').offset().top - 300).toFixed(),
            theFooter = +($('footer').offset().top + 500).toFixed();

        if (thisST >= theApp && thisST <= theIco) {
            MenuAddClass('.app');
        }
        else if (thisST >= theIco && thisST <= theTeam) {
            MenuAddClass('.ico');
        }
        else if (thisST >= theTeam && thisST <= theDocuments) {
            MenuAddClass('.team');
        }
        else if (thisST >= theDocuments && thisST <= theFaq) {
            MenuAddClass('.documents');
        }
        else if (thisST >= theFaq && thisST <= theFooter) {
            MenuAddClass('.faq');
        }
        else {
            MenuAddClass('.home');
        }

        function MenuAddClass(el) {
            $('li').removeClass('current');
            $(el).addClass('current');
        }
    }

    //Progressbar loading functions (white light)
    function progressbar1() {
        $('.ico-progressbar-active.scrolled').removeClass('loading');
        setTimeout(progressbar2, 1500);
    }
    function progressbar2() {
        $('.ico-progressbar-active.scrolled').addClass('loading');
        setTimeout(progressbar1, 1500);
    }

    //Check width of progress-bar
    function checkWidth() {
        target.css('width', $('.ico-progressbar-active .number').html() + '%');
    }

    //vars for progress bar functions
    var target = $('.ico-progressbar-active');
    var scrollToElem = target.offset().top - $(window).height();
    var triggerProgress = true;

    //Animate-bar function
    function animateBar() {
        if ($(this).scrollTop() > scrollToElem) {
            if (triggerProgress) {
                checkWidth();
                target.addClass('scrolled');
                target.css('width', $('.ico-progressbar-active .number').html() + '%');
                $('.ico-progressbar-active .number').animate({num: $('.ico-progressbar-active .number').html()}, {
                    duration: 2500,
                    step: function (num) {
                        this.innerHTML = (num).toFixed(0)
                    }
                });
                triggerProgress = !triggerProgress;
            }
        }
    }

});