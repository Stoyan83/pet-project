class Task < ApplicationRecord
  belongs_to :project
  
  enum status: {to_do: 0, in_progress: 1, in_qa: 2 , done: 3}

  validates :status, presence: true
end
