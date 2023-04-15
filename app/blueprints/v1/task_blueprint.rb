# frozen_string_literal: true

module V1
  class TaskBlueprint < Blueprinter::Base
    view :show do
      fields :status, :description, :id, :user_id, :assignee_id, :list_id
    end

    view :index do
      include_view :show
    end
  end
end
