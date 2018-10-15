namespace :athletes do
  desc "TODO"
  task updateAthletes: :environment do
    puts "Updating athletes"
    Athlete.all.each do |athlete|
      athlete.update_price()
    end
    puts "#{Time.now} - Success!"
  end

end
