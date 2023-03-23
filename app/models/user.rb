class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
          :jwt_authenticatable,
          jwt_revocation_strategy: JwtDenylist

  has_many :projects, dependent: :destroy 

  enum role: {user: 0, admin: 1}
end
