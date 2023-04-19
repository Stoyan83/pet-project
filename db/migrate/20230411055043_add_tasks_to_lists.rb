# frozen_string_literal: true

class AddTasksToLists < ActiveRecord::Migration[7.0]
  def change
    add_reference :tasks, :list, foreign_key: true
    add_column :tasks, :position, :integer
  end
end
