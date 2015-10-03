VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = 'ubuntu/vivid64'

  config.vm.provider 'virtualbox' do |v|
    v.memory = 2048
    v.cpus = 1
  end

  config.vm.network 'forwarded_port', guest: 3000,  host: 3000

  config.ssh.forward_agent = true

  config.vm.provision :file, source: '~/.gitconfig', destination: '~/.gitconfig'
  config.vm.provision :shell, path: 'bin/install-deps.sh', privileged: true
end
