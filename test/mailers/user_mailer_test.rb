require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  test "email_calendar_update" do

    # this would probably be a user instance if this were real
    user = {
      name: 'Christopher Herman',
      email: 'c.herman@example.com',
      repair_item: 'macbook',
      rescheduled_time: DateTime.now()
    }
    email = UserMailer.email_calendar_update(user).deliver
    assert_not ActionMailer::Base.deliveries.empty?
  end
end
