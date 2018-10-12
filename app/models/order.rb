class Order < ApplicationRecord
    belongs_to :stock

    belongs_to :user

    has_one :athlete,
    through: :stock,
    source: :athlete

end
