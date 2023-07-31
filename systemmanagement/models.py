from django.db import models
from django_ltree_field.fields import LTreeField

# Create your models here.
class AllEquipment(models.Model):
    equipment_id = models.BigIntegerField(primary_key=True)
    equipment_path = LTreeField(unique=True)
    equipment_tree_level = models.IntegerField()
    equipment_sort_identifier = models.TextField()
    equipment_full_identifier = models.TextField()
    equipment_location_path = models.CharField(max_length=255)
    equipment_location_identifier = models.CharField(max_length=255)
    equipment_local_identifier = models.CharField(max_length=255)
    type_id = models.IntegerField()
    equipment_description = models.TextField()
    equipment_is_approved = models.BooleanField()
    equipment_comment = models.CharField(max_length=255)
    equipment_use_parent_identifier = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'all_equipment'

class EquipmentType(models.Model):
    id = models.BigIntegerField(primary_key=True)
    path = LTreeField(unique=True)
    label = models.CharField(max_length=255)
    model = models.TextField()
    modifier = models.TextField()
    manufacturer = models.TextField()
    description = models.TextField()
    comment = models.TextField()
    is_approved = models.BooleanField()
    used = models.BooleanField()
    modified_at = models.DateTimeField()
    class Meta:
        managed = False
        db_table = 'all_equipment_type'

class Resource(models.Model):
    id = models.BigIntegerField(primary_key=True)
    modifier = models.TextField()
    description = models.TextField()
    comment = models.TextField()
    group_id = models.BigIntegerField()
    group_label = models.TextField()
    group_description = models.TextField()
    group_comment = models.TextField()
    group_is_reportable = models.BooleanField()
    is_used = models.BooleanField()
    class Meta:
        managed = False
        db_table = 'all_resource'

class Interface(models.Model):
    id = models.BigIntegerField(primary_key=True)
    interface_class_id = models.BigIntegerField()
    interface_class_label = models.TextField()
    interface_class_description = models.TextField()
    interface_class_comment = models.TextField()
    connecting_interface_class_id = models.BigIntegerField()
    connecting_interface_class_label = models.TextField()
    connecting_interface_class_description = models.TextField()
    connecting_interface_class_comment = models.TextField()
    identifier = models.TextField()
    description = models.TextField()
    comment = models.TextField()
    is_intermediate = models.BooleanField()
    is_used = models.BooleanField()
    class Meta:
        managed = False
        db_table = 'all_interface'

class EquipmentResource(models.Model):
    equipment_id = models.BigIntegerField()
    equipment_path = LTreeField(unique=True)
    equipment_tree_level = models.IntegerField()
    equipment_sort_identifier = models.TextField()
    equipment_full_identifier = models.TextField()
    equipment_location_path = models.CharField(max_length=255)
    equipment_location_identifier = models.CharField(max_length=255)
    equipment_local_identifier = models.CharField(max_length=255)
    type_id = models.IntegerField()
    equipment_description = models.TextField()
    equipment_is_approved = models.BooleanField()
    equipment_comment = models.CharField(max_length=255)
    type_resource_id = models.BigIntegerField()
    type_path = models.CharField(max_length=255)
    definition_type_id = models.BigIntegerField()
    resource_id = models.BigIntegerField()
    type_resource_comment = models.TextField()

    class Meta:
        managed = False
        db_table = 'all_equipment_resource'

class AllConnection(models.Model):
    connection_id = models.BigIntegerField(primary_key=True)
    connection_path = LTreeField(unique=True)
    connection_tree_level = models.BigIntegerField()
    connection_identifier_location = models.TextField()
    connection_identifier = models.TextField()
    connection_local_identifier = models.CharField(max_length=255)
    connection_type_id = models.BigIntegerField()
    connection_type_description = models.TextField()
    connection_description = models.TextField()
    connection_length = models.FloatField()
    connection_is_approved = models.BooleanField()
    connection_comment = models.TextField()
    start_equipment_id = models.BigIntegerField()
    start_interface_id = models.BigIntegerField()
    start_interface_full_identifier = models.TextField()
    start_interface_description = models.TextField()
    end_equipment_id = models.BigIntegerField()
    end_interface_id = models.BigIntegerField()
    end_interface_full_identifier = models.TextField()
    end_interface_description = models.TextField()
    connection_use_parent_identifier = models.BooleanField()
    class Meta:
        managed = False
        db_table = 'all_connection_interface'

class ConnectionType(models.Model):
    id = models.BigIntegerField(primary_key=True)
    path = LTreeField(unique=True)
    label = models.CharField(max_length=255)
    model = models.TextField()
    modifier = models.TextField()
    manufacturer = models.TextField()
    description = models.TextField()
    comment = models.TextField()
    is_approved = models.BooleanField()
    used = models.BooleanField()
    
    class Meta:
        managed = False
        db_table = 'all_connection_type'

