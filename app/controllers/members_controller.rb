# frozen_string_literal: true

class MembersController < ApplicationController
  before_action :authenticate_user!

  def show
    user = get_user_from_token
    render json: {
      message: "You're log in!",
      user:
    }
  end

  def avatar
    render json: {
      image_url: url_for(current_user.avatar)
    }
  end

  private

  def get_user_from_token
    jwt_payload = JWT.decode(request.headers['Authorization'].split[1],
                             Rails.application.credentials.fetch(:secret_key_base)).first
    user_id = jwt_payload['sub']
    User.find(user_id.to_s)
  end
end
