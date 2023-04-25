# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    include Authenticatable

    before_action :get_user_from_token

    def change_password
      @user = get_user_from_token
      self.resource = resource_class.find(@user.id)
      if resource.update_with_password(password_params)
        sign_in(resource_name, resource, bypass: true)
        render json: { message: 'Password updated successfully' }
      else
        render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def password_params
      params.require(:user).permit(:current_password, :password, :password_confirmation)
    end
  end
end
