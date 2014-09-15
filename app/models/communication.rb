class Communication < ActiveRecord::Base

  def self.twilio_send(phone_number, message)
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    from_number = ENV['TWILIO_NUMBER']

    @client = Twilio::REST::Client.new account_sid, auth_token
    response = @client.messages.create(
      :from => ENV['MY_TWILIO_NUMBER'],
      :to => phone_number,
      :body => message
    )
  end
end