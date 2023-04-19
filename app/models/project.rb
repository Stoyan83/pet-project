# frozen_string_literal: true

class Project < ApplicationRecord
  NAMES = ["Done", "Backlog", "In Progress", "In QA"].freeze

  belongs_to :team
  has_many :tasks, dependent: :destroy
  has_many :lists, dependent: :destroy

  after_create :create_lists

  enum project_type: { undefined: 0, kanban: 1, scrum: 2 }

  validates :project_type, presence: true

  private

  def create_lists
    NAMES.each_with_index do |name, index|
      List.create!(name:, position: index, project_id: id)
    end
  end
end
