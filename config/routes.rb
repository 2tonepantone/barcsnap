Rails.application.routes.draw do
  devise_for :users

  root to: 'pages#home'
  get '/ui_kits', to: 'pages#ui_kits'
  resources :products, only: %i[index show create] do
    resources :favorites, only: %i[create destroy]
    resources :reviews, only: [:create]
  end
end
