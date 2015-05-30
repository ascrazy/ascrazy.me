# !/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive
export APP_ROOT=/vagrant
export H2O_VERSION=1.2.0

apt-get update
wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
add-apt-repository "deb https://deb.nodesource.com/node_0.12 vivid main"
apt-get update

apt-get install -y vim tmux jq git cmake build-essential nodejs

wget -qO- "https://github.com/h2o/h2o/archive/v$H2O_VERSION.tar.gz" | tar xvz -C /srv
cd "/srv/h2o-$H2O_VERSION" && cmake -DWITH_BUNDLED_SSL=on . && make all install && cd -

cd $APP_ROOT && npm install
