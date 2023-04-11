# frozen_string_literal: true

class Project < ApplicationRecord
  belongs_to :team
  has_many :tasks, dependent: :destroy
  has_many :lists, dependent: :destroy

  enum project_type: { undefined: 0, kanban: 1, scrum: 2 }

  validates :project_type, presence: true
end
