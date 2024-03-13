# symfony-assetmapper

This projects is a test for Symfony 7 assetmapper

References :

- [Symfony AssetMapper doc](https://symfony.com/doc/current/frontend/asset_mapper.html)
- [Upgrading Symfony Websites to AssetMapper](https://symfony.com/blog/upgrading-symfony-websites-to-assetmapper)
- [Tailwind CSS bundle for Symfony](https://symfony.com/bundles/TailwindBundle/current/index.html)

## Requirements

This project require the following to get started :

- PHP 8.2
- Web server Apache 2.4

## Install

Clone [Symfony assetmapper repository](https://github.com/marsender/symfony-assetmapper)

```bash
cd /opt/git/marsender/
git clone git@github.com:marsender/symfony-assetmapper.git
```

Install php dependencies
```bash
cd /opt/git/marsender/symfony-assetmapper
composer install
sudo chown -R www-data:$USER var
```

Add project host
```bash
sudo nano /etc/hosts
127.0.0.1 symfony-assetmapper.localhost
```

Add apache config
```
sudo nano /etc/apache2/sites-available/symfony-assetmapper.conf
<VirtualHost *:80>

	# http://symfony-assetmapper.localhost/
	ServerName symfony-assetmapper.localhost

	<FilesMatch \.php$>
		SetHandler proxy:unix:/var/run/php/php8.2-fpm.sock|fcgi://dummy
	</FilesMatch>

	LogLevel warn
	ErrorLog ${APACHE_LOG_DIR}/error_symfony-assetmapper.log
	CustomLog ${APACHE_LOG_DIR}/access_symfony-assetmapper.log combined

	# Security
	ServerSignature Off

	DocumentRoot /opt/git/marsender/symfony-assetmapper/public/
	<Directory /opt/git/marsender/symfony-assetmapper/public/>
		Require all granted
		AllowOverride None
		FallbackResource /index.php
	</Directory>

</VirtualHost>
```

Enable new website
```bash
sudo a2ensite symfony-assetmapper
sudo apache2ctl restart
```

Build for production
```bash
composer deploy
```

Open the app in your browser [http://symfony-assetmapper.localhost/](http://symfony-assetmapper.localhost/)


# Delopper instructions

## Add or remove importmaps

This will add tailwing in /importmap.php file

```bash
bin/console importmap:require tailwindcss
bin/console importmap:remove tailwindcss
```

## Debugging: Seeing All Mapped Assets

```bash
bin/console debug:asset-map
```

## Upgrade importmap packages

```bash
# List outedated packages
php bin/console importmap:outdated
# Update oudated packages
php bin/console importmap:update # add packagename to update only one package
```

## Tailwind dev watch

This will watch for changes to your assets/styles/app.css file and automatically recompile it when needed.
If you refresh the page, the final app.css file will already contain the compiled CSS.

```bash
bin/console tailwind:build --watch
```

## Clear symfony cache

```bash
composer cache-clear
```

## Memo to add asset mapper and tailwind to an existing project

Add asset-mapper package
```bash
composer require symfony/asset-mapper
```

Add Tailwind CSS bundle
```bash
composer require symfonycasts/tailwind-bundle
bin/console tailwind:init
```
