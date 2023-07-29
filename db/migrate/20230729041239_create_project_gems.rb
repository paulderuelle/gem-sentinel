class CreateProjectGems < ActiveRecord::Migration[7.0]
  def change
    create_table :project_gems do |t|
      t.references :project_gemfile, null: false, foreign_key: true
      t.references :master_gem, null: false, foreign_key: true
      t.references :gem_release, null: false, foreign_key: true

      t.timestamps
    end
  end
end
