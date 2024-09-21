FROM serversideup/php:8.2-fpm-nginx-v3.3.0 AS base
WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-plugins --no-scripts --prefer-dist

USER root

RUN apt-get update && \
    apt-get install -y htop jq lsof sqlite3 vim && \
    apt-get -y autoremove && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# RUN sed -iE "s/;user .*/user = www-data/" /usr/local/etc/php-fpm.d/docker-php-serversideup-pool.conf && \
#     sed -iE "s/;group .*/group = www-data/" /usr/local/etc/php-fpm.d/docker-php-serversideup-pool.conf

RUN echo "user = www-data" >> /usr/local/etc/php-fpm.d/docker-php-serversideup-pool.conf && \
    echo "group = www-data" >> /usr/local/etc/php-fpm.d/docker-php-serversideup-pool.conf

COPY --chmod=755 scripts/nginx/ /etc/nginx/
COPY --chmod=755 scripts/s6-overlay/ /etc/s6-overlay/s6-rc.d/

FROM node:20 AS static-assets
WORKDIR /app
COPY . .
COPY --from=base /var/www/html .
RUN npm ci && npm run build

FROM base

WORKDIR /var/www/html

COPY --from=base /var/www/html .
COPY --from=static-assets /app/public/build ./public/build
COPY . .

RUN composer dump-autoload && \
    chown -R www-data:www-data .

ENV PHP_OPCACHE_ENABLE=1 \
    AUTORUN_ENABLED=true \
    AUTORUN_LARAVEL_MIGRATION_ISOLATION=true \
    AUTORUN_LARAVEL_STORAGE_LINK=false

# USER www-data
