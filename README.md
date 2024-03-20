# symfony-assetmapper

![CI](https://github.com/marsender/symfony-assetmapper/workflows/CI/badge.svg)

This project is a starter webapp with Symfony 7 assetmapper, Tailwind and Saas.
It also contains a Docker github CI.

References :

- [Symfony AssetMapper doc](https://symfony.com/doc/current/frontend/asset_mapper.html)
- [Upgrading Symfony Websites to AssetMapper](https://symfony.com/blog/upgrading-symfony-websites-to-assetmapper)
- [Tailwind CSS bundle for Symfony](https://symfony.com/bundles/TailwindBundle/current/index.html)
- [Sass bundle for Symfony](https://symfony.com/bundles/SassBundle/current/index.html)
- [Symfony Docker](https://github.com/dunglas/symfony-docker)

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
composer cache-clear
bin/console tailwind:build --minify
bin/console sass:build
bin/console asset-map:compile
```
or use the command
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
bin/console importmap:outdated
# Update oudated packages
bin/console importmap:update # add packagename to update only one package
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

## Memo to add asset mapper and Saas to an existing project

Add asset-mapper package
```bash
composer require symfony/asset-mapper
```

Add [Sass for Symfony](https://symfony.com/bundles/SassBundle/current/index.html)
```bash
composer require symfonycasts/sass-bundle
```

Add [Tailwind CSS for Symfony](https://symfony.com/bundles/TailwindBundle/current/index.html)
```bash
composer require symfonycasts/tailwind-bundle
bin/console tailwind:init
```

Add [Bootstrap Saas](https://github.com/twbs/bootstrap) (if required for the project)
```bash
composer require twbs/bootstrap
```

## Memo to add Symfony Docker templates to an existing project

If not already done, [install Docker Compose](https://docs.docker.com/compose/install/) (v2.10+)

Read the [official doc](https://github.com/dunglas/symfony-docker/blob/main/docs/existing-project.md)

Clone the templates repository
```bash
cd ~
git clone git@github.com:dunglas/symfony-docker.git
cd ~/symfony-docker/
rm -rf .git
```

Copy the templates
```bash
cd /opt/git/marsender/symfony-assetmapper
cp ~/symfony-docker/compose.* ./
cp ~/symfony-docker/.dockerignore ./
cp ~/symfony-docker/Dockerfile ./
cp -Rp ~/symfony-docker/frankenphp ./
cp -Rp ~/symfony-docker/.github ./

# Enable the Docker support of Symfony Flex
composer config --json extra.symfony.docker 'true'

# If you want to use the worker mode of FrankenPHP
composer require runtime/frankenphp-symfony

# Refresh JavaScript dependencies
yarn install --force
```

If you want to use databases
```bash
composer require symfony/orm-pack
# Set the database environment vars in the `.env` file
POSTGRES_USER=app
POSTGRES_PASSWORD=!ChangeMe!
POSTGRES_DB=app
POSTGRES_VERSION=16
POSTGRES_CHARSET=utf8
# Add pdo extensions in the `Dockerfile` file
RUN set -eux; \
	install-php-extensions \
		@composer \
		apcu \
		intl \
		opcache \
		zip \
		pdo \
		pdo_mysql \
		pdo_pgsql \
	;
```

Re-execute the recipes to update the Docker-related files according to the packages you use
```bash
rm symfony.lock
composer symfony:sync-recipes --force --verbose
```

Build the Docker images
```bash
docker compose build --no-cache --pull
```

Start the project
```bash
docker compose up -d
```

Test database
```bash
docker compose exec php bin/console dbal:run-sql -q "SELECT 1" && echo "OK" || echo "Connection is not working"
```

Debug container
```bash
docker ps
docker exec -ti `container-id` /bin/bash # Enter the container
docker logs --tail 500 --follow --timestamps `container-id` # Display container logs
```

Recreate database
```bash
docker compose exec php bin/console doctrine:database:drop --force --if-exists
docker compose exec php bin/console doctrine:database:create --if-not-exists
docker compose exec php bin/console doctrine:schema:update --force --complete
docker compose exec php bin/console doctrine:schema:validate
docker compose exec php bin/console doctrine:fixtures:load -n
```

Test app
```bash
docker compose exec php composer test
```

To add a package available for the version of php configured for the docker container (and not your host)
```bash
docker compose exec php composer require `package-name`
```

Browse `https://localhost`
