class CreateMasterGems < ActiveRecord::Migration[7.0]
  def change
    create_table :master_gems do |t|
      t.string :name
      t.string :rubygems_page_url

      t.timestamps
    end
  end
end
