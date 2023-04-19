# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :user
  belongs_to :assignee, class_name: 'User', optional: true
  belongs_to :team, optional: true
  belongs_to :project, optional: true
  belongs_to :list, optional: true

  before_validation :set_list_id, on: %i[create update]

  enum status: { to_do: 0, in_progress: 1, in_qa: 2, done: 3 }

  scope :sorted, -> { order(position: :asc) }

  validates :description, presence: true

  private

  def set_list_id
    return unless project.present? && list_id.nil?

    self.list_id = project.lists.second&.id
  end
end
