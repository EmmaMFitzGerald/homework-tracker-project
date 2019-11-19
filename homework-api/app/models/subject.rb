class Subject < ApplicationRecord
    has_many :homeworks

    before_save { self.name = name.titleize }
end