class PurchasingEquipmentType(models.Model):
    type_path = LTreeField(unique=True, primary_key=True)
    type_label = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    type_modifier = models.CharField(max_length=255)
    manufacturer = models.TextField()
    type_description = models.TextField()
    type_comment = models.TextField()
    type_is_approved = models.BooleanField()
    total_required = models.BigIntegerField()
    ordered_count = models.BigIntegerField()
    to_order_count = models.BigIntegerField()
    received_count = models.BigIntegerField()
    installed_count = models.BigIntegerField()
    lead_time_days = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'type_purchasing'

class PurchasingConnectionType(models.Model):
    type_path = LTreeField(unique=True, primary_key=True)
    type_label = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    type_modifier = models.CharField(max_length=255)
    manufacturer = models.TextField()
    type_description = models.TextField()
    type_comment = models.TextField()
    type_is_approved = models.BooleanField()
    total_quantity = models.BigIntegerField()
    total_length = models.FloatField()
    ordered_count = models.BigIntegerField()
    ordered_length = models.FloatField()
    to_order_count = models.BigIntegerField()
    to_order_length = models.FloatField()
    received_count = models.BigIntegerField()
    installed_count = models.BigIntegerField()
    lead_time_days = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'connection_type_purchasing'

class PurchasingEquipmentTypeDetail(models.Model):
    equipment_commercial_id = models.BigIntegerField(primary_key=True)
    equipment_id = models.BigIntegerField()
    type_path = LTreeField(unique=True)
    type_modifier = models.CharField(max_length=255)
    type_description = models.TextField()
    type_label = models.CharField(max_length=255)
    equipment_full_identifier = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    manufacturer = models.TextField()
    equipment_description = models.TextField()
    lead_time_days = models.IntegerField()
    quote_reference = models.TextField()
    purchase_order_date = models.DateField()
    purchase_order_reference = models.TextField()
    due_date = models.DateField()
    received_date = models.DateField()
    location = models.TextField()
    unique_code = models.TextField()
    ready_for_fat = models.DateField()
    fat_complete = models.DateField()
    sat_complete = models.DateField()
    commissioning_complete = models.DateField()
    installed_date = models.DateField()

    class Meta:
        managed = False
        db_table = 'equipment_purchasing_detail'

class PurchasingConnectionTypeDetail(models.Model):
    connection_commercial_id = models.BigIntegerField(primary_key=True)
    connection_id = models.BigIntegerField()
    connection_type_path = LTreeField(unique=True)
    connection_type_modifier = models.CharField(max_length=255)
    connection_type_description = models.TextField()
    connection_type_label = models.CharField(max_length=255)
    connection_location_identifier = models.CharField(max_length=255)
    connection_description = models.TextField()
    lead_time_days = models.IntegerField()
    quote_reference = models.TextField()
    purchase_order_date = models.DateField()
    purchase_order_reference = models.TextField()
    due_date = models.DateField()
    received_date = models.DateField()
    location = models.TextField()
    unique_code = models.TextField()    
    fat_complete = models.DateField()
    sat_complete = models.DateField()
    commissioning_complete = models.DateField()
    installed_date = models.DateField()
    class Meta:
        managed = False
        db_table = 'connection_purchasing_detail'

class EquipmentState(models.Model):
    equipment_id = models.BigIntegerField(primary_key=True)
    equipment_path = LTreeField(unique=True)
    equipment_tree_level = models.IntegerField()
    equipment_sort_identifier = models.TextField()
    equipment_full_identifier = models.TextField()
    equipment_location_path = models.CharField(max_length=255)
    equipment_location_identifier = models.CharField(max_length=255)
    equipment_local_identifier = models.CharField(max_length=255)
    type_id = models.IntegerField()
    equipment_description = models.TextField()
    equipment_is_approved = models.BooleanField()
    equipment_comment = models.CharField(max_length=255)
    location = models.TextField()
    quote_received = models.BooleanField()
    is_ordered = models.BooleanField()
    is_received = models.BooleanField()
    is_configured = models.BooleanField()
    is_installed = models.BooleanField()
    in_warranty = models.BooleanField()
    is_commissioned = models.BooleanField()
    design_approved = models.BooleanField()
    fat_complete = models.BooleanField()
    sat_complete = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'all_equipment_state'

