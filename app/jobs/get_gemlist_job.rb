class GetGemlistJob < ApplicationJob
    queue_as :default

    def perform
        puts'ok done.'
    end
end