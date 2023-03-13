module Api::V1
  class ProjectsController < ApplicationController
    before_action :set_project, only: %i[ show update destroy ]
    before_action :authenticate_user!

    def index
      @projects = Project.all.order(created_at: :desc)

      success(V1::ProjectBlueprint.render_as_hash(@projects, view: :index))
    end


    def show
      return errors("Project not found") unless @project

      success(V1::ProjectBlueprint.render(@project, view: :show))
    end

    def create
      @project = current_user.projects.create(project_params)

      return errors @project.errors unless @project.save
      success(V1::ProjectBlueprint.render(@project, view: :show))
    
    end

    def update
      if @pproject.update(project_params)
        render json: @project
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end


    def destroy
      @project.destroy
    end

    private
    
    def set_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.require(:project).permit(:project_type, :description)
    end
  end
end