class ConnectionState(models.Model):
    connection_id = models.BigIntegerField(primary_key=True)
    connection_path = LTreeField(unique=True)
    connection_tree_level = models.IntegerField()
    connection_identifier_location = models.TextField()
    connection_identifier = models.TextField()
    connection_local_identifier = models.CharField(max_length=255)
    connection_type_id = models.IntegerField()
    connection_description = models.TextField()
    connection_length = models.FloatField()
    connection_is_approved = models.BooleanField()
    connection_comment = models.TextField()
    location = models.TextField()
    quote_received = models.BooleanField()
    is_ordered = models.BooleanField()
    is_received = models.BooleanField()
    is_installed = models.BooleanField()
    in_warranty = models.BooleanField()
    is_commissioned = models.BooleanField()
    design_approved = models.BooleanField()
    fat_complete = models.BooleanField()
    sat_complete = models.BooleanField()
    class Meta:
        managed = False
        db_table = 'all_connection_state'

class SystemSetting(models.Model):
    id = models.BigIntegerField(primary_key=True)
    label = models.TextField()
    value = models.TextField()
    comment = models.TextField()
    modified_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'all_system_settings'

class TypeResource(models.Model):
    id = models.BigIntegerField(primary_key=True)
    type_id = models.BigIntegerField()
    type_path = LTreeField()
    definition_type_id = models.BigIntegerField()
    resource_id = models.BigIntegerField()
    comment = models.TextField()
    class Meta:
        managed = False
        db_table = 'all_type_resource'

class TypeInterface(models.Model):
    type_id = models.BigIntegerField(primary_key=True)
    resource_id = models.BigIntegerField()
    type_interface_comment = models.TextField()
    type_interface_is_active = models.BooleanField()
    interface_identifier = models.TextField()
    interface_description = models.TextField()
    interface_class_label = models.TextField()

    class Meta:
        managed = False
        db_table = 'type_interface_detail'

class ResouceProperty(models.Model):
    id = models.BigIntegerField(primary_key=True)
    modifier = models.TextField()
    description = models.TextField()
    default_value = models.TextField()
    default_datatype_id = models.BigIntegerField()
    default_datatype_label = models.TextField()
    default_datatype_comment = models.TextField()
    is_reportable = models.BooleanField()
    comment = models.TextField()
    property_is_used = models.BooleanField()
    resource_id = models.BigIntegerField()
    resource_modifier = models.TextField()
    resource_description = models.TextField()
    resource_property_default_value = models.TextField()
    resource_property_default_datatype_id = models.BigIntegerField()
    resource_property_default_datatype_label = models.TextField()
    resource_property_default_datatype_comment = models.TextField()
    resource_property_comment = models.TextField()

    class Meta:
        managed = False
        db_table = 'all_resource_property'

class DataType(models.Model):
    id = models.BigIntegerField(primary_key=True)
    label = models.TextField()
    description = models.TextField()
    scada_1 = models.TextField()
    scada_2 = models.TextField()
    scada_3 = models.TextField()
    scada_4 = models.TextField()
    scada_5 = models.TextField()
    control_1 = models.TextField()
    control_2 = models.TextField()
    control_3 = models.TextField()
    control_4 = models.TextField()
    control_5 = models.TextField()
    comment = models.TextField()
    class Meta:
        managed = False
        db_table = 'all_datatype'

class InterfaceClass(models.Model):
    id = models.BigIntegerField(primary_key=True)
    label = models.TextField()
    description = models.TextField()
    comment = models.TextField()
    is_used = models.BooleanField()
    class Meta:
        managed = False
        db_table = 'all_interface_class'

class TargetSystem(models.Model):
    system_settings_id = models.BigIntegerField(primary_key=True)
    label = models.TextField()
    value = models.TextField()
    comment = models.TextField()
    class Meta:
        managed = False
        db_table = 'all_target_system'

class PossibleState(models.Model):
    state_id = models.BigIntegerField(primary_key=True)
    state_label = models.TextField()
    state_description = models.TextField()
    valid_for_connection = models.BooleanField()
    valid_for_equipment = models.BooleanField()
    state_comment = models.TextField()
    authority_id = models.BigIntegerField()
    authority_label = models.TextField()
    authority_description = models.TextField()
    authority_comment = models.TextField()
    state_is_editable = models.BooleanField()
    state_modified_at = models.DateTimeField()
    authority_modified_at = models.DateTimeField()
    class Meta:
        managed = False
        db_table = 'all_possible_state'

class Authority(models.Model):
    authority_id = models.BigIntegerField(primary_key=True)
    authority_label = models.TextField()
    authority_description = models.TextField()
    authority_comment = models.TextField()
    authority_modified_at = models.DateTimeField()
    class Meta:
        managed = False
        db_table = 'all_authority'
