#!/usr/bin/env bash

export DEBIAN_FRONTEND="noninteractive"

wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
echo 'deb https://deb.nodesource.com/node_4.x vivid main' >> /etc/apt/sources.list.d/nodesource.list

apt-get update
apt-get install -y nodejs
apt-get install -y vim tmux jq git
