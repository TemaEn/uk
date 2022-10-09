// меню бургер

const iconMenu = document.querySelector('.header__icon');
const menuBody = document.querySelector('.menu');

if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		menuBody.classList.toggle('_active');
	});
};

document.addEventListener('click', function (e) {
	if (e.target.closest('div') != menuBody && e.target.closest('div') != iconMenu) {
		menuBody.classList.remove('_active');
	}
});

// pop-up

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding'); // фиксированные объекты

let unlock = true; // блочим повторное нажатие на ссылку попапа, пока он открывается

const timeout = 800; // таже цифра что и в транзишн

// вешаем обработчик на линк отсылающий на попап
if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		})
	}
};

// закрытие popup по клику на иконку закрытия
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup')); // ближайший класс .popup
			e.preventDefault();
		})
	}
};

// функция открытия
function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		// если есть открытый попап и попап находится в нем, мы оставляем бадилок
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) { // при клике на попап контент ничего не произойдет, если клик выше попап закроется
				popupClose(e.target.closest('.popup'));
			}
		});
	}
};

// функция закрытия
// если есть открытый попап и попап находится в нем, мы оставляем бадилок
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

// блокируем сролл бади при открытом попапе
function bodyLock() {
	// избегаем сдвиг контента, скрываем скролл. при открытии попапа.
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
};

// анлок бади + лок скролла на время, чтоб не дергался попап
function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
};

// закрытие попапа по ескейп

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape') {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

// полифилы - подгоняют параметры под старые браузеры. 
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойства
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

// QUIZ

const quiz = document.querySelector('.quiz');

if (quiz) {
	const form = document.querySelector('.quiz__form');
	const formItems = form.querySelectorAll('fieldset');
	const btnsNext = form.querySelectorAll('.form-button__btn-next');
	const answersObj = {
		step0: {
			question: '',
			answers: [],
		},
		step1: {
			question: '',
			answers: [],
		},
		step2: {
			question: '',
			answers: [],
		},
	}

	const quizPaginationOutput = document.querySelector('.test__pagination span');
	const quizStep2 = document.querySelector('.test__step_2');
	const quizStep3 = document.querySelector('.test__step_3');
	let quizCounter = 1;




	btnsNext.forEach((btn, btnIndex) => {
		btn.addEventListener('click', (event) => {
			event.preventDefault();
			quizCounter += 1;
			if (quizCounter == 2) {
				quizStep2.style.opacity = '1';
				quizPaginationOutput.innerHTML = 'Шаг 2 из 3';
			} else if (quizCounter == 3) {
				quizStep3.style.opacity = '1';
				quizPaginationOutput.innerHTML = 'Шаг 3 из 3';
			}
			formItems[btnIndex].style.display = 'none';
			formItems[btnIndex + 1].style.display = 'block';
		});

		btn.disabled = true;
	});

	formItems.forEach((formItem, formItemIndex) => {

		if (formItemIndex === 0) {
			formItem.style.display = 'block';
		} else {
			formItem.style.display = 'none';
		}

		if (formItemIndex !== formItems.length - 1) {
			const inputs = formItem.querySelectorAll('input');
			const itemTitle = formItem.querySelector('.form__title');

			answersObj[`step${formItemIndex}`].question = itemTitle.textContent;



			inputs.forEach((input) => {
				const parent = input.parentNode;
				input.checked = false;
				parent.classList.remove('active-radio');
				parent.classList.remove('active-checkbox');
			});
		}


		// ВЫБОР RADIO И CHECKBOX
		formItem.addEventListener('click', (event) => {
			const target = event.target;
			const inputsChecked = formItem.querySelectorAll('input:checked');



			if (formItemIndex !== formItems.length - 1) {
				if (inputsChecked.length > 0) {
					btnsNext[formItemIndex].disabled = false;
				} else {
					btnsNext[formItemIndex].disabled = true;
				}


				if (target.classList.contains('form__radio')) {
					const radios = formItem.querySelectorAll('.form__radio');
					radios.forEach(input => {
						if (input === target) {
							input.parentNode.classList.add('active-radio');
						} else {
							input.parentNode.classList.remove('active-radio');
						}
					})

				} else if (target.classList.contains('form__input')) {
					target.parentNode.classList.toggle('active-checkbox');
				} else {
					return;
				}
			}

		});

	});
}