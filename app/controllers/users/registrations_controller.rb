# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def update_profile
      if current_user.update_with_password(sign_up_params)
        bypass_sign_in(current_user)
        render json: { message: 'Password updated successfully.' }, status: :ok
      else
        render json: { error: current_user.errors.full_messages.to_sentence }, status: :unprocessable_entity
      end
    end

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
      params.require(:user).permit(:email, :password, :password_confirmation, :avatar, :current_password)
    end
  end
end
