
import * as noUiSlider from 'nouislider';
import * as flsFunctions from './modules/functions.js';
import './libs/dynamic_apapt.js';

flsFunctions.isWebp();

import Swiper, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper';

const swiper = new Swiper();

// header phone spoller 
const spollerArrow = document.querySelector('.phones-header__arrow');
const spollerList = document.querySelector('.phones-header_list');

if (spollerArrow) {
    spollerArrow.addEventListener('click', function () {
        spollerList.classList.toggle('_spoller-active');
        spollerArrow.classList.toggle('_arrow-active');
    });
}
// header popup

const popup = document.querySelector('.popup');
const headerCallback = document.querySelector('.phones-header__callback');
const popupWrapper = document.querySelector('.popup__wrapper');
if (popup) {
	
    headerCallback.addEventListener('click', function() {
        popup.classList.add('popup-show');
        if( popup.classList.contains('popup-show')) {
            popupWrapper.addEventListener('click', function(){
                popup.classList.remove('popup-show');
            });
        }
    });
}

// Открытие каталога
document.addEventListener('click', documentActions);

function documentActions (e) {
    const targetElement = e.target;
    if(targetElement.closest('[data-parent]')) {
        const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
        const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);

        if(subMenu) {
            const activeLink = document.querySelector('._sub-menu-active');
            const activeBlock = document.querySelector('._sub-menu-open');
            if(activeLink && activeLink !== targetElement) {
                activeLink.classList.remove('_sub-menu-active');
                activeBlock.classList.remove('_sub-menu-open');
                subMenuCatalog.classList.remove('catalog-open');
              
            }
            
            targetElement.classList.toggle('_sub-menu-active');
            subMenu.classList.toggle('_sub-menu-open');
            subMenuCatalog.classList.add('catalog-open');

            subMenuBack.addEventListener('click', function (e) {
                subMenuCatalog.classList.remove('catalog-open');
                if(document.querySelector('._sub-menu-active')) {
                    document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active');
                }
                if(document.querySelector('._sub-menu-open')) {
                    document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open');
                }
                e.preventDefault();
            });
            
        } 
        e.preventDefault();
    }
}

// Добавление класса в sub-menu

const menuBlocks = document.querySelectorAll('.sub-menu-catalog__block');

