var phone_format;

var array = [

];
$(document).ready(function() {
	timer();
	$("a.fancybox").fancybox();
	var prefix = $('.prefix').val();
	var url = prefix+"send.php";
	phone_format = $('.phone_format').val();
	var mobile = navigator.userAgent.toLowerCase().match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i);
	if(mobile != null) {
		$('html').css('width', window.innerWidth + 'px');

        //убрать видео
        $('.covervid-video').replaceWith('');
	} else {
		$(".scroll").each(function() {
			var block = $(this);
			$(window).scroll(function() {
				var top = block.offset().top;
				var bottom = block.height()+top;
				top = top - $(window).height();
				var scroll_top = $(this).scrollTop();
				var block_center = block.offset().top + (block.height() / 2);
				var screen_center = scroll_top + ($(window).height() / 2);
				if(block.height() < $(window).height()) {
					if ((scroll_top > (top-(block.height()/2))) && ((scroll_top < bottom+(block.height()/2))) && (scroll_top + $(window).height() > (bottom-(block.height()/2))) && (scroll_top < (block.offset().top+(block.height()/2)))) {
						if (!block.hasClass("animated")) {
							block.addClass("animated");
						}
					} else {
						if((block.offset().top + block.height() < scroll_top) || (block.offset().top > (scroll_top + $(window).height()))) {
							block.removeClass("animated");
						}
					}
				} else {
					if ((scroll_top > top) && (scroll_top < bottom) && (Math.abs(screen_center - block_center) < (block.height() / 4))) {
						if (!block.hasClass("animated")) {
							block.addClass("animated");
						}
					} else {
						if((block.offset().top + block.height() < scroll_top) || (block.offset().top > (scroll_top + $(window).height()))) {
							block.removeClass("animated");
						}
					}
				}
			});
		});
		$('head').append('<link rel="stylesheet" href="'+prefix+'css/animation.css" />');
	}

	$('.button').click(function() {

        var $thisClickedBtn = $(this);


		$('body').find('form:not(this)').children('label').removeClass('red');
		var request_url = '<br>'+$('input[name="ref_url"]').val().toString().replace(/&/g, '<br>');

        //var answer = checkForm($(this).parent().get(0));
        var answer = checkForm($(this).closest('form').get(0));
        log1(5,answer);
		if(answer != false)
		{

            //откл кнопку
            $thisClickedBtn.slideUp();

			var $form = $(this).parent();
			var name = $('input[name="name"]', $form).val();
			if(phone_format == 'one') {
				var phone = $('input[name="phone"]', $form).val();
			} else if(phone_format == 'three') {
				var phone = $('input[name="phone1"]', $form).val()+' '+$('input[name="phone2"]', $form).val()+' '+$('input[name="phone3"]', $form).val();
			}
			var email = $('input[name="email"]', $form).val();
			var ques = $('textarea[name="ques"]', $form).val();
			var sbt = $('.button', $form).attr("data-name");
			var submit = $('.button', $form).text();
			var ref = $('input[name="referer"]').val();
			var formname = $('input[name="formname"]').val();
			var sitename = $('.sitename').val();
			var emailsarr = $('.emailsarr').val();
			$.ajax({
				type: "POST",
				url: url,
				dataType: "json",
				data: "name="+name+"&phone="+phone+"&"+sbt+"="+submit+"&email="+email+"&ques="+ques+"&formname="+formname+"&ref="+ref+"&utm="+request_url+"&sitename="+sitename+"&emailsarr="+emailsarr
			}).done(function() {
				thx();
                console.log('SUCCESS MAIL');
			}).fail(function() {
                notifyFail();
                console.log('FAILLLLL MAIL');
			}).always(function(data) {
				//метрики
				setTimeout(function(){ga('send', 'event', ''+sbt, ''+sbt);}, 30);
				setTimeout(function(){yaCounterXXXXXXXXX.reachGoal(''+sbt);}, 30); // меняем XXXXXXXXX на номер счетчика

                $thisClickedBtn.slideDown();

                console.log(data);
			});
		}
	});

    //конфликт с jivo!!
	/* Youtube fix */
	$("iframe").each(function() {
		var ifr_source=$(this).attr('src');
		var wmode="wmode=transparent";
		if(ifr_source.indexOf('?')!=-1) {
			var getQString=ifr_source.split('?');
			var oldString=getQString[1];
			var newString=getQString[0];
			$(this).attr('src',newString+'?'+wmode+'&'+oldString)
		} else $(this).attr('src',ifr_source+'?'+wmode)
	});

	if(phone_format == 'three') {
		$('input[name="phone2"]').focus(function() {
			$(this).keydown(function(event){
				if(event.keyCode != 8) {
					if($(this).val().length >= 3 && event.keyCode != 8)
						$(this).parent().siblings().find('input[name="phone3"]').focus();
				}
			});
		});
		$('input[name="phone3"]').focus(function() {
			$(this).keydown(function(event){
				if(event.keyCode == 8 && $(this).val().length == 0) {
					$(this).parent().siblings().find('input[name="phone2"]').focus();
				}
			});
		});
	}



    $('#menu_button').click(function() {
        var $this = $(this);

        if ($this.hasClass('opened') ) {
            menu_close();
        } else {
            menu_open();
        }
    });


});//ready

