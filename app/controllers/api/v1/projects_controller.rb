module Api::V1
  class ProjectsController < ApplicationController
    include MessageRenderable

    before_action :set_project, only: %i[ show update destroy ]
    before_action :authenticate_user!
 
    def index
      @projects = current_user.projects.order(created_at: :asc)
      projects_count = current_user.projects.size

      
      success(V1::ProjectBlueprint.render_as_hash(@projects, view: :show))
      # success_with_meta(V1::ProjectBlueprint.render_as_hash(@projects, view: :index), meta: {total: projects_count, link: api_v1_projects_url} )
    end

    def show
      return errors("Project not found") unless @project

      success(V1::ProjectBlueprint.render_as_hash(@project, view: :show))
    end

    def create
      @project = current_user.projects.create(project_params)

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
      params.require(:project).permit(:project_type, :description, :id)
    end
  end
end
