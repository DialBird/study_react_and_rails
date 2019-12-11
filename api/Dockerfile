FROM ruby:2.6.1

WORKDIR /root/api

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get update \
  && apt-get -y install nodejs \
                        postgresql-client \
                        vim git curl less ctags unzip \
                        locales locales-all \
                        silversearcher-ag \
                        --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
