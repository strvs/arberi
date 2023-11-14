$(document).ready(function() {

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parents().filter('.form-input').addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parents().filter('.form-input').removeClass('focus');
        if ($(this).val() != '') {
            $(this).parents().filter('.form-input').addClass('full');
        } else {
            $(this).parents().filter('.form-input').removeClass('full');
        }
    });

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        $('.window-link').removeClass('last-active');
        curLink.addClass('last-active');
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.main-liveplace-map').click(function() {
        if ($(window).width() < 1240) {
            new Fancybox([
                {
                    src: $('.main-liveplace-map img').attr('src')
                }
            ]);
        }
    });

    $('.main-possibility-list').each(function() {
        var curSlider = $(this);
        const swiper = new Swiper(curSlider.find('.swiper')[0], {
            freeMode: true,
            slidesPerView: 'auto',
            mousewheel: true
        });
    });

    $('.main-center-slider').each(function() {
        var curSlider = $(this);
        const swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            navigation: {
                nextEl: '.main-center-slider .swiper-button-next',
                prevEl: '.main-center-slider .swiper-button-prev',
            }
        });
    });

    $('.main-inside-slider').each(function() {
        var curSlider = $(this);
        const swiper = new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.main-inside-slider .swiper-button-next',
                prevEl: '.main-inside-slider .swiper-button-prev',
            }
        });
    });

    $('.main-flats-menu li').eq(0).addClass('active');
    $('.main-flats-tab').eq(0).addClass('active');

    $('.main-flats-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-flats-menu li.active').removeClass('active');
            curLi.addClass('active');

            var curIndex = $('.main-flats-menu li').index(curLi);
            $('.main-flats-tab.active').removeClass('active');
            $('.main-flats-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.main-flats-menu-prev').click(function(e) {
        var curIndex = $('.main-flats-menu li').index($('.main-flats-menu li.active'));
        curIndex--;
        if (curIndex > -1) {
            $('.main-flats-menu li').eq(curIndex).find('a').click();
        }
        e.preventDefault();
    });

    $('.main-flats-menu-next').click(function(e) {
        var curIndex = $('.main-flats-menu li').index($('.main-flats-menu li.active'));
        curIndex++;
        if (curIndex < $('.main-flats-menu li').length) {
            $('.main-flats-menu li').eq(curIndex).find('a').click();
        }
        e.preventDefault();
    });

    $('.main-flats-slider').each(function() {
        var curSlider = $(this);
        curSlider.find('.main-flats-slider-ctrl strong').html(String('0' + curSlider.find('.main-flats-item').length).slice(-2));
        const swiper = new Swiper(curSlider.find('.swiper')[0], {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {
                slideChange: function () {
                    curSlider.find('.main-flats-slider-ctrl span').html(String('0' + (this.activeIndex + 1)).slice(-2));
                }
            }
        });
    });

    $('.main-finish-variants li').eq(0).addClass('active');

    $('.main-finish-slider').each(function() {
        var curSlider = $(this);
        const swiper = new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            on: {
                slideChange: function () {
                    $('.main-finish-variants li.active').removeClass('active');
                    $('.main-finish-variants li').eq(this.activeIndex).addClass('active');
                }
            }
        });

        $('.main-finish-variants li a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.main-finish-variants li').index(curLi);
                swiper.slideTo(curIndex);
            }
            e.preventDefault();
        });
    });

    $('.main-buy-menu li').eq(0).addClass('active');
    $('.main-buy-tab').eq(0).addClass('active');

    $('.main-buy-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-buy-menu li.active').removeClass('active');
            curLi.addClass('active');

            var curIndex = $('.main-buy-menu li').index(curLi);
            $('.main-buy-tab.active').removeClass('active');
            $('.main-buy-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.main-buy-menu-prev').click(function(e) {
        var curIndex = $('.main-buy-menu li').index($('.main-buy-menu li.active'));
        curIndex--;
        if (curIndex > -1) {
            $('.main-buy-menu li').eq(curIndex).find('a').click();
        }
        e.preventDefault();
    });

    $('.main-buy-menu-next').click(function(e) {
        var curIndex = $('.main-buy-menu li').index($('.main-buy-menu li.active'));
        curIndex++;
        if (curIndex < $('.main-buy-menu li').length) {
            $('.main-buy-menu li').eq(curIndex).find('a').click();
        }
        e.preventDefault();
    });

    $('.main-buy-tab').each(function() {
        var curTab = $(this);
        if (curTab.find('.main-buy-item').length > 3) {
            curTab.find('.main-buy-list-more').addClass('visible');
        }
    });

    $('.main-buy-list-more a').click(function(e) {
        var curTab = $(this).parents().filter('.main-buy-tab');
        curTab.toggleClass('open');
        e.preventDefault();
    });

    $('.select-menu ul li').eq(0).addClass('active');
    $('.select-tab').eq(0).addClass('active');

    $('.select-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.select-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.select-menu ul li').index(curLi);
            $('.select-tab.active').removeClass('active');
            $('.select-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.select-list-more a').click(function(e) {
        var countVisible = $('.select-list-item.visible').length;
        countVisible += listSize;
        $('.select-list-item:lt(' + countVisible + ')').addClass('visible');
        if ($('.select-list-item:not(.visible)').length == 0) {
            $('.select-list-more').removeClass('visible');
        }
        e.preventDefault();
    });

    $('.select-filter-group-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.select-filter-building').each(function() {
        var curBlock = $(this);
        $.ajax({
            type: 'POST',
            url: curBlock.attr('data-url'),
            processData: false,
            contentType: false,
            dataType: 'html',
            cache: false
        }).done(function(html) {
            $('.select-visual-build-scheme-inner').html($(html).find('.building-scheme').html());
            $('.select-filter-building').html($(html).find('.building-scheme').html());
            $('.select-visual-floor-params-build-scheme').html($(html).find('.building-scheme').html());
            $('.select-data').html($(html).find('.building-data').html());
            if (typeof(dataSelect) != 'undefined') {
                var htmlCheckboxesBuilds = '';
                var checkboxesRooms = [];
                var checkboxesSizes = [];
                var checkboxesAdds = [];

                for (var i = 0; i < dataSelect.buildings.length; i++) {
                    var curBuild = dataSelect.buildings[i];
                    var curHint = $('.select-visual-build-scheme-hint[data-id="' + curBuild.id + '"]');
                    if (curHint.length == 1) {
                        curHint.find('.select-visual-build-scheme-hint-floor-count').html(curBuild.floors);
                        curHint.find('.select-visual-build-scheme-hint-floor-text').html(getFloorsText(Number(curBuild.floors)));
                        curHint.find('.select-visual-build-scheme-hint-deadline span').html(curBuild.deadline);
                        curHint.find('.select-visual-build-scheme-hint-preview').html('<img src="' + curBuild.photo + '" alt="">');
                        if (curBuild.flats.length > 0) {
                            curHint.find('.select-visual-build-scheme-hint-available span').html(curBuild.flats.length);
                            curHint.find('.select-visual-build-scheme-hint-available strong').html(getFlatsText(curBuild.flats.length));
                        } else {
                            curHint.find('.select-visual-build-scheme-hint-available').html($('.select-visual').attr('data-notavailable'));
                        }
                    }

                    htmlCheckboxesBuilds += '<label><input type="checkbox" name="build[]" value="' + curBuild.id + '"><span>' + curBuild.title + '</span></label>';

                    for (var j = 0; j < curBuild.flats.length; j++) {
                        var curFlat = curBuild.flats[j];
                        curFlat.buildtitle = curBuild.titlemin;
                        if (checkboxesRooms.indexOf(curFlat.rooms) == -1) {
                            checkboxesRooms.push(curFlat.rooms);
                        }
                        var isHasSize = true;
                        for (var k = 0; k < checkboxesSizes.length; k++) {
                            if (checkboxesSizes[k][0] == String(curFlat.size).replace(',', '.')) {
                                isHasSize = false;
                            }
                        }
                        if (isHasSize) {
                            checkboxesSizes.push([String(curFlat.size).replace(',', '.'), curFlat.rooms]);
                        }
                        for (var k = 0; k < curFlat.add.length; k++) {
                            if (checkboxesAdds.indexOf(curFlat.add[k]) == -1) {
                                checkboxesAdds.push(curFlat.add[k]);
                            }
                        }
                    }
                }
                $('.select-filter-group-checkboxes-building').html(htmlCheckboxesBuilds);

                checkboxesRooms.sort(function(a, b) {
                    if (Number(a) > Number(b)) return 1;
                    if (Number(a) == Number(b)) return 0;
                    if (Number(a) < Number(b)) return -1;
                });

                var htmlCheckboxesRooms = '';
                for (var i = 0; i < checkboxesRooms.length; i++) {
                    htmlCheckboxesRooms += '<label><input type="checkbox" name="room[]" value="' + checkboxesRooms[i] + '"><span>' + checkboxesRooms[i] + '</span></label>';
                }
                $('.select-filter-group-checkboxes-rooms').html(htmlCheckboxesRooms);

                checkboxesSizes.sort(function(a, b) {
                    if (Number(a) > Number(b)) return 1;
                    if (Number(a) == Number(b)) return 0;
                    if (Number(a) < Number(b)) return -1;
                });

                var htmlCheckboxesSizes = '';
                for (var i = 0; i < checkboxesSizes.length; i++) {
                    htmlCheckboxesSizes += '<label><input type="checkbox" name="size[]" value="' + checkboxesSizes[i][0] + '" data-room="' + checkboxesSizes[i][1] + '"><span>' + checkboxesSizes[i][0] + '</span></label>';
                }
                $('.select-filter-group-checkboxes-sizes').html(htmlCheckboxesSizes);

                var htmlCheckboxesAdds = '';
                for (var i = 0; i < checkboxesAdds.length; i++) {
                    htmlCheckboxesAdds += '<label><input type="checkbox" name="add[]" value="' + checkboxesAdds[i] + '"><span>' + checkboxesAdds[i] + '</span></label>';
                }
                $('.select-filter-group-checkboxes-adds').html(htmlCheckboxesAdds);

                updateSelectList();
            }
        });
    });

    $('body').on('mouseenter', '.select-visual-build-scheme-inner .build', function() {
        var curID = $(this).attr('data-id');
        $('.select-visual-build-scheme-hint[data-id="' + curID + '"]').addClass('visible');
    });

    $('body').on('mouseleave', '.select-visual-build-scheme-inner .build', function() {
        $('.select-visual-build-scheme-hint.visible').removeClass('visible');
    });

    $('body').on('click', '.select-visual-build-scheme-inner .build', function() {
        var curID = $(this).attr('data-id');
        var curBuild = null;
        for (var i = 0; i < dataSelect.buildings.length; i++) {
            if (dataSelect.buildings[i].id == curID) {
                curBuild = dataSelect.buildings[i];
            }
        }
        if (curBuild != null) {
            $.ajax({
                type: 'POST',
                url: curBuild.scheme,
                processData: false,
                contentType: false,
                dataType: 'html',
                cache: false
            }).done(function(html) {
                $('.select-visual-floor-scheme-inner').html(html);
            });
            $('.select-visual-floor-params-build-title span').html(curBuild.titlemin);
            $('.select-visual-floor-params-build-scheme .build.active').removeClass('active');
            $('.select-visual-floor-params-build-scheme .build[data-id="' + curID + '"]').addClass('active');
            $('.select-visual-floor-params-build-floors').html(curBuild.floors);
            $('.select-visual-floor-params-build-flats').html(curBuild.flats.length);
            $('.select-visual-floor-scheme-hint-deadline').html(curBuild.deadline);
        }

        $('.select-visual-build').addClass('hidden');
        $('.select-visual-floor').removeClass('hidden');
    });

    $('body').on('mouseenter', '.select-visual-floor-scheme-inner .floor', function(e) {
        var floorID = $(this).attr('data-id');
        var buildID = $('.select-visual-floor-params-build-scheme .build.active').attr('data-id');
        var countFlats = 0;
        for (var i = 0; i < dataSelect.buildings.length; i++) {
            if (dataSelect.buildings[i].id == buildID) {
                var curFlats = dataSelect.buildings[i].flats;
                for (var j = 0; j < curFlats.length; j++) {
                    var curFlat = curFlats[j];
                    if (curFlat.floor == floorID) {
                        countFlats++;
                    }
                }
            }
        }
        if (countFlats > 0) {
            $('.select-visual-floor-scheme-hint-available span').html(countFlats);
            $('.select-visual-floor-scheme-hint-available strong').html(getFlatsText(countFlats));
        } else {
            $('.select-visual-floor-scheme-hint-available span').html($('.select-visual').attr('data-notavailable'));
            $('.select-visual-floor-scheme-hint-available strong').html('');
        }
        $('.select-visual-floor-scheme-hint-floor-number').html(floorID);
        $('.select-visual-floor-scheme-hint').addClass('visible');
        $('.select-visual-floor-scheme-hint').css({'top': e.pageY - $('.select-visual-floor-scheme-inner').offset().top});
    });

    $('body').on('mousemove', '.select-visual-floor-scheme-inner .floor', function(e) {
        $('.select-visual-floor-scheme-hint').css({'top': e.pageY - $('.select-visual-floor-scheme-inner').offset().top});
    });

    $('body').on('mouseleave', '.select-visual-floor-scheme-inner .floor', function() {
        $('.select-visual-floor-scheme-hint').removeClass('visible');
    });

    $('.select-visual-floor .back-link a').click(function(e) {
        $('.select-visual-build').removeClass('hidden');
        $('.select-visual-floor').addClass('hidden');

        e.preventDefault();
    });

    $('body').on('click', '.select-filter-building .build', function() {
        var curID = $(this).attr('data-id');
        if ($(this).hasClass('active')) {
            $('.select-filter-group-checkboxes-building input[value="' + curID + '"]').prop('checked', false).trigger('change');
        } else {
            $('.select-filter-group-checkboxes-building input[value="' + curID + '"]').prop('checked', true).trigger('change');
        }
    });

    $('body').on('mouseenter', '.select-filter-building .build', function() {
        var curID = $(this).attr('data-id');
        $('.select-filter-group-checkboxes-building input[value="' + curID + '"]').parent().find('span').addClass('hover');
    });

    $('body').on('mouseleave', '.select-filter-building .build', function() {
        $('.select-filter-group-checkboxes-building span.hover').removeClass('hover');
    });

    $('body').on('change', '.select-filter-group-checkboxes input', function() {
        if ($(this).parents().filter('.select-filter-group-checkboxes-building').length == 1) {
            $('.select-filter-building .build.active').removeClass('active');
            $('.select-filter-group-checkboxes-building input:checked').each(function() {
                var curID = $(this).val();
                $('.select-filter-building .build[data-id="' + curID + '"]').addClass('active');
            });
        }
        if ($(this).parents().filter('.select-filter-group-checkboxes-rooms').length == 1) {
            $('.select-filter-group-checkboxes-sizes label.hidden').removeClass('hidden');
            if ($('.select-filter-group-checkboxes-rooms input:checked').length > 0) {
                $('.select-filter-group-checkboxes-sizes label').addClass('hidden');
                $('.select-filter-group-checkboxes-rooms input:checked').each(function() {
                    var curValue = $(this).val();
                    $('.select-filter-group-checkboxes-sizes input[data-room="' + curValue + '"]').parent().removeClass('hidden');
                });
            }
        }
        updateSelectList();
    });

    $('body').on('mouseenter', '.select-filter-group-checkboxes-building span', function() {
        var curID = $(this).parent().find('input').val();
        $('.select-filter-building .build[data-id="' + curID + '"]').addClass('hover');
    });

    $('body').on('mouseleave', '.select-filter-group-checkboxes-building span', function() {
        $('.select-filter-building .build.hover').removeClass('hover');
    });

    $('.select-filter-clear a').click(function(e) {
        $('.select-filter-group-checkboxes input:checked').prop('checked', false);
        $('.select-filter-building .build.active').removeClass('active');
        updateSelectList();
        e.preventDefault();
    });

    $('.detail-scheme-switch a').click(function(e) {
        var curA = $(this);
        if (!curA.hasClass('active')) {
            $('.detail-scheme-switch a.active').removeClass('active');
            curA.addClass('active');
            var curIndex = $('.detail-scheme-switch a').index(curA);
            $('.detail-scheme-preview a.active').removeClass('active');
            $('.detail-scheme-preview a').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    Fancybox.bind('[data-fancybox]');

});

var listSize = 20;

function updateSelectList() {
    if ($('.select-filter-group-checkboxes input:checked').length > 0) {
        $('.select-filter-clear').addClass('visible');
    } else {
        $('.select-filter-clear').removeClass('visible');
    }
    var newData = [];
    if (typeof(dataSelect) != 'undefined') {
        for (var i = 0; i < dataSelect.buildings.length; i++) {
            var curBuild = dataSelect.buildings[i];
            if ($('.select-filter-group-checkboxes-building input:checked').length == 0 || $('.select-filter-group-checkboxes-building input[value="' + curBuild.id + '"]:checked').length == 1) {
                for (var j = 0; j < curBuild.flats.length; j++) {
                    var curFlat = curBuild.flats[j];
                    if ($('.select-filter-group-checkboxes-rooms input:checked').length == 0 || $('.select-filter-group-checkboxes-rooms input[value="' + curFlat.rooms + '"]:checked').length == 1) {
                        if ($('.select-filter-group-checkboxes-sizes input:checked').length == 0 || $('.select-filter-group-checkboxes-sizes input[value="' + String(curFlat.size).replace(',', '.') + '"]:checked').length == 1) {
                            if ($('.select-filter-group-checkboxes-adds input:checked').length == 0) {
                                newData.push(curFlat);
                            } else {
                                var curAdds = curFlat.add;
                                var isHas = false;
                                $('.select-filter-group-checkboxes-adds input:checked').each(function() {
                                    var curAdd = $(this).val();
                                    if (curAdds.indexOf(curAdd) != -1) {
                                        isHas = true;
                                    }
                                });
                                if (isHas) {
                                    newData.push(curFlat);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    $('.select-list-count span').html(newData.length);

    var htmlList = '';
    var titleBuild = $('.select-list-content').attr('data-titlebuild');
    var titleFloor = $('.select-list-content').attr('data-titlefloor');
    var titleFlat = $('.select-list-content').attr('data-titleflat');
    var titleRoom = $('.select-list-content').attr('data-titleroom');
    var titleSize = $('.select-list-content').attr('data-titlesize');
    for (var i = 0; i < newData.length; i++) {
        var curFlat = newData[i];
        htmlList += '<a href="' + curFlat.url + '" class="select-list-item">' +
                        '<div class="select-list-item-scheme"><img src="' + curFlat.preview + '" alt=""></div>' +
                        '<div class="select-list-item-params">' +
                            '<div class="select-list-item-param build">' + titleBuild + ' ' + curFlat.buildtitle + '</div>' +
                            '<div class="select-list-item-param floor">' + titleFloor + ' <span>' + curFlat.floor + '</span></div>' +
                            '<div class="select-list-item-param flat">' + titleFlat + ' <span>' + curFlat.number + '</span></div>' +
                            '<div class="select-list-item-param room">' + titleRoom + ' <span>' + curFlat.rooms + '</span></div>' +
                            '<div class="select-list-item-param size">' + titleSize + ' <span>' + curFlat.size + '</span></div>' +
                        '</div>' +
                    '</a>';
    }

    $('.select-list-content').html(htmlList);
    $('.select-list-item:lt(' + listSize + ')').addClass('visible');
    if ($('.select-list-item:not(.visible)').length == 0) {
        $('.select-list-more').removeClass('visible');
    } else {
        $('.select-list-more').addClass('visible');
    }
}

$(window).on('load resize', function() {

    $('.main-liveplace-content').each(function() {
        $('.main-liveplace-content').css({'height': $('.main-liveplace-container').outerHeight()});
    });

});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    $('.main-liveplace').each(function() {
        if (windowScroll + windowHeight / 3 >= $('.main-liveplace-map').offset().top) {
            $('.main-liveplace-container').addClass('fixed');
            if (windowScroll + windowHeight >= $('.main-liveplace-map').offset().top + $('.main-liveplace-map').outerHeight()) {
                $('.main-liveplace-container').css({'top': windowHeight / 3 - $('.main-liveplace-container').outerHeight() - ((windowScroll + windowHeight) - ($('.main-liveplace-map').offset().top + $('.main-liveplace-map').outerHeight()))});
            } else {
                $('.main-liveplace-container').css({'top': windowHeight / 3 - $('.main-liveplace-container').outerHeight()});
            }
        } else {
            $('.main-liveplace-container').removeClass('fixed');
        }
    });

    $('.main-welcome-runline').each(function() {
        if (windowScroll > windowHeight) {
            $('.main-welcome-runline').addClass('hidden');
        } else {
            $('.main-welcome-runline').removeClass('hidden');
        }
    });

    $('.main-welcome-runline').each(function() {
        if (windowScroll > $('.main-us').offset().top + $('.main-us').outerHeight(true)) {
            $('.main-us-video').addClass('hidden');
        } else {
            $('.main-us-video').removeClass('hidden');
        }
    });
});

function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parents().filter('.form-input').addClass('full');
        }
    });

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');


    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);

            if (curForm.hasClass('window-form')) {
                var formData = new FormData(form);

                windowOpen(curForm.attr('action'), formData);
            } else {
                form.submit();
            }
        }
    });

}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'padding-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
            var windowLink = $('.window-link.last-active');
            if (windowLink.length == 1 && typeof windowLink.attr('data-hiddenname') != 'undefined' && typeof windowLink.attr('data-hiddenvalue') != 'undefined') {
                $(this).append('<input type="hidden" name="' + windowLink.attr('data-hiddenname') + '" value="' + windowLink.attr('data-hiddenvalue') + '">');
            }
        });

    });
}

