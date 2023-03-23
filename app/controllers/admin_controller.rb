class AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin!

  def create_user
    @user = User.create!(user_params) 
    render json: {
            message: 'Created.',
            user: User.last,
            current: current_user
          }, status: :created
    end
  private   

  def authenticate_admin!
    render status: 401, json: {:error => "Only Admin can create users"} unless current_user.admin? 
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end