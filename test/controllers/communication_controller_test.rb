require 'test_helper'

class CommunicationsControllerTest < ActionController::TestCase
  test "posting to /twilio sends text to specified number" do
    message = 'hallo!'
    phone_number = ENV['TWILIO_TEST_NUMBER']

    # this is generating a stack trace error in the the test, but it
    # seems to be working just fine
    post :text_message, 'phone_number' => phone_number, 'message' => message

    puts 'response body', response.body
    assert_response :success
    assert_equal message, response.body
  end
end
