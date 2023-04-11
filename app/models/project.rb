# frozen_string_literal: true

class Project < ApplicationRecord
  LISTS_NUM = 4
  NAMES = ["Backlog", "In Progress", "In QA", "Done"].freeze

  belongs_to :team
  has_many :tasks, dependent: :destroy
  has_many :lists, dependent: :destroy

  after_create :create_lists

  enum project_type: { undefined: 0, kanban: 1, scrum: 2 }

  validates :project_type, presence: true

  private

  def create_lists
    LISTS_NUM.times do |i|
      List.create!(name: NAMES[i], position: i, project_id: id)
    end
  end
end
