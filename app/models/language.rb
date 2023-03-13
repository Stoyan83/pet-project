class Language < ApplicationRecord

  has_and_belongs_to_many :users

  # validates :language_type, presence: true
end
