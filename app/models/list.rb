# frozen_string_literal: true

class List < ApplicationRecord
  acts_as_list

  belongs_to :project
  has_many :tasks

  scope :sorted, -> { order(position: :asc) }

  validates :name, presence: true
end
