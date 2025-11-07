class CreateVardiyas < ActiveRecord::Migration[8.0]
  def change
    create_table :vardiyas do |t|
      t.string :ad
      t.datetime :baslangic_saati
      t.datetime :bitis_saati
      t.references :personel, null: false, foreign_key: true

      t.timestamps
    end
  end
end
