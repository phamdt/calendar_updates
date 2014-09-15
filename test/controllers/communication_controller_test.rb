require 'test_helper'

class CommunicationsControllerTest < ActionController::TestCase
  test "posting to /twilio sends text to specified number" do
    message = 'hallo!'
    phone_number = ENV['TWILIO_TEST_NUMBER']

    post :text_message, 'phone_number' => phone_number, 'message' => message

    assert_response :success
    assert_equal message, response.body
  end

  test "post to /email/calendar_update sends user email" do
    user = {
      name: 'Christopher Herman',
      email: 'c.herman@example.com',
      repair_item: 'macbook',
      rescheduled_time: DateTime.now()
    }
    post :email_calendar_update, user: user
    assert_response :success
  end
end
