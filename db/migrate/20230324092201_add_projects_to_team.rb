# frozen_string_literal: true

class AddProjectsToTeam < ActiveRecord::Migration[7.0]
  def change
    add_reference :projects, :team, index: true, foreign_key: true
  end
end
