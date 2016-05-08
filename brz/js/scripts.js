    // build items array
    var items = [
        {
            src: 'images/001-cover_large.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/002-front_right_1.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/002-front_right_2.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/003-front_3_Not.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/005-front_left_2.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/005-front_left_4.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/005-front_left_6.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/006-left.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/007-rear_left.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/008-rear_2.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/008-rear_3.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/009-rear_right.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/010-rear_spoiler_3.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/010-rear_spoiler.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/011-going_inside.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/011.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/012-inside_front_2.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/013-inside_front.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/014-inside_backseat.jpg',
            w: 3072,
            h: 4608
        },
        {
            src: 'images/015-inside_front_3.jpg',
            w: 3072,
            h: 4608
        },
        {
            src: 'images/015-inside_front_4.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/015-inside_front_5.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/015-inside_front_6.jpg',
            w: 4608,
            h: 3072
        },
        {
            src: 'images/015-inside_front_7.jpg',
            w: 3072,
            h: 4608
        }

    ];


var openPhotoSwipe = function() {
    var pswpElement = document.querySelectorAll('.pswp')[0];


    
    // define options (if needed)
    var options = {
             // history & focus options are disabled on CodePen        
        history: false,
        focus: false,

        showAnimationDuration: 0,
        hideAnimationDuration: 0
        
    };
    
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};

openPhotoSwipe();
