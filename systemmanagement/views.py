from django.http import HttpResponse
from django.shortcuts import render
from .models import AllEquipment , EquipmentType, PurchasingConnectionType, PurchasingEquipmentType , AllConnection, ConnectionType, PurchasingEquipmentTypeDetail, PurchasingConnectionTypeDetail , ConnectionState, EquipmentState
from django.db import connection
import datetime
import json

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
    purchasing_equipment = list(PurchasingEquipmentType.objects.order_by('type_modifier').values())
    purchasing_connection = list(PurchasingConnectionType.objects.order_by('type_modifier').values())
    context = {
        'title': 'System Purchasing Overview',
        'page': page,
        'purchasing_equipment': purchasing_equipment,
        'purchasing_connection': purchasing_connection
    }
    
    return render(request, 'system_purchasing_overview.html', context=context)

def system_purchasing_detail(request):
    page = 'system'
    purchasing_equipment = list(PurchasingEquipmentTypeDetail.objects.order_by('type_modifier').values())    
    purchasing_connection = list(PurchasingConnectionTypeDetail.objects.order_by('connection_type_modifier').values())
    context = {
        'title': 'System Purchasing detail',
        'page': page,
        'purchasing_equipment': purchasing_equipment,
        'purchasing_connection': purchasing_connection
    }
    
    return render(request, 'system_purchasing_detail.html', context=context)

def system_delivery(request):
    page = 'system'
    purchasing_equipment = list(PurchasingEquipmentTypeDetail.objects.order_by('type_modifier').values())
    purchasing_connection = list(PurchasingConnectionTypeDetail.objects.order_by('connection_type_modifier').values())
    context = {
        'title': 'System Delivery',
        'page': page,
        'purchasing_equipment': purchasing_equipment,
        'purchasing_connection': purchasing_connection
    }
    
    return render(request, 'system_delivery.html', context=context)

def system_state(request):
    page = 'system'
    all_equipment = list(EquipmentState.objects.order_by('equipment_sort_identifier').values())
    all_connection = list(ConnectionState.objects.order_by('connection_identifier').values())
    context = {
        'title': 'System State',
        'page': page,
        'all_equipment': all_equipment,
        'all_connection': all_connection
    }
    
    return render(request, 'system_state.html', context=context)

def equipment(request):
    page = 'equipment'
    all_equipment = list(AllEquipment.objects.order_by('equipment_sort_identifier').values())
    all_equipment_types = list(EquipmentType.objects.values())
    context = {
        'title': 'Equipment',
        'page': page,
        'all_equipment': all_equipment,
        'all_equipment_types': all_equipment_types
    }
    
    return render(request, 'equipment.html', context=context)

def get_equipment_child_elements(request):
    if request.method == 'GET':
        selected_equipment_path = request.GET['selectedEquipmentPath']

        child_equipments_db = AllEquipment.objects.extra(
            where=[
                "equipment_path <@ '"+ selected_equipment_path + "'"
            ],
            order_by=['equipment_sort_identifier']
        )

        child_equipments_list = list(child_equipments_db.values())

        data = json.dumps({
            'child_equipments': child_equipments_list,
            })
        
        return HttpResponse(data)

def get_connection_child_elements(request):
    if request.method == 'GET':
        selected_connection_path = request.GET['selectedConnectionPath']

        child_connection_db = AllConnection.objects.extra(
            where=[
                "connection_path <@ '"+ selected_connection_path + "'"
            ],
            order_by=['connection_identifier']
        )

        child_connection_list = list(child_connection_db.values())

        data = json.dumps({
            'child_connection': child_connection_list,
            })
        
        return HttpResponse(data)

def get_ConnectionType_purchasing_overview(request):
    if request.method == 'GET':
        selectedTypePath = request.GET['selectedTypePath']

        child_connection_db = PurchasingConnectionType.objects.extra(
            where=[
                "type_path <@ '"+ selectedTypePath + "'"
            ],
            order_by=['type_modifier']
        )

        child_connection_list = list(child_connection_db.values())

        data = json.dumps({
            'child_connectiontype': child_connection_list,
            })
        
        return HttpResponse(data)

def get_EquipmentType_purchasing_overview(request):
     if request.method == 'GET':
            selectedTypePath = request.GET['selectedTypePath']

            child_connection_db = PurchasingEquipmentType.objects.extra(
                where=[
                    "type_path <@ '"+ selectedTypePath + "'"
                ],
                order_by=['type_modifier']
            )

            child_connection_list = list(child_connection_db.values())

            data = json.dumps({
                'child_equipmenttype': child_connection_list,
                })
            
            return HttpResponse(data)

def get_EquipmentType_purchasing_detail(request):
     if request.method == 'GET':
            selectedTypePath = request.GET['selectedTypePath']

            child_connection_db = PurchasingEquipmentTypeDetail.objects.extra(
                where=[
                    "type_path <@ '"+ selectedTypePath + "'"
                ],
                order_by=['type_modifier']
            )

            child_connection_list = list(child_connection_db.values())

            data = json.dumps({
                'child_equipmenttype': child_connection_list,
                },
                cls=DateTimeEncoder
                )
            
            return HttpResponse(data)

def get_ConnectionType_purchasing_detail(request):
    if request.method == 'GET':
        selectedTypePath = request.GET['selectedTypePath']

        child_connection_db = PurchasingConnectionTypeDetail.objects.extra(
            where=[
                "connection_type_path <@ '"+ selectedTypePath + "'"
            ],
            order_by=['connection_type_modifier']
        )

        child_connection_list = list(child_connection_db.values())
        

        data = json.dumps({
                    'child_connectiontype': child_connection_list,
                },
                cls=DateTimeEncoder
            )
        
        return HttpResponse(data)

