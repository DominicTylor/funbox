$(document).ready(function () {
    $('.package').on('click', '.package__content, .package__link', function (event) {
        var package = $(this).closest('.package');
        if(!$(package).hasClass('package--disabled')) {
            event.preventDefault();
            if($(package).hasClass('package--selected')) {
                $(package).removeClass('package--selected').find('.package__title--selected').fadeOut(200, function () {
                    $(this).siblings('.package__title--default').fadeIn(200);
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
                $(package).addClass('package--hover').siblings('.package').removeClass('package--hover');
            }
        }
    });
});