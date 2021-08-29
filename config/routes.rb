Rails.application.routes.draw do
  devise_for :users

  match "/404", to: "errors#not_found", via: :all
  # match "/422", to: "errors#internal_server_error", via: :all
  match "/500", to: "errors#internal_server_error", via: :all

  root to: 'pages#home'
  get '/ui_kits', to: 'pages#ui_kits'
  resources :products, only: %i[show create] do
    resources :favorites, only: %i[create destroy]
    resources :reviews, only: [:create]
  end
end
