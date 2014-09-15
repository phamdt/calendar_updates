Rails.application.routes.draw do
  root to: 'calendars#index'
  post 'twilio/text', to: 'communications#text_message'
  post 'email/calendar_update', to: 'communications#email_calendar_update'
end
