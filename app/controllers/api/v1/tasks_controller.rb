module Api::V1
  class TasksController < ApplicationController
    before_action :authenticate_user!
    before_action :set_task, only: %i[ show update destroy ]

    def show
      render json: @task
    end

    def index
      @tasks = Task.all

      render json: @tasks
    end

    def assigned
      @tasks = Task.all.where(assignee_id: current_user.id)

      render json: @tasks
    end

    def created
      @tasks = current_user.tasks
      
      render json: @tasks
    end

    def create
      @task = current_user.tasks.create!(tasks_params)
      render json: @task.assignee.email
      # render json: @task
    end

    private 

    def tasks_params
      params.require(:task).permit(:status, :description, :assignee_id)
    end

    def set_task
      @task = Task.find(params[:id])
    end
  end
end