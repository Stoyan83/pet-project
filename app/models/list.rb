# frozen_string_literal: true

class List < ApplicationRecord
  belongs_to :project, optional: true
end
