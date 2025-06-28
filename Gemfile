source "https://rubygems.org"
# Use GitHub Pages gem for compatibility
# Remove or comment out the direct Jekyll gem line
# gem "jekyll", "~> 4.4.1"

group :jekyll_plugins do
  gem "github-pages"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
