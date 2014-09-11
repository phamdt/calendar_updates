Rails.application.routes.draw do
  resources :calendars
  post 'twilio/text', to: 'communications#text_message'
  post 'email/calendar_update', to: 'communications#email_calendar_update'
end
