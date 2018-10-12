class RenameTypeColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :orders, :type, :order_type
  end
end
