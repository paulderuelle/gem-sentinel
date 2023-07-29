class AddDocumentationPageUrlToGemReleases < ActiveRecord::Migration[7.0]
  def change
    add_column :gem_releases, :documentation_page_url, :string
  end
end
