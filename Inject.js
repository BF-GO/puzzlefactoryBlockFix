// inject.js

(function () {
	'use strict';

	Object.defineProperty(window, 'onscroll', {
		get() {
			return null;
		},
		set(value) {
			console.warn('Blocked setting window.onscroll');
		},
	});

	const originalScrollTo = window.scrollTo;
	window.scrollTo = function (x, y) {
		console.warn('Blocked window.scrollTo');
	};

	const originalScrollBy = window.scrollBy;
	window.scrollBy = function (x, y) {
		console.warn('Blocked window.scrollBy');
	};

	const originalScrollIntoView = Element.prototype.scrollIntoView;
	Element.prototype.scrollIntoView = function (options) {
		console.warn('Blocked element.scrollIntoView');
	};

	const originalBodyStyle = document.body.style;

	const styleProxy = new Proxy(originalBodyStyle, {
		set(target, property, value) {
			if (
				property === 'overflow' ||
				property === 'top' ||
				property === 'left'
			) {
				console.warn(`Blocked setting body.style.${property} to ${value}`);
				return true;
			}
			target[property] = value;
			return true;
		},
	});

	Object.defineProperty(document.body, 'style', {
		get() {
			return styleProxy;
		},
		set(value) {},
	});

	setInterval(function () {
		if (window.onscroll !== null) {
			window.onscroll = null;
			console.warn('Reset window.onscroll to null');
		}
	}, 1000);

	const originalAddEventListener = window.addEventListener;
	window.addEventListener = function (type, listener, options) {
		if (type === 'scroll') {
			console.warn('Blocked adding scroll event listener');
			return;
		}
		originalAddEventListener.call(this, type, listener, options);
	};

	const originalRemoveEventListener = window.removeEventListener;
	window.removeEventListener = function (type, listener, options) {
		if (type === 'scroll') {
			console.warn('Blocked removing scroll event listener');
			return;
		}
		originalRemoveEventListener.call(this, type, listener, options);
	};

	if (typeof window.killScroll === 'function') {
		window.killScroll = function (t) {
			console.warn('Blocked killScroll function');
		};
	}

	if (typeof window.reviveScroll === 'function') {
		window.reviveScroll = function () {
			console.warn('Blocked reviveScroll function');
		};
	}
})();
