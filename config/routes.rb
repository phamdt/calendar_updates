Rails.application.routes.draw do
  resources :calendars
  post 'twilio/text', to: 'communications#text_message'
end
