class CreateLanguages < ActiveRecord::Migration[7.0]
  def change
    create_table :languages do |t|
      t.integer :language_type
      t.string :description

      t.timestamps
    end
  end
end
