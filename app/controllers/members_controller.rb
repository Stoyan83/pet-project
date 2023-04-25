# frozen_string_literal: true

class MembersController < ApplicationController
  include Authenticatable

  before_action :authenticate_user!
  before_action :get_user_from_token

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
end
