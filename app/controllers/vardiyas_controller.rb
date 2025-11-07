class VardiyasController < ApplicationController
  before_action :set_personel

  def index
    vardiyas = @personel.vardiyas
    render json: vardiyas
  end

  def show
    vardiya = @personel.vardiyas.find(params[:id])
    render json: vardiya
  end

  def create
    vardiya = @personel.vardiyas.new(vardiya_params)
    if vardiya.save
      render json: vardiya, status: :created
    else
      render json: vardiya.errors, status: :unprocessable_entity
    end
  end

  def update
    vardiya = @personel.vardiyas.find(params[:id])
    if vardiya.update(vardiya_params)
      render json: vardiya
    else
      render json: vardiya.errors, status: :unprocessable_entity
    end
  end

  def destroy
    vardiya = @personel.vardiyas.find(params[:id])
    vardiya.destroy
    head :no_content
  end

  private

  def set_personel
    @personel = Personel.find(params[:personel_id])
  end

  def vardiya_params
    params.require(:vardiya).permit(:ad, :baslangic_saati, :bitis_saati)
  end
end
