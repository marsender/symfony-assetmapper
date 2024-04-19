<?php

/**
 * Returns the importmap for this application.
 *
 * - "path" is a path inside the asset mapper system. Use the
 *     "debug:asset-map" command to see the full list of paths.
 *
 * - "entrypoint" (JavaScript only) set to true for any module that will
 *     be used as an "entrypoint" (and passed to the importmap() Twig function).
 *
 * The "importmap:require" command can be used to add new entries to this file.
 */
return [
    'app' => [
        'path' => './assets/app.js',
        'entrypoint' => true,
    ],
    'eventkeys' => [
        'path' => './assets/eventkeys.js',
    ],
    '@symfony/stimulus-bundle' => [
        'path' => './vendor/symfony/stimulus-bundle/assets/dist/loader.js',
    ],
    '@hotwired/stimulus' => [
        'version' => '3.2.2',
    ],
    '@hotwired/turbo' => [
        'version' => '8.0.4',
    ],
    'es-module-shims' => [
        'version' => '1.9.0',
    ],
    'stimulus-popover' => [
        'version' => '6.2.0',
    ],
    'stimulus-notification' => [
        'version' => '2.2.0',
    ],
    'stimulus-use' => [
        'version' => '0.52.2',
    ],
    'hotkeys-js' => [
        'version' => '3.13.7',
    ],
];
