# frozen_string_literal: true

module V1
  class UserBlueprint < Blueprinter::Base
    fields :email, :id
  end
end