function timer() {
	var now = new Date();
	var newDate = new Date((now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear()+" 23:59:59"); //var newDate = new Date("Feb,29,2014 23:59:00");
	var totalRemains = (newDate.getTime()-now.getTime());
	if (totalRemains>1) {
		var Days = (parseInt(parseInt(totalRemains/1000)/(24*3600)));
		var Hours = (parseInt((parseInt(totalRemains/1000) - Days*24*3600)/3600));
		var Min = (parseInt(parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600)/60));
		var Sec = parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600) - Min*60;
		if (Days<10){Days="0"+Days}
		if (Hours<10){Hours="0"+Hours}
		if (Min<10){Min="0"+Min}
		if (Sec<10){Sec="0"+Sec}
		$(".day").each(function() { $(this).text(Days); });
		$(".hour").each(function() { $(this).text(Hours); });
		$(".min").each(function() { $(this).text(Min); });
		$(".sec").each(function() { $(this).text(Sec); });
		setTimeout(timer, 1000);
	}
}

function popup(id, form, h1, h2, btn) { //onClick="popup('callback', '');"
 $('.popup_overlay').show();
 $('#'+id).addClass('activePopup');
 if(id == 'request') {
  var def_h1 = 'Оставить заявку';
  var def_h2 = 'Заполните форму,<br>и&nbsp;мы&nbsp;обязательно свяжемся с&nbsp;вами!';
  var def_btn = 'Оставить заявку';
 }
	if(h1 != '') {$('#'+id).find('.popup_h1').html(h1);} else {$('#'+id).find('.popup_h1').html(def_h1);}
	if(h2 != '') {$('#'+id).find('.popup_h2').html(h2);} else {$('#'+id).find('.popup_h2').html(def_h2);}
	if(btn != '') {$('#'+id).find('.button').html(btn);} else {$('#'+id).find('.button').html(def_btn);}
 $('.activePopup').show();
 var m_top = -$('.activePopup').outerHeight() / 2 + 'px';
 var m_left = -$('.activePopup').outerWidth() / 2 + 'px';
 $('.activePopup').css({
  'margin-top': m_top,
  'margin-left': m_left
 })
 $('.formname').attr("value", form);
}

function popup_out() {
	$('.popup_overlay').hide();
	$('.popup').hide();
	$('.popup').removeClass('activePopup');
	$('body').find('label').removeClass('red');
}

function formname(name) { //onClick="formname('text');"
	$('.formname').attr("value", name);
}



function thx() {
	$('.popup').hide();
	$('.popup').removeClass('activePopup');

	popup('thx', '');

    clearInputs();
}

function notifyFail() {

	$('.popup').hide();
	$('.popup').removeClass('activePopup');

	popup('fail', '');

    clearInputs();
}

function clearInputs() {

	if(phone_format == 'one') {
		$('input[type="text"]').each(function(){
			$(this).val('');
		});
	} else if(phone_format == 'three') {
		$('input[type="text"]:not(input[name="phone1"])').each(function(){
			$(this).val('');
		});
	}
	$('textarea').val('');
}



function checkForm(form1) {

    log1(6, form1);

	var $form = $(form1);
	var checker = true;
	var name = $("input[name='name']", $form).val();
	if(phone_format == 'one') {
		var phone = $("input[name='phone']", $form).val();
	} else if(phone_format == 'three') {
		var phone1 = $("input[name='phone1']", $form).val();
		var phone2 = $("input[name='phone2']", $form).val();
		var phone3 = $("input[name='phone3']", $form).val();
	}
	var emailFields = $("input[name='email']", $form);
	if(emailFields.length != 0) {
        var email = emailFields.val();
        email = email.trim();
        emailFields.val(email);
    }

	if($form.find(".name").hasClass("required")) {
		if(!name) {
			$form.find(".name").addClass("red");
			checker = false;
		} else {
			$form.find(".name").removeClass('red');
		}
	}

	if(phone_format == 'one') {
		if($form.find(".phone").hasClass("required")) {
			if(!phone) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else if(/[^0-9\+ ()\-]/.test(phone)) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else {
				$form.find(".phone").removeClass("red");
			}
		}
	} else if(phone_format == 'three') {
		if($form.find(".phone").hasClass("required")) {
			if(!phone1) {
				$form.find(".phone").children('input[name="phone1"]').parent().addClass("red");
				checker = false;
			} else if(/[^0-9+]/.test(phone1)) {
				$form.find(".phone").children('input[name="phone1"]').parent().addClass("red");
				checker = false;
			} else {
				$form.find(".phone").children('input[name="phone1"]').parent().removeClass("red");
			}

			if(!phone2) {
				$form.find(".phone").children('input[name="phone2"]').parent().addClass("red");
				checker = false;
			} else if(/[^0-9]/.test(phone2)) {
				$form.find(".phone").children('input[name="phone2"]').parent().addClass("red");
				checker = false;
			} else {
				$form.find(".phone").children('input[name="phone2"]').parent().removeClass("red");
			}

			if(!phone3) {
				$form.find(".phone").children('input[name="phone3"]').parent().addClass("red");
				checker = false;
			} else if(/[^0-9 -]/.test(phone3) || phone3.length < 4) {
				$form.find(".phone").children('input[name="phone3"]').parent().addClass("red");
				checker = false;
			} else {
				$form.find(".phone").children('input[name="phone3"]').parent().removeClass("red");
			}
		}
	}

	if($form.find(".email").hasClass("required")) {

		if(!email) {
			$form.find(".email").addClass("red");
			checker = false;
		} else if(!/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(email)) {
			$form.find(".email").addClass("red");
			checker = false;
		} else {
			$form.find(".email").removeClass("red");
		}
	}

	if(checker != true) { return false; }
}





