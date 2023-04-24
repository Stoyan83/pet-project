# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    private

    def respond_with(resource, _opts = {})
      register_success && return if resource.persisted?

      register_failed
    end

    def register_success
      render json: {
        message: 'Signed up sucessfully.',
        user: current_user
      }, status: :ok
    end

    def register_failed
      render json: { error: resource.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation, :avatar)
    end
  end
end
