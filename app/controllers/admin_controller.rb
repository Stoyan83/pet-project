# frozen_string_literal: true

class AdminController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  before_action :authenticate_admin, except: [:index]
  before_action :set_user, except: [:index]

  def index
    @users = User.all.order(:email)
    render json: {
      user: @users
    }
  end

  def create_user
    @user = User.create!(user_params)
    render json: {
      message: 'Created',
      user: User.last
    }, status: :created
  end

  def update_user
    @user.update!(user_params)
    render json: {
      message: 'Updates',
      user: @user
    }, status: :created
  end

  private

  def authenticate_admin
    render status: :unauthorized, json: { error: "Only Admin can create users" } unless current_user.admin?
  end

  def user_params
    permited_params = %i[email password password_confirmation]
    permited_params += %i[role team_id] if current_user.admin?
    params.require(:user).permit(*permited_params)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
