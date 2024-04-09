'use strict';

import { Controller } from '@hotwired/stimulus';
import { EventKeys } from 'eventkeys';

/**
 * Toast Stimulus controller
 *
 * Display a toast
 * Depends on stimulus notification controller
 *
 * @see https://www.stimulus-components.com/docs/stimulus-notification/
 */
export default class extends Controller {
	connect() {
		document.addEventListener(EventKeys.ShowToast, this._showToast.bind(this));
	}

	disconnect() {
		document.removeEventListener(EventKeys.ShowToast, this._showToast);
	}

	/**
	 * Create a dom stimulus notification to display a toast
	 *
	 * Called via dispatch EventKeys.ShowToast custom event
	 *
	 * @param {*} event Event detail
	 */
	_showToast({ detail }) {
		// Set the class from the message type: success info error
		let notificationClass = '';
		// Filter the type
		switch (detail.type) {
			case 'success':
				notificationClass = 'green';
				break;
			case 'info':
				notificationClass = 'blue';
				break;
			case 'error':
				notificationClass = 'red';
				break;
			default:
				console.log('Notification type must be one of success, info, error');
				notificationClass = 'danger';
		}

		// Create the DOM elements as in templates/util/_toast.html.twig
		var outerDiv = document.createElement('div');
		outerDiv.setAttribute('data-controller', 'notification');
		outerDiv.setAttribute('data-notification-delay-value', detail.delay);

		var innerDiv = document.createElement('div');
		innerDiv.className = 'flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800';
		innerDiv.setAttribute('role', 'alert');

		var iconDiv = document.createElement('div');
		iconDiv.className = `inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${notificationClass}-500 bg-${notificationClass}-100 rounded-lg dark:bg-${notificationClass}-800 dark:text-${notificationClass}-200`;

		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('class', 'w-5 h-5');
		svg.setAttribute('aria-hidden', 'true');
		svg.setAttribute('fill', 'currentColor');
		svg.setAttribute('viewBox', '0 0 20 20');

		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('d', 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z');

		var span = document.createElement('span');
		span.className = 'sr-only';
		span.innerText = 'Check icon';

		svg.appendChild(path);
		iconDiv.appendChild(svg);
		iconDiv.appendChild(span);

		var messageDiv = document.createElement('div');
		messageDiv.className = 'ms-3 text-sm font-normal';
		messageDiv.innerText = detail.message;

		innerDiv.appendChild(iconDiv);
		innerDiv.appendChild(messageDiv);

		var button = document.createElement('button');
		button.setAttribute('data-action', 'notification#hide');
		button.setAttribute('type', 'button');
		button.className = 'ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700';
		button.setAttribute('aria-label', 'Close');

		var span = document.createElement('span');
		span.className = 'sr-only';
		span.innerText = 'Close';

		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('class', 'w-3 h-3');
		svg.setAttribute('aria-hidden', 'true');
		svg.setAttribute('fill', 'none');
		svg.setAttribute('viewBox', '0 0 14 14');

		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('stroke', 'currentColor');
		path.setAttribute('stroke-linecap', 'round');
		path.setAttribute('stroke-linejoin', 'round');
		path.setAttribute('stroke-width', '2');
		path.setAttribute('d', 'm1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6');

		svg.appendChild(path);
		button.appendChild(span);
		button.appendChild(svg);
		innerDiv.appendChild(button);

		outerDiv.appendChild(innerDiv);

		// Append the outer div to the document body
		this.element.appendChild(outerDiv);
	}
}
