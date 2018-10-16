class Athlete < ApplicationRecord
    has_one :stock
    has_many :tweets

   def update_price
    print("Updating")
    end

    def random_num
        return rand(1000-10) + 10
    end
end
