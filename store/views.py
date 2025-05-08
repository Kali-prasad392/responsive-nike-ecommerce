from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            return render(request, 'store/login.html', {'error': 'Invalid credentials'})
    return render(request, 'store/login.html')

@login_required
def index_view(request):
    return render(request, 'store/index.html')

@login_required
def cart_view(request):
    return render(request, 'store/cart.html')

@login_required
def checkout_view(request):
    return render(request, 'store/checkout.html')