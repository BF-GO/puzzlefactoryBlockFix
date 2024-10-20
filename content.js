// content.js

(function () {
	'use strict';

	function injectExternalScript() {
		const script = document.createElement('script');
		script.src = chrome.runtime.getURL('inject.js');
		script.onload = function () {
			this.remove();
		};
		document.documentElement.appendChild(script);
	}

	function removeClassVjul89() {
		const elements = document.querySelectorAll('.vjul89');
		elements.forEach((el) => el.classList.remove('vjul89'));
	}

	function removeBodyStyles() {
		const body = document.body;
		if (body) {
			body.style.overflow = '';
			body.style.top = '';
			body.style.left = '';
		}
	}

	function setupMutationObserver() {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === 'attributes' &&
					mutation.attributeName === 'class'
				) {
					const target = mutation.target;
					if (target.classList.contains('vjul89')) {
						target.classList.remove('vjul89');
						console.log('Removed class vjul89 from element:', target);
					}
				}

				if (
					mutation.type === 'attributes' &&
					mutation.attributeName === 'style'
				) {
					const body = document.body;
					if (body) {
						body.style.overflow = '';
						body.style.top = '';
						body.style.left = '';
						console.log('Reset body styles');
					}
				}

				if (mutation.type === 'childList') {
					mutation.addedNodes.forEach((node) => {
						if (node.nodeType === 1) {
							if (node.classList && node.classList.contains('vjul89')) {
								node.classList.remove('vjul89');
								console.log('Removed class vjul89 from added element:', node);
							}
							const nestedElements = node.querySelectorAll('.vjul89');
							nestedElements.forEach((el) => {
								el.classList.remove('vjul89');
								console.log('Removed class vjul89 from nested element:', el);
							});
						}
					});
				}
			});
		});

		observer.observe(document.body, {
			attributes: true,
			childList: true,
			subtree: true,
			attributeFilter: ['class', 'style'],
		});
	}

	function main() {
		injectExternalScript();
		removeClassVjul89();
		removeBodyStyles();
		setupMutationObserver();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', main);
	} else {
		main();
	}
})();
