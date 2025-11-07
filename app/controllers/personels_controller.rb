class PersonelsController < ApplicationController
  def index
    personels = Personel.all
    render json: personels
  end

  def show
    personel = Personel.find(params[:id])
    render json: personel
  end

  def create
    personel = Personel.new(personel_params)
    if personel.save
      render json: personel, status: :created
    else
      render json: personel.errors, status: :unprocessable_entity
    end
  end

  def update
    personel = Personel.find(params[:id])
    if personel.update(personel_params)
      render json: personel
    else
      render json: personel.errors, status: :unprocessable_entity
    end
  end

  def destroy
    personel = Personel.find(params[:id])
    personel.destroy
    head :no_content
  end

  private

  def personel_params
    params.require(:personel).permit(:ad, :soyad)
  end
end
