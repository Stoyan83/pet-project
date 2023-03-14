class Project < ApplicationRecord

  belongs_to :user, dependent: :destroy
  
  validates :project_type, presence: true
end