//
////Sanz16
$(document).ready(function(){


	//beginning menu clicks

    //$('.c1, .c2, .c3, .c5, .c6, .c8, .c9, .c10, .c11').css('padding-top', '80px');
    $('.c1, .c2, .c3, .c5, .c6, .c8, .c9, .c10, .c11').addClass('scrolljs');
	$('#off_canvas a[href^="#"]').click(function(){
        var offsetForFixedMenu = 93;
        var parentSelector = '.header';

        var scroll_el = $(this).attr('href');

        $(parentSelector+ ' a[href^="#"]').find(parentSelector).removeClass('active');
        $(this).find(parentSelector).addClass('active');

        $('html, body').stop().animate({scrollTop: $(scroll_el).offset().top - offsetForFixedMenu}, 600);


        return false;
    });
    //end menu clicks


    //Tabs
    //

    //откр dropdown
    $('.tabs_buttons1 >a').click( function(e){
        e.preventDefault();
        var $this = $(this);

        $this.siblings('.subtabs').stop().slideToggle();

        $this.closest('.tab').siblings('.tab').find('.subtabs').stop().slideUp();
    });




    var tabsRootSelector = '.tabs_buttons';
    var tabsChildrenSelector = 'li >a';
    //var clickSelector = '.tabs_buttons li >a';
    //$(clickSelector).click( function(e){
    var clickSelector = tabsRootSelector +' '+ tabsChildrenSelector;
    $(clickSelector).click( function(e){
        e.preventDefault();
        var $this = $(this);


        var tabsRoot = $this.closest('.tabs_buttons');

        //если уже активна, ничего не делать:
        if( $this.hasClass('active') ) return;
        $(tabsChildrenSelector , tabsRoot).removeClass('active');
        $this.addClass('active');

        //свернуть все варианты
        var contentItems = $this.closest('section').find('.tabs_contents__variant');
//        contentItems.slideUp(400 , changeSlides );
//        contentItems.fadeOut(400 , changeSlides );
//        contentItems.animate( {opacity: 0 , height: 0}, {duration: 400 , complete: changeVariant} );

        console.log(2,contentItems);

        var variants; /*более глобальная, чтобы можно был один и тот же объект jquery во всех фциях*/
        variants = contentItems;
        variants.stop();
        hideVariants();


        //все подменю убрать
        $('.subtabs').slideUp();


        var closestTabIndex = $this.closest('li').index();

        console.log('closestTabIndex ' +closestTabIndex);

        changeVariant();







        function changeVariant() {
            variants = contentItems.eq(closestTabIndex);
            showVariants();
        }

        function hideVariants() {
            variants.animate( {opacity: 0 }, {duration: 400 } );
            variants.slideUp();
        }
        function showVariants() {
            variants.animate( {opacity: 1}, {duration: 400 } );
            variants.slideDown();
        }


    });



    $('.c4 .tabs_buttons li >a').click( function(e){
        "use strict";
        var $this = $(this);
        var closestTabIndex = $this.closest('li').index();

        //сменить обоину
        //$('.c4').css('background-image' , 'url(img/c4/bg'+ (closestTabIndex+1) +'.jpg)');

        var regTile = /bgmain\d*/g;
        var block_c4 = $('.c4');

        //убрать классы регвыром
        block_c4.attr(
            'class',
            block_c4.attr('class').replace(/bgmain\d*/g, '')
        );
        //добавить
        block_c4.addClass( 'bgmain'+ (1+closestTabIndex ) );
    });



    var currentSlide = 0;
    var activeSlide = $('.slides_names .active'); //middle
    var leftSlide = $('.slides_names__left');
    var rightSlide = $('.slides_names__right');

    $('.slides_names__arrl , .slides_names__left').click(function(e){
        e.preventDefault();

        //OOP
        //var slider.activeSlide()


        var rightHtml = rightSlide.html();
        rightSlide.html( activeSlide.html()  );
        activeSlide.html( leftSlide.html() );
        leftSlide.html( rightHtml );


        --currentSlide;
        if (currentSlide<0) currentSlide=2;

        changeClassBg1();
        changeTextInfo();
    });
    $('.slides_names__arrr , .slides_names__right').click(function(e){
        e.preventDefault();

        var leftHtml = leftSlide.html();
        leftSlide.html( activeSlide.html() );
        activeSlide.html( rightSlide.html() );
        rightSlide.html( leftHtml );


        ++currentSlide;
        if (currentSlide>2) currentSlide=0;

        changeClassBg1();
        changeTextInfo();
    });

    function changeClassBg1(){

        var regTile = /bg1--\d*/g;
        var block_c4 = $('.c4');

        //убрать классы регвыром
        block_c4.attr(
            'class',
            block_c4.attr('class').replace(/bg1--\d*/g, '')
        );
        //добавить
        block_c4.addClass( 'bg1--'+ (1+currentSlide ) );

        console.info(currentSlide);
    }
    function changeTextInfo(){

        $('.c4 .tabs_contents__variant--1 .text_info').addClass('hide')
            .eq(currentSlide).removeClass('hide');

        console.info(currentSlide);
    }

    //OOP nw.
    function slider() {
        var currentSlide = 0;

        //var activeSlide = $('.slides_names .active'); //middle
        //var leftSlide = $('.slides_names__left');
        //var rightSlide = $('.slides_names__right');

        function slideLeft() {
            --currentSlide;

            var rightHtml = rightSlide.html();
            rightSlide.html( activeSlide.html()  );
            activeSlide.html( leftSlide.html() );
            leftSlide.html( rightHtml );
        }
        function slideRight() {

            var leftHtml = leftSlide.html();
            leftSlide.html( activeSlide.html() );
            activeSlide.html( rightSlide.html() );
            rightSlide.html( leftHtml );
        }
    }
    //
    //
    //
    //delete!
//    $('.switcher__right').click(function(e){
//        mini_slider.slideRight();
//    });
//
//    $('.switcher__right').click(function(e){
//        e.preventDefault();
//
//        var leftHtml = leftSlide.html();
//
//
//        ++currentSlide;
//        if (currentSlide>2) currentSlide=0;
//
//    });
    //
    //----


    function Mini_slider() {
        //uses global
        mini_slider_clicked; //вместо присвоения класса Mini_slider каждому сверстанному слайдеру.

        var currentSlide = 1;//с 1 до MAX_SLIDES

        var MAX_SLIDES = 8;
        //var LAST_SLIDE_NUM = MAX_SLIDES; //не с нуля
        var last_slide_num = MAX_SLIDES; //не с нуля

        //private
        var slidesFolder;
        var slidesQnty;

        function getSlidesInfo() {
            slidesFolder = mini_slider_clicked.attr( 'data-slides-folder' );
            slidesQnty = mini_slider_clicked.attr( 'data-slides-qnty') *1;
            last_slide_num = slidesQnty; //не с нуля
            currentSlide = mini_slider_clicked.attr( 'data-current-slide') *1;

            log1('slidesFolder' , slidesFolder)  ;
            log1('slidesQnty' , slidesQnty)    ;

        }

        this.slideLeft = function() {
            getSlidesInfo();

            --currentSlide;
            if (currentSlide < 1) currentSlide = last_slide_num;

            changeSlide();
        }
        this.slideRight = function() {

            getSlidesInfo();

            ++currentSlide;
            if (currentSlide > last_slide_num) currentSlide = 1;

            changeSlide();
        }
        this.getCurrentSlide = function() {
            return currentSlide;
        }



        mini_sliders = $('.mini_slider'); //все.


        mini_sliders.each(function(){

            console.log(this);

            mini_slider_clicked = $(this);
            setSlideN(currentSlide -1);//стартовый

        });





        function changeSlide1(){

            //предзагрузка картинки
            var imgDom = mini_slider_clicked.find('img');
            var dl_img = new Image();
            dl_img.onload = function() {
                imgDom.prop('src', this.src);
            }
            dl_img.src = 'img/slides/'+ slidesFolder +'/p'+ currentSlide +'.jpg';
            //почему img/ относительно index'а?


            var bigPicHref = 'img/slides/'+ slidesFolder +'/'+ currentSlide +'.jpg';
            mini_slider_clicked.find('a.fancybox').prop('href', bigPicHref);




            mini_slider_clicked.attr( 'data-current-slide', currentSlide);
            mini_slider_clicked.find('.switcher__center').text( currentSlide +'/'+ slidesQnty);
        }
        function changeSlide(){


            setSlideN(currentSlide -1 );
        }
        function setSlideN(slideNum_) { //номер фэнсибокса в верстке-мини_слайдере с нулевого

            console.log(38,slideNum_);

            mini_slider_clicked.find('a.fancybox').hide()
                .eq(slideNum_).fadeIn();


            if(slidesQnty !== undefined){
                mini_slider_clicked.attr( 'data-current-slide', currentSlide);
                mini_slider_clicked.find('.switcher__center').text( currentSlide +'/'+ slidesQnty );
            }
            //mini_slider_clicked.find('.switcher__center').text( currentSlide +'/'+ (function(){ if (slidesQnty !== undefined) return slidesQnty; } else {} )()    );
        }
    }

    var mini_slider = new Mini_slider();
    var mini_slider_clicked;

    $('.switcher__left').click(function(e){
        e.preventDefault();

        mini_slider_clicked = $(this).closest('.mini_slider');
        mini_slider.slideLeft();
    });
    $('.switcher__right').click(function(e){
        e.preventDefault();

        mini_slider_clicked = $(this).closest('.mini_slider');
        mini_slider.slideRight();
    });




    //
    //
    function Slider1() {

        var currentSlide = 0;

        var MAX_SLIDES = 4;
        var LAST_SLIDE_NUM = MAX_SLIDES -1;

        this.slideLeft = function() {
            --currentSlide;
            if (currentSlide < 0) currentSlide = LAST_SLIDE_NUM;

            changeSlide();
        }
        this.slideRight = function() {

            ++currentSlide;
            if (currentSlide > LAST_SLIDE_NUM) currentSlide = 0;

            changeSlide();
        }
        this.getCurrentSlide = function() {
            return currentSlide;
        }

        function changeSlide(){
            log1(currentSlide);

            var tempSlideN;

            $('.slider1 .slider__slide').removeClass('active')
                .eq(currentSlide).addClass('active');

            tempSlideN = currentSlide -1;
            if (tempSlideN < 0) tempSlideN = LAST_SLIDE_NUM;
            $('.slider1 .slideleft' ).css('background-image','url(img/slides/plugs/p'+ ++tempSlideN +'.jpg)');

            tempSlideN = currentSlide +1;
            if (tempSlideN > LAST_SLIDE_NUM) tempSlideN = 0;
            $('.slider1 .slideright').css('background-image','url(img/slides/plugs/p'+ ++tempSlideN +'.jpg)');


            //$('.slider1 .slideleft' ).css('background-image','url(img/slides/plugs/p'+ (tempSlideN = currentSlide-1 <0 ? LAST_SLIDE_NUM : tempSlideN >LAST_SLIDE_NUM ? 0 : tempSlideN) +'.jpg)');
            //$('.slider1 .slideright').css('background-image','url(img/slides/plugs/p'+ (tempSlideN = currentSlide+1 <0 ? LAST_SLIDE_NUM : tempSlideN >LAST_SLIDE_NUM ? 0 : tempSlideN) +'.jpg)');
        }
    }

    var slider1 = new Slider1();


    $('.slider1 .slideleft , .slide1__left').click(function(e){
        e.preventDefault();

        slider1.slideLeft();
    });
    $('.slider1 .slideright, .slide1__right').click(function(e){
        e.preventDefault();

        slider1.slideRight();
    });


    (function() {
        var cardsArray = [
            //['полная фотка' ,'минифотка'],
            ['img/c3/autof/1.jpg' ,'img/c3/auto/1.jpg' , 2, 0, '' ,'Лиса в снегу','Аэрография на дверях Audi'],
            ['img/c3/autof/2.jpg' ,'img/c3/auto/2.jpg' , 2, 0, '' ,'Голубая волна ','Аэрография вдоль всего автомобиля Mercedes-Benz'],
            ['img/c3/autof/3.jpg' ,'img/c3/auto/3.jpg' , 2, 0, '' ,'Львиный прайд','Монохромная роспись кузова автомобиля Opel'],
            ['img/c3/autof/4.jpg' ,'img/c3/auto/4.jpg' , 2, 0, '' ,'Фэнтези ','Аэрография на капоте Mitsubishi'],
            ['img/c3/autof/5.jpg' ,'img/c3/auto/5.jpg' , 2, 0, '' ,'Бегущие зимние волки','Роспись всего внедорожника Land Rover Defender'],
            ['img/c3/autof/6.jpg' ,'img/c3/auto/6.jpg' , 2, 0, '' ,'Ёжик в тумане','Аэрография на дверях Toyota RAV 4 по мотивам одноименного мультфильма'],
            ['img/c3/autof/7.jpg' ,'img/c3/auto/7.jpg' , 2, 0, '' ,'Волк, воющий на луну','Аэрография на колпаке запаски'],
            ['img/c3/autof/8.jpg' ,'img/c3/auto/8.jpg' , 2, 0, '' ,'Щука','Аэрография на колпаке запаски для заядлого рыбака'],
            ['img/c3/autof/9.jpg' ,'img/c3/auto/9.jpg' , 2, 0, '' ,'Бурый медведь','Аэрография на капоте автомобиля Mazda'],
            ['img/c3/autof/10.jpg','img/c3/auto/10.jpg', 2, 0, '' ,'Король джунглей','Аэрография на капоте Mitsubishi Pajero Sport'],
            ['img/c3/autof/11.jpg','img/c3/auto/11.jpg', 2, 0, '' ,'Разряды молнии','Реалистичная роспись деталей мотоцикла'],
            ['img/c3/autof/12.jpg','img/c3/auto/12.jpg', 2, 0, '' ,'Орден победы','Аэрография на капоте Renault Duster для ветерана'],
            ['img/c3/autof/13.jpg','img/c3/auto/13.jpg', 2, 0, '' ,'Самурай','Аэрография на дверях автомобиля Infiniti FX45'],
            ['img/c3/autof/14.jpg','img/c3/auto/14.jpg', 2, 0, '' ,'Взгляд тигра ','Роспись на капоте автомобиля Toyota'],
            ['img/c3/autof/15.jpg','img/c3/auto/15.jpg', 2, 0, '' ,'Геометрия' , 'Монохромная роспись всего автомобиля Skoda Octavia' ],
            ['img/c3/autof/16.jpg','img/c3/auto/16.jpg', 2, 0, '' ,'Punk Rock' , 'Аэрография на мотоциклетном шлеме' ],
            ['img/c3/autof/17.jpg','img/c3/auto/17.jpg', 2, 0, '' ,'По мотивам фильма Спарта' , 'Высокодетализированная роспись автомобиля Gelandewagen ' ],
            ['img/c3/autof/18.jpg','img/c3/auto/18.jpg', 2, 0, '' ,'Чёрная Пантера' , 'Аэрография на боковой части автомобиля Mercedes-Benz' ],
            //['','', 2, 0, 'card--empty'],
            ['img/c3/autof/22.jpg','img/c3/auto/22.jpg', 2, 1, '' , 'Медуза Горгона', 'Аэрография на боковой части мотоцикла'],
            ['img/c3/autof/23.jpg','img/c3/auto/23.jpg', 2, 1, '' , 'Взгляд из преисподней', 'Аэрография на крышке бензобака'],
            ['img/c3/autof/19.jpg','img/c3/auto/19.jpg', 2, 1, '' , 'Удар молнии' , 'Роспись мотоциклетного шлема'],
            ['img/c3/autof/20.jpg','img/c3/auto/20.jpg', 2, 1, '' , 'Портрет любимой в готическом стиле ' , 'Аэрография на мотошлеме'],
            ['img/c3/autof/21.jpg','img/c3/auto/21.jpg', 2, 1, '' , 'Вежливые люди ' , 'Роспись хоккейного шлема'],
            ['img/c3/autof/24.jpg','img/c3/auto/24.jpg', 2, 1, '' , 'Медуза Горгона»' , 'Аэрография на баке мотоцикла'],

            ['img/c3/barf/1.jpg' ,'img/c3/bar/it1.jpg' , 5, 0, '', 'Декоративная магнолия', 'Барельеф с цветочной композицией'],
            ['img/c3/barf/2.jpg' ,'img/c3/bar/it2.jpg' , 5, 0, '', 'Античность', 'Изображение древнегреческой богини'],
            ['img/c3/barf/3.jpg' ,'img/c3/bar/it3.jpg' , 5, 0, '', 'Виноградная лоза', 'Барельеф с изображением виноградного сада'],
            ['img/c3/barf/4.jpg' ,'img/c3/bar/it4.jpg' , 5, 0, '', 'Древнегреческий барельеф ', 'Мифологический сюжет с богом Дионисом'],
            ['img/c3/barf/5.jpg' ,'img/c3/bar/it5.jpg' , 5, 0, '', 'Сказочное место', 'Оформление стены пейзажным барельефом'],
            ['img/c3/barf/6.jpg' ,'img/c3/bar/it6.jpg' , 5, 0, '', 'Лесная панорама', 'Рельефное панно под потолком'],
            ['img/c3/barf/7.jpg'   ,'img/c3/bar/7.jpg' , 5, 1, '', 'Зимний лес', ' Барельеф во всю стену с изображением пейзажа'],
            ['img/c3/barf/8.jpg'   ,'img/c3/bar/8.jpg' , 5, 1, '', 'Конный двор', 'Полотно с объемным изображением'],

            ['img/c3/intf/1.jpg' ,'img/c3/int/1.jpg' , 0, 0, '', 'Герои из мультфильма <br> «Винни-Пух»' , 'Акриловая роспись с тены в детской комнате' ],
            ['img/c3/intf/2.jpg' ,'img/c3/int/2.jpg' , 0, 0, '', 'Символы Великобритании' , 'Детальная роспись стены и парт в кабинете английского языка ' ],
            ['img/c3/intf/3.jpg' ,'img/c3/int/3.jpg' , 0, 0, '', 'Герои из мультфильма «Смешарики»' , 'Акриловая роспись стены в детской комнате' ],
            ['img/c3/intf/4.jpg' ,'img/c3/int/4.jpg' , 0, 0, '', 'Нежная роза ' , 'Роспись аэрографом водостойкими материалами в ванной комнате' ],
            ['img/c3/intf/5.jpg' ,'img/c3/int/5.jpg' , 0, 0, '', 'Москва-Сити ' , 'Роспись квартиры в урабнистическом стиле' ],
            ['img/c3/intf/6.jpg' ,'img/c3/int/6.jpg' , 0, 0, '', 'Стилизованный комикс' , 'Художественное оформление стен в кафе' ],
            ['img/c3/intf/7.jpg' ,'img/c3/int/7.jpg' , 0, 0, '', 'Береговой причал' , 'Художественная роспись во всю стену' ],
            ['img/c3/intf/8.jpg' ,'img/c3/int/8.jpg' , 0, 0, '', 'Жар-птица' , 'Роспись вагонки в частном доме' ],
            ['img/c3/intf/9.jpg' ,'img/c3/int/9.jpg' , 0, 0, '', ' Цветы сакуры ' , 'Акриловая роспись стены в квартире' ],
            ['img/c3/intf/10.jpg','img/c3/int/10.jpg', 0, 0, '', 'По мотивам мультфильма «Мадагаскар»' , 'Роспись стены в детской комнате' ],
            ['img/c3/intf/11.jpg','img/c3/int/11.jpg', 0, 0, '', 'Зинедин Зидан' , 'Изображение футбольного игрока в полный рост для фаната' ],
            ['img/c3/intf/12.jpg','img/c3/int/12.jpg', 0, 0, '', 'Стиль «Moulin Rouge»' , 'Роспись холодильника' ],
            ['img/c3/intf/13.jpg','img/c3/int/13.jpg', 0, 0, '', 'Индийские мотивы' , 'Акриловая роспись изголовья и изножья кровати' ],
            ['img/c3/intf/14.jpg','img/c3/int/14.jpg', 0, 0, '', 'Гиперреалистичные орхидеи' , 'Декоративное оформление фартука на кухне' ],
            ['img/c3/intf/15.jpg','img/c3/int/15.jpg', 0, 0, '', 'Стиль Нью-Йорка' , 'Акриловая роспись стены на балконе' ],
            ['img/c3/intf/16.jpg','img/c3/int/16.jpg', 0, 0, '', 'Сердце мегаполиса' , 'Роспись стены в графическом стиле' ],
            ['img/c3/intf/17.jpg','img/c3/int/17.jpg', 0, 0, '', 'Мыльные пузыри' , 'Яркая роспись стены в детской комнате' ],
            ['img/c3/intf/18.jpg','img/c3/int/18.jpg', 0, 0, '', 'Бутоны роз' , 'Трафаретная роспись стены в гостиной ' ],
            ['img/c3/intf/19.jpg','img/c3/int/19.jpg', 0, 1, '', 'Фуксия' , 'Детализированная  роспись фартука на кухне' ],
            ['img/c3/intf/20.jpg','img/c3/int/20.jpg', 0, 1, '', 'Нежные ирисы' , 'Акриловая роспись стены в спальне' ],
            ['img/c3/intf/21.jpg','img/c3/int/21.jpg', 0, 1, '', 'Объёмные контуры' , 'Роспись кухонного гарнитура и фартука' ],
            ['img/c3/intf/22.jpg','img/c3/int/22.jpg', 0, 1, '', 'Черепаха с племенными орнаментами' , 'Роспись в полинезийском стиле' ],
            ['img/c3/intf/23.jpg','img/c3/int/23.jpg', 0, 1, '', 'Жилой двор' , 'Роспись офиса застройщика ЖК' ],
            ['img/c3/intf/24.jpg','img/c3/int/24.jpg', 0, 1, '', 'Памятники России' , 'Роспись актового зала Следственного комитета РФ' ],

            ['img/c3/izdf/1.jpg' ,'img/c3/izd/1.jpg' , 1, 0, '', 'Абстрактный узор', 'Роспись чехла для телефона с градиентом'],
            ['img/c3/izdf/2.jpg' ,'img/c3/izd/2.jpg' , 1, 0, '', 'Баскетбольные легенды', 'Монохромная портретная роспись маслом'],
            ['img/c3/izdf/3.jpg' ,'img/c3/izd/3.jpg' , 1, 0, '', 'Именная роспись', 'Авторское оформление детского велосипеда'],
            ['img/c3/izdf/4.jpg' ,'img/c3/izd/4.jpg' , 1, 0, '', 'Коллекционная машинка', 'Перекраска масштабной модели автомобиля'],
            ['img/c3/izdf/5.jpg' ,'img/c3/izd/5.jpg' , 1, 0, '', 'Палехская роспись', 'Художественное оформление жёстких дисков'],
            ['img/c3/izdf/6.jpg' ,'img/c3/izd/6.jpg' , 1, 0, '', 'Роспись гитары', ' Роспись гитары в подарок мужу'],
            ['img/c3/izdf/7.jpg' ,'img/c3/izd/7.jpg' , 1, 1, '', 'Голубой павлин', 'Роспись с цветочными элементами и узорами'],
            ['img/c3/izdf/8.jpg' ,'img/c3/izd/8.jpg' , 1, 1, '', 'Русский медведь', 'Роспись столешницы для болельщика Спартака'],
            ['img/c3/izdf/9.jpg' ,'img/c3/izd/9.jpg' , 1, 1, '', 'Дома в английском стиле', 'Акриловая роспись декораций с элементами лепнины'],
            ['img/c3/izdf/10.jpg','img/c3/izd/10.jpg', 1, 1, '', 'Фанат Спартака', 'Аэрография для болельщика'],
            ['img/c3/izdf/11.jpg','img/c3/izd/11.jpg', 1, 1, '', 'Поехали!', 'Портрет Юрия Гагарина аэрографом'],
            ['img/c3/izdf/12.jpg','img/c3/izd/12.jpg', 1, 1, '', 'Логотип Спартака', 'Роспись кожуха мотоцикла аэрографом'],

            ['img/c3/read-sqf/it1.jpg' ,'img/c3/read-sq/it1.jpg' , 4, 0, ''],
            ['img/c3/read-sqf/it2.jpg' ,'img/c3/read-sq/it2.jpg' , 4, 0, ''],
            ['img/c3/read-sqf/it3.jpg' ,'img/c3/read-sq/it3.jpg' , 4, 0, ''],
            ['img/c3/read-sqf/it4.jpg' ,'img/c3/read-sq/it4.jpg' , 4, 0, ''],
            ['img/c3/read-sqf/it5.jpg' ,'img/c3/read-sq/it5.jpg' , 4, 0, ''],
            ['img/c3/read-sqf/it6.jpg' ,'img/c3/read-sq/it6.jpg' , 4, 0, ''],
            ['img/c3/read-sqf/it7.jpg' ,'img/c3/read-sq/it7.jpg' , 4, 0, ''],
            ['img/c3/read-sqf/it8.jpg' ,'img/c3/read-sq/it8.jpg' , 4, 0, ''],
            ['img/c3/read-sqf/it9.jpg' ,'img/c3/read-sq/it9.jpg' , 4, 0, ''],
            ['img/c3/read-sqf/it10.jpg','img/c3/read-sq/it10.jpg', 4, 0, ''],
            ['img/c3/read-sqf/it11.jpg','img/c3/read-sq/it11.jpg', 4, 0, ''],
            ['img/c3/read-sqf/it12.jpg','img/c3/read-sq/it12.jpg', 4, 0, ''],
            ['img/c3/read-sqf/13.jpg','img/c3/read-sq/13.jpg'  , 4, 0, ''],
            ['img/c3/read-sqf/14.jpg','img/c3/read-sq/14.jpg'  , 4, 0, ''],
            ['img/c3/read-sqf/15.jpg','img/c3/read-sq/15.jpg'  , 4, 0, ''],
            ['img/c3/read-sqf/16.jpg','img/c3/read-sq/16.jpg'  , 4, 0, ''],
            ['img/c3/read-sqf/17.jpg','img/c3/read-sq/17.jpg'  , 4, 0, ''],
            ['img/c3/read-sqf/18.jpg','img/c3/read-sq/18.jpg'  , 4, 0, ''],
            ['img/c3/read-sqf/19.jpg','img/c3/read-sq/19.jpg'  , 4, 0, ''],
            ['img/c3/read-sqf/20.jpg','img/c3/read-sq/20.jpg'  , 4, 0, ''],
            ['img/c3/read-sqf/21.jpg','img/c3/read-sq/21.jpg'  , 4, 0, ''],
            ['img/c3/read-sqf/22.jpg','img/c3/read-sq/22.jpg'  , 4, 1, ''],
            ['img/c3/read-sqf/23.jpg','img/c3/read-sq/23.jpg'  , 4, 1, ''],
            ['img/c3/read-sqf/24.jpg','img/c3/read-sq/24.jpg'  , 4, 1, ''],
            //['',''  , 4, 1, 'card--empty'],
            ['img/c3/read-sqf/28.jpg','img/c3/read-sq/28.jpg'  , 4, 1, ''],
            ['img/c3/read-sqf/25.jpg','img/c3/read-sq/25.jpg'  , 4, 1, ''],
            ['img/c3/read-sqf/26.jpg','img/c3/read-sq/26.jpg'  , 4, 1, ''],
            ['img/c3/read-sqf/27.jpg','img/c3/read-sq/27.jpg'  , 4, 1, '']
        ];


        for (var iCard = 0 , l = cardsArray.length ;
            iCard<l;
            ++iCard ) {

            var cardHovCls ='';
            if(cardsArray[iCard][3] === 1) {
                cardHovCls += ' card__hover--to_top';
            }


            if (cardsArray[iCard][5] === undefined) cardsArray[iCard][5] ='';
            if (cardsArray[iCard][6] === undefined) cardsArray[iCard][6] ='';

            var cardhtml =
                '<div class="card '+ cardsArray[iCard][4] +'">\
                    <a href="'+ cardsArray[iCard][0] +'" class="card__hover '+ cardHovCls +' fancybox" rel="fancy-'+ cardsArray[iCard][2] +'">\
                        <div class="card__opacity">\
                            <div class="card__title">'+ cardsArray[iCard][5] +'</div>\
                            <div class="card__descr">'+ cardsArray[iCard][6] +'</div>\
                        </div>\
                        <div class="img" \
                            style="background-image: url(\''+ cardsArray[iCard][1]  +'\')"></div>\
                        \
                        \
                    </a>\
                </div>';

            var galleries = $('.c3 .tabs_contents__variant');
            galleries.eq(cardsArray[iCard][2]).append(cardhtml);

        }

        $('.card--empty').empty();

    })();



    (function() {
        //автозамена
        var selectsDom =  $('.card__hover');
        var antiselectHtml ;
        selectsDom.each( function() {
            var thisSelectDom = $(this);    //each select
            var clone = $(this).clone().insertAfter(this);
            thisSelectDom.hide();

            //$(this).html('<option>jquery html</option>');
            //$(this).text('<option>jquery text</option>');


            //href из img
            var href = thisSelectDom.find('img').attr('src');
            var href = thisSelectDom.find('.img').css('background-image'); //возвратит полный путь с http://
            if (href != undefined) {href = href.slice(5,-2);}


            log1(href);



            //взять у клона его классы
            var classesStr = clone.attr('class');
            var styleStr = clone.attr('style');

            clone.replaceWith(function(index, oldHTML){
                clone = $('<a href="'+ href +'" class="'+ classesStr +' fancybox" style="'+ styleStr +'" >').html(oldHTML);
                return clone ;
            });

        });

    });


    //изначальная инициализация
    //$('.tabs_contents__variant')
    //    .animate( {opacity: 0}, {duration: 400} )
    //    .eq(0).animate( {opacity: 1}, {duration: 400} );
    ////
    $('.tabs_buttons').each( function(){

        $(this).find('li').eq(0).find('a').click();
    });







    //Инициализируем
    //initMap("г. Благовещенск, ул. Мухина д. 141, офис 1"); //В кавычках указать адрес, если его знает Google маркер будет установлен
    setTimeout ( initMap("Сокольнический вал 2а")
                , 1000 );

    $('input[name="phone"]').mask("+7 (999) 999-9999",{placeholder:" "});

    //parallax:
//    var MIN_PX_PARALLAX_ON = 300;
//
//	var ww = $(window).width();
//
//	if (ww > MIN_PX_PARALLAX_ON) {
//
//        var icons = $('.icons');
//        if( !icons.length ) return;
//        var addr_top = icons.offset().top;
//
//        /*
//        if(
//           !header__layer1.length ||
//           !figures.length ||
//           !top_menu.length ||
//           !switcher.length
//          ) return;*/
//
//		$(window).scroll(function(){
//
//			var wScroll = $(this).scrollTop();
//
//
//
//
//
//            icons.css({
//				'transform' : 'translate(0px, '+ ( addr_top - wScroll)/32 +'%)' //при wScroll === addr_top будет смещен на 0.
//                //'transition': all .3s linear .3s;
//			});
//		});
//	}



});



