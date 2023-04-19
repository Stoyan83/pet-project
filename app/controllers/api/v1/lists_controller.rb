# frozen_string_literal: true

module Api::V1
  class ListsController < ApplicationController
    include MessageRenderHelper

    before_action :set_list, only: %i[show update destroy]
    before_action :set_project

    def index
      @lists = @project.lists.sorted

      render json: @lists
    end

    # GET /lists/1
    def show
      render json: @list
    end

    # POST /lists
    def create
      @list = @project.lists.create!(list_params)
    end

    # PATCH/PUT /lists/1
    def update
      if @list.update(list_params)
        render json: @list
      else
        render json: @list.errors, status: :unprocessable_entity
      end
    end

    # DELETE /lists/1
    def destroy
      @list.destroy
    end

    private

    def set_list
      @list = List.find(params[:id])
    end

    def set_project
      @project = Project.find(params[:project_id])
    end

    def list_params
      params.require(:list).permit(:name, :position, :project_id)
    end
  end
end
