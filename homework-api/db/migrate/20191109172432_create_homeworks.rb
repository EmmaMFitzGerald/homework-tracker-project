class CreateHomeworks < ActiveRecord::Migration[6.0]
  def change
    create_table :homeworks do |t|
      t.text :content
      t.date :date
      t.boolean :completion

      t.timestamps
    end
  end
end
