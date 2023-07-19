from django.http import HttpResponse
from django.shortcuts import render
from .models import AllEquipment , EquipmentType, PurchasingConnectionType, PurchasingEquipmentType , AllConnection, ConnectionType, PurchasingEquipmentTypeDetail, PurchasingConnectionTypeDetail , ConnectionState, EquipmentState, Interface , SystemSetting , TypeInterface , Resource , ResouceProperty, DataType, InterfaceClass, TargetSystem, PossibleState, Authority
from django.db import connection
import datetime
import json
import pytz


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
    purchasing_detail_equipment = list(PurchasingEquipmentTypeDetail.objects.order_by('type_modifier').values())    
    purchasing_detail_connection = list(PurchasingConnectionTypeDetail.objects.order_by('connection_type_modifier').values())
    purchasing_overview_equipment = list(PurchasingEquipmentType.objects.order_by('type_modifier').values())
    purchasing_overview_connection = list(PurchasingConnectionType.objects.order_by('type_modifier').values())
   
    context = {
        'title': 'System Purchasing detail',
        'page': page,
        'purchasing_detail_equipment': purchasing_detail_equipment,
        'purchasing_detail_connection': purchasing_detail_connection,
        'purchasing_overview_equipment': purchasing_overview_equipment,
        'purchasing_overview_connection': purchasing_overview_connection,
    }
    
    return render(request, 'system_purchasing_detail.html', context=context)