function windowClose() {
    if ($('.window').length > 0) {

        var isEmptyForm = true;
        $('.window .form-input input').each(function() {
            if ($(this).val() != '') {
                isEmptyForm = false;
            }
        });
        if (isEmptyForm) {
            $('.window-container').addClass('window-container-preload');
            $('.window').remove();
            $('html').removeClass('window-open');
            $('body').css({'padding-right': 0});
            $('.wrapper').css({'top': 0});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        } else {
            if (confirm('Закрыть форму?')) {
                $('.window .form-input input').val('');
                windowClose();
            }
        }
    }
}

$(window).on('load', function() {

    $('.page-main').each(function() {
        $('body').removeClass('page-main');
        window.setTimeout(function() {
            $('body').removeClass('page-main-loading');
        }, 3000);
    });

});

function getFloorsText(number) {
    var endings = Array('этажей', 'этаж', 'этажа');
    var num100 = number % 100;
    var num10 = number % 10;
    if (num100 >= 5 && num100 <= 20) {
        return endings[0];
    } else if (num10 == 0) {
        return endings[0];
    } else if (num10 == 1) {
        return endings[1];
    } else if (num10 >= 2 && num10 <= 4) {
        return endings[2];
    } else if (num10 >= 5 && num10 <= 9) {
        return endings[0];
    } else {
        return endings[2];
    }
}

function getFlatsText(number) {
    var endings = Array('квартир', 'квартира', 'квартиры');
    var num100 = number % 100;
    var num10 = number % 10;
    if (num100 >= 5 && num100 <= 20) {
        return endings[0];
    } else if (num10 == 0) {
        return endings[0];
    } else if (num10 == 1) {
        return endings[1];
    } else if (num10 >= 2 && num10 <= 4) {
        return endings[2];
    } else if (num10 >= 5 && num10 <= 9) {
        return endings[0];
    } else {
        return endings[2];
    }
}