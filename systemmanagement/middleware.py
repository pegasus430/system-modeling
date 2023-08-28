from django.shortcuts import redirect
from django.urls import reverse

class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        
        if not request.user.is_authenticated and not "/accounts" in request.path and request.method == 'GET' :
            return redirect("/accounts/login")

        response = self.get_response(request)
        return response