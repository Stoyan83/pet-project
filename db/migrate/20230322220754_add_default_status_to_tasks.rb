# frozen_string_literal: true

class AddDefaultStatusToTasks < ActiveRecord::Migration[7.0]
  def change
    change_column :tasks, :status, :integer, default: 0
  end
end
