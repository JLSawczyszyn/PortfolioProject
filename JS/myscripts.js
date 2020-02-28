
////////////////////////////////////////////////////js for carousel start/////////////////////////////////////////////

'use strict';

var carouselImgs = [
    {
        imgSrc: "img/Carousel/ACLULGBT.jpg",
        imgDesc: "A pride flag gift from the ACLU"
    },
    {
        imgSrc: "Img/Carousel/ACLUTRANS.jpg",
        imgDesc: "A trans pride flag gift from the ACLU"
    },
    {
        imgSrc: "Img/Carousel/FanJamRen.jpg",
        imgDesc: "Fantasia, Fox, and Renee art layers"
    },
    {
        imgSrc: "Img/Carousel/GriffinSilly.jpg",
        imgDesc: "Griffin being silly"
    },
    {
        imgSrc: "Img/Carousel/GrifSanRen.jpg",
        imgDesc: "Griffin, Sandy, and Renee"
    },
    {
        imgSrc: "Img/Carousel/Guestpic.jpg",
        imgDesc: "Guest singing at an event"
    },
    {
        imgSrc: "Img/Carousel/RenJam....jpg",
        imgDesc: "Renee and Fox" 
    },
    {
        imgSrc: "Img/Carousel/Joe.jpg",
        imgDesc: "Joe Cox"
    },
    {
        imgSrc: "Img/Carousel/Griff.jpg",
        imgDesc: "Griffin"
    },
    {
        imgSrc: "Img/Carousel/RenAnd.jpg",
        imgDesc: "Renee and Andreas"
    },
    {
        imgSrc: "Img/Carousel/RenAndGrif.jpg",
        imgDesc: "Renee, Andy, and Griffin"
    },
    {
        imgSrc: "Img/Carousel/RenAndGrifSilly.jpg", 
        imgDesc: "Renee, Andy, and Griffin being silly"
    },
    {
        imgSrc: "img/Carousel/ReneeTalkinf.jpg",
        imgDesc: "Renee in the studio"
    },
    {
        imgSrc: "img/Carousel/Stylebook.jpg",
        imgDesc: "NGJLA's stylebook of termonology"
    },
    {
        imgSrc: "Img/Carousel/TuneIn.jpg",
        imgDesc: "Tune in every week at 7pm!"
    },
    {
        imgSrc: "Img/Carousel/OnAir.jpg",
        imgDesc: "Where to find us"
    },
]


var carousel = function carousel(options) {

    var _carousel = {

        paused: false,

        stopped: false,

        options: {
            speed: 4500,
            acceleration: 4,
            reverse: false,
            selector: '.c-carousel',
            slidesSelector: '.c-carousel__slides',
            leftArrowSelector: '.c-carousel__arrow--left',
            rightArrowSelector: '.c-carousel__arrow--right'
        },

        init: function init() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            // Copy options to this.options
            for (var prop in options) {
                if (!options.hasOwnProperty(prop)) break;
                this.options[prop] = options[prop];
            }

            // Cache nodes
            var carousel = document.querySelector(options.selector || this.options.selector);
            var slides = this._slides = carousel.querySelector(this.options.slidesSelector);
            this._leftArrow = carousel.querySelector(this.options.leftArrowSelector);
            this._rightArrow = carousel.querySelector(this.options.rightArrowSelector);

            // Multiply speed value by the number of slides
            this.options.speed = this.options.speed * slides.children.length;

            // Set slides container width
            this.width = slides.offsetWidth;

            // Repeat elements
            slides.innerHTML = slides.innerHTML + slides.innerHTML + slides.innerHTML;

            this._registerEvents();
            this._animate();
        },

        _registerEvents: function _registerEvents() {
            var _this = this;

            var speed = this.options.speed;
            var reverse = this.options.reverse;

            this._rightArrow.addEventListener('mouseover', function () {
                _this.options.speed = speed / _this.options.acceleration;
                _this.options.reverse = false;
            });
            this._rightArrow.addEventListener('mouseleave', function () {
                _this.options.speed = speed;
                _this.options.reverse = reverse;
            });
            this._leftArrow.addEventListener('mouseover', function () {
                _this.options.speed = speed / _this.options.acceleration;
                _this.options.reverse = true;
            });
            this._leftArrow.addEventListener('mouseleave', function () {
                _this.options.speed = speed;
                _this.options.reverse = reverse;
            });

            // Pause when cursor is over carousel
            this._slides.addEventListener('mouseover', this.pause.bind(this));
            this._slides.addEventListener('mouseleave', this.start.bind(this));

            // Pause when cursor is over carousel
            window.addEventListener('resize', function () {
                _this.width = _this._slides.offsetWidth;
            });
        },
        pause: function pause() {
            this.paused = true;
        },
        start: function start() {
            this.paused = false;
        },
        stop: function stop() {
            this.stopped = true;
        },
        _animate: function _animate() {
            var _this2 = this;

            var slides = this._slides;
            var oneThird = slides.lastElementChild.getBoundingClientRect().right / 3;
            var framesCount = 0;
            var step = 0;
            var posX = 0;

            var animate = function animate() {
                if (!_this2.paused) {

                    framesCount = _this2.options.speed * 60 / 1000;
                    step = oneThird / framesCount;

                    posX += _this2.options.reverse ? step : -step;

                    slides.style.transform = 'translateX(' + posX + 'px)';

                    if (_this2.options.reverse) {
                        if (posX >= _this2.width - oneThird) {
                            posX = _this2.width - oneThird * 2;
                        }
                    } else {
                        if (Math.abs(posX) >= oneThird * 2) {
                            posX = -oneThird;
                        }
                    }
                }
                !_this2.stopped && requestAnimationFrame(animate);
            };
            animate();
        }
    };

    _carousel.init(options);
    return _carousel;
};

window.onload = function () {
    return carousel({
        selector: '.c-carousel'
    });
};

$(document).ready(function(){
    addImgs();    
});

function addImgs(){
    for (var i = 0; i < carouselImgs.length; i++){
        var imgSource = carouselImgs[i].imgSrc;
        var imgDescrip = carouselImgs[i].imgDesc;
        var imgID = "#img-" + i;
        $("#carouselSlides").append('<li><img id=' + imgID + ' title="' + imgDescrip + '" class="cimg" src=' + imgSource + ' /></li>')
        
       
    }
}

/////////////////////////////////////////////////////js for carousel end//////////////////////////////////////////////////



///////////////////////////////////////////////////js for accordion start///////////////////////////////////////


(function($) {
	'use strict';
	
	jQuery(document).on('ready', function(){
	
			$('a.page-scroll').on('click', function(e){
				var anchor = $(this);
				$('html, body').stop().animate({
					scrollTop: $(anchor.attr('href')).offset().top - 50
				}, 1500);
				e.preventDefault();
			});		

	}); 	

				
})(jQuery);


////////////////////////////////////////////////js for accordion end///////////////////////////////////////////////////