def system_delivery(request):
    page = 'system'
    purchasing_delivery_equipment = list(PurchasingEquipmentTypeDetail.objects.order_by('type_modifier').values())
    purchasing_delivery_connection = list(PurchasingConnectionTypeDetail.objects.order_by('connection_type_modifier').values())
    purchasing_overview_equipment = list(PurchasingEquipmentType.objects.order_by('type_modifier').values())
    purchasing_overview_connection = list(PurchasingConnectionType.objects.order_by('type_modifier').values())
   
    context = {
        'title': 'System Delivery',
        'page': page,
        'purchasing_delivery_equipment': purchasing_delivery_equipment,
        'purchasing_delivery_connection': purchasing_delivery_connection,
        'purchasing_overview_equipment': purchasing_overview_equipment,
        'purchasing_overview_connection': purchasing_overview_connection,
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
        raw_query = "select interface_id, resource_id, interface_identifier, interface_description,  \
            (select CASE  WHEN count(*) > 0 THEN 'Used' ELSE 'Not used' END as used from all_connection_interface  \
            where (start_equipment_id = "+ selectedEquipmentId +" and start_interface_id = interface_id) or(end_equipment_id = "+ selectedEquipmentId +" and end_interface_id = interface_id)) \
            from all_equipment_interface \
            inner join resource on all_equipment_interface.resource_id = resource.id \
            where equipment_id = "+ selectedEquipmentId+" and resource_id in ( \
                SELECT A.resource_id FROM public.all_equipment_resource as A  \
                inner join resource B on A.resource_id = B.id \
                where equipment_id = "+ selectedEquipmentId +") \
            order by interface_identifier"
        
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchall()
        equipment_interfaces_list = [dict(zip([col[0] for col in cursor.description], row)) for row in results]

        raw_query = "select resource_id, property_modifier, property_description, property_value \
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
    all_interface = list(Interface.objects.values())
    context = {
        'title': 'Connections',
        'page': page,
        'all_equipment': all_equipment,
        'all_connection': all_connection,
        'all_connection_types': all_connection_types,
        'all_interface': all_interface,
    }
    
    return render(request, 'connections.html', context=context)

def definitions(request):
    page = 'definitions'
    system_parameters = list(SystemSetting.objects.values())
    sidebar_title = 'system_parameters'
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'system_parameters': system_parameters,
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
    all_equipment_types = list(EquipmentType.objects.order_by('path').values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'all_equipment_types': all_equipment_types,
    }
    
    return render(request, 'definitions_equipment_types.html', context=context)

def definitions_equipment_properties(request):
    page = 'definitions'
    sidebar_title = 'equipment_properties'
    resourceProperty = list(ResouceProperty.objects.order_by('modifier').values())
    all_datatype = list(DataType.objects.values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'resourceProperty': resourceProperty,
        'all_datatype': all_datatype,
    }
    
    return render(request, 'definitions_equipment_properties.html', context=context)

def definitions_equipment_resources(request):
    page = 'definitions'
    sidebar_title = 'equipment_resources'
    all_resources = list(Resource.objects.order_by('group_label').values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'all_resources': all_resources
    }
    
    return render(request, 'definitions_equipment_resources.html', context=context)

def definitions_equipment_interfaces(request):
    page = 'definitions'
    sidebar_title = 'equipment_interfaces'
    all_interfaces = list(Interface.objects.order_by('identifier').values())
    all_interface_classes = list(InterfaceClass.objects.order_by('label').values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'all_interfaces': all_interfaces,
        'all_interface_classes': all_interface_classes,
    }
    
    return render(request, 'definitions_equipment_interfaces.html', context=context)

def definitions_equipment_interface_classes(request):
    page = 'definitions'
    sidebar_title = 'equipment_interface_classes'
    all_interface_classes = list(InterfaceClass.objects.order_by('label').values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'all_interface_classes': all_interface_classes,
    }
    
    return render(request, 'definitions_equipment_interface_classes.html', context=context)

def definitions_connection_types(request):
    page = 'definitions'
    sidebar_title = 'connection_types'
    all_connection_types = list(ConnectionType.objects.order_by('path').values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'all_connection_types': all_connection_types,
    }
    
    return render(request, 'definitions_connection_types.html', context=context)

def definitions_target_systems(request):
    page = 'definitions'
    sidebar_title = 'target_systems'
    target_systems = list(TargetSystem.objects.order_by('label').values())
    all_datatype = list(DataType.objects.values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'target_systems': target_systems,
        'all_datatype': all_datatype,
    }
    
    return render(request, 'definitions_target_systems.html', context=context)

def definitions_possible_equipment_connection_states(request):
    page = 'definitions'
    sidebar_title = 'possible_equipment_connection_states'
    all_possible_state = list(PossibleState.objects.order_by('state_label').values())
    all_authority = list(Authority.objects.order_by('authority_label').values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'all_possible_state': all_possible_state,
        'all_authority': all_authority,
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
        
def getEquipmentTypesAttributes(request):
    if request.method == 'GET':
        selectedtypeId = request.GET['selectedtypeId']
        raw_query = "SELECT  A.type_id, A.resource_id, A.comment, B.modifier , B.description FROM public.all_type_resource as A  \
            left join all_resource B on A.resource_id = B.id \
            where type_id = " + selectedtypeId + " order by B.modifier"
        
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchall()
        associatedResource = [dict(zip([col[0] for col in cursor.description], row)) for row in results]
    
    data = json.dumps(
            {
                'associatedResource': associatedResource,
            } 
        )
    return HttpResponse(data)

def getEquipmentTypesInterface(request):
    if request.method == 'GET':
        selectedTypeId =  request.GET['selectedTypeId']
        selectedResourceId =  request.GET['selectedResourceId']
        typeInterfacedb = TypeInterface.objects.extra(
            where=[
                "type_id = " + selectedTypeId + " and resource_id = " + selectedResourceId
            ]
        ).order_by('interface_identifier')

        typeInterfaceList = list(typeInterfacedb.values())
        data = json.dumps(
            {
                'typeInterfaceList': typeInterfaceList,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def update_equipment_detail(request):
    if request.method == 'GET':
        equipment_id = request.GET['equipment_id']
        equipment_local_identifier = request.GET['equipment_local_identifier']
        equipment_parent_path =  request.GET['equipment_parent_path']
        equipment_use_parent_identifier = request.GET['equipment_use_parent_identifier']
        if equipment_parent_path:
            equipment_path = equipment_parent_path.replace(',', '.') + '.' + equipment_id
        else:
            equipment_path =  equipment_id
        
        equipment_description =  request.GET['equipment_description']
        equipment_location_path =  request.GET['equipment_location_path']
        equipment_location_path = equipment_location_path.replace(',', '.')
        
        equipment_type_id =  request.GET['equipment_type_id']
        equipment_comment =  request.GET['equipment_comment']
        equipment_is_approved = request.GET['equipment_is_approved'] 

        current_time = datetime.datetime.now(pytz.utc)
        
        # Convert the current time to a timestamp with time zone
        equipment_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        
        
        raw_query = "SELECT  fn_update_equipment(" + equipment_id + " , '" + equipment_local_identifier + "' , '" +  \
            equipment_path + "', "+ equipment_use_parent_identifier +" , '"+ equipment_location_path + "', " + equipment_type_id + ", '" \
            + equipment_description + "', " + equipment_is_approved + " , '" + equipment_comment + "','"  \
            + equipment_modified_at + "')" 
        
        
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchall()
        all_equipment = list(AllEquipment.objects.order_by('equipment_sort_identifier').values())
        
        data = json.dumps(
            {
                'result': True,
                'equipment_list': all_equipment,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)
       
def add_equipment_detail(request):
    if request.method == 'GET':
        equipment_local_identifier = request.GET['equipment_local_identifier']
        equipment_parent_path =  request.GET['equipment_parent_path']
        equipment_use_parent_identifier = request.GET['equipment_use_parent_identifier']        
        equipment_description =  request.GET['equipment_description']
        equipment_location_path =  request.GET['equipment_location_path']
        equipment_type_id =  request.GET['equipment_type_id']
        equipment_comment =  request.GET['equipment_comment']
        equipment_is_approved = request.GET['equipment_is_approved'] 

        current_time = datetime.datetime.now(pytz.utc)
        
        # Convert the current time to a timestamp with time zone
        equipment_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        
        query  = 'SELECT max(equipment_id) FROM all_equipment'
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
            
        maximun_id = result[0]
        new_equipment_id = maximun_id + 1
        if equipment_parent_path:
            equipment_path = equipment_parent_path + '.' + str(new_equipment_id)
        else:
            equipment_path = str(new_equipment_id)
        
        
        raw_query = "SELECT  fn_add_equipment(" + str(new_equipment_id) + " , '" + equipment_path + "' , " +  \
              equipment_use_parent_identifier +" , '"+ equipment_location_path + "', " + equipment_type_id + ", '" \
            + equipment_local_identifier + "', '" + equipment_description + "', " + equipment_is_approved + " , '" + equipment_comment + "','"  \
            + equipment_modified_at + "')" 

        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchall()
        all_equipment = list(AllEquipment.objects.order_by('equipment_sort_identifier').values())
        
        data = json.dumps(
            {
                'result': True,
                'equipment_list': all_equipment,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def remove_equipment(request):
    if request.method == 'GET':
        equipment_id = request.GET['equipment_id']
        
        raw_query = "SELECt fn_remove_equipment("+ str(equipment_id) +")" 

        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchall()
        all_equipment = list(AllEquipment.objects.order_by('equipment_sort_identifier').values())
        
        data = json.dumps(
            {
                'result': True,
                'equipment_list': all_equipment,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)
# Custom JSON encoder to handle datetime objects
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.date):
            return obj.isoformat()
        return super().default(obj)