require 'sass'

namespace :css do
  desc 'minify css files'
  task :minify do
    ['media/application.css', 'media/foundation.css'].each do |filename|
      File.open filename.gsub(/\.css/, '.min.css'), File::CREAT|File::TRUNC|File::RDWR do |f|
        engine = Sass::Engine.new(File.read(filename), syntax: :scss, style: :compressed)
        f.puts engine.render
      end
    end
  end
end
