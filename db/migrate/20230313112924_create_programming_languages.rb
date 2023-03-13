class CreateProgrammingLanguages < ActiveRecord::Migration[7.0]
  def change
    create_table :programming_languages do |t|
      t.integer :type
      t.string :description

      t.timestamps
    end
  end
end
