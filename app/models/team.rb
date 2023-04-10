# frozen_string_literal: true

class Team < ApplicationRecord
  has_many :users
  has_many :projects
  has_many :tasks
end
