from django.http import HttpResponse
from django.shortcuts import render
from .models import AllEquipment , EquipmentType, PurchasingConnectionType, PurchasingEquipmentType , AllConnection, ConnectionType, PurchasingEquipmentTypeDetail, PurchasingConnectionTypeDetail , ConnectionState, EquipmentState, Interface , SystemSetting , TypeInterface , Resource, ResourceGroup, ResouceProperty, DataType, InterfaceClass, TargetSystem, PossibleState, Authority, AttributeClass, CustomUser, Property
from django.db import connection
import datetime
import json
import pytz
import csv

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

def system_users(request):
    page = 'system'
    users = list(CustomUser.objects.values('username', 'first_name', 'last_name', 'email', 'date_joined'))
    # users = list(CustomUser.objects.values())
    context = {
        'title': 'System Users',
        'page': page,
        'system_users': users
    }
    return render(request, 'system_users.html', context=context)

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
    all_property = list(Property.objects.order_by('modifier').values())
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
        'all_property':all_property,
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

def definitions_attribute_classes(request):
    page = 'definitions'
    sidebar_title = 'attribute_classes'
    all_attributeClass = list(AttributeClass.objects.order_by('attribute_class_label').values())
    context = {
        'title': 'Definitions',
        'page': page,
        'sidebar_title': sidebar_title,
        'all_attributeClass': all_attributeClass,
    }
    
    return render(request, 'definitions_attribute_classes.html', context=context)

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
        raw_query = "SELECT A.id, A.type_id, A.resource_id, A.comment, B.modifier , B.description FROM public.all_type_resource as A  \
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
    message = ''
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
        equipment_reason = request.GET['equipment_reason']
        equipment_added_by = request.GET['equipment_added_by']
       
        try:
            with connection.cursor() as cursor:
                with connection.cursor() as cursor:
                    cursor.execute("CALL proc_modify_equipment('{}','{}','{}',{},'{}','{}',{},'{}','{}','{}','{}')".format(
                        equipment_added_by,
                        equipment_reason,
                        equipment_local_identifier, 
                        equipment_id,
                        equipment_path,
                        equipment_location_path,
                        equipment_type_id,
                        equipment_description,
                        equipment_comment,
                        equipment_use_parent_identifier,
                        equipment_is_approved
                    ))
                return_result = True
        except Exception as e:
            print(e)
            message = str(e)
            return_result = False
        all_equipment = list(AllEquipment.objects.order_by('equipment_sort_identifier').values())
        
        data = json.dumps(
            {
                'result': return_result,
                'equipment_list': all_equipment,
                'message': message,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)
       
def add_equipment_detail(request):
    message = ''
    if request.method == 'GET':
        equipment_local_identifier = request.GET['equipment_local_identifier']
        equipment_parent_path =  request.GET['equipment_parent_path']
        equipment_use_parent_identifier = request.GET['equipment_use_parent_identifier']        
        equipment_description =  request.GET['equipment_description']
        equipment_location_path =  request.GET['equipment_location_path']
        equipment_type_id =  request.GET['equipment_type_id']
        equipment_comment =  request.GET['equipment_comment']
        equipment_is_approved = request.GET['equipment_is_approved'] 
        equipment_reason = request.GET['equipment_reason']
        equipment_added_by = request.GET['equipment_added_by']
        
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
        
            try:
                with connection.cursor() as cursor:
                    cursor.execute("CALL proc_modify_equipment('{}','{}','{}',null,'{}','{}',{},'{}','{}','{}','{}')".format(
                        equipment_added_by,
                        equipment_reason,
                        equipment_local_identifier, 
                        equipment_path,
                        equipment_location_path,
                        equipment_type_id,
                        equipment_description,
                        equipment_comment,
                        equipment_use_parent_identifier,
                        equipment_is_approved
                    ))
                return_result = True
            except Exception as e:                
                message =str(e)
                return_result = False
        except Exception as e:
            message = str(e)
            return_result = False
        all_equipment = list(AllEquipment.objects.order_by('equipment_sort_identifier').values())
        
        data = json.dumps(
            {
                'result': return_result,
                'equipment_list': all_equipment,
                'message': message
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
    message = ''
    if request.method == 'GET':
        equipment_id = request.GET['equipment_id']
        modified_by = request.GET['modified_by']
        remove_reason = request.GET['remove_reason']
        remove_option = request.GET['remove_option']

        try:
            result = True
            with connection.cursor() as cursor:
                 cursor.execute("CALL proc_remove_equipment('{}','{}',{},'{}')".format(
                        modified_by,
                        remove_reason,
                        equipment_id, 
                        remove_option
                    ))
                
        except Exception as e:
            message = str(e)
            result = False
        
        all_equipment = list(AllEquipment.objects.order_by('equipment_sort_identifier').values())
        
        data = json.dumps(
            {
                'result': result,
                'equipment_list': all_equipment,
                'message': message
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def update_connection_detail(request):
    message = ''
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
        
        connection_reason = request.GET['connection_reason']
        connection_added_by = request.GET['connection_added_by']

        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_modify_connection('{}','{}','{}',{},'{}',{},{},{},{},{}, '{}', {}, '{}', {}, {})".format(
                        connection_added_by,
                        connection_reason,
                        connection_identifier, 
                        connection_id,
                        connection_path,
                        connection_type_id,
                        connection_start_equipment_id,
                        connection_start_interface_id,
                        connection_end_equipment_id,
                        connection_end_interface_id,
                        connection_description,
                        connection_length,
                        connection_comment,
                        connection_use_parent_identifier,
                        connection_is_approved
                    ))

            return_result = True

            result = True
        except Exception as e:
            message = str(e)
            result = False

        all_connection = list(AllConnection.objects.order_by('connection_identifier').values())
        
        data = json.dumps(
            {
                'result': result,
                'connection_list': all_connection,
                'message': message,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def add_connection(request):
    message = ''
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
        
        connection_reason = request.GET['connection_reason']
        connection_added_by = request.GET['connection_added_by']

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
            
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_modify_connection('{}','{}','{}',null,'{}',{},{},{},{},{}, '{}', {}, '{}', {}, {})".format(
                        connection_added_by,
                        connection_reason,
                        connection_local_identifier, 
                        connection_path,
                        connection_type_id,
                        connection_start_equipment_id,
                        connection_start_interface_id,
                        connection_end_equipment_id,
                        connection_end_interface_id,
                        connection_description,
                        connection_length,
                        connection_comment,
                        connection_use_parent_identifier,
                        connection_is_approved
                    ))

            return_result = True
        except Exception as e:
            message = str(e)
            return_result = False
        all_connection = list(AllConnection.objects.order_by('connection_identifier').values())
        
        data = json.dumps(
            {
                'result': return_result,
                'connection_list': all_connection,
                'message': message
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def remove_connection(request):
    message = ''
    if request.method == 'GET':
        connection_id = request.GET['connection_id']
        modified_by = request.GET['modified_by']
        remove_reason = request.GET['remove_reason']
        remove_option = request.GET['remove_option']

        try:
            result = True
            with connection.cursor() as cursor:
                 cursor.execute("CALL proc_remove_connection('{}','{}',{},'{}')".format(
                        modified_by,
                        remove_reason,
                        connection_id, 
                        remove_option
                    ))
                
        except Exception as e:
            message = str(e)
            result = False        
        all_connection = list(AllConnection.objects.order_by('connection_identifier').values())
        
        data = json.dumps(
            {
                'result': result,
                'connection_list': all_connection,
                'message': message
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
    message = ''
    if request.method == 'GET':
        p_id = request.GET['p_id']
        p_value = request.GET['p_value']
        p_label = request.GET['p_label']
        p_comment = request.GET['p_comment']
        p_reason = request.GET['p_reason']
        p_user = request.GET['p_user']

        if p_comment =='':
            p_comment = 'NULL'

        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_modify_system_settings('{}','{}','{}','{}',{},'{}')".format(
                        p_user,
                        p_reason,
                        p_label, 
                        p_value,
                        p_id,
                        p_comment
                    ))
                
            result = True
            
                        
        except Exception as e:
            message = str(e)
            result = False
    
        system_parameters = list(SystemSetting.objects.order_by('label').values())

        data = json.dumps(
            {
                'result': result,  
                'system_parameters' : system_parameters,
                'message': message
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def addSystemParameters(request):
    message = ''
    if request.method == 'GET':       
        p_value = request.GET['p_value']
        p_label = request.GET['p_label']
        p_comment = request.GET['p_comment']
        p_reason = request.GET['p_reason']
        p_user = request.GET['p_user']

        if p_comment =='':
            p_comment = 'NULL'

        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_modify_system_settings('{}','{}','{}','{}',null,'{}')".format(
                        p_user,
                        p_reason,
                        p_label, 
                        p_value,
                        p_comment
                    ))
            result = True
            
                        
        except Exception as e:
            message = str(e)
            result = False
        system_parameters = list(SystemSetting.objects.order_by('label').values())

        data = json.dumps(
            {
                'result': result,  
                'system_parameters' : system_parameters,
                'message': message
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def removeSystemParameters(request):
    message = ''
    if request.method == 'GET':
        p_id = request.GET['selectedPId']
        p_reason = request.GET['p_reason']
        p_user = request.GET['p_user']
       
        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_remove_system_settings('{}','{}',{})".format(
                        p_user,
                        p_reason,
                        p_id
                    ))
                
            result = True
            
                        
        except Exception as e:
            message = str(e)
            result = False
    
        system_parameters = list(SystemSetting.objects.order_by('label').values())

        data = json.dumps(
            {
                'result': result,  
                'system_parameters' : system_parameters,
                'message': message
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def updateEquipmentTypeDetail(request):
    message = ''
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
        p_equipment_type_manufacturer =  request.GET['equipment_type_manufacturer']
        p_equipment_type_model =  request.GET['equipment_type_model']
        p_equipment_type_comment = request.GET['equipment_type_comment'] 
        p_equipment_type_is_approved = request.GET['equipment_type_is_approved'] 
        p_equipment_type_reason = request.GET['equipment_type_reason'] 
        p_equipment_type_modified_by = request.GET['equipment_type_modified_by'] 
        
        try:
            with connection.cursor() as cursor:
                 cursor.execute("CALL proc_modify_equipment_type('{}','{}','{}','{}',{},'{}','{}','{}','{}','{}',{})".format(
                        p_equipment_type_modified_by,
                        p_equipment_type_reason,
                        p_equipment_type_label, 
                        p_equipment_type_description,
                        p_equipment_type_id,
                        p_equipment_type_parent_path,
                        p_equipment_type_modifier,
                        p_equipment_type_model,
                        p_equipment_type_manufacturer,
                        p_equipment_type_comment,
                        p_equipment_type_is_approved,
                    ))

            result = True
        except Exception as e:
            message = str(e)
            result = False
        all_equipment_types = list(EquipmentType.objects.order_by('path').values())
        
        data = json.dumps(
            {
                'result': result,
                'all_equipment_types': all_equipment_types,
                'message': message
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def addEquipmentType(request):
    message = ''
    if request.method == 'GET':
        addingEquipmentTypeLabel = request.GET['addingEquipmentTypeLabel']
        addingEquipmentTypeDescription =  request.GET['addingEquipmentTypeDescription']
        addingEquipmentTypeModifier = request.GET['addingEquipmentTypeModifier']        
        addingEquipmentTypeManufacturer =  request.GET['addingEquipmentTypeManufacturer']
        addingEquipmentTypeModel =  request.GET['addingEquipmentTypeModel']
        addingEquipmentTypeComment =  request.GET['addingEquipmentTypeComment']
        addingEquipmentTypeParentPath =  request.GET['addingEquipmentTypeParentPath']
        addingEquipmentTypeApproved = request.GET['addingEquipmentTypeApproved'] 
        addingEquipmentTypeReason =  request.GET['addingEquipmentTypeReason']
        addingEquipmentTypeModifiedBy =  request.GET['addingEquipmentTypeModifiedBy']

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
            
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_modify_equipment_type('{}','{}','{}','{}',null,'{}','{}','{}','{}','{}',{})".format(
                        addingEquipmentTypeModifiedBy,
                        addingEquipmentTypeReason,
                        addingEquipmentTypeLabel, 
                        addingEquipmentTypeDescription,
                        equipment_type_path,
                        addingEquipmentTypeModifier,
                        addingEquipmentTypeModel,
                        addingEquipmentTypeManufacturer,
                        addingEquipmentTypeComment,
                        addingEquipmentTypeApproved,
                    ))
                
            return_result = True
        except Exception as e:
            message = str(e)
            return_result = False
        all_equipment_types = list(EquipmentType.objects.order_by('path').values())
        
        data = json.dumps(
            {
                'result': return_result,
                'all_equipment_types': all_equipment_types,
                'message': message
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def removeEquipmentType(request):
    message = ''
    if request.method == 'GET':
        selectedEquipmentTypeId = request.GET['selectedEquipmentTypeId']
        equipmentTypeRemoveReason = request.GET['equipmentTypeRemoveReason']
        equipmentTypeRemoveOption = request.GET['equipmentTypeRemoveOption']
        equipmentTypeRemovedBy = request.GET['equipmentTypeRemovedBy']

        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_remove_equipment_type('{}','{}',{},'{}')".format(
                       equipmentTypeRemovedBy,
                       equipmentTypeRemoveReason,
                       selectedEquipmentTypeId,
                       equipmentTypeRemoveOption
                ))

            result = True
                           
        except Exception as e:
            message = str(e)
            result = False
    
        all_equipment_types = list(EquipmentType.objects.order_by('path').values())

        data = json.dumps(
            {
                'result': result,  
                'all_equipment_types' : all_equipment_types,
                'message': message
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def addEquipmentTypeResource(request):
    message = ''
    if request.method == 'GET':
        addingEquipmentTypeId = request.GET['addingEquipmentTypeId']
        addingResourceId = request.GET['addingResourceId']
        addingEquipmentTypeReourceComment = request.GET['addingEquipmentTypeReourceComment']
        addingEquipmentTypeReourceReason = request.GET['addingEquipmentTypeReourceReason']
        addingEquipmentTypeReourceBy = request.GET['addingEquipmentTypeReourceBy']

        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_modify_type_resource('{}','{}',null,{},{},'{}')".format(
                        addingEquipmentTypeReourceBy,
                        addingEquipmentTypeReourceReason,
                        addingEquipmentTypeId, 
                        addingResourceId,
                        addingEquipmentTypeReourceComment,
                    ))            
            result = True
        except Exception as e:
            message = str(e)
            result = False
    
        
        raw_query = "SELECT A.id, A.type_id, A.resource_id, A.comment, B.modifier , B.description FROM public.all_type_resource as A  \
            left join all_resource B on A.resource_id = B.id \
            where type_id = " + addingEquipmentTypeId + " order by B.modifier"
        
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchall()
            associatedResource = [dict(zip([col[0] for col in cursor.description], row)) for row in results]
    
        data = json.dumps(
            {
                'result': result,  
                'message': message,
                'associatedResource': associatedResource,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def removeEquipmentTypeResource(request):
    if request.method == 'GET':
        typeResourceId = request.GET['typeResourceId']
        typeId = request.GET['typeId']
        typeResourceReason = request.GET['typeResourceReason']
        typeResource_modified_by = request.GET['typeResource_modified_by']
        typeResourceOption = request.GET['typeResourceOption']
        message = ''
        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_remove_type_resource('{}','{}',{},'{}')".format(
                        typeResource_modified_by,
                        typeResourceReason,
                        typeResourceId,
                        typeResourceOption
                    )) 
                result = True
        except Exception as e:
            message = str(e)
            result = False
        
        raw_query = "SELECT  A.id, A.type_id, A.resource_id, A.comment, B.modifier , B.description FROM public.all_type_resource as A  \
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
    message = ''
    if request.method == 'GET':
        addingTypeResourceId = request.GET['addingTypeResourceId']      
        addingInterfaceId = request.GET['addingInterfaceId']
        is_active = request.GET['is_active']
        addingComment = request.GET['addingComment']
        addingReason = request.GET['addingReason']
        addingBy = request.GET['addingBy']

        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_modify_type_interface('{}','{}',null,{}, {}, '{}', {})".format(
                        addingBy,
                        addingReason,
                        addingTypeResourceId,
                        addingInterfaceId,
                        addingComment, 
                        is_active
                    ))                
            result = True
        except Exception as e:
            message = str(e)
            result = False

        typeInterfacedb = TypeInterface.objects.extra(
            where=[
                "type_resource_id = " + addingTypeResourceId 
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

def removeEquipmentTypeInterface(request):
    if request.method == 'GET':
        selectedTypeInterfaceId = request.GET['selectedTypeInterfaceId']
        reason = request.GET['reason']
        removed_by = request.GET['removed_by']
        typeResourceId = request.GET['typeResourceId']
        message = ''
       
        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_remove_type_interface('{}','{}', {})".format(
                        removed_by,
                        reason,
                        selectedTypeInterfaceId,
                    ))    
                result = True
        except Exception as e:
            message = str(e)
            result = False
        
        typeInterfacedb = TypeInterface.objects.extra(
            where=[
                "type_resource_id = " + typeResourceId
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
    message = ''
    if request.method == 'GET':
        label = request.GET['label']
        description = request.GET['description']
        reportable = request.GET['is_report']
        comment = request.GET['comment']
        reason = request.GET['reason']
        addedBy = request.GET['addedBy']

        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_modify_resource_group('{}','{}','{}', '{}', null, '{}', {})".format(
                        addedBy,
                        reason,
                        label,
                        description,
                        comment, 
                        reportable
                    ))
                
            result = True
        except Exception as e:
            message = str(e)
            result = False
        all_resource_group = list(ResourceGroup.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_resource_group': all_resource_group,
                'message': message
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def updateResourceGroup(request):
     message = ''
     if request.method == 'GET':
        id = request.GET['groupId']
        label = request.GET['label']
        description = request.GET['description']
        reportable = request.GET['is_report']
        comment = request.GET['comment']
        modifiedBy = request.GET['modifiedBy']
        reason = request.GET['reason']
       
        try:
            with connection.cursor() as cursor:
                 cursor.execute("CALL proc_modify_resource_group('{}','{}','{}', '{}', {}, '{}', {})".format(
                        modifiedBy,
                        reason,
                        label,
                        description,
                        id,
                        comment, 
                        reportable
                    ))
            result = True
        except Exception as e:
            message = str(e)
            result = False
        all_resource_group = list(ResourceGroup.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_resource_group': all_resource_group,
                'message': message,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
     
def removeResourceGroup(request):
     message = ''
     if request.method == 'GET':
        group_id = request.GET['groupId']
        modifiedBy = request.GET['modifiedBy']
        reason = request.GET['reason']
      
        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_remove_resource_group('{}','{}', {})".format(
                        modifiedBy,
                        reason,
                        group_id,
                    )) 
              
            result = True
        except Exception as e:
            message = str(e)
            result = False
        all_resource_group = list(ResourceGroup.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_resource_group': all_resource_group,
                'message': message,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
     
def updateResourceDetail(request):
     message = ''
     if request.method == 'GET':
        resourceId = request.GET['resourceId']
        modifier = request.GET['modifier']
        description = request.GET['description']
        resourceGroupId = request.GET['resourceGroupId']
        comment = request.GET['comment']
        reason = request.GET['reason']
        modifiedBy = request.GET['modifiedBy']
        try:
            with connection.cursor() as cursor:
               cursor.execute("CALL proc_modify_resource('{}','{}', '{}', {}, {}, '{}', '{}')".format(
                        modifiedBy,
                        reason,
                        description,
                        resourceId,
                        resourceGroupId,
                        modifier,
                        comment
                    )) 
            result = True
        except Exception as e:
            message = str(e)
            result = False
        all_resources = list(Resource.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'all_resources': all_resources,
                'message': message
            } 
        )
        return HttpResponse(data)

def removeResourceFromGroup(request):
    message = ''
    if request.method == 'GET':
        resourceId = request.GET['resourceId']
        modifier = request.GET['modifier']
        description = request.GET['description']
        comment = request.GET['comment']
        reason = request.GET['reason']
        modifiedBy = request.GET['modifiedBy']

        raw_query = "SELECT id FROM resource_group WHERE label='Unassigned'"
        with connection.cursor() as cursor:
            cursor.execute(raw_query)
            results = cursor.fetchone()
        unAssigneId = results[0]

        try:
            with connection.cursor() as cursor:
                 cursor.execute("CALL proc_modify_resource('{}','{}', '{}', {}, {}, '{}', '{}')".format(
                        modifiedBy,
                        reason,
                        description,
                        resourceId,
                        unAssigneId,
                        modifier,
                        comment
                    )) 
            result = True
        except Exception as e:
            message = str(e)
            result = False
        all_resources = list(Resource.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'all_resources': all_resources,
                'message': message,
            } 
        )
        return HttpResponse(data)

def updatePropertyDetail(request):
    message = ''
    if request.method == 'GET':
        propertyId = request.GET['propertyId']
        propertyModifier = request.GET['propertyModifier']
        propertyDescription = request.GET['propertyDescription']
        propertyValue = request.GET['propertyValue']
        propertyDataLabelId = request.GET['propertyDataLabelId']
        if propertyDataLabelId == 'none':
            propertyDataLabelId = 'Null'
        propertyComment = request.GET['propertyComment']
        propertyReportable = request.GET['propertyReportable']
        modifiedBy = request.GET['modifiedBy']
        reason = request.GET['reason']
        

        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_modify_property('{}','{}', '{}', {} , '{}', '{}', {}, '{}', {})".format(
                        modifiedBy,
                        reason,
                        propertyDescription,
                        propertyId,
                        propertyModifier,
                        propertyValue,
                        propertyDataLabelId,
                        propertyComment,
                        propertyReportable
                    ))   
                
            result = True
        except Exception as e:
            message = str(e)
            result = False
        all_property = list(Property.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'all_property': all_property,
                'message': message
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
     
def addEquipmentProperty(request):
    message = ''
    if request.method == 'GET':
        modifier = request.GET['modifier']
        description = request.GET['description']
        defaultValue = request.GET['defaultValue']
        defaultDataTypeId = request.GET['defaultDataTypeId']
        if defaultDataTypeId == 'none':
            defaultDataTypeId = 'Null'
        reportable = request.GET['reportable']
        comment = request.GET['comment']
        adding_property_reason = request.GET['adding_property_reason']
        addedBy = request.GET['addedBy']
      
        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL proc_modify_property('{}','{}', '{}', null , '{}', '{}', {}, '{}', {})".format(
                        addedBy,
                        adding_property_reason,
                        description,
                        modifier,
                        defaultValue,
                        defaultDataTypeId,
                        comment,
                        reportable
                    ))    

            result = True
        except Exception as e:
            message = str(e)
            result = False
        all_property = list(Property.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'all_property': all_property,
                'message': message,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
    
def removeProperty(request):
    message = ''
    if request.method == 'GET':
        propertyId = request.GET['propertyId']
        reason = request.GET['reason']
        option = request.GET['option']
        user = request.GET['user']
              
        try:
            with connection.cursor() as cursor:
                 cursor.execute("CALL proc_remove_property('{}','{}',  {} , '{}')".format(
                        user,
                        reason,
                        propertyId,
                        option
                    )) 
                
            result = True
        except Exception as e:
            message =  str(e)
            result = False
        
        all_property = list(Property.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'all_property': all_property,
                'message': message
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
    
def updateResourcePropertyDetail(request):
    message = ''
    if request.method == 'GET':
        propertyId = request.GET['propertyId']
        resourceId = request.GET['resourceId']
        resourcePropertyDefaultValue = request.GET['resourcePropertyDefaultValue']
        resourcePropertyComment = request.GET['resourcePropertyComment']
        resourcePropertyDatatypeId = request.GET['resourcePropertyDatatypeId']
        if resourcePropertyDatatypeId == 'none':
            resourcePropertyDatatypeId = 'Null'
        modifiedBy = request.GET['modifiedBy']
        reason = request.GET['reason']
        raw_query = "SELECT id FROM resource_property where resource_id = {} and property_id = {}".format(resourceId, propertyId)  
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
                resorcuePropertyId = results[0]
                cursor.execute("CALL proc_modify_resource_property('{}','{}', {} , {} , {}, '{}', {}, '{}')".format(
                        modifiedBy,
                        reason,
                        resorcuePropertyId,
                        resourceId,
                        propertyId,
                        resourcePropertyDefaultValue,
                        resourcePropertyDatatypeId,
                        resourcePropertyComment
                    )) 

            result = True

        except Exception as e:
            message = str(e)
            result = False

        resourceProperty = list(ResouceProperty.objects.order_by('modifier').values())
        all_resources = list(Resource.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'resourceProperty': resourceProperty,
                'all_resources': all_resources,
                'message': message,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
    
def addResourceProperty(request):
    message = ''
    if request.method == 'GET':
        propertyId = request.GET['propertyId']
        resourceId = request.GET['resourceId']
        resourcePropertyDefaultValue = request.GET['resourcePropertyDefaultValue']
        resourcePropertyComment = request.GET['resourcePropertyComment']
        resourcePropertyDatatypeId = request.GET['resourcePropertyDatatypeId']
        addedBy = request.GET['addedBy']
        reason = request.GET['reason']
        if resourcePropertyDatatypeId == 'none':
            resourcePropertyDatatypeId = 'Null'
       
        try:
            with connection.cursor() as cursor:
              
                cursor.execute("CALL proc_modify_resource_property('{}','{}', null, {} , {}, '{}', {}, '{}')".format(
                        addedBy,
                        reason,
                        resourceId,
                        propertyId,
                        resourcePropertyDefaultValue,
                        resourcePropertyDatatypeId,
                        resourcePropertyComment
                    )) 
            result = True
        except Exception as e:
            message = str(e)
            result = False

        resourceProperty = list(ResouceProperty.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'resourceProperty': resourceProperty,
                'message': message,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def removeResourceProperty(request):
    message = ''
    if request.method == 'GET':
        propertyId = request.GET['propertyId']
        resourceId = request.GET['resourceId']
        reason = request.GET['reason']
        option = request.GET['option']
        modifiedBy = request.GET['modifiedBy']
        raw_query = "SELECT id FROM resource_property where resource_id = {} and property_id = {}".format(resourceId, propertyId)  
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
                resorcuePropertyId = results[0]
                cursor.execute("CALL proc_remove_resource_property('{}','{}', {} ,'{}')".format(
                        modifiedBy,
                        reason,
                        resorcuePropertyId,
                        option
                    )) 
            result = True
        except Exception as e:
            message = str(e)
            result = False

        resourceProperty = list(ResouceProperty.objects.order_by('modifier').values())
        data = json.dumps(
            {
                'result': result,  
                'resourceProperty': resourceProperty,
                'message': message,
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
    
def updateAttributeClassDetail(request):
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

        all_attributeClass = list(AttributeClass.objects.order_by('attribute_class_label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_attributeClass': all_attributeClass,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
    
def addAttributeClass(request):
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

        all_attributeClass = list(AttributeClass.objects.order_by('attribute_class_label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_attributeClass': all_attributeClass,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def removeAttributeClassDetail(request):
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
        all_attributeClass = list(AttributeClass.objects.order_by('attribute_class_label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_attributeClass': all_attributeClass,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def updateConnectionTypeDetail(request):
    if request.method == 'GET':
        id = request.GET['id']
        label = request.GET['label']
        parentPath = request.GET['parentPath']
        if parentPath:
            parentPath = parentPath.replace(',', '.') + '.' + id
        else:
            parentPath =  id
        description =  request.GET['description']
        modifier =  request.GET['modifier']
        manufacturer =  request.GET['manufacturer']
        model =  request.GET['model']
        comment = request.GET['comment'] 
        is_approved = request.GET['isApproved'] 

        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query = "SELECT  fn_update_connection_type({}, '{}', '{}', '{}', '{}', '{}', '{}', '{}', {} , '{}')".format(
            id, parentPath, label, model, modifier,manufacturer , description , comment, is_approved, modified_at
        ) 
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()

            result = True
        except Exception as e:
            print(e)
            result = False
        all_connection_types = list(ConnectionType.objects.order_by('path').values())
        data = json.dumps(
            {
                'result': result,
                'all_connection_types': all_connection_types,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def addConnectionType(request):
     if request.method == 'GET':
        label = request.GET['label']
        parentPath = request.GET['parentPath']
        description =  request.GET['description']
        modifier =  request.GET['modifier']
        manufacturer =  request.GET['manufacturer']
        model =  request.GET['model']
        comment = request.GET['comment'] 
        is_approved = request.GET['isApproved'] 

        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

        raw_query  = 'SELECT max(id) FROM all_connection_type'
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                result = cursor.fetchone()
                
                maximun_id = result[0]
                new_connection_type_id = maximun_id + 1
                if parentPath:
                    new_type_path = parentPath + '.' + str(new_connection_type_id)
                else:
                    new_type_path = str(new_connection_type_id)
                raw_query = "SELECT  fn_add_connection_type({}, '{}', '{}', '{}', '{}', '{}', '{}', '{}', {} , '{}')".format(
                    new_connection_type_id, new_type_path, label, model, modifier, manufacturer , description , comment, is_approved, modified_at
                ) 
                
                with connection.cursor() as cursor:
                    cursor.execute(raw_query)
                    results = cursor.fetchall()

                result = True
        except Exception as e:
            print(e)
            result = False
        all_connection_types = list(ConnectionType.objects.order_by('path').values())
        data = json.dumps(
            {
                'result': result,
                'all_connection_types': all_connection_types,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def removeConnectionTypeDetail(request):
     if request.method == 'GET':
        id = request.GET['id']
        raw_query = "SELECT  fn_remove_connection_type({})".format(id)
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchall()
                
            result = True
        except Exception as e:
            print(e)
            result = False
        all_connection_types = list(ConnectionType.objects.order_by('path').values())
        data = json.dumps(
            {
                'result': result,
                'all_connection_types': all_connection_types,
            }, 
            cls=DateTimeEncoder
        )
        return HttpResponse(data)

def updateTargetSystemDetail(request):
     if request.method == 'GET':
        id = request.GET['id']
        label = request.GET['label']
        value = request.GET['value']
        comment = request.GET['comment']
        if comment =='':
            comment = 'NULL'
        else:
            comment = "'" + comment + "'"
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_update_system_settings({},  '{}', '{}' , {}, '{}')".format(
           id, label, value, comment, modified_at
        )  
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        target_systems = list(TargetSystem.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'target_systems': target_systems,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def addTargetSystemDetail(request):
    if request.method == 'GET':
        label = request.GET['label']
        value = request.GET['value']
        comment = request.GET['comment']
        if comment =='':
            comment = 'NULL'
        else:
            comment = "'" + comment + "'"
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_add_system_settings('{}', '{}' , {}, '{}')".format(
            label, value, comment, modified_at
        )  
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        target_systems = list(TargetSystem.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'target_systems': target_systems,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def removeTargetSystemDetail(request):
    if request.method == 'GET':
        id = request.GET['id']
        raw_query = "SELECT fn_remove_system_settings( {})".format(id)          
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        target_systems = list(TargetSystem.objects.order_by('label').values())
        data = json.dumps(
            {
                'result': result,  
                'target_systems': target_systems,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def updateDataTypeDetail(request):
     if request.method == 'GET':
        id = request.GET['id']
        label = request.GET['label']
        control_1 = request.GET['control_1']
        control_2 = request.GET['control_2']
        control_3 = request.GET['control_3']
        control_4 = request.GET['control_4']
        control_5 = request.GET['control_5']
        scada_1 = request.GET['scada_1']
        scada_2 = request.GET['scada_2']
        scada_3 = request.GET['scada_3']
        scada_4 = request.GET['scada_4']
        scada_5 = request.GET['scada_5']
        description = request.GET['description']
        comment = request.GET['comment']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_update_datatype({},  '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}' , '{}', '{}', '{}')".format(
           id, label, scada_1, scada_2, scada_3, scada_4, scada_5, control_1, control_2, control_3, control_4, control_5, comment, modified_at, description
        )  
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        all_datatype = list(DataType.objects.values())
        data = json.dumps(
            {
                'result': result,  
                'all_datatype': all_datatype ,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def addDataType(request):
    if request.method == 'GET':
        label = request.GET['label']
        control_1 = request.GET['control_1']
        control_2 = request.GET['control_2']
        control_3 = request.GET['control_3']
        control_4 = request.GET['control_4']
        control_5 = request.GET['control_5']
        scada_1 = request.GET['scada_1']
        scada_2 = request.GET['scada_2']
        scada_3 = request.GET['scada_3']
        scada_4 = request.GET['scada_4']
        scada_5 = request.GET['scada_5']
        description = request.GET['description']
        comment = request.GET['comment']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_add_datatype('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}' , '{}', '{}', '{}')".format(
           label, scada_1, scada_2, scada_3, scada_4, scada_5, control_1, control_2, control_3, control_4, control_5, comment, modified_at, description
        )  
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        all_datatype = list(DataType.objects.values())
        data = json.dumps(
            {
                'result': result,  
                'all_datatype': all_datatype ,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def removeDataTypeDetail(request):
    if request.method == 'GET':
        id = request.GET['id']
        raw_query = "SELECT fn_remove_datatype({})".format( id )  
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        all_datatype = list(DataType.objects.values())
        data = json.dumps(
            {
                'result': result,  
                'all_datatype': all_datatype ,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def updateAuthorityDetail(request):
     if request.method == 'GET':
        id = request.GET['id']
        label = request.GET['label']
        description = request.GET['description']
        comment = request.GET['comment']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_update_authority({},  '{}', '{}', '{}', '{}')".format(
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

        all_authority = list(Authority.objects.order_by('authority_label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_authority': all_authority ,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def addAuthority(request):
    if request.method == 'GET':
        label = request.GET['label']
        description = request.GET['description']
        comment = request.GET['comment']
        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_add_authority('{}', '{}', '{}', '{}')".format(
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

        all_authority = list(Authority.objects.order_by('authority_label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_authority': all_authority ,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def removeAuthorityDetail(request):
    if request.method == 'GET':
        id = request.GET['id']
        raw_query = "SELECT fn_remove_authority({})".format(id)  
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        all_authority = list(Authority.objects.order_by('authority_label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_authority': all_authority ,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def updateStateDetail(request):
     if request.method == 'GET':
        id = request.GET['id']
        label = request.GET['label']
        description = request.GET['description']
        comment = request.GET['comment']
        equipmentState = request.GET['equipmentState']
        connectionState = request.GET['connectionState']
        authId = request.GET['authId']

        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_update_possible_state({},  '{}', '{}', {}, {}, '{}', {}, '{}')".format(
           id, label, description, connectionState,  equipmentState , comment, authId, modified_at
        )  
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        all_possible_state = list(PossibleState.objects.order_by('state_label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_possible_state': all_possible_state ,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 

def addState(request):
     if request.method == 'GET':            
        label = request.GET['label']
        description = request.GET['description']
        comment = request.GET['comment']
        equipmentState = request.GET['equipmentState']
        connectionState = request.GET['connectionState']
        authId = request.GET['authId']

        current_time = datetime.datetime.now(pytz.utc)
        modified_at = current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        raw_query = "SELECT fn_add_possible_state('{}', '{}', {}, {}, '{}', {}, '{}')".format(
           label, description, connectionState,  equipmentState , comment, authId, modified_at
        )  
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        all_possible_state = list(PossibleState.objects.order_by('state_label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_possible_state': all_possible_state ,
            } ,
            cls=DateTimeEncoder
        )
        return HttpResponse(data) 
     
def removeStateDetail(request):
    if request.method == 'GET':            
        id = request.GET['id']
        raw_query = "SELECT fn_remove_possible_state({})".format(id)  
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(raw_query)
                results = cursor.fetchone()
            result = True
        except Exception as e:
            print(e)
            result = False

        all_possible_state = list(PossibleState.objects.order_by('state_label').values())
        data = json.dumps(
            {
                'result': result,  
                'all_possible_state': all_possible_state ,
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

# History
def history(request):
    page = 'history'
    history_logs = []

   
    context = {
        'title': 'History',
        'page': page,
        'history_logs': history_logs
    }
    
    return render(request, 'history.html', context=context)

def downloadHistoryCSV(request, historyType):
    response = HttpResponse(content_type="text/csv")

    historyType = historyType.replace("_", " ")
    response[
        "Content-Disposition"
    ] = f'attachment; filename="{historyType} History.csv"'

    writer = csv.writer(response)
    # Write CSV headers
    writer.writerow(
        [
            "Item Name",
            "Action",
            "Before",
            "After",
            "Log time"
        ]
    )


    return response