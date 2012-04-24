require 'cssmin'

namespace :css do
  desc 'minify css files'
  task :minify do
    ['media/application.css', 'media/foundation.css'].each do |filename|
      File.open filename.gsub(/\.css/, '.min.css'), File::CREAT|File::TRUNC|File::RDWR do |f|
        f.puts CSSMin.minify File.read filename
      end
    end
  end
end
