module Api::V1
  class TeamsController < ApplicationController
    include MessageRenderHelper

    before_action :authenticate_user!
    before_action :set_team, only: %i[ show update destroy ]
 
    def index
      @teams = Team.where(id: current_user.team_id)
      render json: @teams
    end

    def show
      render json: @team
    end

    # def create
    #   @project = @team.projects.create!(project_params)

    #   return errors @project.errors unless @project.save
    #   success(V1::ProjectBlueprint.render_as_hash(@project, view: :show))
    # end

    # def update
    #   @project.update(project_params)
      
    #   return errors @project.errors unless @project.save
    #   success(V1::ProjectBlueprint.render(@project, view: :show))
    # end


    # def destroy
    #   @project.destroy
    # end

    private
    
    def set_team
      @team = Team.find(params[:id])
    end
  end
end
