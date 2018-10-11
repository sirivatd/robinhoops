class Athlete < ApplicationRecord
    has_one :stock
    has_many :tweets
end
