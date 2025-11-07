Rails.application.routes.draw do
  resources :personels do
    resources :vardiyas
  end
end
