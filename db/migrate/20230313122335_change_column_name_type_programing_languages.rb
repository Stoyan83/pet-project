class ChangeColumnNameTypeProgramingLanguages < ActiveRecord::Migration[7.0]
  def change
    rename_column :programming_languages, :type, :language_type
  end
end
