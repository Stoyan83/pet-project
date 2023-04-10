# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :user
  belongs_to :assignee, class_name: 'User', optional: true
  belongs_to :team, optional: true
  belongs_to :project, optional: true

  enum status: { to_do: 0, in_progress: 1, in_qa: 2, done: 3 }

  validates :status, :description, presence: true
end