//Console .log
//
SANZDEBUG = 1;

function log1() {
    if (SANZDEBUG == 1)
        console.log(arguments);

}
//log1(1,mini_slider);
//console.log(1,mini_slider);


function menu_open1(){
	//if(document.getElementById('off_canvas').style.marginLeft=="0px")
	if(document.getElementById('off_canvas').style.marginLeft=="0px")
	{
        menu_close();
	}
	else
	{
	 //$("#off_canvas").css('margin-left','0px');
	 $("#off_canvas").removeClass('opened');
	 //$("#menu_button").css('margin','25px 0px 0px 280px');
	 $("#menu_button").addClass('opened');
	 $("#menu_button").css('transform','rotate(180deg)');

	 $("#top_stick").addClass('stick_x_top');
	 $("#center_stick").addClass('stick_x_center');
	 $("#bottom_stick").addClass('stick_x_bottom');

	 $("#menu_title").addClass('menu_title_x');
	}
}



function menu_open(){


	//$("#off_canvas").css('margin-left','0px');
	$("#off_canvas").addClass('opened');
	//$("#menu_button").css('margin','25px 0px 0px 280px');
	//$("#menu_button").css('transform','rotate(180deg)');
	$("#menu_button").addClass('opened');

//	$("#top_stick").addClass('stick_x_top');
//	$("#center_stick").addClass('stick_x_center');
//	$("#bottom_stick").addClass('stick_x_bottom');

	$("#menu_title").addClass('menu_title_x');

	$(".off_canvas2").removeClass('opened');
}
function menu_close()
{
	//$("#off_canvas").css('margin-left','-300px');
	$("#off_canvas").removeClass('opened');
	//$("#menu_button").css('margin','25px 0px 0px 45px');
	//$("#menu_button").css('transform','rotate(-180deg)');
	$("#menu_button").removeClass('opened');

	$("#top_stick").removeClass('stick_x_top');
	$("#center_stick").removeClass('stick_x_center');
	$("#bottom_stick").removeClass('stick_x_bottom');

	$("#menu_title").removeClass('menu_title_x');

    $(".off_canvas2").addClass('opened');
}
