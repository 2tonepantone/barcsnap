Rails.application.routes.draw do
  get 'products/show'
  devise_for :users
  root to: 'pages#home'
  get '/ui_kits', to: 'pages#ui_kits'
  resources :products, only: [:show] do
    resources :favorites, only: %i[create destroy]
    resources :reviews, only: [:create]
  end
end
