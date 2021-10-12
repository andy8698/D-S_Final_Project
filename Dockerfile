FROM php:7.4-apache

LABEL maintainer="Seung Ho Hyun"

RUN docker-php-ext-install pdo_mysql

COPY app /srv/app

COPY docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf

#PHP configuration
COPY docker/php/php.ini /usr/local/etc/php/php.ini

WORKDIR /srv/app