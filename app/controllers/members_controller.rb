class MembersController < ApplicationController
  before_action :authenticate_user!

  def show
    user = get_user_from_token
    render json: {
      message: "You're log in!",
      user: user
    }
  end

  def create_user
    if current_user.admin?
      @user = User.create!(user_params) 

      render json: {
        message: 'Created.',
        user: User.last
      }, status: :created
      else
        render json: {
          message: 'Only Admin can create users.',
        }, status: :unauthorized
    end
  end

  private

  def get_user_from_token
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],
                             Rails.application.credentials.fetch(:secret_key_base)).first
    user_id = jwt_payload['sub']
    User.find(user_id.to_s)
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end