from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
# Create your views here.


def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, f'Welcome '
                             f'{username}', extra_tags='success')
            print('Login Successful')
            return redirect('/')
        else:
            messages.error(request, 'Invalid Credentials', extra_tags='danger')
            return redirect('login')

    else:
        return render(request, 'login.html')
