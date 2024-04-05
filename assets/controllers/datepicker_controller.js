import { Controller } from '@hotwired/stimulus';
import { Datepicker } from 'flowbite-datepicker';

/**
 * Flowbite date picker
 * @see https://flowbite.com/docs/plugins/datepicker/
 * @see https://github.com/themesberg/flowbite-datepicker
 */
export default class extends Controller {
	datepicker;

	connect() {
		this.element.type = 'text';
		
		// Get the date picker parent container: either the body or the dialog
		let parentContainer = this.getParentContainer(this.element);

		this.datepicker = new Datepicker(this.element, {
			format: 'yyyy-mm-dd',
			autohide: true,
			container: parentContainer
		});
	}

	disconnect() {
		if (this.datepicker) {
			this.datepicker.destroy();
		}
		this.element.type = 'date';
	}

	getParentContainer(node) {
		while (node !== null) {
			if (node.nodeName === 'DIALOG') {
				node.classList.add('current');
				return 'dialog.current';
			}
			node = node.parentNode;
		}
		return 'body';
	}
}
