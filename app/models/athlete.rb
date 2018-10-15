class Athlete < ApplicationRecord
    has_one :stock
    has_many :tweets

   def say_hello
    print(self.name)
end

end
