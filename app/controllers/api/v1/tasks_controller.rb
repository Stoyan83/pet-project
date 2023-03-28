module Api::V1
  class TasksController < ApplicationController
    before_action :authenticate_user!

    def create
      @task = current_user.tasks.create!(tasks_params)
      # render json: @task.user.email
      render json: @task
    end

    private 


    def tasks_params
      params.require(:task).permit(:status, :description, :assignee_id)
    end
  end
end