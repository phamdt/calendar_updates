class CommunicationsController < ApplicationController
  def text_message
    message = params[:message]
    phone_number = params[:phone_number]

    twilio_response = Communication.twilio_send(phone_number, message)
    render json: message
  end

  def email_calendar_update
    user = params[:user]
    #pretend this saves to db
    UserMailer.email_calendar_update(user).deliver
    render json: user
  end
end