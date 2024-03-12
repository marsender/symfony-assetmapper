<?php

$finder = PhpCsFixer\Finder::create()
	->in(__DIR__)
	->exclude('assets')
	->exclude('var')
	->exclude('vendor');

$config = new PhpCsFixer\Config();

// https://cs.symfony.com/doc/rules/index.html
return $config->setRules([
	'@Symfony' => true,
	'@PSR12' => true,
	'ordered_imports' => true,
])->setIndent("\t")
	->setLineEnding("\n")
	->setFinder($finder);
