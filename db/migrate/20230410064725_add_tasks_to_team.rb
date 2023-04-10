# frozen_string_literal: true

class AddTasksToTeam < ActiveRecord::Migration[7.0]
  def change
    add_reference :tasks, :team, foreign_key: true
  end
end
