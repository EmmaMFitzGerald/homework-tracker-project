class Homework < ApplicationRecord
    belongs_to :subject

    scope :ordered_by_date, -> { order(date: :asc) }
end
