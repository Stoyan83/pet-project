# frozen_string_literal: true

class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.integer :project_type
      t.string :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
