class Project < ApplicationRecord

  belongs_to :user
  
  validates :project_type, presence: true
end
