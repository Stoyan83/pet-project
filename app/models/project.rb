class Project < ApplicationRecord

  belongs_to :user
  
  validates :project_type, presence: true

  enum project_type: {undefined: 0, kanban: 1, scrum: 2 }
end
