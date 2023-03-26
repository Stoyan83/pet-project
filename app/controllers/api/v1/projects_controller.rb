module Api::V1
  class ProjectsController < ApplicationController
    include MessageRenderHelper

    before_action :set_project, only: %i[ show update destroy ]
    before_action :authenticate_user!
    before_action :set_team
 
    def index
      @projects = @team.projects.all
      projects_count = 1
      success_with_meta(V1::ProjectBlueprint.render_as_hash(@projects, view: :index), meta: {total: projects_count, link: api_v1_team_projects_url} )
    end

    def show
      return errors("Project not found") unless @project

      success(V1::ProjectBlueprint.render_as_hash(@project, view: :show))
    end

    def create
      @project = @team.projects.create!(project_params)

      return errors @project.errors unless @project.save
      success(V1::ProjectBlueprint.render_as_hash(@project, view: :show))
    end

    def update
      @project.update(project_params)
      
      return errors @project.errors unless @project.save
      success(V1::ProjectBlueprint.render(@project, view: :show))
    end


    def destroy
      @project.destroy
    end

    private
    
    def set_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.require(:project).permit(:project_type, :description, :team_id)
    end

    def set_team
      @team = Team.find_by(id: current_user.team_id)
    end
  end
end
