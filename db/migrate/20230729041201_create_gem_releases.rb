class CreateGemReleases < ActiveRecord::Migration[7.0]
  def change
    create_table :gem_releases do |t|
      t.string :version
      t.string :changelog_page_url
      t.references :master_gem, null: false, foreign_key: true

      t.timestamps
    end
  end
end
