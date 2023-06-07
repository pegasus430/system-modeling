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
    page = 'system'
    context = {
        'title': 'System Purchasing Overview',
        'page': page,
    }
    
    return render(request, 'system_purchasing_overview.html', context=context)

def system_purchasing_detail(request):
    page = 'system'
    context = {
        'title': 'System Purchasing detail',
        'page': page,
    }
    
    return render(request, 'system_purchasing_detail.html', context=context)

def system_delivery(request):
    page = 'system'
    context = {
        'title': 'System Delivery',
        'page': page,
    }
    
    return render(request, 'system_delivery.html', context=context)

def system_state(request):
    page = 'system'
    context = {
        'title': 'System State',
        'page': page,
    }
    
    return render(request, 'system_state.html', context=context)

def equipment(request):
    page = 'equipment'
    context = {
        'title': 'Equipment',
        'page': page,
    }
    
    return render(request, 'equipment.html', context=context)

def connections(request):
    page = 'connections'
    context = {
        'title': 'Connections',
        'page': page,
    }
    
    return render(request, 'connections.html', context=context)

def definitions(request):
    page = 'definitions'
    context = {
        'title': 'Definitions',
        'page': page,
    }
    
    return render(request, 'definitions_system_parameters.html', context=context)

def definitions_system_users(request):
    page = 'definitions'
    context = {
        'title': 'Definitions',
        'page': page,
    }
    
    return render(request, 'definitions_system_users.html', context=context)

def definitions_equipment_types(request):
    page = 'definitions'
    context = {
        'title': 'Definitions',
        'page': page,
    }
    
    return render(request, 'definitions_equipment_types.html', context=context)

def definitions_equipment_properties(request):
    page = 'definitions'
    context = {
        'title': 'Definitions',
        'page': page,
    }
    
    return render(request, 'definitions_equipment_properties.html', context=context)

def definitions_equipment_resources(request):
    page = 'definitions'
    context = {
        'title': 'Definitions',
        'page': page,
    }
    
    return render(request, 'definitions_equipment_resources.html', context=context)

def definitions_equipment_interfaces(request):
    page = 'definitions'
    context = {
        'title': 'Definitions',
        'page': page,
    }
    
    return render(request, 'definitions_equipment_interfaces.html', context=context)

def definitions_equipment_interface_classes(request):
    page = 'definitions'
    context = {
        'title': 'Definitions',
        'page': page,
    }
    
    return render(request, 'definitions_equipment_interface_classes.html', context=context)

def definitions_connection_types(request):
    page = 'definitions'
    context = {
        'title': 'Definitions',
        'page': page,
    }
    
    return render(request, 'definitions_connection_types.html', context=context)

def definitions_property_data_types(request):
    page = 'definitions'
    context = {
        'title': 'Definitions',
        'page': page,
    }
    
    return render(request, 'definitions_property_data_types.html', context=context)

def definitions_possible_equipment_connection_states(request):
    page = 'definitions'
    context = {
        'title': 'Definitions',
        'page': page,
    }
    
    return render(request, 'definitions_possible_equipment_connection_states.html', context=context)