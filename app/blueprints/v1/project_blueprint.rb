module V1
  class ProjectBlueprint < Blueprinter::Base
    view :show do
      fields :project_type, :description
    end

    view :index do
      include_view :show
    end
  end
end