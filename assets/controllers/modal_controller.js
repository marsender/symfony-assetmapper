import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
	static targets = ['dialog', 'dynamicContent', 'loadingTemplate'];
	//static outlets = [ 'title' ];
	observer = null;

	initialize() {
		//console.log('Outlets: %o', this.titleOutlet);
	}

	connect() {
		if (this.hasDynamicContentTarget) {
			// When the content changes, call this.open()
			this.observer = new MutationObserver(() => {
				const shouldOpen = this.dynamicContentTarget.innerHTML.trim().length > 0;
				if (shouldOpen && !this.dialogTarget.open) {
					this.open();
				} else if (!shouldOpen && this.dialogTarget.open) {
					this.close();
				}
			});
			this.observer.observe(this.dynamicContentTarget, {
				childList: true,
				characterData: true,
				subtree: true,
			});
		}
	}

	disconnect() {
		if (this.observer) {
			this.observer.disconnect();
		}
		if (this.dialogTarget.open) {
			this.close();
		}
	}

	open() {
		this.dialogTarget.showModal();
		//document.body.classList.add('overflow-hidden', 'blur-sm');
	}

	close() {
		this.dialogTarget.close();
		//document.body.classList.remove('overflow-hidden', 'blur-sm');
	}

	clickOutside(event) {
		if (event.target !== this.dialogTarget) {
			return;
		}

		this.close();
	}

	showLoading() {
		// Do nothing if the dialog is already open
		if (this.dialogTarget.open) {
			return;
		}

		this.dynamicContentTarget.innerHTML = this.loadingTemplateTarget.innerHTML;
	}
}
