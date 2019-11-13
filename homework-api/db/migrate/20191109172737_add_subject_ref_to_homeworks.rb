class AddSubjectRefToHomeworks < ActiveRecord::Migration[6.0]
  def change
    add_reference :homeworks, :subject, null: false, foreign_key: true
  end
end
