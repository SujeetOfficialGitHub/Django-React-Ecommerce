from django.core.mail import EmailMessage
import os

class SendingMail:
    @staticmethod
    def send_mail(data):
        emaii = EmailMessage(
            subject= data['subject'],
            body= data['body'],
            from_email= os.environ.get('EMAIL_FROM'),
            to= [data['to_email']],
        )
        emaii.send()