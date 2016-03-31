$(document).ready(function () {
    $('.package').on('click', '.package__up, .package__down, .package__link', function (event) {
        var package = $(this).closest('.package');
        if(!$(package).hasClass('package--disabled')) {
            event.preventDefault();
            if($(package).hasClass('package--selected')) {
                $(package).removeClass('package--selected').find('.package__title--selected').fadeOut(200, function () {
                    $(this).siblings('.package__title--default').fadeIn(200);
                    if ($(package).hasClass('package--hover')) {
                        $(package).find('.package__up--selected-hover').fadeOut(200, function () {
                            $(this).siblings('.package__up--default').fadeIn(200);
                        });
                    }
                });
            } else {
                $('.package--hover').removeClass('package--hover');
                $(package).addClass('package--selected').find('.package__title--default').fadeOut(200, function () {
                    $(this).siblings('.package__title--selected').fadeIn(200);
                });
            }
        }
    });
    $('.package').on('mouseleave', function (event) {
        var package = $(this);
        if(!$(package).hasClass('package--disabled')) {
            event.preventDefault();
            if(!$(package).hasClass('package--hover')) {
                $(package).siblings('.package').removeClass('package--hover');
                if ($(package).siblings('.package').hasClass('package--selected')) {
                    $(package).siblings('.package').find('.package__up--selected-hover').fadeOut(200, function () {
                        $(this).siblings('.package__up--default').fadeIn(200);
                    });
                }
                $(package).addClass('package--hover');
                if ($(package).hasClass('package--selected')) {
                    $(package).find('.package__up--default').fadeOut(200, function () {
                        $(this).siblings('.package__up--selected-hover').fadeIn(200);
                    });
                }
            }
        }
    });
});