from allauth.account.forms import SignupForm
from django import forms
from .models import CustomUser

class UserRegisterForm(SignupForm):
    class Meta:
        model = CustomUser
    first_name  = forms.CharField(max_length=30, label='First Name')
    last_name = forms.CharField(max_length=30, label='Last Name')
    
    def signup(self, request, user):
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.full_name = self.cleaned_data.get('first_name', '') + ' ' + self.cleaned_data.get('last_name', '')
        user.os_username = self.cleaned_data.get('username', '')  
        user.save()
        return user
    
        
