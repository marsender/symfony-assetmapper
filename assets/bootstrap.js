'use strict';

import { startStimulusApp } from '@symfony/stimulus-bundle';
import Notification from 'stimulus-notification';
import Popover from 'stimulus-popover';

export const app = startStimulusApp();

// register any custom, 3rd party controllers here
// app.register('some_controller_name', SomeImportedController);
app.register('notification', Notification);
app.register('popover', Popover);
