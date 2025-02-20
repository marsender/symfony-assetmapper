# symfony-assetmapper

![CI](https://github.com/marsender/symfony-assetmapper/workflows/CI/badge.svg)

This project is a starter webapp with Symfony 7 assetmapper, Tailwind and Sass (no Node required!).
It also contains a Docker github CI.

References:

- [Symfony AssetMapper doc](https://symfony.com/doc/current/frontend/asset_mapper.html)
- [Upgrading Symfony Websites to AssetMapper](https://symfony.com/blog/upgrading-symfony-websites-to-assetmapper)
- [Tailwind CSS bundle for Symfony](https://symfony.com/bundles/TailwindBundle/current/index.html)
- [Sass bundle for Symfony](https://symfony.com/bundles/SassBundle/current/index.html)
- [Symfony Docker](https://github.com/dunglas/symfony-docker)

## Requirements

This project require the following to get started:
- PHP 8.2

## Install

Clone [Symfony assetmapper repository](https://github.com/marsender/symfony-assetmapper)
```bash
git clone https://github.com/marsender/symfony-assetmapper.git
cd symfony-assetmapper
```

Install php dependencies
```bash
composer install
sudo chown -R www-data:$USER var
```

Build for production
```bash
composer cache-clear
bin/console tailwind:build --minify # or --watch
bin/console sass:build # --watch
rm -rf public/assets
bin/console asset-map:compile
```

Run app
```bash
symfony serve
```

Open the app in your browser http://127.0.0.1:8000/


# Delopper instructions

Add or remove importmaps
```bash
cat importmap.php
bin/console importmap:require packagename
bin/console importmap:remove packagename
```

Debugging
```bash
# Seeing All Mapped Assets
bin/console debug:asset-map --full
bin/console debug:config symfonycasts_tailwind
```

Update importmap packages
```bash
# List outedated packages
bin/console importmap:outdated
# Update oudated packages
bin/console importmap:update # add packagename to update only one package
```

Reinstall importmap vendor modules if needed
```bash
rm -rf assets/vendor/
bin/console importmap:install
bin/console assets:install public
```

Install ES Module Shims for older browsers compatibility
```bash
bin/console importmap:require es-module-shims
```

Watch for changes to your assets and twig files and automatically recompile tailwind css it when needed
```bash
bin/console tailwind:build --watch
```

## Memo to add asset mapper and Sass to an existing project

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

## Memo to add Symfony Docker templates to an existing project

If not already done, [install Docker Compose](https://docs.docker.com/compose/install/)

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

Comment out the dbname suffix for test database in `config/packages/doctrine.yaml`
```yaml
#dbname_suffix: '_test%env(default::TEST_TOKEN)%'
```

Re-execute the recipes to update the Docker-related files according to the packages you use
```bash
rm symfony.lock
composer symfony:sync-recipes --force --verbose
```

Build the docker images
```bash
docker compose build --no-cache
```

Start the docker container
```bash
HTTP_PORT=8000 \
HTTPS_PORT=4443 \
HTTP3_PORT=4443 \
docker compose up --pull always -d --wait
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

Debug php container
```bash
docker compose exec php php --version
docker compose exec -ti php /bin/bash
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

Browse `https//localhost:4443`

Stop the docker container
```bash
docker compose down --remove-orphans
sudo rm -rf ./docker # To remove application database
```
