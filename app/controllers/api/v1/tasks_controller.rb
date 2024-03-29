# frozen_string_literal: true

module Api::V1
  class TasksController < ApplicationController
    include MessageRenderHelper

    before_action :authenticate_user!
    before_action :set_task, only: %i[show update destroy]
    before_action :set_project, only: %i[project_tasks]

    def show
      return errors("Task not found") unless @task

      success(V1::TaskBlueprint.render_as_hash(@task, view: :show))
    end

    def index
      @tasks = Task.all.sorted
      @task_count = @tasks.size
      success_with_meta(V1::TaskBlueprint.render_as_hash(@tasks, view: :index), meta: { total: @task_count, link: api_v1_tasks_url })
    end

    def team_tasks
      if current_user.team_id.present?
        @tasks = Task.where(team_id: current_user.team_id, list_id: nil).sorted
        @task_count = @tasks.size
        success_with_meta(V1::TaskBlueprint.render_as_hash(@tasks, view: :index), meta: { total: @task_count, link: api_v1_tasks_url })
      else
        error_response("User does not belong to a team", 401)
      end
    end

    def project_tasks
      @tasks = Task.where(project_id: @project.id).sorted
      @task_count = @tasks.size
      success_with_meta(V1::TaskBlueprint.render_as_hash(@tasks, view: :index), meta: { total: @task_count, link: api_v1_tasks_url })
    end

    def assigned
      @tasks = Task.where(assignee_id: current_user.id)
      @task_count = @tasks.size
      success_with_meta(V1::TaskBlueprint.render_as_hash(@tasks, view: :index), meta: { total: @task_count, link: assigned_api_v1_tasks_url })
    end

    def creator
      @tasks = current_user.tasks
      @task_count = @tasks.size
      success_with_meta(V1::TaskBlueprint.render_as_hash(@tasks, view: :index), meta: { total: @task_count, link: creator_api_v1_tasks_url })
    end

    def create
      @task = current_user.tasks.create!(tasks_params)
      return errors @task.errors unless @task.save

      success(V1::TaskBlueprint.render_as_hash(@task, view: :show))
    end

    def update
      @task.update!(tasks_params)
      return errors @task.errors unless @task.save

      success(V1::TaskBlueprint.render_as_hash(@task, view: :show))
    end

    def update_tasks
      params[:tasks].each do |task_params|
        task = Task.find(task_params[:id])
        task.update(position: task_params[:position])
      end
    end

    def destroy
      @task.destroy
    end

    private

    def tasks_params
      params.require(:task).permit(:status, :description, :assignee_id, :team_id, :project_id, :list_id, :id, :position)
    end

    def set_task
      @task = Task.eager_load(:user).find(params[:id])
    end

    def set_project
      @project = Project.find(params[:id])
    end
  end
end
