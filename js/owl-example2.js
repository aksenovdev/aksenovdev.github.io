
var owl1;
var $owl1 = $('.owl-carousel.slider');

function activateSlider() {
    owl1 = $('.owl-carousel.slider')
    
    owl1.on('initialized.owl.carousel', calcOwlNav);
    owl1.on('changed.owl.carousel', calcOwlNav);
    
    //var owl1 = $('#owl-example').owlCarousel({
    owl1.owlCarousel({
        //items
        loop:false,
        margin:0,
        nav:true,
        //navRewind: true,
        navText: [" "," "],//["&#x27;next&#x27;" ," &#x27;prev&#x27;"],
        dots: true,
        dotsEach: false ,//3,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
        //,center: true
        //,autoWidth: true //Set non grid content. Try using width style on divs.
        //,mouseDrag: false
        , onRefreshed: sliderRefreshed
    });
    
    
    // Go to the next item
    $('.owlnext').click(function() {
        owl1.trigger('next.owl.carousel');
    });
    // Go to the prev item
    $('.owlprev').click(function() {
        owl1.trigger('prev.owl.carousel');
    });
    
    
    function calcOwlNav(event) {
        var pages     = event.page.count; 
        var page      = event.page.index;
        
        
        if (page === 0) {
            $('.owl-prev').addClass('disabled');
        } else {
            $('.owl-prev').removeClass('disabled');
        }
        if (page === pages-1) {
            $('.owl-next').addClass('disabled');
        } else {
            $('.owl-next').removeClass('disabled');
        }
    }

}


var isActive = false;

function deactivateSlider() {
    
    isActive = false;
    
    if( owl1 ) {
        //$('.owl-carousel.slider').owl.trigger('destroy.owl.carousel');
        owl1.trigger('destroy.owl.carousel');
        
        console.log('trueee');
    }
}

function isSliderActive() {
    
    return isActive;
}

function sliderRefreshed(e) {
    
    //уведомить всех подписчиков
    //...
    
    isActive = true;
    
    console.log('sliderRefreshed');
    
}