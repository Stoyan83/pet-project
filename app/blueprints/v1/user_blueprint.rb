module V1
  class UserBlueprint < Blueprinter::Base
    view :show do
      field :projects_count
    end

  end
end