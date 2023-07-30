class ProjectManagementService
    def self.create_with_gemfile(project_params, project_gemfile_params, current_user)
        project = Project.new(project_params)
        project.user = current_user
        if project.save
            # If project is saved, we can create the associate gemfile with content (return of 'bundle list')
            gemfile = create_gemfile_for_project(project, project_gemfile_params)
            # And the ProjectGems associated too
            create_project_gems_for_gemfile(gemfile, project_gemfile_params)
        end
        project
    end
    def self.update_with_gemfile(project, project_gemfile_params)
        # update the content of the gemfile
        project.project_gemfile.update(project_gemfile_params)
        # parse the new content
        parsed_content_with_gems_infos = parse_gems_from_content(project_gemfile_params[:content])
        parsed_content_with_gems_infos.each do |gem_name, gem_version|
            master_gem = MasterGem.find_by(name: gem_name)
            # if the gem does not exist in the MasterGem, something is wrong
            unless master_gem
                raise StandardError, "MasterGem not found: #{gem_name}"
            end
            # find or create a GemRelease with this version
            gem_release = GemRelease.find_by(master_gem_id: master_gem.id, version: gem_version)
            unless gem_release
                gem_release = GemRelease.create!(master_gem_id: master_gem.id, version: gem_version)
            end
            # find the ProjectGem for this MasterGem and project's Gemfile
            project_gem = ProjectGem.find_by(project_gemfile_id: project.project_gemfile.id, master_gem_id: master_gem.id)
            if project_gem
                # if it exists, update the GemRelease
                project_gem.update(gem_release_id: gem_release.id)
            else
                # if it does not exist, create it
                ProjectGem.create!(project_gemfile_id: project.project_gemfile.id, master_gem_id: master_gem.id, gem_release_id: gem_release.id)
            end
        end
    end
    private
    def self.create_gemfile_for_project(project, project_gemfile_params)
        gemfile = ProjectGemfile.new(project_gemfile_params)
        gemfile.project = project
        gemfile.save
        gemfile
    end
    def self.create_project_gems_for_gemfile(gemfile, project_gemfile_params)
        # Here we have a dictionary with name and version of each gems
        parsed_content_with_gems_infos = parse_gems_from_content(project_gemfile_params[:content])
        parsed_content_with_gems_infos.each do |gem_name, gem_version|
            master_gem = MasterGem.find_by(name: gem_name)
            # Create MasterGem if it doesn't already exists
            unless master_gem
                master_gem = MasterGem.create!(name: gem_name, rubygems_page_url: "https://rubygems.org/gems/#{gem_name}")
            end
            # Create GemRelease if it doesn't already exists
            gem_release = GemRelease.find_or_create_by(master_gem_id: master_gem.id, version: gem_version)
            ProjectGem.create!({ project_gemfile_id: gemfile.id, master_gem_id: master_gem.id, gem_release_id: gem_release.id })
        end
    end
    def self.parse_gems_from_content(content)
        # split the content by lines
        gem_lines = content.scan(/\*\s*(.*?)\s+\((.*?)\)/)
        gems = {}
        # Iteration on each lines and association of the version to the gem name
        gem_lines.each do |gem_name, gem_version|
            gems[gem_name] = gem_version
        end
        gems
    end
end