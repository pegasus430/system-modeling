from django.urls import path
from . import views

urlpatterns = [
    path('', views.system, name='system'),
    path('system/purchasing_overview', views.system_purchasing_overview, name='system_purchasing_overview'),
    path('system/purchasing_detail', views.system_purchasing_detail, name='system_purchasing_detail'),
    path('system/delivery', views.system_delivery, name='system_delivery'),
    path('system/state', views.system_state, name='system_state'),
    path('equipment/', views.equipment, name='equipment'),
    path('connections/', views.connections, name='connections'),
    path('definitions/', views.definitions, name='definitions'),
    path('definitions/system_users', views.definitions_system_users, name='definitions_system_users'),
    path('definitions/equipment_types', views.definitions_equipment_types, name='definitions_equipment_types'),
    path('definitions/equipment_properties', views.definitions_equipment_properties, name='definitions_equipment_properties'),
    path('definitions/equipment_resources', views.definitions_equipment_resources, name='definitions_equipment_resources'),
    path('definitions/equipment_interfaces', views.definitions_equipment_interfaces, name='definitions_equipment_interfaces'),
    path('definitions/equipment_interface_classes', views.definitions_equipment_interface_classes, name='definitions_equipment_interface_classes'),
    path('definitions/connection_types', views.definitions_connection_types, name='definitions_connection_types'),
    path('definitions/target_systems', views.definitions_target_systems, name='definitions_target_systems'),
    path('definitions/possible_equipment_connection_states', views.definitions_possible_equipment_connection_states, name='definitions_possible_equipment_connection_states'),
    path(r'getEquipmentChildElements', views.get_equipment_child_elements, name="get_equipment_child_elements"),
    path(r'getConnectionChildElements', views.get_connection_child_elements, name="get_connection_child_elements"),
    path(r'getEquipmentDetailsTableData', views.get_equipmentdetail_tabledata, name='get_equipmentdetail_tabledata'),
    path(r'getConnectionTypePurchasingOverview', views.get_ConnectionType_purchasing_overview, name='get_ConnectionType_purchasing_overview'),
    path(r'getEquipmentTypePurchasingOverview', views.get_EquipmentType_purchasing_overview, name='get_EquipmentType_purchasing_overview'),
    path(r'getConnectionTypePurchasingDetail', views.get_ConnectionType_purchasing_detail, name='get_ConnectionType_purchasing_detail'),
    path(r'getEquipmentTypePurchasingDetail', views.get_EquipmentType_purchasing_detail, name='get_EquipmentType_purchasing_detail'),
    path(r'getEquipmentStateDetail', views.get_equipment_state_detail, name='get_equipment_state_detail'),
    path(r'getConnectionStateDetail', views.get_connection_state_detail, name='get_connection_state_detail'),
    path(r'updateEquipmentDetail', views.update_equipment_detail, name='update_equipment_detail'),
    path(r'getEquipmentTypesAttributes', views.getEquipmentTypesAttributes, name= 'get_equipment_types_attributes'),
    path(r'getEquipmentTypesInterface', views.getEquipmentTypesInterface, name='getEquipmentTypesInterface')
]