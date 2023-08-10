from django.http import HttpResponse
from django.shortcuts import render
from .models import AllEquipment , EquipmentType, PurchasingConnectionType, PurchasingEquipmentType , AllConnection, ConnectionType, PurchasingEquipmentTypeDetail, PurchasingConnectionTypeDetail , ConnectionState, EquipmentState, Interface , SystemSetting , TypeInterface , Resource, ResourceGroup, ResouceProperty, DataType, InterfaceClass, TargetSystem, PossibleState, Authority, AttributeClass
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
    equipment_state_detail = list(PurchasingEquipmentTypeDetail.objects.order_by('type_modifier').values())
    connection_state_detail = list(PurchasingConnectionTypeDetail.objects.order_by('connection_type_modifier').values())
    context = {
        'title': 'System State',
        'page': page,
        'all_equipment': all_equipment,
        'all_connection': all_connection,
        'equipment_state_detail': equipment_state_detail,
        'connection_state_detail': connection_state_detail,
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

        raw_query = "select resource_id, property_id, property_modifier, property_description, property_value \
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
    system_parameters = list(SystemSetting.objects.order_by('label').values())
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
    all_resources = list(Resource.objects.order_by('modifier').values())
    all_interfaces = list(Interface.objects.order_by('identifier').values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'all_equipment_types': all_equipment_types,
        'all_resources': all_resources,
        'all_interfaces': all_interfaces,
    }
    
    return render(request, 'definitions_equipment_types.html', context=context)

def definitions_equipment_properties(request):
    page = 'definitions'
    sidebar_title = 'equipment_properties'
    resourceProperty = list(ResouceProperty.objects.order_by('modifier').values())
    all_datatype = list(DataType.objects.values())
    all_attributeClass = list(AttributeClass.objects.order_by('attribute_class_label').values())
    all_resources = list(Resource.objects.order_by('modifier').values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'resourceProperty': resourceProperty,
        'all_datatype': all_datatype,
        'all_attributeClass': all_attributeClass,
        'all_resources': all_resources,
    }
    
    return render(request, 'definitions_equipment_properties.html', context=context)

def definitions_equipment_resources(request):
    page = 'definitions'
    sidebar_title = 'equipment_resources'
    all_resources = list(Resource.objects.order_by('modifier').values())
    all_resource_group = list(ResourceGroup.objects.order_by('label').values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'all_resources': all_resources,
        'all_resource_group': all_resource_group,
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
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
            result = True
        except Exception as e:
            print(result)
            result = False
        all_equipment = list(AllEquipment.objects.order_by('equipment_sort_identifier').values())
        
        data = json.dumps(
            {
                'result': result,
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

        try:
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
            return_result = True
        except Exception as e:
            print(e)
            return_result = False
        all_equipment = list(AllEquipment.objects.order_by('equipment_sort_identifier').values())
        
        data = json.dumps(
            {
                'result': return_result,
                'equipment_list': all_equipment,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def update_equipment_property_value(request):
     if request.method == 'GET':
        equipment_id = request.GET['equipment_id']
        resource_id = request.GET['resource_id']
        property_id =  request.GET['property_id']
        value = request.GET['value']
        
        current_time = datetime.datetime.now(pytz.utc)
        
        # Convert the current time to a timestamp with time zone
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
       
        raw_query = "SELECT id FROM resource_property WHERE resource_id = {} and property_id = {}".format(resource_id, property_id) 
        
        try:

            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                result = cursor.fetchone()
                if result:   # there is id in resource_property for selected resource and property
                    resource_property_id = result[0] 
                    
                    raw_query = "SELECT id FROM property_value WHERE resource_property_id = {}".format(resource_property_id)
                    
                    cursor.execute(raw_query)
                    result = cursor.fetchone()
                    if result:   # there is id in property_value for selected resource_property
                        id = result[0] 
                        query = "SELECT fn_update_property_value({}, {}, {}, '{}', {}, '{}', '{}')".format(id, equipment_id, resource_property_id, value, 0, '', modified_at )    
                    else:
                        query = "SELECT fn_add_property_value({}, {}, '{}', {}, '{}', '{}')".format(equipment_id, resource_property_id, value, 0, '', modified_at)
                    
                    cursor.execute(query)
                else:   # there is no id in resource_property, property_value. so need to add them
                    query = "SELECT fn_add_resource_property({}, {}, '{}', {}, '{}', '{}')".format(resource_id, property_id, '', 0, '', modified_at)
                    cursor.execute(query)
                    result = cursor.fetchone()
                    new_resource_property_id = result[0]

                    query = "SELECT fn_add_property_value({}, {}, '{}', {}, '{}', '{}')".format(equipment_id, new_resource_property_id, value, 0, '', modified_at)
                    cursor.execute(query)
            result = True
        except Exception as e: 
            print(e)
            result = False
        
        data = json.dumps(
            {
                'result': result,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def remove_equipment(request):
    if request.method == 'GET':
        equipment_id = request.GET['equipment_id']
        
        raw_query = "SELECt fn_remove_equipment("+ str(equipment_id) +")" 

        try:
            result = True
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
        except Exception as e:
            print(e)
            result = False
        
        all_equipment = list(AllEquipment.objects.order_by('equipment_sort_identifier').values())
        
        data = json.dumps(
            {
                'result': result,
                'equipment_list': all_equipment,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def update_connection_detail(request):
    if request.method == 'GET':
        connection_id = request.GET['connection_id']
        connection_identifier = request.GET['connection_identifier']
        connection_parent_path =  request.GET['connection_parent_path']
        connection_use_parent_identifier = request.GET['connection_use_parent_identifier']
        if connection_parent_path:
            connection_path = connection_parent_path.replace(',', '.') + '.' + connection_id
        else:
            connection_path =  connection_id
        connection_description =  request.GET['connection_description']
        connection_length = request.GET['connection_length']
        connection_type_id =  request.GET['connection_type_id']
        if connection_type_id == '':
            connection_type_id = 0
        connection_comment =  request.GET['connection_comment']
        connection_is_approved = request.GET['connection_is_approved'] 
        connection_start_equipment_id = request.GET['connection_start_equipment_id']
        if connection_start_equipment_id == '':
            connection_start_equipment_id = 0
        connection_end_equipment_id = request.GET['connection_end_equipment_id']
        if connection_end_equipment_id == '':
            connection_end_equipment_id = 0
        connection_start_interface_id = request.GET['connection_start_interface_id']
        if connection_start_interface_id == '':
            connection_start_interface_id = 0
        connection_end_interface_id = request.GET['connection_end_interface_id']
        if connection_end_interface_id == '':
            connection_end_interface_id = 0

        current_time = datetime.datetime.now(pytz.utc)
        
        # Convert the current time to a timestamp with time zone
        connection_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        try:
        
            raw_query = "SELECT  fn_update_connection(" + connection_id + " , '" + connection_path + "' , " +  \
                connection_use_parent_identifier + ", " + str(connection_type_id) + ","+ str(connection_start_equipment_id) \
                + ","+ str(connection_end_equipment_id)+ ","+ str(connection_start_interface_id)+ ","+ str(connection_end_interface_id) +",'"+ connection_identifier + "', '" \
                + connection_description + "', '" + connection_comment + "'," + str(connection_length) +" , " + connection_is_approved +" ,'"  \
                + connection_modified_at + "')" 
            
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
            result = True
        except Exception as e:
            print(e)
            result = False

        all_connection = list(AllConnection.objects.order_by('connection_identifier').values())
        
        data = json.dumps(
            {
                'result': result,
                'connection_list': all_connection,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def add_connection(request):
      if request.method == 'GET':
        connection_local_identifier = request.GET['connection_local_identifier']
        connection_parent_path =  request.GET['connection_parent_path']
        connection_use_parent_identifier = request.GET['connection_use_parent_identifier']        
        connection_description =  request.GET['connection_description']
        connection_type_id =  request.GET['connection_type_id']
        if connection_type_id == '':
            connection_type_id = 0
        connection_start_equipment_id = request.GET['connection_start_equipment']
        if connection_start_equipment_id == '':
            connection_start_equipment_id = 0
        connection_end_equipment_id = request.GET['connection_end_equipment']
        if connection_end_equipment_id == '':
            connection_end_equipment_id = 0
        connection_start_interface_id = request.GET['connection_start_interface']
        if connection_start_interface_id == '':
            connection_start_interface_id = 0
        connection_end_interface_id = request.GET['connection_end_interface']
        if connection_end_interface_id == '':
            connection_end_interface_id = 0
        connection_comment =  request.GET['connection_comment']
        connection_is_approved = request.GET['connection_is_approved'] 
        connection_length = request.GET['connection_length'] 
        if connection_length == '':
            connection_length = 0
        current_time = datetime.datetime.now(pytz.utc)
        
        # Convert the current time to a timestamp with time zone
        connection_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        
        try:
            query  = 'SELECT max(connection_id) FROM all_connection'
            with connection.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchone()
                
            maximun_id = result[0]
            new_connection_id = maximun_id + 1
            if connection_parent_path:
                connection_path = connection_parent_path + '.' + str(new_connection_id)
            else:
                connection_path = str(new_connection_id)
            
            
            raw_query = "SELECT  fn_add_connection(" + str(new_connection_id) + " , '" + connection_path + "' , " +  \
                connection_use_parent_identifier +" , " + str(connection_type_id) + ", " + str(connection_start_equipment_id) + "," \
                + str(connection_end_equipment_id) + ", " + str(connection_start_interface_id) + ", " + str(connection_end_interface_id) + ", '" \
                + connection_local_identifier + "', '" + connection_description + "', '" + connection_comment + "',"  \
                + str(connection_length) + ", " + connection_is_approved + " , '" + connection_modified_at + "')" 

            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
            return_result = True
        except Exception as e:
            print(e)
            return_result = False
        all_connection = list(AllConnection.objects.order_by('connection_identifier').values())
        
        data = json.dumps(
            {
                'result': return_result,
                'connection_list': all_connection,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def remove_connection(request):
    if request.method == 'GET':
        connection_id = request.GET['connection_id']
        raw_query = "SELECt fn_remove_connection("+ str(connection_id) +")" 

        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
            result = True
        except Exception as e:
            print(e)
            result = False
        all_connection = list(AllConnection.objects.order_by('connection_identifier').values())
        
        data = json.dumps(
            {
                'result': result,
                'connection_list': all_connection,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)
    
def updateEquipmentTypePurchaseDetail(request):
    if request.method ==  'GET':
        p_id = request.GET['p_id']
        p_due_date = request.GET['p_due_date']
        if p_due_date ==  '':
            p_due_date = 'NULL'
        else:
            p_due_date = "'" + p_due_date + "'"

        p_leadtime = request.GET['p_leadtime']
        if p_leadtime == '0':
            p_leadtime = 'NULL'
        p_po_date = request.GET['p_po_date']
        if p_po_date ==  '':
            p_po_date = 'NULL'
        else:
            p_po_date = "'" + p_po_date + "'"

        p_po_reference = request.GET['p_po_reference']
        p_quote_reference = request.GET['p_quote_reference']
        p_location = request.GET['p_location']
        p_received_date = request.GET['p_received_date']
        if p_received_date ==  '':
            p_received_date = 'NULL'
        else:
            p_received_date = "'" + p_received_date + "'"

        p_unique_code = request.GET['p_unique_code']

        current_time = datetime.datetime.now(pytz.utc)
        
        # Convert the current time to a timestamp with time zone
        p_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT fn_update_equipment_commercial({}, '{}', {}, {}, {}, '{}', {}, '{}', '{}', '{}')".format(
            p_id, p_quote_reference, p_leadtime, p_po_date, p_due_date, p_po_reference, p_received_date,p_unique_code, p_location, p_modified_at
        )
        print(raw_query)
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
            result = True
        except Exception as e:
            print(e)
            result = False
        
        data = json.dumps(
            {
                'result': result,                
            } 
        )
        return HttpResponse(data)

def updateConnectionTypePurchaseDetail(request):
     if request.method ==  'GET':
        p_id = request.GET['p_id']
        p_due_date = request.GET['p_due_date']
        if p_due_date ==  '':
            p_due_date = 'NULL'
        else:
            p_due_date = "'" + p_due_date + "'"

        p_leadtime = request.GET['p_leadtime']
        if p_leadtime == 0:
            p_leadtime = 'NULL'
        p_po_date = request.GET['p_po_date']
        if p_po_date ==  '':
            p_po_date = 'NULL'
        else:
            p_po_date = "'" + p_po_date + "'"

        p_po_reference = request.GET['p_po_reference']
        p_quote_reference = request.GET['p_quote_reference']
        p_location = request.GET['p_location']
        p_received_date = request.GET['p_received_date']
        if p_received_date ==  '':
            p_received_date = 'NULL'
        else:
            p_received_date = "'" + p_received_date + "'"

        p_unique_code = request.GET['p_unique_code']

        current_time = datetime.datetime.now(pytz.utc)
        
        # Convert the current time to a timestamp with time zone
        p_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT fn_update_connection_commercial({}, '{}', {}, {}, {}, '{}', {}, '{}', '{}', '{}')".format(
            p_id, p_quote_reference, p_leadtime, p_po_date, p_due_date, p_po_reference, p_received_date,p_unique_code, p_location, p_modified_at
        )
       
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
            result = True
        except Exception as e:
            print(e)
            result = False
        
        data = json.dumps(
            {
                'result': result,                
            } 
        )
        return HttpResponse(data)

def updateEquipmentCommercialState(request):
    if request.method == 'GET':
        selected_state_equipment_id = request.GET['selected_state_equipment_id']
        selectedEquipmentUpdateFlag = request.GET['selectedEquipmentUpdateFlag']
        ready_for_fat = request.GET['ready_for_fat']
        if ready_for_fat == "":
            ready_for_fat = 'NULL'
        else:
            ready_for_fat = "'" + ready_for_fat +"'"

        fat_complete = request.GET['fat_complete']
        if fat_complete == "":
            fat_complete = 'NULL'
        else:
            fat_complete ="'" + fat_complete +"'"

        sat_complete = request.GET['sat_complete']
        if sat_complete == "":
            sat_complete = 'NULL'
        else:
            sat_complete ="'" + sat_complete +"'"

        commissioning_complete = request.GET['commissioning_complete']
        if commissioning_complete == "":
            commissioning_complete = 'NULL'
        else:
            commissioning_complete ="'" + commissioning_complete +"'"

        installed_date = request.GET['installed_date']
        if installed_date == "":
            installed_date = 'NULL'
        else:
            installed_date ="'" + installed_date +"'"

        current_time = datetime.datetime.now(pytz.utc)
        
        # Convert the current time to a timestamp with time zone
        p_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        if selectedEquipmentUpdateFlag == 'update':
            raw_query = "SELECT fn_update_equipment_commercial({}, {}, {}, {}, {}, {}, '{}')".format(
                selected_state_equipment_id, ready_for_fat, fat_complete, sat_complete, commissioning_complete, installed_date, p_modified_at)
        else:
            raw_query = "SELECT fn_add_equipment_commercial({}, {}, {}, {}, {}, {}, '{}')".format(
                selected_state_equipment_id, ready_for_fat, fat_complete, sat_complete, commissioning_complete, installed_date, p_modified_at)
            
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
            result = True
            all_equipment = list(EquipmentState.objects.order_by('equipment_sort_identifier').values())
            equipment_commercial_state_detail = list(PurchasingEquipmentTypeDetail.objects.order_by('type_modifier').values())
        except Exception as e:
            print(e)
            result = False
    
        data = json.dumps(
            {
                'result': result,   
                'all_equipment': all_equipment,
                'equipment_commercial_state_detail': equipment_commercial_state_detail,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def updateConnectionCommercialState(request):
    if request.method == 'GET':
        selected_state_connection_id = request.GET['selected_state_connection_id']
        selectedConnectionUpdateFlag = request.GET['selectedConnectionUpdateFlag']

        fat_complete = request.GET['fat_complete']
        if fat_complete == "":
            fat_complete = 'NULL'
        else:
            fat_complete ="'" + fat_complete +"'"

        sat_complete = request.GET['sat_complete']
        if sat_complete == "":
            sat_complete = 'NULL'
        else:
            sat_complete ="'" + sat_complete +"'"

        commissioning_complete = request.GET['commissioning_complete']
        if commissioning_complete == "":
            commissioning_complete = 'NULL'
        else:
            commissioning_complete ="'" + commissioning_complete +"'"

        installed_date = request.GET['installed_date']
        if installed_date == "":
            installed_date = 'NULL'
        else:
            installed_date ="'" + installed_date +"'"

        current_time = datetime.datetime.now(pytz.utc)
        
        # Convert the current time to a timestamp with time zone
        p_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        if selectedConnectionUpdateFlag == 'update':
            raw_query = "SELECT fn_update_connection_commercial({}, {}, {}, {}, {}, '{}')".format(
                selected_state_connection_id,  fat_complete, sat_complete, commissioning_complete, installed_date, p_modified_at)
        else:
            raw_query = "SELECT fn_add_connection_commercial({}, {}, {}, {}, {}, '{}')".format(
                selected_state_connection_id,  fat_complete, sat_complete, commissioning_complete, installed_date, p_modified_at)
            
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
            result = True
            all_connection = list(ConnectionState.objects.order_by('connection_identifier').values())
            connection_commercial_state_detail = list(PurchasingConnectionTypeDetail.objects.order_by('connection_type_modifier').values())
        except Exception as e:
            print(e)
            result = False
    
        data = json.dumps(
            {
                'result': result,   
                'all_connection': all_connection,
                'connection_commercial_state_detail':connection_commercial_state_detail,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def updateSystemParameters(request):
    if request.method == 'GET':
        p_id = request.GET['p_id']
        p_value = request.GET['p_value']
        p_label = request.GET['p_label']
        p_comment = request.GET['p_comment']
        if p_comment =='':
            p_comment = 'NULL'
        else:
            p_comment = "'" + p_comment + "'"

        current_time = datetime.datetime.now(pytz.utc)
        p_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_update_system_settings({}, '{}', '{}', {}, '{}')".format(
            p_id, p_label, p_value, p_comment, p_modified_at
        )
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
            
                        
        except Exception as e:
            print(e)
            result = False
    
        system_parameters = list(SystemSetting.objects.order_by('label').values())

        data = json.dumps(
            {
                'result': result,  
                'system_parameters' : system_parameters,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def addSystemParameters(request):
     if request.method == 'GET':       
        p_value = request.GET['p_value']
        p_label = request.GET['p_label']
        p_comment = request.GET['p_comment']
        if p_comment =='':
            p_comment = 'NULL'
        else:
            p_comment = "'" + p_comment + "'"

        current_time = datetime.datetime.now(pytz.utc)
        p_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_add_system_settings('{}', '{}', {}, '{}')".format(
             p_label, p_value, p_comment, p_modified_at
        )
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
            
                        
        except Exception as e:
            print(e)
            result = False
        system_parameters = list(SystemSetting.objects.order_by('label').values())

        data = json.dumps(
            {
                'result': result,  
                'system_parameters' : system_parameters,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def removeSystemParameters(request):
    if request.method == 'GET':
        p_id = request.GET['selectedPId']
        current_time = datetime.datetime.now(pytz.utc)
        p_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_remove_system_settings({})".format(
            p_id
        )
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
            
                        
        except Exception as e:
            print(e)
            result = False
    
        system_parameters = list(SystemSetting.objects.order_by('label').values())

        data = json.dumps(
            {
                'result': result,  
                'system_parameters' : system_parameters,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def updateEquipmentTypeDetail(request):
     if request.method == 'GET':
        p_equipment_type_id = request.GET['equipment_type_id']
        p_equipment_type_label = request.GET['equipment_type_label']
        p_equipment_type_parent_path = request.GET['equipment_type_parent_path']

        if p_equipment_type_parent_path:
                p_equipment_type_parent_path = p_equipment_type_parent_path.replace(',', '.') + '.' + p_equipment_type_id
        else:
            p_equipment_type_parent_path =  p_equipment_type_id
        
        p_equipment_type_description =  request.GET['equipment_type_description']
        p_equipment_type_modifier =  request.GET['equipment_type_modifier']
        equipment_type_manufacturer =  request.GET['equipment_type_manufacturer']
        equipment_type_model =  request.GET['equipment_type_model']
        equipment_type_comment = request.GET['equipment_type_comment'] 
        equipment_type_is_approved = request.GET['equipment_type_is_approved'] 

        current_time = datetime.datetime.now(pytz.utc)
        
        # Convert the current time to a timestamp with time zone
        equipment_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        
        
        raw_query = "SELECT  fn_update_equipment_type({}, '{}', '{}', '{}', '{}', '{}', '{}', '{}', {} , '{}')".format(
            p_equipment_type_id, p_equipment_type_label, p_equipment_type_parent_path, p_equipment_type_description, p_equipment_type_modifier,
             equipment_type_manufacturer , equipment_type_model , equipment_type_comment, equipment_type_is_approved, equipment_modified_at
        ) 
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
            result = True
        except Exception as e:
            print(e)
            result = False
        all_equipment_types = list(EquipmentType.objects.order_by('path').values())
        
        data = json.dumps(
            {
                'result': result,
                'all_equipment_types': all_equipment_types,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def addEquipmentType(request):
     if request.method == 'GET':
        addingEquipmentTypeLabel = request.GET['addingEquipmentTypeLabel']
        addingEquipmentTypeDescription =  request.GET['addingEquipmentTypeDescription']
        addingEquipmentTypeModifier = request.GET['addingEquipmentTypeModifier']        
        addingEquipmentTypeManufacturer =  request.GET['addingEquipmentTypeManufacturer']
        addingEquipmentTypeModel =  request.GET['addingEquipmentTypeModel']
        addingEquipmentTypeComment =  request.GET['addingEquipmentTypeComment']
        addingEquipmentTypeParentPath =  request.GET['addingEquipmentTypeParentPath']
        addingEquipmentTypeApproved = request.GET['addingEquipmentTypeApproved'] 

        current_time = datetime.datetime.now(pytz.utc)
        
        # Convert the current time to a timestamp with time zone
        equipment_type_modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        try:
            query  = 'SELECT max(id) FROM all_equipment_type'
            with connection.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchone()
                
            maximun_id = result[0]
            new_equipment_type_id = maximun_id + 1
            if addingEquipmentTypeParentPath:
                equipment_type_path = addingEquipmentTypeParentPath + '.' + str(new_equipment_type_id)
            else:
                equipment_type_path = str(new_equipment_type_id)
            
            
            raw_query = "SELECT  fn_add_equipment_type({}, '{}', '{}', '{}', '{}', '{}', '{}', '{}', {}, '{}')".format(
                new_equipment_type_id, equipment_type_path, addingEquipmentTypeLabel,addingEquipmentTypeModel, addingEquipmentTypeModifier,
                addingEquipmentTypeManufacturer,addingEquipmentTypeDescription , addingEquipmentTypeComment,addingEquipmentTypeApproved,  equipment_type_modified_at
            ) 
           
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
            return_result = True
        except Exception as e:
            print(e)
            return_result = False
        all_equipment_types = list(EquipmentType.objects.order_by('path').values())
        
        data = json.dumps(
            {
                'result': return_result,
                'all_equipment_types': all_equipment_types,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def removeEquipmentType(request):
    if request.method == 'GET':
        selectedEquipmentTypeId = request.GET['selectedEquipmentTypeId']
        
        raw_query = "SELECT fn_remove_equipment_type({})".format(
            selectedEquipmentTypeId
        )
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
                           
        except Exception as e:
            print(e)
            result = False
    
        all_equipment_types = list(EquipmentType.objects.order_by('path').values())

        data = json.dumps(
            {
                'result': result,  
                'all_equipment_types' : all_equipment_types,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def addEquipmentTypeResource(request):
    if request.method == 'GET':
        addingEquipmentTypeId = request.GET['addingEquipmentTypeId']
        addingResourceId = request.GET['addingResourceId']
        addingEquipmentTypeReourceComment = request.GET['addingEquipmentTypeReourceComment']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_add_type_resource({}, {}, '{}', '{}')".format(
            addingEquipmentTypeId,addingResourceId , addingEquipmentTypeReourceComment, modified_at
        )
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False
    
        
        raw_query = "SELECT  A.type_id, A.resource_id, A.comment, B.modifier , B.description FROM public.all_type_resource as A  \
            left join all_resource B on A.resource_id = B.id \
            where type_id = " + addingEquipmentTypeId + " order by B.modifier"
        
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchall()
            associatedResource = [dict(zip([col[0] for col in cursor.description], row)) for row in results]
    
        data = json.dumps(
            {
                'result': result,  
                'associatedResource': associatedResource,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def removeEquipmentTypeResource(request):
    if request.method == 'GET':
        typeId = request.GET['typeId']
        selectedResourceId = request.GET['selectedResourceId']
        message = ''
        raw_query = "SELECT count(*) FROM type_resource WHERE type_id = {} and resource_id = {}".format(
            typeId, selectedResourceId
        )
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
                counter = results[0]
                if counter > 0:
                    raw_query = 'SELECT fn_remove_type_resource({}, {})'.format(typeId, selectedResourceId)
                    
                    cursor.execute(raw_query)
                    results = cursor.fetchone()
                    result = True        
                else:
                    result = False
                    message = 'This resource is from the Ancestor type. You can not remove this resource.'
        except Exception as e:
            print(e)
            result = False
        
        raw_query = "SELECT  A.type_id, A.resource_id, A.comment, B.modifier , B.description FROM public.all_type_resource as A  \
            left join all_resource B on A.resource_id = B.id \
            where type_id = " + typeId + " order by B.modifier"
        
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchall()
            associatedResource = [dict(zip([col[0] for col in cursor.description], row)) for row in results]
    
        data = json.dumps(
            {
                'result': result,  
                'associatedResource': associatedResource,
                'message': message,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
    
def addEquipmentTypeInterface(request):
    if request.method == 'GET':
        addingTypeId = request.GET['addingTypeId']
        addingResourceId = request.GET['addingResourceId']
        addingInterfaceId = request.GET['addingInterfaceId']
        is_active = request.GET['is_active']
        addingComment = request.GET['addingComment']

        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = 'SELECT id FROM type_resource WHERE type_id = {} and resource_id = {}'.format(
            addingTypeId, addingResourceId
        )

        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            type_resource_id = results[0]
        except Exception as e:
            print(e)
            result = False

        raw_query = "SELECT fn_add_type_interface({}, {}, '{}', {}, '{}')".format(
            type_resource_id, addingInterfaceId, addingComment, is_active, modified_at
        )
        print(raw_query)
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False


        typeInterfacedb = TypeInterface.objects.extra(
            where=[
                "type_id = " + addingTypeId + " and resource_id = " + addingResourceId
            ]
        ).order_by('interface_identifier')

        typeInterfaceList = list(typeInterfacedb.values())

        data = json.dumps(
            {
                'result': result,  
                'associatedInterface': typeInterfaceList,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def removeEquipmentTypeInterface(request):
    if request.method == 'GET':
        typeId = request.GET['typeId']
        selectedResourceId = request.GET['selectedResourceId']
        selectedInterfaceId = request.GET['selectedInterfaceId']

        message = ''
        raw_query = "SELECT id FROM type_resource WHERE type_id = {} and resource_id = {}".format(
            typeId, selectedResourceId
        )
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
                type_resource_id = results[0]
                if type_resource_id:
                    raw_query = 'SELECT count(*) FROM type_interface WHERE type_resource_id = {} and interface_id = {}'.format(type_resource_id, selectedInterfaceId)
                    cursor.execute(raw_query)
                    results = cursor.fetchone()
                    counter = results[0]
                    if counter:
                        raw_query = "SELECT fn_remove_type_interface({}, {})".format(type_resource_id, selectedInterfaceId)
                        cursor.execute(raw_query)
                        results = cursor.fetchone()
                        result = True
                    else:
                        result = False
                        message = 'This resource is from the Ancestor type. You can not remove this resource.'
                else:
                    result = False
                    message = 'This resource is from the Ancestor type. You can not remove this resource.'
        except Exception as e:
            print(e)
            result = False
        
        typeInterfacedb = TypeInterface.objects.extra(
            where=[
                "type_id = " + typeId + " and resource_id = " + selectedResourceId
            ]
        ).order_by('interface_identifier')
        typeInterfaceList = list(typeInterfacedb.values())
        
        data = json.dumps(
            {
                'result': result,  
                'associatedInterface': typeInterfaceList,
                'message': message,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def addResourceGroup(request):
    if request.method == 'GET':
        label = request.GET['label']
        description = request.GET['description']
        reportable = request.GET['is_report']
        comment = request.GET['comment']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT fn_add_resource_group('{}', '{}', {}, '{}', '{}')".format(
            label, description, reportable, comment, modified_at
        )
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False
        all_resource_group = list(ResourceGroup.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_resource_group': all_resource_group,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def updateResourceGroup(request):
     if request.method == 'GET':
        id = request.GET['groupId']
        label = request.GET['label']
        description = request.GET['description']
        reportable = request.GET['is_report']
        comment = request.GET['comment']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT fn_update_resource_group({}, '{}', '{}', {}, '{}', '{}')".format(
            id, label, description, reportable, comment, modified_at
        )
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False
        all_resource_group = list(ResourceGroup.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_resource_group': all_resource_group,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
     
def removeResourceGroup(request):
     if request.method == 'GET':
        group_id = request.GET['groupId']

        raw_query = "SELECT id FROM resource_group WHERE label='Unassigned'"
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchone()
        unAssigneId = results[0]
    
        raw_query = "SELECT fn_update_resource_with_new_group({}, {})".format(group_id, unAssigneId)
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False
        
        raw_query = "SELECT fn_remove_resource_group({})".format(group_id)
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False
        all_resource_group = list(ResourceGroup.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_resource_group': all_resource_group,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
     
def updateReourceDetail(request):
     if request.method == 'GET':
        resourceId = request.GET['resourceId']
        modifier = request.GET['modifier']
        description = request.GET['description']
        resourceGroupId = request.GET['resourceGroupId']
        comment = request.GET['comment']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT fn_update_resource({}, {}, '{}', '{}', '{}', '{}')".format(
            resourceId, resourceGroupId, modifier, description, comment, modified_at
        )
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False
        all_resources = list(Resource.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'all_resources': all_resources,
            } 
        )
        return HttpResponse(data)

def removeResourceFromGroup(request):
    if request.method == 'GET':
        resourceId = request.GET['resourceId']
        modifier = request.GET['modifier']
        description = request.GET['description']
        comment = request.GET['comment']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT id FROM resource_group WHERE label='Unassigned'"
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchone()
        unAssigneId = results[0]

        raw_query = "SELECT fn_update_resource({}, {}, '{}', '{}', '{}', '{}')".format(
            resourceId, unAssigneId, modifier, description, comment, modified_at
        )
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False
        all_resources = list(Resource.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'all_resources': all_resources,
            } 
        )
        return HttpResponse(data)

def updatePropertyDetail(request):
    if request.method == 'GET':
        propertyId = request.GET['propertyId']
        propertyModifier = request.GET['propertyModifier']
        propertyDescription = request.GET['propertyDescription']
        propertyDeValue = request.GET['propertyDeValue']
        propertyDeDataLabelId = request.GET['propertyDeDataLabelId']
        propertyDeComment = request.GET['propertyDeComment']
        propertyReportable = request.GET['propertyReportable']
        
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT fn_update_property({}, '{}', '{}', '{}', {}, '{}', {}, '{}')".format(
            propertyId, propertyModifier, propertyDescription, propertyDeValue, propertyDeDataLabelId, 
            propertyDeComment, propertyReportable, modified_at
        )        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False
        resourceProperty = list(ResouceProperty.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'resourceProperty': resourceProperty,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
     
def addEquipmentProperty(request):
    if request.method == 'GET':
        modifier = request.GET['modifier']
        description = request.GET['description']
        defaultValue = request.GET['defaultValue']
        defaultDataTypeId = request.GET['defaultDataTypeId']
        if defaultDataTypeId == 'none':
            defaultDataTypeId = 'Null'
        reportable = request.GET['reportable']
        comment = request.GET['comment']
        attributeClassId = request.GET['attributeClassId']
        if attributeClassId == 'none':
            attributeClassId = 'Null'
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT fn_add_property('{}', '{}', '{}', {}, '{}', {}, '{}', {})".format(
            modifier, description, defaultValue, defaultDataTypeId, comment, reportable, modified_at, attributeClassId
        )        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False
        resourceProperty = list(ResouceProperty.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'resourceProperty': resourceProperty,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
    
def removeProperty(request):
    if request.method == 'GET':
        propertyId = request.GET['propertyId']
        raw_query = "SELECT fn_remove_property({})".format(
            propertyId
        )        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False
        resourceProperty = list(ResouceProperty.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'resourceProperty': resourceProperty,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
    
def updateResourcePropertyDetail(request):
    if request.method == 'GET':
        propertyId = request.GET['propertyId']
        resourceId = request.GET['resourceId']
        resourceModifier = request.GET['resourceModifier']
        resourceDescription = request.GET['resourceDescription']
        resourceGroupId = request.GET['resourceGroupId']
        resourceComment = request.GET['resourceComment']
        resourcePropertyDefaultValue = request.GET['resourcePropertyDefaultValue']
        resourcePropertyComment = request.GET['resourcePropertyComment']
        resourcePropertyDatatypeId = request.GET['resourcePropertyDatatypeId']
        if resourcePropertyDatatypeId == 'none':
            resourcePropertyDatatypeId = 'Null'
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT fn_update_resource({}, {}, '{}', '{}', '{}', '{}')".format(
            resourceId, resourceGroupId, resourceModifier, resourceDescription, resourceComment, modified_at
        )   
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
                raw_query = "SELECT fn_update_resource_property({}, {}, '{}', {} , '{}', '{}')".format(
                    resourceId, propertyId, resourcePropertyDefaultValue, resourcePropertyDatatypeId, resourcePropertyComment, modified_at
                )
                
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True

        except Exception as e:
            print(e)
            result = False

        resourceProperty = list(ResouceProperty.objects.order_by('modifier').values())
        all_resources = list(Resource.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'resourceProperty': resourceProperty,
                'all_resources': all_resources,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
    
def addResourceProperty(request):
    if request.method == 'GET':
        propertyId = request.GET['propertyId']
        resourceId = request.GET['resourceId']
        resourcePropertyDefaultValue = request.GET['resourcePropertyDefaultValue']
        resourcePropertyComment = request.GET['resourcePropertyComment']
        resourcePropertyDatatypeId = request.GET['resourcePropertyDatatypeId']
        if resourcePropertyDatatypeId == 'none':
            resourcePropertyDatatypeId = 'Null'
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT fn_add_resource_property({}, {}, '{}', {} , '{}', '{}')".format(
                    resourceId, propertyId, resourcePropertyDefaultValue, resourcePropertyDatatypeId, resourcePropertyComment, modified_at
                )  
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
                id = results[0]
            result = True
        except Exception as e:
            print(e)
            result = False

        resourceProperty = list(ResouceProperty.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'resourceProperty': resourceProperty,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def removeResourceProperty(request):
    if request.method == 'GET':
        propertyId = request.GET['propertyId']
        resourceId = request.GET['resourceId']
        raw_query = "SELECT fn_remove_resource_property({}, {})".format(resourceId, propertyId)  
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
              
            result = True
        except Exception as e:
            print(e)
            result = False

        resourceProperty = list(ResouceProperty.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'resourceProperty': resourceProperty,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def updateEquipmentInterfaceDetail(request):
    if request.method == 'GET':
        selectedInterfaceId = request.GET['selectedInterfaceId']
        identifier = request.GET['identifier']
        description = request.GET['description']
        comment = request.GET['comment']
        interfaceClassId = request.GET['interfaceClassId']
        if interfaceClassId == 'none':
            interfaceClassId = 'Null'
        interfaceConnectingClassId = request.GET['interfaceConnectingClassId']
        if interfaceConnectingClassId == 'none':
            interfaceConnectingClassId = 'Null'
        isIntermediate = request.GET['isIntermediate']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT fn_update_interface({}, {}, '{}', '{}' , '{}', '{}', {}, {})".format(
            interfaceClassId, interfaceConnectingClassId, identifier, description, comment, modified_at, isIntermediate, selectedInterfaceId
        )  
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
              
            result = True
        except Exception as e:
            print(e)
            result = False

        all_interfaces = list(Interface.objects.order_by('identifier').values())
        data = json.dumps(
            {
                'result': result,  
                'all_interfaces': all_interfaces,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
    
def addInterfaceDetail(request):
      if request.method == 'GET':
        identifier = request.GET['identifier']
        description = request.GET['description']
        comment = request.GET['comment']
        classId = request.GET['classId']
        if classId == 'none':
            classId = 'Null'
        connectingClassId = request.GET['connectingClassId']
        if connectingClassId == 'none':
            connectingClassId = 'Null'
        isIntermediate = request.GET['isIntermediate']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT fn_add_interface({}, {}, '{}', '{}' , '{}', '{}', {})".format(
            classId, connectingClassId, identifier, description, comment, modified_at, isIntermediate
        )  
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
              
            result = True
        except Exception as e:
            print(e)
            result = False

        all_interfaces = list(Interface.objects.order_by('identifier').values())
        data = json.dumps(
            {
                'result': result,  
                'all_interfaces': all_interfaces,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def removeEquipmentInterface(request):
    if request.method == 'GET':
        selectedInterfaceId = request.GET['selectedInterfaceId']

        raw_query = "SELECT fn_remove_interface({})".format(selectedInterfaceId)  
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
              
            result = True
        except Exception as e:
            print(e)
            result = False

        all_interfaces = list(Interface.objects.order_by('identifier').values())
        data = json.dumps(
            {
                'result': result,  
                'all_interfaces': all_interfaces,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
    
def updateInterfaceClassDetail(request):
    if request.method == 'GET':
        id = request.GET['id']
        label = request.GET['label']
        description = request.GET['description']
        comment = request.GET['comment']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_update_attribute_class({},  '{}', '{}' , '{}', '{}')".format(
           id, label, description, comment, modified_at
        )  
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        all_interface_classes = list(InterfaceClass.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_interface_classes': all_interface_classes,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
    
def addInterfaceClass(request):
    if request.method == 'GET':
        label = request.GET['label']
        description = request.GET['description']
        comment = request.GET['comment']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_add_attribute_class('{}', '{}' , '{}', '{}')".format(
            label, description, comment, modified_at
        ) 
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        all_interface_classes = list(InterfaceClass.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_interface_classes': all_interface_classes,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def removeInterfaceClassDetail(request):
     if request.method == 'GET':
        id = request.GET['id']       
        raw_query = "SELECT fn_remove_attribute_class({})".format(id)
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False
        all_interface_classes = list(InterfaceClass.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_interface_classes': all_interface_classes,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data)
# Custom JSON encoder to handle datetime objects
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.date):
            return obj.isoformat()
        return super().default(obj)