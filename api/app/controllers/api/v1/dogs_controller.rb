module Api
  module V1
    class DogsController < ApplicationController
      def index
        render json: Dog.all.to_json
      end
    end
  end
end
