# frozen_string_literal: true

class RemoveProjectFromTask < ActiveRecord::Migration[7.0]
  def change
    remove_reference :tasks, :project, null: false, foreign_key: true
  end
end
