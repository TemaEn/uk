// инициализация Свайпера
const slider = new Swiper('.slider-top-block__container', {
	// НАСТРОЙКИ
	// Стрелки
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},

	simulateTouch: true, // переключение перетаскиванием мыши
	touchRatio: 1, // чувствительность свайпа
	touchAngle: 45, // угол срабатывания свайпа
	grabCursor: true, // меняет стрелку на руку

	// переключение на клавиатуре
	keyboard: {
		enabled: true, // вкл/выкл
		onlyInViewport: true, // вкл/выкл, только если слайдер в пределах видимости
		pageUpDown: true, // вкл/выкл, управление клавишами pageup, pagedown
	},

	// управление с помощью колеса мыши
	mousewheel: {
		sensitivity: 1, // чувствительность машины
		eventsTarget: '.slider-top-block__container' // класс объекта, на котором будет срабатывать прокрутка колесом (если много слайдеров, будут прокурчиваться все)
	},

	// автовысота
	autoHeight: true, // подстаривает слайдер под размер контента

	// кол-во показанных слайдов
	slidesPerView: 1.7, // можно указывать десятичные числа. (auto - автоматическая ширина + css)

	// отключение функционала если слайдов меньше чем нужно
	watchOverflow: true,

	// кол-во пролистываемых слайдов
	slidesPerGroup: 1,

	//стартовый слайд
	initialSlide: 0,


	// бесконечная прокрутка слайдера
	loop: true,

	// скорость прокрутки слайдов
	speed: 300,

	// брейкпоинты (адаптив, ширина)
	breakpoints: {
		320: {
			spaceBetween: 10,
		},
		1200: {
			spaceBetween: 20,
		},
		1520: {
			spaceBetween: 38,
		}
	},

});

const sliderResize = document.querySelector('.items-slider');
let { clientWidth } = document.body;
let yourSlider;

const sliderInit = () => {
	yourSlider = new Swiper('.items-slider', {
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},

		keyboard: {
			enabled: true,
			onlyInViewport: true,
			pageUpDown: true,
		},

		mousewheel: {
			sensitivity: 1,
			eventsTarget: '.items-slider',
		},

		// отключение функционала если слайдов меньше чем нужно
		watchOverflow: true,

		breakpoints: {
			320: {
				slidesPerView: 1.5,
				spaceBetween: 10,
			},
			350: {
				slidesPerView: 1.5,
				spaceBetween: 20,
			},
			650: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1201: {
				// отключаем функционал слайдера
				slidesPerView: 1000000,
				spaceBetween: 0,
				loop: false,
			}
		},

		simulateTouch: true,
	})
}

const resizeHandlerSlider = () => {
	if (clientWidth !== document.body.clientWidth && clientWidth < 1200) {
		clientWidth = document.body.clientWidth;

		if (yourSlider && clientWidth > 1200) {
			yourSlider.destroy();
		}

		sliderInit();
	}
}

// инит слайдера после загрузки 
window.addEventListener('load', sliderInit);
// новый инит слайдера после ресайза окна 
window.addEventListener('resize', resizeHandlerSlider);