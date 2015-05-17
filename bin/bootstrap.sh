# !/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive
export APP_ROOT=/vagrant

sudo apt-get update
wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
sudo add-apt-repository "deb https://deb.nodesource.com/node_0.12 vivid main"
sudo apt-get update

sudo apt-get install -y vim tmux jq git
sudo apt-get install -y nodejs nginx

# cd $APP_ROOT && npm install
