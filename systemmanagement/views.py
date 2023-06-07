from django.shortcuts import render

# Create your views here.
def system(request):
    page = 'system'
    context = {
        'title': 'System',
        'page': page,
    }

    return render(request, 'system.html', context=context)

def system_purchasing_overview(request):
    context = {
        'title': 'System Purchasing Overview'
    }
    
    return render(request, 'system_purchasing_overview.html', context=context)

def system_purchasing_detail(request):
    context = {
        'title': 'System Purchasing detail'
    }
    
    return render(request, 'system_purchasing_detail.html', context=context)

def system_delivery(request):
    context = {
        'title': 'System Delivery'
    }
    
    return render(request, 'system_delivery.html', context=context)

def system_state(request):
    context = {
        'title': 'System State'
    }
    
    return render(request, 'system_state.html', context=context)

def equipment(request):
    page = 'equipment'
    context = {
        'title': 'Equipment',
        'page': page,
    }
    
    return render(request, 'equipment.html', context=context)

def definitions(request):
    page = 'definitions'
    context = {
        'title': 'Definitions',
        'page': page,
    }
    
    return render(request, 'definitions.html', context=context)

def connections(request):
    page = 'connections'
    context = {
        'title': 'Connections',
        'page': page,
    }
    
    return render(request, 'connections.html', context=context)