class CreatePersonels < ActiveRecord::Migration[8.0]
  def change
    create_table :personels do |t|
      t.string :ad
      t.string :soyad

      t.timestamps
    end
  end
end
