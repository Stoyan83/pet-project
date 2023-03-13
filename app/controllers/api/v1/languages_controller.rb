module Api
  module V1
    class LanguagesController < ApplicationController
      before_action :set_language, only: %i[ show update destroy ]
      before_action :authenticate_user!
      # GET /programming_languages
      def index
        @languages = Language.all

        render json: @languages
      end

      # GET /programming_languages/1
      def show
        render json: @language
      end

      # POST /programming_languages
      def create
        @language = current_user.languages.create!(language_params)
 

      #   if @programming_language.save
      #     render json: @programming_language, status: :created, location: @programming_language
      #   else
      #     render json: @programming_language.errors, status: :unprocessable_entity
      #   end
      end

      # PATCH/PUT /programming_languages/1
      def update
        if @planguage.update(language_params)
          render json: @language
        else
          render json: @language.errors, status: :unprocessable_entity
        end
      end

      # DELETE /programming_languages/1
      def destroy
        @language.destroy
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_language
          @language = Language.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def language_params
          params.require(:language).permit(:language_type, :description)
        end
    end
  end
end