def get_equipmentdetail_tabledata(request):
    if request.method == 'GET':
        selectedEquipmentId = request.GET['selectedEquipmentId']
        # get equipment resources per selected equipmnet
        raw_query = "SELECT  A.resource_id , B.modifier , B.description FROM public.all_equipment_resource as A  \
            inner join resource B on A.resource_id = B.id \
            where equipment_id = " + selectedEquipmentId
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchall()
        equipment_resource_list = [dict(zip([col[0] for col in cursor.description], row)) for row in results]

        # get equipment interfaces per selected equipment
        raw_query = "select interface_id, resource_id, interface_full_identifier, interface_description,  \
            (select CASE  WHEN count(*) > 0 THEN 'Used' ELSE 'Not used' END as used from all_connection_interface  \
            where (start_equipment_id = "+ selectedEquipmentId +" and start_interface_id = interface_id) or(end_equipment_id = "+ selectedEquipmentId +" and end_interface_id = interface_id)) \
            from all_equipment_interface \
            inner join resource on all_equipment_interface.resource_id = resource.id \
            where equipment_id = "+ selectedEquipmentId+" and resource_id in ( \
                SELECT A.resource_id FROM public.all_equipment_resource as A  \
                inner join resource B on A.resource_id = B.id \
                where equipment_id = "+ selectedEquipmentId +") \
            order by interface_full_identifier"
        
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchall()
        equipment_interfaces_list = [dict(zip([col[0] for col in cursor.description], row)) for row in results]

        raw_query = "select resource_id, property_modifier, property_description, datatype_label \
            from all_equipment_property where equipment_id = " + selectedEquipmentId + " order by property_modifier"
        
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchall()
        equipment_properties_list = [dict(zip([col[0] for col in cursor.description], row)) for row in results]

        data = json.dumps(
            {
                'resource_list': equipment_resource_list,
                'interface_list': equipment_interfaces_list,
                'property_list': equipment_properties_list
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def connections(request):
    page = 'connections'
    all_equipment = list(AllEquipment.objects.order_by('equipment_sort_identifier').values())
    all_connection = list(AllConnection.objects.order_by('connection_identifier').values())
    all_connection_types = list(ConnectionType.objects.values())
    context = {
        'title': 'Connections',
        'page': page,
        'all_equipment': all_equipment,
        'all_connection': all_connection,
        'all_connection_types': all_connection_types,
    }
    
    return render(request, 'connections.html', context=context)

def definitions(request):
    page = 'definitions'
    sidebar_title = 'system_parameters'
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
    }
    
    return render(request, 'definitions_system_parameters.html', context=context)

def definitions_system_users(request):
    page = 'definitions'
    sidebar_title = 'system_users'
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
    }
    
    return render(request, 'definitions_system_users.html', context=context)

def definitions_equipment_types(request):
    page = 'definitions'
    sidebar_title = 'equipment_types'
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title
    }
    
    return render(request, 'definitions_equipment_types.html', context=context)

def definitions_equipment_properties(request):
    page = 'definitions'
    sidebar_title = 'equipment_properties'
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title
    }
    
    return render(request, 'definitions_equipment_properties.html', context=context)

def definitions_equipment_resources(request):
    page = 'definitions'
    sidebar_title = 'equipment_resources'
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title
    }
    
    return render(request, 'definitions_equipment_resources.html', context=context)

def definitions_equipment_interfaces(request):
    page = 'definitions'
    sidebar_title = 'equipment_interfaces'
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title
    }
    
    return render(request, 'definitions_equipment_interfaces.html', context=context)

def definitions_equipment_interface_classes(request):
    page = 'definitions'
    sidebar_title = 'equipment_interface_classes'
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
    }
    
    return render(request, 'definitions_equipment_interface_classes.html', context=context)

def definitions_connection_types(request):
    page = 'definitions'
    sidebar_title = 'connection_types'
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
    }
    
    return render(request, 'definitions_connection_types.html', context=context)

def definitions_property_data_types(request):
    page = 'definitions'
    sidebar_title = 'property_data_types'
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title
    }
    
    return render(request, 'definitions_property_data_types.html', context=context)

def definitions_possible_equipment_connection_states(request):
    page = 'definitions'
    sidebar_title = 'possible_equipment_connection_states'
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title
    }
    
    return render(request, 'definitions_possible_equipment_connection_states.html', context=context)

def get_equipment_state_detail(request):
    if request.method == 'GET':
        selected_equipment_path = request.GET['selectedEquipmentPath']

        child_equipments_db = EquipmentState.objects.extra(
            where=[
                "equipment_path <@ '"+ selected_equipment_path + "'"
            ],
            order_by=['equipment_sort_identifier']
        )

        child_equipments_list = list(child_equipments_db.values())

        data = json.dumps({
            'state_equipment_detail': child_equipments_list,
            })
        
        return HttpResponse(data)

def get_connection_state_detail(request):
    if request.method == 'GET':
        selected_connection_path = request.GET['selectedConnectionPath']

        child_connection_db = ConnectionState.objects.extra(
            where=[
                "connection_path <@ '"+ selected_connection_path + "'"
            ],
            order_by=['connection_identifier']
        )

        child_connection_list = list(child_connection_db.values())

        data = json.dumps({
            'state_connection_detail': child_connection_list,
            })
        
        return HttpResponse(data)
# Custom JSON encoder to handle datetime objects
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.date):
            return obj.isoformat()
        return super().default(obj)