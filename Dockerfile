# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
FROM ruby:3.3.3

# Rails app lives here
WORKDIR /app

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install -y build-essential git g++ make libpq-dev

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install 

# Copy application code
COPY . .



