VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 1
  end

  config.vm.box = "ubuntu/vivid64"

  config.vm.network :forwarded_port, host: 8080, guest: 8080
  config.vm.network :forwarded_port, host: 35729, guest: 35729

  config.ssh.forward_agent = true

  config.vm.provision :file, source: '~/.gitconfig', destination: '~/.gitconfig'
  config.vm.provision :shell, path: 'bin/bootstrap.sh'
end
