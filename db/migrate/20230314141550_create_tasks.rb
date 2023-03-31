# frozen_string_literal: true

class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.integer :status
      t.string :description
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
