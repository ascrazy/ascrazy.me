FROM ubuntu:trusty

ENV DEBIAN_FRONTEND="noninteractive"
ENV APP_ROOT="/opt/homepage"

RUN mkdir -p $APP_ROOT
WORKDIR $APP_ROOT

RUN apt-get update && \
    apt-get install -y openssl ca-certificates apt-transport-https curl --no-install-recommends && \
    apt-get install -y make jq git --no-install-recommends && \
    apt-get install -y build-essential zlib1g-dev libpq-dev libsqlite3-dev --no-install-recommends && \
    rm -rf /var/cache/apt/*

RUN curl -sL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    echo 'deb https://deb.nodesource.com/node_5.x trusty main' >> /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y nodejs python --no-install-recommends && \
    rm -rf /var/cache/apt/*

  # apt-key adv --keyserver keys.gnupg.net --recv-keys 68576280 && \
