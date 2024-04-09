"use strict";

import { Controller } from "@hotwired/stimulus";
import { EventKeys } from "eventkeys";

/**
 * Test Stimulus controller
 */
export default class extends Controller {
	static values = {
		toastType: String,
		toastMessage: String,
		toastDelay: Number,
	};

	executeShowToast() {
		this.showToast(
			this.toastTypeValue,
			this.toastMessageValue,
			this.toastDelayValue
		);
	}

	/**
	 * Display an alert toast
	 *
	 * @param {string} type Alert type, one of: success info error
	 * @param {string} message Message to display
	 * @param {number} delay Duration of display in ms
	 */
	showToast(type, message, delay = 10000) {
		let data = { type: type, message: message, delay: delay };
		document.dispatchEvent(
			new CustomEvent(EventKeys.ShowToast, { detail: data })
		);
	}
}
