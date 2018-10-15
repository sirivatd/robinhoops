class Athlete < ApplicationRecord
    has_one :stock
    has_many :tweets

   def update_price
    print("Updating")
    end

end
