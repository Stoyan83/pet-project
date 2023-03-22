class Project < ApplicationRecord
  belongs_to :user
  has_many  :tasks, dependent: :destroy
  
  enum project_type: {undefined: 0, kanban: 1, scrum: 2 }

  validates :project_type, presence: true
end
