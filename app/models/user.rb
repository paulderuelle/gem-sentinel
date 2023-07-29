class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :projects
  has_many :project_gemfiles, through: :projects
  has_many :project_gems, through: :project_gemfiles

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  validates :mail_address, presence: true, uniqueness: true
end
