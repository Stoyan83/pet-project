# frozen_string_literal: true

module Api::V1
  class TeamsController < ApplicationController
    include MessageRenderHelper

    before_action :authenticate_user!
    before_action :set_team, only: %i[show update destroy]
    before_action :authenticate_access, only: %i[create update destroy]

    def index
      @teams = Team.where(id: current_user.team_id)
      render json: @teams
    end

    def show
      render json: @team
    end

    def create
      @team = Team.create!(team_params)
      render json: @team
    end

    private

    def set_team
      @team = Team.find(params[:id])
    end

    def team_params
      params.require(:team).permit(:name)
    end

    def authenticate_access
      return if current_user.admin? || current_user.project_manager?

      render status: :unauthorized, \
             json: { error: "You don't have access to creating teams! Contact your local support." }
    end
  end
end
