namespace :stocks do
  desc "TODO"
  task updatePrice: :environment do
    Stock.all.each do |stock|
      Stock.update_price(stock)
    end
  end

end
