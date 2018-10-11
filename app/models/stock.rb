class Stock < ApplicationRecord
    belongs_to :athlete
    has_many :orders
end