if(menuBlocks.length) {
    menuBlocks.forEach(menuBlock => {
        const menuBlockItems = menuBlock.querySelectorAll('.sub-menu-catalog__category').length;
        menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItems}`);
    });
   
}

// menu Burger 

const burger = document.querySelector('.icon-menu');
const menuBurger = document.querySelector('.menu__body');
const catalogLink = document.querySelector('.menu-top-header__link_catalog');
const menuCatalog = document.querySelector('.menu-catalog');
const subMenuCatalog = document.querySelector('.menu-catalog__sub-menu');
const back = document.querySelector('.menu-catalog__back');
const menuCatalogLinks = document.querySelectorAll('.menu-catalog__link');
const subMenuBack = document.querySelector('.sub-menu-catalog__back');
const body = document.querySelector('body');


if(burger) {
    burger.addEventListener('click', burgerFunction);
    catalogLink.addEventListener('click', openCatalog);
    back.addEventListener('click', backToMenu);
}

function burgerFunction () {
    burger.classList.toggle('menu-open');
    if (burger.classList.contains('menu-open')) {
		body.classList.add('_lock');
        menuBurger.classList.add('menu-open');
    } else {
		body.classList.remove('_lock');
        menuBurger.classList.remove('menu-open');
        if(menuCatalog.classList.contains('catalog-open')) {
            menuCatalog.classList.remove('catalog-open');
        }
        if(subMenuCatalog.classList.contains('catalog-open')) {
            subMenuCatalog.classList.remove('catalog-open')
        }
        if(document.querySelector('._sub-menu-active')) {
            document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active');
        }
        if(document.querySelector('._sub-menu-open')) {
            document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open');
        }
    }
}

function openCatalog (e) {
    menuCatalog.classList.add('catalog-open');
    e.preventDefault(); 
};

function backToMenu (e) {
    menuCatalog.classList.remove('catalog-open');
    e.preventDefault();
}

// Слайдер
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}

function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

    if (document.querySelector('.main-block__slider')) {
        new Swiper('.main-block__slider', {
            modules: [Navigation, Pagination, Autoplay],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 50,
            speed: 800,
            loop: true,
            pagination: {
                el: '.controll-main-block__dotts',
                clickable: true,
                //dynamicBullets: true
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            on: {
				init: function (swiper) {
					const allSlides = document.querySelector('.fraction-controll__all');
					const allSlidesItems = document.querySelectorAll('.slide-main-block:not(.swiper-slide-duplicate)');
					allSlides.innerHTML = allSlidesItems.length < 10 ? `0${allSlidesItems.length}` : allSlidesItems.length;
				},
				slideChange: function (swiper) {
					const currentSlide = document.querySelector('.fraction-controll__current');
					currentSlide.innerHTML = swiper.realIndex + 1 < 10 ? `0${swiper.realIndex + 1}` : swiper.realIndex + 1;
				}
			}
        });
    }
	if (document.querySelector('.products-slider__slider')) {
        new Swiper('.products-slider__slider', {
            modules: [Navigation, Pagination, Autoplay],
            observer: true,
            observeParents: true,
            slidesPerView: 4,
            spaceBetween: 30,
            speed: 800,
            //loop: true,
            pagination: {
                el: '.products-slider__dotts',
                clickable: true,
               // dynamicBullets: true
            },
			autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				680: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1370: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
        });
    }
    if (document.querySelector('.products-new')) {
        new Swiper('.products-new__slider', {
            modules: [Navigation, Pagination, Autoplay],
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 800,
            //loop: true,
            pagination: {
                el: '.products-new__dotts',
                clickable: true,
               // dynamicBullets: true
            },
			autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				680: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1010: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1330: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
			},
        });
    }
	if (document.querySelector('.thumbs-images')) {
        const thumbsSwiper = new Swiper('.thumbs-images', {
            modules: [Navigation, Pagination, Autoplay, Thumbs],
            observer: true,
            observeParents: true,
            slidesPerView: 4,
            spaceBetween: 16,
            speed: 800,
            //loop: true,
            pagination: {
                el: '.products-new__dotts',
                clickable: true,
               // dynamicBullets: true
            },
			breakpoints: {
				320: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
				1330: {
					slidesPerView: 4,
					spaceBetween: 16,
				},
			},
			on: {
				init: function (swiper) {

				}
			}
        });
		new Swiper('.images-product__slider', {
            modules: [Navigation, Pagination, Autoplay, Thumbs],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            //loop: true,
			thumbs: {
				swiper: thumbsSwiper 
			},
			on: {
				init: function (swiper) {

				}
			}
        });
    }

}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});

// Звездный рейтинг

function formRating() {
	const ratings = document.querySelectorAll('.rating');
	if (ratings.length > 0) {
		initRatings();
	}
	// Основная функция
	function initRatings() {
		let ratingActive, ratingValue;
		// "Бегаем" по всем рейтингам на странице
		for (let index = 0; index < ratings.length; index++) {
			const rating = ratings[index];
			initRating(rating);
		}
		// Инициализируем конкретный рейтинг
		function initRating(rating) {
			initRatingVars(rating);

			setRatingActiveWidth();

			if (rating.classList.contains('rating_set')) {
				setRating(rating);
			}
		}
		// Инициализайция переменных
		function initRatingVars(rating) {
			ratingActive = rating.querySelector('.rating__active');
			ratingValue = rating.querySelector('.rating__value');
		}
		// Изменяем ширину активных звезд
		function setRatingActiveWidth(index = ratingValue.innerHTML) {
			const ratingActiveWidth = index / 0.05;
			ratingActive.style.width = `${ratingActiveWidth}%`;
		}
		// Возможность указать оценку 
		function setRating(rating) {
			const ratingItems = rating.querySelectorAll('.rating__item');
			for (let index = 0; index < ratingItems.length; index++) {
				const ratingItem = ratingItems[index];
				ratingItem.addEventListener("mouseenter", function (e) {
					// Обновление переменных
					initRatingVars(rating);
					// Обновление активных звезд
					setRatingActiveWidth(ratingItem.value);
				});
				ratingItem.addEventListener("mouseleave", function (e) {
					// Обновление активных звезд
					setRatingActiveWidth();
				});
				ratingItem.addEventListener("click", function (e) {
					// Обновление переменных
					initRatingVars(rating);

					if (rating.dataset.ajax) {
						// "Отправить" на сервер
						setRatingValue(ratingItem.value, rating);
					} else {
						// Отобразить указанную оцнку
						ratingValue.innerHTML = index + 1;
						setRatingActiveWidth();
					}
				});
			}
		}
		async function setRatingValue(value, rating) {
			if (!rating.classList.contains('rating_sending')) {
				rating.classList.add('rating_sending');

				// Отправика данных (value) на сервер
				let response = await fetch('rating.json', {
					method: 'GET',

					//body: JSON.stringify({
					//	userRating: value
					//}),
					//headers: {
					//	'content-type': 'application/json'
					//}

				});
				if (response.ok) {
					const result = await response.json();

					// Получаем новый рейтинг
					const newRating = result.newRating;

					// Вывод нового среднего результата
					ratingValue.innerHTML = newRating;

					// Обновление активных звезд
					setRatingActiveWidth();

					rating.classList.remove('rating_sending');
				} else {
					alert("Ошибка");

					rating.classList.remove('rating_sending');
				}
			}
		}
	}
}
formRating();

// footer spollers


document.addEventListener('click', footerSpoller);

function footerSpoller (e) {
    const targetElement = e.target;
    if(targetElement.closest('[data-spoller]')) {
        const spollerId = targetElement.dataset.spoller ? targetElement.dataset.spoller : null;
        const spollerMenu = document.querySelector(`[data-spoller-content="${spollerId}"]`);
		spollerMenu.classList.toggle('_open');
	}
	
}

// catalog range

function rangeInit() {
	const rangeItems = document.querySelectorAll('[data-range]');
	if (rangeItems.length) {
		rangeItems.forEach(rangeItem => {
			const fromValue = rangeItem.querySelector('[data-range-from]');
			const toValue = rangeItem.querySelector('[data-range-to]');
			const item = rangeItem.querySelector('[data-range-item]');
			noUiSlider.create(item, {
				start: [Number(fromValue.value), Number(toValue.value)], // [0,200000]
				connect: true,
				tooltips: [true, true],
				range: {
					'min': [Number(fromValue.dataset.rangeFrom)],
					'max': [Number(toValue.dataset.rangeTo)]
				}
			});
			item.noUiSlider.on('update', function (values, handle) {
				fromValue.value = values[0];
				toValue.value = values[1];
			});
		});
	}
}
rangeInit();

// spoller-catalog

document.addEventListener('click', catalogOpen);

function catalogOpen (e) {

    const targetElement = e.target;
    if(targetElement.closest('[data-catalog-title]')) {
        const catalogSpollerId = targetElement.dataset.catalogTitle ? targetElement.dataset.catalogTitle : null;
        const catalogSpollerMenu = document.querySelector(`[data-spoller-catalog="${catalogSpollerId}"]`);
		targetElement.classList.toggle('_active');
		catalogSpollerMenu.classList.toggle('_hidden');
	}
}

// Quantity

function formQuantity() {
	document.addEventListener("click", function (e) {
		let targetElement = e.target;
		if (targetElement.closest('.quantity__button')) {
			let value = parseInt(targetElement.closest('.quantity').querySelector('input').value);
			if (targetElement.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				--value;
				if (value < 1) value = 1;
			}
			targetElement.closest('.quantity').querySelector('input').value = value;
		}
	});
}

formQuantity();