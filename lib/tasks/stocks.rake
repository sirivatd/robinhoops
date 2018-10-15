namespace :stocks do
  desc "TODO"
  task updatePrice: :environment do
    Stock.all.each do |stock|
      stock.update_price()
    end
  end

end
