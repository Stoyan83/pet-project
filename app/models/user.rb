# frozen_string_literal: true

class User < ApplicationRecord
  after_create :attach_default_avatar
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  belongs_to :team, optional: true
  has_many :tasks
  has_one_attached :avatar

  enum role: { user: 0, admin: 1, project_manager: 2 }

  validates :password, presence: true, length: { minimum: 6 }

  private

  def attach_default_avatar
    avatar.attach(io: File.open('public/default_images/avatar.png'), filename: 'avatar.jpg', content_type: 'image/png')
  end
end
