# frozen_string_literal: true

class AddTasksToProject < ActiveRecord::Migration[7.0]
  def change
    add_reference :tasks, :project, foreign_key: true
  end
end
