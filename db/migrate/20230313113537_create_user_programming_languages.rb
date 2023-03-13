class CreateUserProgrammingLanguages < ActiveRecord::Migration[7.0]
  def change
    create_table :user_programming_languages do |t|
      t.references :user, null: false, foreign_key: true
      t.references :programming_language, null: false, foreign_key: true

      t.timestamps
    end
  end
end
