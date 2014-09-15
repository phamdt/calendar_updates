class UserMailer < ActionMailer::Base
  default from: ENV['MY_EMAIL']

  def email_calendar_update(user)
    @user = user
    mail(to: @user[:email],
         subject: 'RepairShopr: Your field call has been updated',
         template_name: 'email_calendar_update')
  end
end
