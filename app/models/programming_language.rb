class ProgrammingLanguage < ApplicationRecord

  has_many :user_programming_languages, dependent: :destroy        
  has_many :users, through: :user_programming_languages
end
