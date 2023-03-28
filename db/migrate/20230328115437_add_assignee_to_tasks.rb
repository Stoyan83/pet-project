class AddAssigneeToTasks < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :assignee_id, :bigint, references: "users", foreign_key: true
  end
end
