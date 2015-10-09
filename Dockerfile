FROM alpine:latest

ENV H2O_VERSION="1.5.0"
RUN apk add --update build-base cmake zlib zlib-dev openssl openssl-dev \
  && wget "https://github.com/h2o/h2o/archive/v$H2O_VERSION.tar.gz" -O - | tar -xz -C /tmp \
  && cd "/tmp/h2o-$H2O_VERSION" \
  && cmake . \
  && make \
  && make install  \
  && cd - \
  && rm -rf "/tmp/h2o-$H2O_VERSION" \
  && apk del --update build-base cmake zlib-dev openssl-dev \
  && rm -rf /var/cache/apk/*
RUN mkdir -p /opt/app/dist
WORKDIR /opt/app
ADD /dist ./dist
ADD /h2o.conf ./h2o.conf
CMD [ "/usr/local/bin/h2o", "-c", "./h2o.conf" ]
