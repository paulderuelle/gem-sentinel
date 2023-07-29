class CreateProjectGemfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :project_gemfiles do |t|
      t.text :content
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
