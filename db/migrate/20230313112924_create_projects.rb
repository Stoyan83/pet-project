class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.integer :project_type
      t.string :description
      t.references :user

      t.timestamps
    end
  end
end
