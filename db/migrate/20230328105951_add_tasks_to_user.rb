# frozen_string_literal: true

class AddTasksToUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :tasks, :user, index: true, foreign_key: true
  end
end
