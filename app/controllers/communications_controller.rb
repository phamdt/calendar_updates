class CommunicationsController < ApplicationController
  def text_message
    message = params[:message]
    phone_number = params[:phone_number]

    response = Communication.twilio_send(phone_number, message)
    render json: response
  end
end