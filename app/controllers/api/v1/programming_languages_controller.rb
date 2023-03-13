module Api
  module V1
    class ProgrammingLanguagesController < ApplicationController
      before_action :set_programming_language, only: %i[ show update destroy ]

      # GET /programming_languages
      def index
        @programming_languages = ProgrammingLanguage.all

        render json: @programming_languages
      end

      # GET /programming_languages/1
      def show
        render json: @programming_language
      end

      # POST /programming_languages
      def create
        @programming_language = ProgrammingLanguage.create!(programming_language_params)

        # if @programming_language.save
          
        #   render json: @programming_language, status: :created, location: @programming_language,
        #   location: url_for([:api, :v1, @programming_language])
        # else
        #   render json: @programming_language.errors, status: :unprocessable_entity,
        #   location: url_for([:api, :v1, @programming_language])
        # end
      end

      # PATCH/PUT /programming_languages/1
      def update
        if @programming_language.update(programming_language_params)
          render json: @programming_language,
          location: url_for([:api, :v1, @programming_language])
        else
          render json: @programming_language.errors, status: :unprocessable_entity,
          location: url_for([:api, :v1, @programming_language])
        end
      end

      # DELETE /programming_languages/1
      def destroy
        @programming_language.destroy
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_programming_language
          @programming_language = ProgrammingLanguage.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def programming_language_params
          params.require(:programming_language).permit(:language_type, :description)
        end
    end
  end
end
