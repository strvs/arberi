$(document).ready(function() {

    $('.page-loading').each(function() {
        var timerLoading = window.setInterval(function() {
            if ($('.page-loader').length == 1) {
                if ($('.pace-progress').length == 1) {
                    var curProgress = Number($('.pace-progress').attr('data-progress-text').replace('%', ''));
                    $('.page-loader-progress span').html(curProgress);
                    $('.page-loader-runline img').css({'transform': 'translateX(' + (100 - curProgress) + '%)'});
                    $('.page-loader-leaf-1 img').css({'transform': 'translate(' + (76 - curProgress / 100 * 76) + '%, ' + (128 - curProgress / 100 * 128) + '%)'});
                    $('.page-loader-leaf-2 img').css({'transform': 'translate(' + (210 - curProgress / 100 * 210) + '%, -' + (57 - curProgress / 100 * 57) + '%)'});
                    $('.page-loader-leaf-3 img').css({'transform': 'translate(' + (132 - curProgress / 100 * 132) + '%, ' + (64 - curProgress / 100 * 64) + '%)'});
                    $('.page-loader-leaf-4 img').css({'transform': 'translate(' + (158 - curProgress / 100 * 158) + '%, -' + (54 - curProgress / 100 * 54) + '%)'});
                    if (curProgress >= 100) {
                        window.clearInterval(timerLoading);
                        timerLoading = null;
                        $('body').removeClass('page-loading');
                        $('.page-loader').fadeOut(500, function() {
                            $('.page-loader').remove();
                            $('.pace').remove();
                            $('.main-welcome-runline').addClass('animate');
                        });
                    }
                }
            }
        }, 10);
    });

});

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

    if (typeof $.cookie('select_menu') != 'undefined' && $.cookie('select_menu') == '1') {
        $('.select-menu ul li').eq(1).addClass('active');
        $('.select-tab').eq(1).addClass('active');
    } else {
        $('.select-menu ul li').eq(0).addClass('active');
        $('.select-tab').eq(0).addClass('active');
    }

    $('.select-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.select-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.select-menu ul li').index(curLi);
            $('.select-tab.active').removeClass('active');
            $('.select-tab').eq(curIndex).addClass('active');

            $.cookie('select_menu', curIndex, {expires: 365});
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
        var curGroup = $(this).parent();
        var curIndex = $('.select-filter-group').index(curGroup);
        curGroup.toggleClass('open');
        if (curGroup.hasClass('open')) {
            $.cookie('select_filter_group_' + curIndex, 'true', {expires: 365});
        } else {
            $.cookie('select_filter_group_' + curIndex, 'false', {expires: 365});
        }
    });

    $('.select-filter-group').each(function() {
        var curGroup = $(this);
        var curIndex = $('.select-filter-group').index(curGroup);
        if (typeof $.cookie('select_filter_group_' + curIndex) != 'undefined' && $.cookie('select_filter_group_' + curIndex) == 'true') {
            curGroup.addClass('open');
        }
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
            $('.select-visual-flat-params-build-scheme').html($(html).find('.building-scheme').html());
            $('.select-data').html($(html).find('.building-data').html());
            if (typeof(dataSelect) != 'undefined') {
                var htmlCheckboxesBuilds = '';
                var checkboxesFloors = [];
                var checkboxesRooms = [];
                var checkboxesAdds = [];

                for (var i = 0; i < dataSelect.buildings.length; i++) {
                    var curBuild = dataSelect.buildings[i];
                    var curHint = $('.select-visual-build-scheme-hint[data-id="' + curBuild.id + '"]');
                    if (curHint.length == 1) {
                        curHint.find('.select-visual-build-scheme-hint-floor-count').html(curBuild.fcount);
                        curHint.find('.select-visual-build-scheme-hint-floor-text').html(getFloorsText(Number(curBuild.fcount)));
                        curHint.find('.select-visual-build-scheme-hint-deadline span').html(curBuild.deadline);
                        curHint.find('.select-visual-build-scheme-hint-preview').html('<img src="' + curBuild.photo + '" alt="">');
                        var countFlats = 0;
                        for (var j = 0; j < curBuild.floors.length; j++) {
                            for (var k = 0; k < curBuild.floors[j].flats.length; k++) {
                                if (curBuild.floors[j].flats[k].available) {
                                    countFlats++;
                                }
                            }
                        }
                        if (countFlats > 0) {
                            curHint.find('.select-visual-build-scheme-hint-available span').html(countFlats);
                            curHint.find('.select-visual-build-scheme-hint-available strong').html(getFlatsText(countFlats));
                        } else {
                            curHint.find('.select-visual-build-scheme-hint-available').html($('.select-visual').attr('data-notavailable'));
                        }
                    }

                    htmlCheckboxesBuilds += '<label><input type="checkbox" name="build[]" value="' + curBuild.id + '"><span>' + curBuild.title + '</span></label>';

                    for (var j = 0; j < curBuild.floors.length; j++) {
                        var curFloor = curBuild.floors[j];
                        var floorAvaible = false;
                        for (var k = 0; k < curFloor.flats.length; k++) {
                            var curFlat = curFloor.flats[k];
                            if (curFlat.available) {
                                floorAvaible = true;
                                curFlat.buildtitle = curBuild.titlemin;
                                curFlat.floor = curFloor.number;
                                if (checkboxesRooms.indexOf(curFlat.rooms) == -1) {
                                    checkboxesRooms.push(curFlat.rooms);
                                }
                                for (var m = 0; m < curFlat.add.length; m++) {
                                    if (checkboxesAdds.indexOf(curFlat.add[m]) == -1) {
                                        checkboxesAdds.push(curFlat.add[m]);
                                    }
                                }
                            }
                        }
                        if (floorAvaible) {
                            if (checkboxesFloors.indexOf(curFloor.number) == -1) {
                                checkboxesFloors.push(curFloor.number);
                            }
                        }
                    }
                }
                $('.select-filter-group-checkboxes-building').html(htmlCheckboxesBuilds);

                checkboxesFloors.sort(function(a, b) {
                    if (Number(a) > Number(b)) return 1;
                    if (Number(a) == Number(b)) return 0;
                    if (Number(a) < Number(b)) return -1;
                });

                var htmlCheckboxesFloors = '';
                for (var i = 0; i < checkboxesFloors.length; i++) {
                    htmlCheckboxesFloors += '<label><input type="checkbox" name="floor[]" value="' + checkboxesFloors[i] + '"><span>' + checkboxesFloors[i] + '</span></label>';
                }
                $('.select-filter-group-checkboxes-floors').html(htmlCheckboxesFloors);

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

                var htmlCheckboxesAdds = '';
                for (var i = 0; i < checkboxesAdds.length; i++) {
                    htmlCheckboxesAdds += '<label><input type="checkbox" name="add[]" value="' + checkboxesAdds[i] + '"><span>' + checkboxesAdds[i] + '</span></label>';
                }
                $('.select-filter-group-checkboxes-adds').html(htmlCheckboxesAdds);

                $('.select-filter-group-checkboxes input').each(function() {
                    var curCheckbox = $(this);
                    var curName = 'checkbox_' + curCheckbox.attr('name') + curCheckbox.val();
                    if (typeof $.cookie(curName) != 'undefined' && $.cookie(curName) == 'true') {
                        curCheckbox.prop('checked', true).trigger('change');
                    }
                });

                if (typeof $.cookie('select_visual_build') != 'undefined') {
                    $('.select-visual-build-scheme-inner .build[data-id="' + $.cookie('select_visual_build') + '"]').trigger('click');
                }

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
        if (curBuild != null && curBuild.scheme != null) {
            $.ajax({
                type: 'GET',
                url: curBuild.scheme,
                processData: false,
                contentType: false,
                dataType: 'html',
                cache: false
            }).done(function(html) {
                var newHTML = $('<div>' + html + '</div>');

                var htmlFloors = '';
                for (var i = 0; i < curBuild.floors.length; i++) {
                    var curFloor = curBuild.floors[i];
                    htmlFloors += '<g class="floor" data-id="' + curFloor.number + '">' + curFloor.path + '</g>';
                }

                newHTML.find('svg').wrapInner('<g class="others"></g>');
                newHTML.find('svg').prepend(htmlFloors);

                $('.select-visual-floor-scheme-inner').html(newHTML.html());
                $('.select-visual-flat-params-floor-scheme').html(newHTML.html());

                if (typeof $.cookie('select_visual_floor') != 'undefined') {
                    $('.select-visual-floor-scheme-inner .floor[data-id="' + $.cookie('select_visual_floor') + '"]').trigger('click');
                }
            });
            $('.select-visual-floor-params-build-title span').html(curBuild.titlemin);
            $('.select-visual-floor-params-build-scheme .build.active').removeClass('active');
            $('.select-visual-floor-params-build-scheme .build[data-id="' + curID + '"]').addClass('active');
            $('.select-visual-floor-params-build-floors').html(curBuild.fcount);
            var countFlats = 0;
            for (var i = 0; i < curBuild.floors.length; i++) {
                for (var j = 0; j < curBuild.floors[i].flats.length; j++) {
                    if (curBuild.floors[i].flats[j].available) {
                        countFlats++;
                    }
                }
            }
            $('.select-visual-floor-params-build-flats').html(countFlats);
            $('.select-visual-floor-scheme-hint-deadline').html(curBuild.deadline);

            $('.select-visual-flat-params-build-title span').html(curBuild.titlemin);
            $('.select-visual-flat-params-build-scheme .build.active').removeClass('active');
            $('.select-visual-flat-params-build-scheme .build[data-id="' + curID + '"]').addClass('active');
            $('.select-visual-flat-scheme-hint-deadline').html(curBuild.deadline);

            $('.select-visual-build').addClass('hidden');
            $('.select-visual-floor').removeClass('hidden');

            $.cookie('select_visual_build', curID, {expires: 365});
        }
    });

    $('.select-visual-floor .back-link a').click(function(e) {
        $('.select-visual-build').removeClass('hidden');
        $('.select-visual-floor').addClass('hidden');
        $.removeCookie('select_visual_build');

        e.preventDefault();
    });

    $('body').on('mouseenter', '.select-visual-floor-scheme-inner .floor', function(e) {
        var floorID = $(this).attr('data-id');
        var buildID = $('.select-visual-floor-params-build-scheme .build.active').attr('data-id');
        var countFlats = 0;
        for (var i = 0; i < dataSelect.buildings.length; i++) {
            if (dataSelect.buildings[i].id == buildID) {
                for (var j = 0; j < dataSelect.buildings[i].floors.length; j++) {
                    if (dataSelect.buildings[i].floors[j].number == floorID) {
                        var curFlats = dataSelect.buildings[i].floors[j].flats;
                        for (var k = 0; k < curFlats.length; k++) {
                            var curFlat = curFlats[k];
                            if (curFlat.available) {
                                countFlats++;
                            }
                        }
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

    $('body').on('click', '.select-visual-floor-scheme-inner .floor', function() {
        var curID = $(this).attr('data-id');
        $('.select-visual-flat-params-floor-title span').html(curID);
        $('.select-visual-flat-params-floor-scheme .floor.active').removeClass('active');
        $('.select-visual-flat-params-floor-scheme .floor[data-id="' + curID + '"]').addClass('active');
        var buildID = $('.select-visual-flat-params-build-scheme .build.active').attr('data-id');
        var curFloor = null;
        var curBuild = null;
        for (var i = 0; i < dataSelect.buildings.length; i++) {
            if (dataSelect.buildings[i].id == buildID) {
                curBuild = dataSelect.buildings[i];
                for (var j = 0; j < curBuild.floors.length; j++) {
                    if (curBuild.floors[j].number == curID) {
                        curFloor = curBuild.floors[j];
                    }
                }
            }
        }
        if (curFloor != null) {
            $.ajax({
                type: 'GET',
                url: curFloor.scheme,
                processData: false,
                contentType: false,
                dataType: 'html',
                cache: false
            }).done(function(html) {
                var newHTML = $('<div>' + html + '</div>');

                var htmlFlats = '';
                for (var i = 0; i < curFloor.flats.length; i++) {
                    var curFlat = curFloor.flats[i];
                    var classDisabled = '';
                    if (!curFlat.available) {
                        classDisabled = 'disabled'
                    }
                    htmlFlats += '<g class="flat ' + classDisabled + '" data-available="' + curFlat.available + '" data-number="' + curFlat.number + '" data-rooms="' + curFlat.rooms + '" data-size="' + curFlat.size + '" data-url="' + curFlat.url + '">' + curFlat.path + '</g>';
                }

                newHTML.find('svg').append(htmlFlats);

                $('.select-visual-flat-scheme-inner').html(newHTML.html());
            });
            $('.select-visual-flat-scheme-hint-deadline').html(curBuild.deadline);

            $('.select-visual-floor').addClass('hidden');
            $('.select-visual-flat').removeClass('hidden');

            $.cookie('select_visual_floor', curFloor.number, {expires: 365});
        }
    });

    $('.select-visual-flat .back-link a').click(function(e) {
        $('.select-visual-floor').removeClass('hidden');
        $('.select-visual-flat').addClass('hidden');
        $.removeCookie('select_visual_floor');

        e.preventDefault();
    });

    $('body').on('mouseenter', '.select-visual-flat-scheme-inner .flat', function(e) {
        var curFlat = $(this);
        if (curFlat.attr('data-available') == 'true') {
            $('.select-visual-flat-scheme-hint-flat-number').html(curFlat.attr('data-number'));
            $('.select-visual-flat-scheme-hint-flat-rooms').html(curFlat.attr('data-rooms'));
            $('.select-visual-flat-scheme-hint-flat-size').html(curFlat.attr('data-size'));
            $('.select-visual-flat-scheme-hint').addClass('visible');
            $('.select-visual-flat-scheme-hint').css({'top': e.pageY - $('.select-visual-flat-scheme-inner').offset().top});
        }
    });

    $('body').on('mousemove', '.select-visual-flat-scheme-inner .flat', function(e) {
        $('.select-visual-flat-scheme-hint').css({'top': e.pageY - $('.select-visual-flat-scheme-inner').offset().top});
    });

    $('body').on('mouseleave', '.select-visual-flat-scheme-inner .flat', function() {
        $('.select-visual-flat-scheme-hint').removeClass('visible');
    });

    $('body').on('click', '.select-visual-flat-scheme-inner .flat', function() {
        var curFlat = $(this);
        if (curFlat.attr('data-available') == 'true') {
            var curURL = curFlat.attr('data-url');
            window.location = curURL;
        }
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
        if ($(window).width() > 1239) {
            var curID = $(this).attr('data-id');
            $('.select-filter-group-checkboxes-building input[value="' + curID + '"]').parent().find('span').addClass('hover');
        }
    });

    $('body').on('mouseleave', '.select-filter-building .build', function() {
        if ($(window).width() > 1239) {
            $('.select-filter-group-checkboxes-building span.hover').removeClass('hover');
        }
    });

    $('body').on('change', '.select-filter-group-checkboxes input', function() {
        if ($(this).parents().filter('.select-filter-group-checkboxes-building').length == 1) {
            $('.select-filter-building .build.active').removeClass('active');
            $('.select-filter-group-checkboxes-building input:checked').each(function() {
                var curID = $(this).val();
                $('.select-filter-building .build[data-id="' + curID + '"]').addClass('active');
            });
            $('.select-filter-group-checkboxes-floors label.hidden').removeClass('hidden');
            if ($('.select-filter-group-checkboxes-building input:checked').length > 0) {
                $('.select-filter-group-checkboxes-floors label').addClass('hidden');
                $('.select-filter-group-checkboxes-building input:checked').each(function() {
                    var buildID = $(this).val();
                    for (var i = 0; i < dataSelect.buildings.length; i++) {
                        if (dataSelect.buildings[i].id == buildID) {
                            var curBuild = dataSelect.buildings[i];
                            for (var j = 0; j < curBuild.floors.length; j++) {
                                $('.select-filter-group-checkboxes-floors input[value="' + curBuild.floors[j].number + '"]').parent().removeClass('hidden');
                            }
                        }
                    }

                });
            }
        }

        var curName = 'checkbox_' + $(this).attr('name') + $(this).val();
        if ($(this).prop('checked')) {
            $.cookie(curName, 'true', {expires: 365});
        } else {
            $.cookie(curName, 'false', {expires: 365});
        }

        if ($(window).width() > 1239) {
            updateSelectList();
        }
    });

    $('.select-filter-submit a').click(function(e) {
        $('.select-filter-group-checkboxes input', function() {
            var curName = 'checkbox_' + $(this).attr('name') + $(this).val();
            if ($(this).prop('checked')) {
                $.cookie(curName, 'true', {expires: 365});
            } else {
                $.cookie(curName, 'false', {expires: 365});
            }
        });
        $('html').removeClass('filter-mobile-open');
        $(window).scrollTop($('.wrapper').data('scrollTop'));
        updateSelectList();
        e.preventDefault();
    });

    $('body').on('mouseenter', '.select-filter-group-checkboxes-building span', function() {
        if ($(window).width() > 1239) {
            var curID = $(this).parent().find('input').val();
            $('.select-filter-building .build[data-id="' + curID + '"]').addClass('hover');
        }
    });

    $('body').on('mouseleave', '.select-filter-group-checkboxes-building span', function() {
        if ($(window).width() > 1239) {
            $('.select-filter-building .build.hover').removeClass('hover');
        }
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

    $('.detail-finish-slider').each(function() {
        var curSlider = $(this);
        const swiper = new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto'
        });
    });

    $('.select-filter-mobile-link a').click(function(e) {
        $('.wrapper').data('scrollTop', $(window).scrollTop());
        $('html').addClass('filter-mobile-open');
        e.preventDefault();
    });

    $('.select-filter-mobile-close a').click(function(e) {
        $('html').removeClass('filter-mobile-open');
        $(window).scrollTop($('.wrapper').data('scrollTop'));
        e.preventDefault();
    });

    $('.detail-block-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.detail-other').each(function() {
        var curBlock = $(this);
        $.ajax({
            type: 'POST',
            url: curBlock.attr('data-url'),
            processData: false,
            contentType: false,
            dataType: 'html',
            cache: false
        }).done(function(html) {
            $('.select-data').html($(html).find('.building-data').html());
            var newData = [];
            if (typeof(dataSelect) != 'undefined') {
                for (var i = 0; i < dataSelect.buildings.length; i++) {
                    var curBuild = dataSelect.buildings[i];
                    for (var j = 0; j < curBuild.floors.length; j++) {
                        var curFloor = curBuild.floors[j];
                        for (var k = 0; k < curFloor.flats.length; k++) {
                            var curFlat = curFloor.flats[k];
                            curFlat.buildtitle = curBuild.titlemin;
                            curFlat.floor = curFloor.number;
                            if (curFlat.available) {
                                var flatSize = Number(String(curFlat.size).replace(',', '.'));
                                var detailSize = Number($('.detail-side-param-value-size').text().replace(',', '.'));
                                if (flatSize >= detailSize - 10 && flatSize <= detailSize + 10) {
                                    newData.push(curFlat);
                                }
                            }
                        }
                    }
                }
            }

            if (newData.length > 3) {
                $('.detail-other-more-count span').html(newData.length - 3);
            } else {
                $('.detail-other-more-count').remove();
            }

            var htmlList = '';
            var titleBuild = $('.detail-other-list').attr('data-titlebuild');
            var titleFloor = $('.detail-other-list').attr('data-titlefloor');
            var titleFlat = $('.detail-other-list').attr('data-titleflat');
            var titleRoom = $('.detail-other-list').attr('data-titleroom');
            var titleSize = $('.detail-other-list').attr('data-titlesize');
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

            $('.detail-other-list').html(htmlList);
            $('.select-list-item:lt(3)').addClass('visible');
        });
    });

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
                for (var j = 0; j < curBuild.floors.length; j++) {
                    for (var k = 0; k < curBuild.floors[j].flats.length; k++) {
                        var curFlat = curBuild.floors[j].flats[k];
                        if (curFlat.available) {
                            if ($('.select-filter-group-checkboxes-floors input:checked').length == 0 || $('.select-filter-group-checkboxes-floors input[value="' + curFlat.floor + '"]:checked').length == 1) {
                                if ($('.select-filter-group-checkboxes-rooms input:checked').length == 0 || $('.select-filter-group-checkboxes-rooms input[value="' + curFlat.rooms + '"]:checked').length == 1) {
                                    var flatSize = Number(String(curFlat.size).replace(',', '.'));
                                    var sizeCorrect = false;
                                    $('.select-filter-group-checkboxes-sizes input:checked').each(function() {
                                        var curCheckboxSize = $(this);
                                        var minSize = Number(curCheckboxSize.attr('data-min'));
                                        var maxSize = Number(curCheckboxSize.attr('data-max'));
                                        if (flatSize >= minSize && flatSize <= maxSize) {
                                            sizeCorrect = true;
                                        }
                                    });

                                    if ($('.select-filter-group-checkboxes-sizes input:checked').length == 0 || sizeCorrect) {
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

    curForm.find('input.phoneRU').attr('autocomplete', 'off');
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('input.phoneRU').focus(function() {
        if ($(this).val() == '') {
            $(this).val('+7 (');
        }
    });


    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);

            if (curForm.hasClass('ajax-form')) {
                curForm.addClass('loading');
                var formData = new FormData(form);

                $.ajax({
                    type: 'POST',
                    url: curForm.attr('attr-action'),
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    data: formData,
                    cache: false
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    curForm.parent().append('<div class="window-success-title">Сервис временно недоступен,<br> попробуйте позже.</div><div class="window-success-btn"><a href="#" class="btn window-close-btn">Продолжить знакомство</a></div>');
                    curForm.remove();
                }).done(function(data) {
                    curForm.parent().append('<div class="window-success-title">Спасибо. Ваша заявка<br> отправлена.</div><div class="window-success-text">' + data.message + '</div><div class="window-success-btn"><a href="#" class="btn window-close-btn">Продолжить знакомство</a></div>');
                    curForm.remove();
                });
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