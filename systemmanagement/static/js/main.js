/**
* Template Name: NiceAdmin
* Updated: Mar 09 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
// Treeview Initialization

function showErrorNotification(text){
  $.toast({
    heading: 'Error',
    text: text,
    icon: 'error',              
    bgColor : '#red',  
    showHideTransition : 'slide',
    position : 'top-right'
  })
}

function showSuccessNotification(text){
  $.toast({
    heading: 'Success',
    text: text,
    icon: 'info',              
    bgColor : '#2cc947',  
    showHideTransition : 'slide',
    position : 'top-right'
  })
}

$(document).ready(function() {

  $('.treeview-animated').mdbTreeview();
  $('#version').html('1.1.10 (10/08/2023)')

    // display purchasing_overview_table as default
    var tableData = []
    var stateFunction = function(data) {
      if(data == true)
        return '<span class="bi bi-check" style="font-size: 1.5rem; color: rgb(0, 255, 0);"></span>'
      if(data == false)
        return '<span class="bi bi-x" style="font-size: 1.5rem; color: rgb(255, 0, 0);"></span>'
      else
        return ''
    }
    function isValidDateFormat(dateString) {
      const regex = /^(\d{4}-\d{2}-\d{2})?$/;
      return regex.test(dateString);
    }
    function validateNumber(value) {
      return /^\d+$/.test(value);
    }

    function showDataTypeTable(target_systems, all_datatype){
      
      // get the matched headers for datatype table
      var columnHeaderMatch = {
        'scada_1': target_systems.find(element => element.label ==='scada_1')? target_systems.find(element => element.label ==='scada_1').value :'',
        'scada_2': target_systems.find(element => element.label ==='scada_2')? target_systems.find(element => element.label ==='scada_2').value :'',
        'scada_3': target_systems.find(element => element.label ==='scada_3')? target_systems.find(element => element.label ==='scada_3').value :'',
        'scada_4': target_systems.find(element => element.label ==='scada_4')? target_systems.find(element => element.label ==='scada_4').value :'',
        'scada_5': target_systems.find(element => element.label ==='scada_5')? target_systems.find(element => element.label ==='scada_5').value :'',
        'control_1': target_systems.find(element => element.label ==='control_1')? target_systems.find(element => element.label ==='control_1').value :'',
        'control_2': target_systems.find(element => element.label ==='control_2')? target_systems.find(element => element.label ==='control_2').value :'',
        'control_3': target_systems.find(element => element.label ==='control_3')? target_systems.find(element => element.label ==='control_3').value :'',
        'control_4': target_systems.find(element => element.label ==='control_4')? target_systems.find(element => element.label ==='control_4').value :'',
        'control_5': target_systems.find(element => element.label ==='control_5')? target_systems.find(element => element.label ==='control_5').value :'',
      }
      // filter the matched headers with not null string headers
      columnHeaderMatch = Object.fromEntries(
        Object.entries(columnHeaderMatch).filter(([key, value]) => value !== '')
      );
      
      
      var columnHeadersKeys = Object.keys(columnHeaderMatch)
      var columnHeaders = Object.values(columnHeaderMatch)      
     
      // initialzie the system_datatype_table theader and emptry tbody
      var html = '<thead style="background-color: #000; color: white; border: solid 1px;"><tr class="text-center">'
      html += '<th>Label</th><th>Description</th>'
      columnHeaders.forEach(element =>{
        html += '<th scope="col" class="text-center">'+ element +'</th>'
      })
      html += '<th>Comment</th><th></th>'
                
      html += '</tr></thead><tbody><tr style="border: solid 1px">'
      html += '<td></td><td></td>'
      columnHeaders.forEach(element =>{
        html += '<td></td>'
      })
      html += '<td></td><td></td>'
      html += '</tr></tbody>'
        
      $('#system_datatype_table').html(html)

      // put the system datatype table with real type data
      if(all_datatype.length){
        html = '<tr>'
        all_datatype.forEach(element => {
          html += '<td>'+ element.label +'</td>'
          html += '<td>'+ element.description +'</td>'
          columnHeadersKeys.forEach(headerkey => {
            html += '<td>'+ element[headerkey] +'</td>'
          })
          html += '<td>'+ element.comment +'</td>'
          html += '<td><div class="inner-flex">\
          <span class="bi bi-pencil  p-1" data-id="'+ element.id +'" style="cursor:pointer"></span> \
          <span class="bi bi-trash  p-1" data-id="'+ element.id +'" style="cursor:pointer"></span> \
          </div></td></tr>'

        })
        $('#system_datatype_table tbody').html(html)
      }else{
        var html  = 'No data'
        $('#system_datatype_table tbody').html(html)
      }

    }
    
    
    if(document.getElementById('purchasing_overview_equipment')){
      purchasing_overview_equipment = JSON.parse(document.getElementById('purchasing_overview_equipment').textContent)
      if(purchasing_overview_equipment.length){
        purchasing_overview_equipment.forEach(element => {
              tableData.push({
              'label': element.type_label ,
              'description': element.type_description,
              'manufacturer' : element.manufacturer,
              'model' : element.model,
              'leadtime': element.lead_time_days ,
              'total_required':element.total_required ,
              'total_ordered':element.ordered_count ,
              'total_to_order':element.to_order_count 
              })
          })
     
          $('#purchasing_equipment_type_overview_table').DataTable({
            data:  tableData ,
            destroy: true,
            autoWidth: false,
            columns: [
              { data: 'label' },
              { data: 'description' },
              { data: 'manufacturer' },
              { data: 'model' },
              { data: 'leadtime' },
              { data: 'total_required' },
              { data: 'total_ordered' },
              { data: 'total_to_order' }
            ]}
          )
      }
  
    }
    if(document.getElementById('purchasing_overview_connection')){
      tableData = []
      purchasing_overview_connection = JSON.parse(document.getElementById('purchasing_overview_connection').textContent)
      if(purchasing_overview_connection.length){
          purchasing_overview_connection.forEach(element => {
                 tableData.push({
                  'label': element.type_label ,
                  'description': element.type_description,
                  'leadtime': element.lead_time_days ,
                  'total_required':element.total_quantity ,
                  'total_ordered':element.ordered_count ,
                  'total_to_order':element.to_order_count 
                 })
              })
              
              $('#purchasing_connection_type_overview_table').DataTable({
                data:  tableData ,
                
                destroy: true,
                columns: [
                  { data: 'label' },
                  { data: 'description' },
                  { data: 'leadtime' },
                  { data: 'total_required' },
                  { data: 'total_ordered' },
                  { data: 'total_to_order' }
                ]}
              )
      }
    }
    
    if(document.getElementById('purchasing_detail_equipment')){
      tableData = []
      purchasing_detail_equipment = JSON.parse(document.getElementById('purchasing_detail_equipment').textContent)
      
      if(purchasing_detail_equipment.length){
        
        purchasing_detail_equipment.forEach(element => {
             tableData.push({
              'equipment_commercial_id': element.equipment_commercial_id,
              'full_identifier': element.equipment_full_identifier ,
              'description': element.equipment_description,
              'manufacturer' : element.manufacturer,
              'model' : element.model,
              'quote_reference': element.quote_reference,
              'leadtime': element.lead_time_days ,
              'po_date': element.purchase_order_date,
              'po_reference': element.purchase_order_reference,
              'due_date': element.due_date,
             })
          })
        
          var equipmentEditor = new DataTable.Editor({
            
            idSrc:  'description',
            fields: [
              {
                label: 'equipment_commercial_id',
                name: 'equipment_commercial_id'
              },
              
              {
                label: 'Quote Reference',
                name: 'quote_reference'
              },
              {
                label: 'Leadtime(Days)',
                name: 'leadtime'
              },
              {
                label: 'Po Date',
                name: 'po_date'
              },
              {
                label: 'Po Reference',
                name: 'po_reference'
              },
              {
                label: 'Due Date',
                name: 'due_date'
              },
            ],
            table: '#purchasing_detail_equipment_type_table'
          })

          $('#purchasing_detail_equipment_type_table').DataTable({
            data:  tableData ,
            destroy: true,
            dom: 'Bfrtip',
            columns: [
              { data: 'equipment_commercial_id' },
              { data: 'full_identifier' },
              { data: 'description' },
              { data: 'manufacturer' },
              { data: 'model' },
              { data: 'quote_reference'},
              { data: 'leadtime' },
              { data: 'po_date' },
              { data: 'po_reference' },
              { data: 'due_date' }
            ],
            columnDefs: [
              { "visible": false, "targets": 0 } // Target the first column to hide it
            ]
          }
          )
          $('#purchasing_detail_equipment_type_table').on('click', 'td:nth-child(n+5):nth-child(-n+9)',function (){
            equipmentEditor.inline(this)
          })
          equipmentEditor.on('edit', function(e, datatable, cell) {
            p_id = cell.equipment_commercial_id
            selectedObj = purchasing_detail_equipment.find( element => element.equipment_commercial_id === p_id) 
            p_due_date = cell.due_date
            if(p_due_date == null) p_due_date = ""
            if(!isValidDateFormat(p_due_date)){
               showErrorNotification('Due Date format error! You should input the date as YYYY-MM-DD.')
              return
            }
            p_leadtime = cell.leadtime
            if(p_leadtime == '' || p_leadtime ==  null) p_leadtime = 0
            if(!validateNumber(p_leadtime)){
               showErrorNotification('Leadtime(Days) format error! You should input the date as the number')
              return
            }
            p_po_date = cell.po_date
            if(p_po_date == null) p_po_date = ""
            if(!isValidDateFormat(p_po_date)){
              showErrorNotification('Po Date format error! You should input the date as YYYY-MM-DD.')
              return
            }
            p_po_reference = cell.po_reference
            p_quote_reference = cell.quote_reference
            p_location = selectedObj.location
            p_received_date = selectedObj.received_date
            
            p_unique_code = selectedObj.unique_code
           
            $.ajax({
              type: "GET",
              url: 'updateEquipmentTypePurchaseDetail',
              data: {
                p_id: p_id,
                p_due_date: p_due_date,
                p_leadtime: p_leadtime,
                p_po_date: p_po_date,
                p_po_reference: p_po_reference,
                p_quote_reference: p_quote_reference,
                p_location: p_location,
                p_received_date: p_received_date,
                p_unique_code: p_unique_code
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']
                
                if(result){
                  showSuccessNotification('The purchased equipment has been  removed successfully!')
                }
                else{
                  showErrorNotification('The error happend while updating the purchased equipment!')
                }
              }
            })

          });
  
      }
    }
    if(document.getElementById('purchasing_detail_connection')){
      tableData = []

      purchasing_connection = JSON.parse(document.getElementById('purchasing_detail_connection').textContent)

        if(purchasing_connection.length){
          purchasing_connection.forEach(element => {
               tableData.push({
                'connection_commercial_id': element.connection_commercial_id,
                'location_identifier': element.connection_location_identifier ,
                'description': element.connection_description,
                'quote_reference': element.quote_reference,
                'leadtime': element.lead_time_days ,
                'po_date': element.purchase_order_date,
                'po_reference': element.purchase_order_reference,
                'due_date': element.due_date,
               })
            })
            
            var editor = new DataTable.Editor({
            
              idSrc:  'connection_commercial_id',
              fields: [
                {
                  label: 'connection_commercial_id',
                  name: 'connection_commercial_id'
                },
                
                {
                  label: 'Quote Reference',
                  name: 'quote_reference'
                },
                {
                  label: 'Leadtime(Days)',
                  name: 'leadtime'
                },
                {
                  label: 'Po Date',
                  name: 'po_date'
                },
                {
                  label: 'Po Reference',
                  name: 'po_reference'
                },
                {
                  label: 'Due Date',
                  name: 'due_date'
                },
              ],
              table: '#purchasing_detail_connection_type_table'
            })

            $('#purchasing_detail_connection_type_table').DataTable({
              data:  tableData ,
              destroy: true,
              dom: 'Bfrtip',
              columns: [
                { data: 'connection_commercial_id' },
                { data: 'location_identifier' },
                { data: 'description' },
                { data: 'quote_reference' },
                { data: 'leadtime' },
                { data: 'po_date' },
                { data: 'po_reference' },
                { data: 'due_date' }
              ],
              columnDefs: [
                { "visible": false, "targets": 0 } // Target the first column to hide it
              ]
            })

            $('#purchasing_detail_connection_type_table').on('click', 'td:nth-child(n+3):nth-child(-n+7)',function (){
              editor.inline(this)
            })
            editor.on('edit', function(e, datatable, cell) {
              p_id = cell.connection_commercial_id
              selectedObj = purchasing_connection.find( element => element.connection_commercial_id === p_id) 
             
              p_due_date = cell.due_date
              if(p_due_date == null) p_due_date = ""
              if(!isValidDateFormat(p_due_date)){
                showErrorNotification('Due Date format error! You should input the date as YYYY-MM-DD.')
                return
              }
              p_leadtime = cell.leadtime
              if(p_leadtime == '' || p_leadtime ==  null) p_leadtime = 0
              if(!validateNumber(p_leadtime)){
                showErrorNotification('Leadtime(Days) format error! You should input the date as the number')
                return
              }
              p_po_date = cell.po_date
              if(p_po_date == null) p_po_date = ""
              if(!isValidDateFormat(p_po_date)){
                showErrorNotification('Po Date format error! You should input the date as YYYY-MM-DD.')
                return
              }
              p_po_reference = cell.po_reference
              p_quote_reference = cell.quote_reference
              p_location = selectedObj.location
              p_received_date = selectedObj.received_date
              p_unique_code = selectedObj.unique_code
            
              $.ajax({
                type: "GET",
                url: 'updateConnectionTypePurchaseDetail',
                data: {
                  p_id: p_id,
                  p_due_date: p_due_date,
                  p_leadtime: p_leadtime,
                  p_po_date: p_po_date,
                  p_po_reference: p_po_reference,
                  p_quote_reference: p_quote_reference,
                  p_location: p_location,
                  p_received_date: p_received_date,
                  p_unique_code: p_unique_code
                },
                success: function (data){
                  data = JSON.parse(data)
                  var result = data['result']
                  
                  if(result){
                    showSuccessNotification('The purchased connection has been  removed successfully!')
                  }
                  else{
                    showErrorNotification('The error happend while updating the purchased connection!')
                  }
                }
              })
            });
        }
    }
    if(document.getElementById('purchasing_delivery_equipment')){
      tableData = []
      purchasing_delivery_equipment = JSON.parse(document.getElementById('purchasing_delivery_equipment').textContent)
      
      
      if(purchasing_delivery_equipment.length){
        purchasing_delivery_equipment.forEach(element => {
             tableData.push({
              'equipment_commercial_id': element.equipment_commercial_id,
              'full_identifier': element.equipment_full_identifier ,
              'description': element.equipment_description,
              'manufacturer' : element.manufacturer,
              'po_reference': element.purchase_order_reference,
              'po_date': element.purchase_order_date,
              'due_date': element.due_date,
              'received_date': element.received_date,
              'serial_number': element.unique_code,
              'location': element.location
             })
          })
          
          var equipmentEditor = new DataTable.Editor({ 
            idSrc:  'equipment_commercial_id',
            fields: [
              {
                label: 'equipment_commercial_id',
                name: 'equipment_commercial_id'
              },
              {
                label: 'Due Date',
                name: 'due_date'
              },
              {
                label: 'Received Date',
                name: 'received_date'
              },
              {
                label: 'Serial Number',
                name: 'serial_number'
              },
              {
                label: 'Location',
                name: 'location'
              },
            
              
            ],
            table: '#delivery_equipment_type_table'
          })


          $('#delivery_equipment_type_table').DataTable({
            data:  tableData ,
            destroy: true,
            dom: 'Bfrtip',
            columns: [
              { data: 'equipment_commercial_id'},
              { data: 'full_identifier' },
              { data: 'description' },
              { data: 'manufacturer' },
              { data: 'po_reference' },
              { data: 'po_date' },
              { data: 'due_date' },
              { data: 'received_date' },
              { data: 'serial_number' },
              { data: 'location' },
            ],
            columnDefs: [
              { "visible": false, "targets": 0 } // Target the first column to hide it
            ]})

          $('#delivery_equipment_type_table').on('click', 'td:nth-child(n+6):nth-child(-n+9)',function (){
            equipmentEditor.inline(this)
          })

          equipmentEditor.on('edit', function(e, datatable, cell) {
              p_id = cell.equipment_commercial_id
              selectedObj = purchasing_delivery_equipment.find( element => element.equipment_commercial_id === p_id) 
           
              p_due_date = cell.due_date
              if(p_due_date == null) p_due_date = ""
              if(!isValidDateFormat(p_due_date)){
                showErrorNotification('Due Date format error! You should input the date as YYYY-MM-DD.')
                return
              }
              p_leadtime = selectedObj.lead_time_days
              
              if(p_leadtime == '' || p_leadtime ==  null) p_leadtime = 0
              
              p_po_date = selectedObj.purchase_order_date
              if(p_po_date == null) p_po_date = ""
             
              p_po_reference = selectedObj.purchase_order_reference
              p_quote_reference = selectedObj.quote_reference
              
              p_location = cell.location
              if(p_location == null) p_location = ""
              
              p_received_date = cell.received_date
              if(p_received_date == null) p_received_date = ""
              if(!isValidDateFormat(p_received_date)){
                showErrorNotification('Received Date format error! You should input the date as YYYY-MM-DD.')
                return
              }
              p_unique_code = cell.serial_number
              if(p_unique_code == null) p_unique_code = ""

              $.ajax({
                type: "GET",
                url: 'updateEquipmentTypePurchaseDetail',
                data: {
                  p_id: p_id,
                  p_due_date: p_due_date,
                  p_leadtime: p_leadtime,
                  p_po_date: p_po_date,
                  p_po_reference: p_po_reference,
                  p_quote_reference: p_quote_reference,
                  p_location: p_location,
                  p_received_date: p_received_date,
                  p_unique_code: p_unique_code
                },
                success: function (data){
                  data = JSON.parse(data)
                  var result = data['result']
                  
                  if(result){
                    showSuccessNotification('The purchased equipment has been  removed successfully!')
                  }
                  else{
                    showErrorNotification('The error happend while updating the purchased equipment!')
                  }
                }
              })
  
            });
    
      }
    }
    if(document.getElementById('purchasing_delivery_connection')){
      tableData = []

      purchasing_delivery_connection = JSON.parse(document.getElementById('purchasing_delivery_connection').textContent)

      if(purchasing_delivery_connection.length){
        purchasing_delivery_connection.forEach(element => {
             tableData.push({
              'connection_commercial_id': element.connection_commercial_id,
              'location_identifier': element.connection_location_identifier ,
              'description': element.connection_description,
              'po_reference': element.purchase_order_reference,
              'po_date': element.purchase_order_date,
              'due_date': element.due_date,
              'received_date': element.received_date,
              'serial_number': element.unique_code,
              'location': element.location
             })
          })
          var connectionEditor = new DataTable.Editor({ 
            idSrc:  'connection_commercial_id',
            fields: [
              {
                label: 'connection_commercial_id',
                name: 'connection_commercial_id'
              },
              {
                label: 'Due Date',
                name: 'due_date'
              },
              {
                label: 'Received Date',
                name: 'received_date'
              },
              {
                label: 'Serial Number',
                name: 'serial_number'
              },
              {
                label: 'Location',
                name: 'location'
              },
            
              
            ],
            table: '#delivery_connection_type_table'
          })
          $('#delivery_connection_type_table').DataTable({
            data:  tableData ,
            destroy: true,
            dom: 'Bfrtip',
            columns: [
              { data: 'connection_commercial_id' },
              { data: 'location_identifier' },
              { data: 'description' },
              { data: 'po_reference' },
              { data: 'po_date' },
              { data: 'due_date' },
              { data: 'received_date' },
              { data: 'serial_number' },
              { data: 'location' },
            ],
            columnDefs: [
              { "visible": false, "targets": 0 } // Target the first column to hide it
            ]
          }
          )
          $('#delivery_connection_type_table').on('click', 'td:nth-child(n+5):nth-child(-n+8)',function (){
            connectionEditor.inline(this)
          })
          connectionEditor.on('edit', function(e, datatable, cell) {
            p_id = cell.connection_commercial_id
            selectedObj = purchasing_delivery_connection.find( element => element.connection_commercial_id === p_id) 
         
            p_due_date = cell.due_date
            if(p_due_date == null) p_due_date = ""
            if(!isValidDateFormat(p_due_date)){
              showErrorNotification('Due Date format error! You should input the date as YYYY-MM-DD.')
              return
            }
            p_leadtime = selectedObj.lead_time_days
            
            if(p_leadtime == '' || p_leadtime ==  null) p_leadtime = 0
            
            p_po_date = selectedObj.purchase_order_date
            if(p_po_date == null) p_po_date = ""
           
            p_po_reference = selectedObj.purchase_order_reference
            p_quote_reference = selectedObj.quote_reference
            
            p_location = cell.location
            if(p_location == null) p_location = ""
            
            p_received_date = cell.received_date
            if(p_received_date == null) p_received_date = ""
            if(!isValidDateFormat(p_received_date)){
              showErrorNotification('Received Date format error! You should input the date as YYYY-MM-DD.')
              return
            }
            p_unique_code = cell.serial_number
            if(p_unique_code == null) p_unique_code = ""

            $.ajax({
              type: "GET",
              url: 'updateConnectionTypePurchaseDetail',
              data: {
                p_id: p_id,
                p_due_date: p_due_date,
                p_leadtime: p_leadtime,
                p_po_date: p_po_date,
                p_po_reference: p_po_reference,
                p_quote_reference: p_quote_reference,
                p_location: p_location,
                p_received_date: p_received_date,
                p_unique_code: p_unique_code
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']
                
                if(result){
                  showSuccessNotification('The purchased connection has been  removed successfully!')
                }
                else{
                  showErrorNotification('The error happend while updating the purchased connection!')
                }
              }
            })

          });
      }
    }
   
    if(document.getElementById('all_equipment')){
      tableData = []

      state_equipment_detail = JSON.parse(document.getElementById('all_equipment').textContent)
      
      if(state_equipment_detail.length){
        state_equipment_detail.forEach(element => {
             tableData.push({
              'equipment_id': element.equipment_id,
              'identifier': element.equipment_full_identifier ,
              'description': element.equipment_description,
              'quoted': element.quote_received,
              'ordered': element.is_ordered,
              'received': element.is_received,
              'installed': element.is_installed,
              'in_warranty': element.in_warranty,
              'design_approved': element.design_approved,
              'configured': element.is_configured,
              'fat_complete': element.fat_complete,
              'sat_complete': element.sat_complete,
              'commissioning_complete': element. is_commissioned
             })
          })
          
          $('#state_equipment_table').DataTable({
            data:  tableData ,
            destroy: true,
            columns: [
              { data: 'equipment_id' },
              { data: 'identifier' },
              { data: 'description' },
               { 
                  data: 'design_approved',
                  render: stateFunction 
                },
                { 
                  data: 'quoted' ,
                  render: stateFunction
                },
                { 
                  data: 'ordered' ,
                  render: stateFunction
                },
                { 
                  data: 'received' ,
                  render: stateFunction
                },
                { 
                  data: 'configured',
                  render: stateFunction 
                },
                { 
                  data: 'fat_complete',
                  render: stateFunction
                },
                { 
                  data: 'installed' ,
                  render: stateFunction 
                },
                { 
                  data: 'sat_complete',
                  render: stateFunction },
                { 
                  data: 'commissioning_complete',
                  render: stateFunction
                },
                { 
                  data: 'in_warranty' ,
                  render: stateFunction
                },
            ],
            columnDefs:[
              { "visible": false, "targets": 0 }
            ]})

          
      }
    }
    
    $('#state_equipment_table').on('click', 'tr', function(){
      equipmentCommercialDetail = JSON.parse(document.getElementById('equipment_state_detail').textContent)
      $('#ready_for_fat').val("")
      $('#sat_complete').val("")
      $('#fat_complete').val("")
      $('#installed_date').val("")
      $('#commissioning_complete').val("")
      
      equipment_full_identifier = this.getElementsByTagName('td')[0].textContent;
      selectedData = state_equipment_detail.find(element=> element.equipment_full_identifier == equipment_full_identifier)
      selectedEquipmentId = selectedData.equipment_id
      $('#selected_state_equipment_id').val(selectedEquipmentId)
      selectedEquipmentDetail = equipmentCommercialDetail.find(element=>element.equipment_id == selectedEquipmentId)
      
      if(selectedEquipmentDetail){
        $('#selected_state_equipment_update_flag').val('update')
        readyForFat = selectedEquipmentDetail.ready_for_fat
        if (readyForFat != null){
          $('#ready_for_fat').val(readyForFat)
        }

        installed_date = selectedEquipmentDetail.installed_date
        if (installed_date != null){
          $('#installed_date').val(installed_date)
        }
        fat_complete = selectedEquipmentDetail.fat_complete
        if (fat_complete != null){
          $('#fat_complete').val(fat_complete)
        }
        sat_complete = selectedEquipmentDetail.sat_complete
        if (sat_complete != null){
          $('#sat_complete').val(sat_complete)
        }
        commissioning_complete = selectedEquipmentDetail.commissioning_complete
        if (commissioning_complete != null){
          $('#commissioning_complete').val(commissioning_complete)
        }

      }else{
        $('#selected_state_equipment_update_flag').val('add')
      }

      $('#equipmentStateModal').modal('show')
    })
    // update equipment commercail with read_fat_fat, fat_complete, sat_complete, ...
    $('#equipmentStateModal .btn-primary').on('click', function(){
      selected_state_equipment_id = $('#selected_state_equipment_id').val()
      readyForFat = $('#ready_for_fat').val()
      fatComplete = $('#fat_complete').val()
      satComplete = $('#sat_complete').val()
      commissioningComplete = $('#commissioning_complete').val()
      installedDate = $('#installed_date').val()
      selectedEquipmentUpdateFlag = $('#selected_state_equipment_update_flag').val()
      $.ajax({
        url: 'updateEquipmentCommercialState',
        data: {
          selected_state_equipment_id: selected_state_equipment_id,
          ready_for_fat: readyForFat,
          fat_complete: fatComplete,
          sat_complete: satComplete,
          commissioning_complete: commissioningComplete,
          installed_date: installedDate,
          selectedEquipmentUpdateFlag: selectedEquipmentUpdateFlag,
        },
        type: "GET",
        success: function(data){
          jsonData = JSON.parse(data)
          result = jsonData['result']
          state_equipment_detail = jsonData['all_equipment']
          equipment_commercial_state_detail = jsonData['equipment_commercial_state_detail']
          document.getElementById('equipment_state_detail').textContent = JSON.stringify(equipment_commercial_state_detail)
          
          if(state_equipment_detail.length){
            tableData = []
            state_equipment_detail.forEach(element => {
                 tableData.push({
                  'equipment_id': element.equipment_id,
                  'identifier': element.equipment_full_identifier ,
                  'description': element.equipment_description,
                  'quoted': element.quote_received,
                  'ordered': element.is_ordered,
                  'received': element.is_received,
                  'installed': element.is_installed,
                  'in_warranty': element.in_warranty,
                  'design_approved': element.design_approved,
                  'configured': element.is_configured,
                  'fat_complete': element.fat_complete,
                  'sat_complete': element.sat_complete,
                  'commissioning_complete': element. is_commissioned
                 })
              })
              
              $('#state_equipment_table').DataTable({
                data:  tableData ,
                destroy: true,
                columns: [
                  { data: 'equipment_id' },
                  { data: 'identifier' },
                  { data: 'description' },
                   { 
                      data: 'design_approved',
                      render: stateFunction 
                    },
                    { 
                      data: 'quoted' ,
                      render: stateFunction
                    },
                    { 
                      data: 'ordered' ,
                      render: stateFunction
                    },
                    { 
                      data: 'received' ,
                      render: stateFunction
                    },
                    { 
                      data: 'configured',
                      render: stateFunction 
                    },
                    { 
                      data: 'fat_complete',
                      render: stateFunction
                    },
                    { 
                      data: 'installed' ,
                      render: stateFunction 
                    },
                    { 
                      data: 'sat_complete',
                      render: stateFunction },
                    { 
                      data: 'commissioning_complete',
                      render: stateFunction
                    },
                    { 
                      data: 'in_warranty' ,
                      render: stateFunction
                    },
                ],
                columnDefs:[
                  { "visible": false, "targets": 0 }
                ]})
    
              
          }

          if (result){
              showSuccessNotification('The equipment commercial information has been updated  successfully!')
              $('#equipmentStateModal').modal('hide')
          }else{
            showErrorNotification('Error while updating the equipment commercail date')
          }
          
        },
        error: function(){
          showErrorNotification('Error while requesting the equipment commercail date')
        }
      })
    })

    if(document.getElementById('all_connection')){
      tableData = []

      state_connection_detail =  JSON.parse(document.getElementById('all_connection').textContent)      
      
      if(state_connection_detail.length){
        state_connection_detail.forEach(element => {
             tableData.push({
              'connection_id': element.connection_id,
              'identifier': element.connection_identifier ,
              'description': element.connection_description,
              'quoted': element.quote_received,
              'ordered': element.is_ordered,
              'received': element.is_received,
              'installed': element.is_installed,
              'in_warranty': element.in_warranty,
              'design_approved': element.design_approved,                
              'fat_complete': element.fat_complete,
              'sat_complete': element.sat_complete,
              'commissioning_complete': element.is_commissioned
             })
          })
          
          $('#state_connection_table').DataTable({
            data:  tableData ,
            destroy: true,
            columns: [
              { data: 'connection_id' },
              { data: 'identifier' },
              { data: 'description' },
              { 
                  data: 'design_approved',
                  render: stateFunction 
                },
                { 
                  data: 'quoted' ,
                  render: stateFunction
                },
                { 
                  data: 'ordered' ,
                  render: stateFunction
                },
                { 
                  data: 'received' ,
                  render: stateFunction
                },
                { 
                  data: 'fat_complete',
                  render: stateFunction
                },
                { 
                  data: 'installed' ,
                  render: stateFunction 
                },
                { 
                  data: 'sat_complete',
                  render: stateFunction },
                { 
                  data: 'commissioning_complete',
                  render: stateFunction
                },
                { 
                  data: 'in_warranty' ,
                  render: stateFunction
                },
            ],
            columnDefs:[
              { "visible": false, "targets": 0 }
            ]
          }
          )
      }
    }

    $('#state_connection_table').on('click', 'tr', function(){
      connectionCommercialDetail = JSON.parse(document.getElementById('connection_state_detail').textContent)
      
      $('#connection_sat_complete').val("")
      $('#connection_fat_complete').val("")
      $('#connection_installed_date').val("")
      $('#connection_commissioning_complete').val("")
      
      connection_identifier = this.getElementsByTagName('td')[0].textContent;
      selectedData = state_connection_detail.find(element=> element.connection_identifier == connection_identifier)
      selectedConnectionId = selectedData.connection_id
      
      $('#selected_state_connection_id').val(selectedConnectionId)
      selectedConnectionDetail = connectionCommercialDetail.find(element=>element.connection_id == selectedConnectionId)
      
      if(selectedConnectionDetail){
        $('#selected_state_connection_update_flag').val('update')
        

        installed_date = selectedConnectionDetail.installed_date
        if (installed_date != null){
          $('#connection_installed_date').val(installed_date)
        }
        fat_complete = selectedConnectionDetail.fat_complete
        if (fat_complete != null){
          $('#connection_fat_complete').val(fat_complete)
        }
        sat_complete = selectedConnectionDetail.sat_complete
        if (sat_complete != null){
          $('#connection_sat_complete').val(sat_complete)
        }
        commissioning_complete = selectedConnectionDetail.commissioning_complete
        if (commissioning_complete != null){
          $('#connection_commissioning_complete').val(commissioning_complete)
        }

      }else{
        $('#selected_state_connection_update_flag').val('add')
      }

      $('#connectionStateModal').modal('show')
    })

    // update connection commercial with read_fat_fat, fat_complete, sat_complete, ...
    $('#connectionStateModal .btn-primary').on('click', function(){
      selected_state_connection_id = $('#selected_state_connection_id').val()
      
      fatComplete = $('#connection_fat_complete').val()
      satComplete = $('#connection_sat_complete').val()
      commissioningComplete = $('#connection_commissioning_complete').val()
      installedDate = $('#connection_installed_date').val()
      selectedConnectionUpdateFlag = $('#selected_state_connection_update_flag').val()
      $.ajax({
        url: 'updateConnectionCommercialState',
        data: {
          selected_state_connection_id: selected_state_connection_id,
          fat_complete: fatComplete,
          sat_complete: satComplete,
          commissioning_complete: commissioningComplete,
          installed_date: installedDate,
          selectedConnectionUpdateFlag: selectedConnectionUpdateFlag,
        },
        type: "GET",
        success: function(data){
          jsonData = JSON.parse(data)
          result = jsonData['result']
          state_connection_detail = jsonData['all_connection']
          connection_commercial_state_detail = jsonData['connection_commercial_state_detail']
          document.getElementById('connection_state_detail').textContent = JSON.stringify(connection_commercial_state_detail)

          if(state_connection_detail.length){
            tableData = []
            state_connection_detail.forEach(element => {
                 tableData.push({
                  'connection_id': element.connection_id,
                  'identifier': element.connection_identifier ,
                  'description': element.connection_description,
                  'quoted': element.quote_received,
                  'ordered': element.is_ordered,
                  'received': element.is_received,
                  'installed': element.is_installed,
                  'in_warranty': element.in_warranty,
                  'design_approved': element.design_approved,                
                  'fat_complete': element.fat_complete,
                  'sat_complete': element.sat_complete,
                  'commissioning_complete': element.is_commissioned
                 })
              })
              
              $('#state_connection_table').DataTable({
                data:  tableData ,
                destroy: true,
                columns: [
                  { data: 'connection_id' },
                  { data: 'identifier' },
                  { data: 'description' },
                  { 
                      data: 'design_approved',
                      render: stateFunction 
                    },
                    { 
                      data: 'quoted' ,
                      render: stateFunction
                    },
                    { 
                      data: 'ordered' ,
                      render: stateFunction
                    },
                    { 
                      data: 'received' ,
                      render: stateFunction
                    },
                    { 
                      data: 'fat_complete',
                      render: stateFunction
                    },
                    { 
                      data: 'installed' ,
                      render: stateFunction 
                    },
                    { 
                      data: 'sat_complete',
                      render: stateFunction },
                    { 
                      data: 'commissioning_complete',
                      render: stateFunction
                    },
                    { 
                      data: 'in_warranty' ,
                      render: stateFunction
                    },
                ],
                columnDefs:[
                  { "visible": false, "targets": 0 }
                ]
              })
            }

          if (result){
            showSuccessNotification('The connection commercial information has been updated  successfully!')
            $('#connectionStateModal').modal('hide')
          }else{
            showErrorNotification('Error while updating the connection commercail date')
          }
          
        },
        error: function(){
          showErrorNotification('Error while requesting the connection commercail date')
        }
      })
    })

    if(document.getElementById('system_parameters')){
  
      var system_parameters = JSON.parse(document.getElementById('system_parameters').textContent)
      var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent)  
      var tableData = []
      if(system_parameters.length){
          system_parameters.forEach(element => {
             tableData.push({
              'id': element.id,
              'label': element.label ,
              'value': element.value,
              'comment': element.comment,
              'last_modified': element.modified_at,
              'action': '<div class="inner-flex">\
                <span class="bi bi-trash p-1" data-id="'+ element.id +'" style="cursor:pointer"></span> \
                </div>'
             })

          })

          var editor = new DataTable.Editor({
            
            idSrc:  'comment',
            fields: [
              {
                label: 'Label',
                name: 'label'
              },
              
              {
                label: 'Value',
                name: 'value'
              },
              {
                label: 'Comment',
                name: 'comment'
              }
              
            ],
            table: '#system_paramter_table'
          })
          
          $('#system_paramter_table').DataTable({
            data:  tableData ,
            dom: 'Bfrtip',
            destroy: true,
            columns: [
              { data: 'id' },
              { data: 'label' },
              { data: 'value' },
              { data: 'comment' },
              { data: 'last_modified' },
              { data: 'action'}
            ],
            columnDefs:[
              {
                targets: [0], 
                visible: false 
              },
              
            ],
            "order": [[ 1, "asc" ]]
          })

          $('#system_paramter_table').on('click', 'td:nth-child(n+1):nth-child(-n+3)', function(){
            editor.inline(this)
          })

          editor.on('edit', function(e, datatable, cell) {
            p_id = cell.id
            p_label = cell.label
            if(p_label == ""){
              showErrorNotification("The label can't be empty string")
              return
            }
            p_value = cell.value
            if(p_value == ""){
              showErrorNotification("The value can't be empty string")
              return
            }
            p_comment = cell.comment
          
            let reason = prompt('Please write the reason why you update this parameter.', '')
            if (reason != null){

            
              $.ajax({
                type: "GET",
                url: 'updateSystemParameters',
                data: {
                  p_id: p_id,
                  p_label: p_label,
                  p_value: p_value,
                  p_comment: p_comment,
                  p_reason: reason,
                  p_user: currentUserName,
                },
                success: function (data){
                  data = JSON.parse(data)
                  var result = data['result']
                  
                  if(result){
                    showSuccessNotification('The system parameter has been updated successfully!')
                    var system_parameters = data['system_parameters']
                    var tableData = []
                    if(system_parameters.length){
                        system_parameters.forEach(element => {
                          tableData.push({
                            'id': element.id,
                            'label': element.label ,
                            'value': element.value,
                            'comment': element.comment,
                            'last_modified': element.modified_at,
                            'action': '<div class="inner-flex">\
                              <span class="bi bi-trash p-1" data-id="'+ element.id +'" style="cursor:pointer"></span> \
                              </div>'
                          })

                        })
                        
                        $('#system_paramter_table').DataTable({
                          data:  tableData ,
                          dom: 'Bfrtip',
                          destroy: true,
                          columns: [
                            { data: 'id' },
                            { data: 'label' },
                            { data: 'value' },
                            { data: 'comment' },
                            { data: 'last_modified' },
                            { data: 'action'}
                          ],
                          columnDefs:[
                            {
                              targets: [0], 
                              visible: false 
                            },
                            
                          ],
                          "order": [[ 1, "asc" ]]
                        })
                      }

                  }
                  else{
                    showErrorNotification(data['message'])
                  }
                },
                error: function(e){
                  showErrorNotification('The error happend while requesting the server')
                }
              })
            }
          });

      }
    }

    // add system parameter in the modal
    $('#systemParamerterModal .btn-primary').on('click', function(){
       var label = $('#adding_systemParamerter_label').val()
       if(label == ""){
        showErrorNotification("The label should not be empty string.")
        return
       }

       var value = $('#adding_systemParamerter_value').val()
       if(value == ""){
        showErrorNotification("The value should not be empty string.")
        return
       }

       var reason = $('#adding_systemParamerter_reason').val()
       if(reason == ""){
        showErrorNotification("The reason should not be empty string.")
        return
       }

       var comment =  $('#adding_systemParamerter_comment').val()
       var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent)  
       $.ajax({
        type: "GET",
        url: 'addSystemParameters',
        data: {
          p_user: currentUserName,
          p_reason: reason,
          p_label: label,
          p_value: value,
          p_comment: comment,
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          
          if(result){
            showSuccessNotification('The system parameter has been  added successfully!')
            var system_parameters = data['system_parameters']
            var tableData = []
            if(system_parameters.length){
                system_parameters.forEach(element => {
                  tableData.push({
                    'id': element.id,
                    'label': element.label ,
                    'value': element.value,
                    'comment': element.comment,
                    'last_modified': element.modified_at,
                    'action': '<div class="inner-flex">\
                      <span class="bi bi-trash p-1"  data-id="'+ element.id +'" style="cursor:pointer"></span> \
                      </div>'
                  })

                })
                
                $('#system_paramter_table').DataTable({
                  data:  tableData ,
                  dom: 'Bfrtip',
                  destroy: true,
                  columns: [
                    { data: 'id' },
                    { data: 'label' },
                    { data: 'value' },
                    { data: 'comment' },
                    { data: 'last_modified' },
                    { data: 'action'}
                  ],
                  columnDefs:[
                    {
                      targets: [0], 
                      visible: false 
                    }
                    
                  ],
                  "order": [[ 1, "asc" ]]
                })
              }
            $('#adding_systemParamerter_label').val('')
            $('#adding_systemParamerter_value').val('')
            $('#adding_systemParamerter_comment').val('')
            $('#adding_systemParamerter_reason').val('')
            $('#systemParamerterModal').modal('hide')

          }
          else{
            showErrorNotification(data['message'])
          }
        },
        error: function(e){
          showErrorNotification('The error happend while requesting the server')
        }
      })
    })

    // remove system paramter from the table
    $('#system_paramter_table').on('click', '.bi-trash', function(){
      var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent)  

      let reason = prompt('Please write the reason why you remove this parameter.', '')
      if (reason != null){
        selectedPId = this.getAttribute('data-id')
        $.ajax({
          type: "GET",
          url: 'removeSystemParameters',
          data: {
            selectedPId: selectedPId,
            p_reason: reason,
            p_user: currentUserName,
          },
          success: function (data){
            data = JSON.parse(data)
            var result = data['result']
            
            if(result){
              showSuccessNotification('The system parameter has been removed successfully.')
              
              var system_parameters = data['system_parameters']
              
              var tableData = []
              if(system_parameters.length){
                  system_parameters.forEach(element => {
                    tableData.push({
                      'id': element.id,
                      'label': element.label ,
                      'value': element.value,
                      'comment': element.comment,
                      'last_modified': element.modified_at,
                      'action': '<div class="inner-flex">\
                        <span class="bi bi-trash  p-1" data-id="'+ element.id +'" style="cursor:pointer"></span> \
                        </div>'
                    })

                  })
                  
                  $('#system_paramter_table').DataTable({
                    data:  tableData ,
                    dom: 'Bfrtip',
                    destroy: true,
                    columns: [
                      { data: 'id' },
                      { data: 'label' },
                      { data: 'value' },
                      { data: 'comment' },
                      { data: 'last_modified' },
                      { data: 'action'}
                    ],
                    columnDefs:[
                      {
                        targets: [0], 
                        visible: false 
                      },
                     
                    ],
                    "order": [[ 1, "asc" ]]
                  })
                }

              $('#systemParamerterModal').modal('hide')

            }
            else{
              showErrorNotification(data['message'])
            }
          },
          error: function(e){
            showErrorNotification('The error happend while requesting the server')
          }
        })
      }
    })

    //initialize the target systems page
    if(document.getElementById('target_systems')){
      target_systems = JSON.parse(document.getElementById('target_systems').textContent)
      all_datatype = JSON.parse(document.getElementById('all_datatype').textContent)
      if(target_systems.length){
        target_systems.forEach(element => {
              tableData.push({
                'id': element.system_settings_id,
                'label': element.label ,
                'value': element.value,
                'comment' : element.comment,
              })
          })

          var targetSystemEditor = new DataTable.Editor({
            idSrc:  'id',
            fields: [
              {
                label: 'id',
                name: 'id'
              },
              {
                label: 'label',
                name: 'label'
              },
              {
                label: 'value',
                name: 'value'
              },
              {
                label: 'comment',
                name: 'comment'
              },
            ],
            table: '#target_systems_table'
          })
     
          $('#target_systems_table').DataTable({
            data:  tableData ,
            destroy: true,
            autoWidth: false,
            columns: [
              { data: 'id'},
              { data: 'label' },
              { data: 'value' },
              { data: 'comment' },
            
            ],
            order: [[1, 'asc']],
            columnDefs: [
              {
                targets: [0],
                visible: false
              }
            ]}
          )

          $('#target_systems_table').on('click', 'td:nth-child(n+2):nth-child(-n+4)', function(){
            targetSystemEditor.inline(this)
          })

          targetSystemEditor.on('edit', function(e, datatable, cell) {
            id = cell.id
            label = cell.label
            value = cell.value
            comment = cell.comment
            if(value){
              $.ajax({
                type: "GET",
                url: 'updateTargetSystemDetail',
                data: {
                  id: id,
                  label: label,
                  value: value,
                  comment: comment
                },
                success: function (data){
                  data = JSON.parse(data)
                  var result = data['result']
                  if(result){
                    target_systems = data['target_systems']
                    document.getElementById('target_systems').textContent = JSON.stringify(target_systems)
                    showSuccessNotification('The target system has been updated successfully!')
                    let all_datatype = JSON.parse(document.getElementById('all_datatype').textContent)
                    showDataTypeTable(target_systems, all_datatype)
                    $('#target_system_id').val('')
                  }
                  else{
                    showErrorNotification('The error happend while updating the target system!')
                  }
                },
                error: function(){
                  showErrorNotification('The error happend while requesting the server')
                }
               })
            }else{
              showErrorNotification('The target system value should not be empty.')
            }

          })

          showDataTypeTable(target_systems, all_datatype)

      }else{
          var html = '<tr> \
              <td></td> \
              <td>No data</td> \
              <td></td> \
              </tr>'
            $('#target_systems_table tbody').html(html)

            var html = '<thead style="background-color: #000; color: white; border: solid 1px;"> \
                            <tr class="text-center"> \
                                <th scope="col" class="text-center">Undefined System</th> \
                            </tr> \
                        </thead> \
                        <tbody> \
                            <tr style="border: solid 1px"> \
                                <td></td> \
                            </tr> \
                        </tbody>'
            
            $('#system_datatype_table').html(html)
      }
    }

    if(document.getElementById('all_authority')){
  
      var all_authority = JSON.parse(document.getElementById('all_authority').textContent)
      
      var tableData = []
      if(all_authority.length){
        all_authority.forEach(element => {
             tableData.push({
              'id': element.authority_id,
              'label': element.authority_label ,
              'description': element.authority_description,
              'comment': element.authority_comment,
             
             })
          })

          let authorityEditor =  new DataTable.Editor({
            idSrc:  'id',
            fields: [
              {
                label: 'id',
                name: 'id'
              },
              {
                label: 'label',
                name: 'label'
              },
              {
                label: 'description',
                name: 'description'
              },
              {
                label: 'comment',
                name: 'comment'
              },
            ],
            table: '#authority_table'
          })
          
          $('#authority_table').DataTable({
            data:  tableData ,
            destroy: true,
            columns: [
              { data: 'id' },
              { data: 'label' },
              { data: 'description' },
              { data: 'comment' },
            ],
            columnDefs: [
              {
                targets: [0], 
                visible: false 
              }
            ]
          }
          )

          $('#authority_table').on('click', 'td', function(){
            authorityEditor.inline(this)
            let sTable = $('#authority_table').DataTable()
            let cell = sTable.cell(this)
            let row = cell.index().row;
            let rowData = sTable.row(row).data()
            let selectedResourceId = rowData.id
            $('#authority_id').val(selectedResourceId)
          })

          authorityEditor.on('edit', function(e, datatable , cell){
            id = cell.id
            label = cell.label
            description = cell.description
            comment = cell.comment
            if(label && description){
              $.ajax({
                type: "GET",
                url: 'updateAuthorityDetail',
                data: {
                  id: id,
                  label: label,
                  description: description,
                  comment: comment
                },
                success: function (data){
                  data = JSON.parse(data)
                  var result = data['result']
                  
                  if(result){
                    showSuccessNotification('The authority has been updated successfully!')
                    let all_authority = data['all_authority']
                    document.getElementById('all_authority').textContent = JSON.stringify(all_authority)
                    if(all_authority.length){
                      let tableData = []
                      all_authority.forEach(element => {
                           tableData.push({
                            'id': element.authority_id,
                            'label': element.authority_label ,
                            'description': element.authority_description,
                            'comment': element.authority_comment,
                           })
                        })

                        $('#authority_table').DataTable({
                          data:  tableData ,
                          destroy: true,
                          columns: [
                            { data: 'id' },
                            { data: 'label' },
                            { data: 'description' },
                            { data: 'comment' },
                          ],
                          columnDefs: [
                            {
                              targets: [0], 
                              visible: false 
                            }
                          ]
                        }
                        )
                    }

                  }
                  else{
                    showErrorNotification('The error happend while updating the authority detail!')
                  }
                },
                error: function(e){
                  showErrorNotification('The error happend while requesting the server')
                }
              })
            }else{
              showErrorNotification('Label and description should not be empty string.')
            }
          })

      }else{
        html = '<tr><td style="display:none"></td><td></td><td>No data</td><td></td></tr>'
        $('#authority_table tbody').html(html)
      }
    }

    if(document.getElementById('all_possible_state')){
      var all_possible_state = JSON.parse(document.getElementById('all_possible_state').textContent)
      var all_authority = JSON.parse(document.getElementById('all_authority').textContent)

      var tableData = []
      if(all_possible_state.length){
        all_possible_state.forEach(element => {

             tableData.push({
              'id': element.state_id,
              'label': element.state_label ,
              'description': element.state_description,              
              'equipment_state': element.valid_for_equipment,
              'connection_state': element.valid_for_connection,
              'comment': element.state_comment,
              'authority_label': element.authority_label
             })
          })

          let stateEditor =  new DataTable.Editor({
            idSrc:  'id',
            fields: [
              {
                label: 'id',
                name: 'id'
              },
              {
                label: 'label',
                name: 'label'
              },
              {
                label: 'description',
                name: 'description'
              },
              {
                label: 'equipment_state',
                name: 'equipment_state'
              },
              {
                label: 'connection_state',
                name: 'connection_state'
              },
              {
                label: 'comment',
                name: 'comment'
              },
            ],
            table: '#possible_state_table'
          })
          
          $('#possible_state_table').DataTable({
            data:  tableData ,
            destroy: true,
            columns: [
              { data: 'id' },
              { data: 'label' },
              { data: 'description' },
              { data: 'equipment_state'},
              { data: 'connection_state'},
              { data: 'comment'},
              { 
                data: 'authority_label' ,
                render: function (data, type, rowData){
                  var selectOptions = all_authority.map(option => {
                    if(option.authority_label === data){
                        return  `<option value="${option.authority_id}" selected>${option.authority_label}</option>`
                    }
                    else{
                        return  `<option value="${option.authority_id}">${option.authority_label}</option>`
                    }
                  }
                  ).join('');
                  return `<select data-id="`+ rowData.id +`"style="width: 100%">${selectOptions}</select>`;
                
                }
              },
              
            ],
            columnDefs: [
              {
                targets: [0], 
                visible: false 
              }
            ]
          }
          )
          $('#possible_state_table').on('click', 'td:nth-child(n):nth-child(-n+5)', function(){
            stateEditor.inline(this)
            let sTable = $('#possible_state_table').DataTable()
            let cell = sTable.cell(this)
            let row = cell.index().row;
            let rowData = sTable.row(row).data()
            let selectedStateId = rowData.id
            console.log(selectedStateId)
            $('#state_id').val(selectedStateId)
          })

          stateEditor.on('edit', function(e, datatable , cell){
            id = cell.id
            label = cell.label
            description = cell.description
            equipmentState = cell.equipment_state
            connectionState = cell.connection_state
            comment = cell.comment
            authLabel = cell.authority_label
            selectedAuth = all_authority.find(element => element.authority_label == authLabel)
            authId = selectedAuth.authority_id
            if(label && description){
              $.ajax({
                type: "GET",
                url: 'updateStateDetail',
                data: {
                  id: id,
                  label: label,
                  description: description,
                  comment: comment,
                  equipmentState: equipmentState,
                  connectionState: connectionState,
                  authId: authId,
                },
                success: function (data){
                  data = JSON.parse(data)
                  var result = data['result']
                  
                  if(result){
                    showSuccessNotification('The state has been updated successfully!')
                    let all_possible_state = data['all_possible_state']
                    document.getElementById('all_possible_state').textContent = JSON.stringify(all_possible_state)
                    if(all_possible_state.length){
                      let tableData = []
                      all_possible_state.forEach(element => {

                        tableData.push({
                         'id': element.state_id,
                         'label': element.state_label ,
                         'description': element.state_description,              
                         'equipment_state': element.valid_for_equipment,
                         'connection_state': element.valid_for_connection,
                         'comment': element.state_comment,
                         'authority_label': element.authority_label
                        })
                     })

                     $('#possible_state_table').DataTable({
                       data:  tableData ,
                       destroy: true,
                       columns: [
                         { data: 'id' },
                         { data: 'label' },
                         { data: 'description' },
                         { data: 'equipment_state'},
                         { data: 'connection_state'},
                         { data: 'comment'},
                         { 
                           data: 'authority_label' ,
                           render: function (data, type, rowData){
                             var selectOptions = all_authority.map(option => {
                               if(option.authority_label === data){
                                   return  `<option value="${option.authority_id}" selected>${option.authority_label}</option>`
                               }
                               else{
                                   return  `<option value="${option.authority_id}">${option.authority_label}</option>`
                               }
                             }
                             ).join('');
                             return `<select data-id="`+ rowData.id +`"style="width: 100%">${selectOptions}</select>`;
                           
                           }
                         },
                         
                       ],
                       columnDefs: [
                         {
                           targets: [0], 
                           visible: false 
                         }
                       ]
                     }
                     )

                    }
                  }
                  else{
                    showErrorNotification('The error happend while updating the state detail!')
                  }
                },
                error: function(e){
                  showErrorNotification('The error happend while requesting the server')
                }
              })
            }else{
              showErrorNotification('Label and description should not be empty string.')
            }
          })
          

      }else{
        html = 'No data'
        $('#possible_state_table tbody').html(html)
      }
    }

    // system users tab in system page
    if(document.getElementById('system_users')){
      let system_users = JSON.parse(document.getElementById('system_users').textContent)
      var tableData = []
      if(system_users.length){
        system_users.forEach(element => {
             tableData.push({
              'username': element.username ,
              'firstName': element.first_name,              
              'lastName': element.last_name,
              'email': element.email,
              'joined': element.date_joined,
             })
          })

          $('#system_users_table').DataTable({
            data:  tableData ,
            destroy: true,
            columns: [
              { data: 'username' },
              { data: 'email'},
              { data: 'firstName' },
              { data: 'lastName' },
              { data: 'joined'},
            ],
          }
          )

      }else{
        html = 'No data'
        $('#system_users_table tbody').html(html)
      }
    }

    // History
    if(document.getElementById('history_logs')){
  
      var history_logs = JSON.parse(document.getElementById('history_logs').textContent)
      
      var tableData = []

      history_logs.forEach(element => {
         var temp = element.new;

         if(element.action =='DELETE') temp = element.old;
         temp = JSON.parse(temp)

         var item_name = element.item;

         switch(item_name) {
          case 'Equipment':
            item_name = temp['identifier'];
            break;
          case 'Equipment Types':
            item_name = temp['label'];
            break;
          case 'Equipment Interfaces':
            item_name = temp['identifier'];
            break;
          case 'Connection Types':
            item_name = temp['label'];
            break;
          case 'Equipment Properties':
            item_name = temp['modifier'];
            break;
          case 'Connections':
            item_name = temp['identifier'];
            break;
         }
         tableData.push({
          'type': element.item,
          'item': item_name,
          'action': element.action,
          'before': element.old,
          'after': element.new,
          'log_time': element.log_time
         })
      })

      var make_json_view = function(data) {
        if(data == "") return data;

        var json = JSON.parse(data);
        var content = "[<br>";

        for (const [key, value] of Object.entries(json)) {
          content += "&nbsp;&nbsp;"+ key+": "+value+",<br>";
        }
        content += "]";

        return content;
      }
      var history_table = $('#history_table').DataTable({
        data:  tableData ,
        dom: 'Bfrtip',
        destroy: true,
        columns: [
          { data: 'item' },
          { data: 'action' },
          { data: 'before',
            render: function(data, type, row) {
              return '<span style="white-space:normal">' + make_json_view(data) + "</span>";
            }
          },
          { data: 'after',
            render: function(data, type, row) {
              return '<span style="white-space:normal">' + make_json_view(data) + "</span>";
            }
          },
          { data: 'log_time' }
        ],
        "order": [[ 4, "desc" ]]
      })
    }
    
    let selected_function = "Equipment";

   

    $('.log-item').click(function(e){
      var item = $(this).text().trim();

      $('.log-item').addClass('collapsed');
      $(this).removeClass('collapsed');
      if(selected_function != item) {
        selected_function = item;
        set_logs();
      }
    });




});

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    toolbar_sticky_offset: isSmallScreen ? 102 : 108,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    templates: [{
        title: 'New Table',
        description: 'creates a new table',
        content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
      },
      {
        title: 'Starting my story',
        description: 'A cure for writers block',
        content: 'Once upon a time...'
      },
      {
        title: 'New list with dates',
        description: 'New List with dates',
        content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
      }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable);
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

  function createEquipmentTree(data) {
    const nodeWithParent = []
    
    //make the equipment_path as string from list
    data.forEach(element => {
      if(element.equipment_path){
        path = element.equipment_path.join('.')
        element.equipment_path = path        
      }else{
        element.equipment_path = ''
      }     
    })

    //Find the parent for each element
    data.forEach(element => {
      const parent = element.equipment_path.includes('.')? element.equipment_path.substr(0, element.equipment_path.lastIndexOf('.')):null
      nodeWithParent.push({...element, parent})
    });

    //Recursive function to create HTML out of node
    function getNodeHtml(n) {
      let html = ''
      const children = nodeWithParent.filter(d => d.parent === n.equipment_path)
                
      if(children.length > 0) {
        html += '<li class="treeview-animated-items treeview-li"> \
                    <a class="closed"> \
                      <i class="fas fa-angle-right"></i> \
                      <span class="ml-1 treeview-title" data-equipmentpath="'+ n.equipment_path +'">'+ n.equipment_full_identifier + '  (' + n.equipment_description + ')</span> \
                    </a> \
                    <ul class="nested">' 
          + children.map( getNodeHtml).join('')
          + '</ul></li>'
      }
      else{
        html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-equipmentpath="'+ n.equipment_path + '"> \
        '+n.equipment_full_identifier + '  (' + n.equipment_description +')</li>'
      }
      return html
    }

    // Get all root nodes (without parent)
    const root = nodeWithParent.filter(d => d.parent === null)

    return root.map(getNodeHtml).join('')
  }

  function createConnectionTree(data) {
    const nodeWithParent = []
    
    //make the equipment_path as string from list
    data.forEach(element => {
      if(element.connection_path){
        path = element.connection_path.join('.')
        element.connection_path = path       
      }else{
        element.connection_path = ''
      }   
    })

    //Find the parent for each element
    data.forEach(element => {
      const parent = element.connection_path.includes('.')? element.connection_path.substr(0, element.connection_path.lastIndexOf('.')):null
      nodeWithParent.push({...element, parent})
    });

    //Recursive function to create HTML out of node
    function getNodeHtml(n) {
      let html = ''
      const children = nodeWithParent.filter(d => d.parent === n.connection_path)
                
      if(children.length > 0) {
        html += '<li class="treeview-animated-items treeview-li"> \
                    <a class="closed"> \
                      <i class="fas fa-angle-right"></i> \
                      <span class="ml-1 treeview-title" data-connectionpath="'+ n.connection_path +'">'+ n.connection_local_identifier + '  (' + n.connection_description + ')</span> \
                    </a> \
                    <ul class="nested">' 
          + children.map( getNodeHtml).join('')
          + '</ul></li>'
      }
      else{
        html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-connectionpath="'+ n.connection_path + '"> \
        '+n.connection_local_identifier + '  (' + n.connection_description +')</li>'
      }
      return html
    }

    // Get all root nodes (without parent)
    const root = nodeWithParent.filter(d => d.parent === null)

    return root.map(getNodeHtml).join('')
  }

  function createEquipmentTypeTree(data) {
    const nodeWithParent = []
    
    //make the path as string from list
    data.forEach(element => {
      if(element.path){
          path = element.path.join('.')
          element.path = path        
      }else{
          element.path = ''
      }
      
    })

    //Find the parent for each element
    data.forEach(element => {
      const parent = element.path.includes('.')? element.path.substr(0, element.path.lastIndexOf('.')):null
      nodeWithParent.push({...element, parent})
    });

    //Recursive function to create HTML out of node
    function getNodeHtml(n) {
      let html = ''
      const children = nodeWithParent.filter(d => d.parent === n.path)
                
      if(children.length > 0) {
        html += '<li class="treeview-animated-items treeview-li"> \
                    <a class="closed"> \
                      <i class="fas fa-angle-right"></i> \
                      <span class="ml-1 treeview-title" data-typeid="'+ n.id +'" data-typepath="'+ n.path +'">'+ n.label + '  (' + n.description + ')</span> \
                    </a> \
                    <ul class="nested">' 
          + children.map( getNodeHtml).join('')
          + '</ul></li>'
      }
      else{
        html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-typeid="'+n.id+'" data-typepath="'+ n.path + '"> \
        '+n.label + '  (' + n.description +')</li>'
      }
      return html
    }

    // Get all root nodes (without parent)
    const root = nodeWithParent.filter(d => d.parent === null)

    return root.map(getNodeHtml).join('')
  }

  function createConnectionTypeTree(data){
      const nodeWithParent = []
          
      //make the path as string from list
      data.forEach(element => {
        if(element.path){
            path = element.path.join('.')
            element.path = path   
        }else{
            element.path = ''
        }
            
      })

      //Find the parent for each element
      data.forEach(element => {
        const parent = element.path.includes('.')? element.path.substr(0, element.path.lastIndexOf('.')):null
        nodeWithParent.push({...element, parent})
      });

      //Recursive function to create HTML out of node
      function getNodeHtml(n) {
        let html = ''
        const children = nodeWithParent.filter(d => d.parent === n.path)
                  
        if(children.length > 0) {
          html += '<li class="treeview-animated-items treeview-li"> \
                      <a class="closed"> \
                        <i class="fas fa-angle-right"></i> \
                        <span class="ml-1 treeview-title" data-typeid="'+ n.id +'" data-typepath="'+ n.path +'">'+ n.label + '  (' + n.description + ')</span> \
                      </a> \
                      <ul class="nested">' 
            + children.map( getNodeHtml).join('')
            + '</ul></li>'
        }
        else{
          html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-typeid="'+n.id+'" data-typepath="'+ n.path + '"> \
          '+n.label + '  (' + n.description +')</li>'
        }
        return html
      }

      // Get all root nodes (without parent)
      const root = nodeWithParent.filter(d => d.parent === null)

      return root.map(getNodeHtml).join('')
  }

  function createPropertyTree(resourceProperty, attributeClassesHavingProperty) {
    var resource_id_list = []
    let html = ''
    attributeClassesHavingProperty.forEach(element => {
        html += '<li class="treeview-animated-items treeview-li"> \
                  <a class="closed"> \
                    <i class="fas fa-angle-right"></i> \
                    <span class="ml-1 treeview-title" data-typeid="" data-typepath="">'+ element.attribute_class_label + '  (' + element.attribute_class_description + ')</span> \
                  </a> \
                  <ul class="nested">' 
        atcId = element.attribute_class_id
        propertiesByAttribute = resourceProperty.filter(property => property.attribute_class_id == atcId)
        propertiesByAttribute.forEach(n => {
            if(!resource_id_list.includes(n.id)){
                resource_id_list.push(n.id)
                html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-propertyId="'+ n.id + '"> \
                ' + n.modifier + '  (' + n.description +')</li>'
            }
        })
        
        html += '</ul></li>'
    })
      
    return html
  }

  function createInterfaceTree(all_interfaces, interfaceClasesHavingInterface) {
    let html = ''
    var interface_id_list = []
    interfaceClasesHavingInterface.forEach(element => {
        html += '<li class="treeview-animated-items treeview-li"> \
                  <a class="closed"> \
                    <i class="fas fa-angle-right"></i> \
                    <span class="ml-1 treeview-title" data-interfaceId="">'+ element.label + '  (' + element.description + ')</span> \
                  </a> \
                  <ul class="nested">' 
        itcId = element.id
        interfacesByClassID = all_interfaces.filter(interfaces => interfaces.interface_class_id == itcId)
        interfacesByClassID.forEach( n => {
            if(!interface_id_list.includes(n.id)){
                interface_id_list.push(n.id)
                html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-interfaceId="'+ n.id + '"> \
                ' + n.identifier + '  (' + n.description +')</li>'
            }
        })
        html += '</ul></li>'
    })
      
    return html
  }

  function showDataTypeTable(target_systems, all_datatype){
    // get the matched headers for datatype table
    var columnHeaderMatch = {
      'scada_1': target_systems.find(element => element.label ==='scada_1')? target_systems.find(element => element.label ==='scada_1').value :'',
      'scada_2': target_systems.find(element => element.label ==='scada_2')? target_systems.find(element => element.label ==='scada_2').value :'',
      'scada_3': target_systems.find(element => element.label ==='scada_3')? target_systems.find(element => element.label ==='scada_3').value :'',
      'scada_4': target_systems.find(element => element.label ==='scada_4')? target_systems.find(element => element.label ==='scada_4').value :'',
      'scada_5': target_systems.find(element => element.label ==='scada_5')? target_systems.find(element => element.label ==='scada_5').value :'',
      'control_1': target_systems.find(element => element.label ==='control_1')? target_systems.find(element => element.label ==='control_1').value :'',
      'control_2': target_systems.find(element => element.label ==='control_2')? target_systems.find(element => element.label ==='control_2').value :'',
      'control_3': target_systems.find(element => element.label ==='control_3')? target_systems.find(element => element.label ==='control_3').value :'',
      'control_4': target_systems.find(element => element.label ==='control_4')? target_systems.find(element => element.label ==='control_4').value :'',
      'control_5': target_systems.find(element => element.label ==='control_5')? target_systems.find(element => element.label ==='control_5').value :'',
    }
    // filter the matched headers with not null string headers
    columnHeaderMatch = Object.fromEntries(
      Object.entries(columnHeaderMatch).filter(([key, value]) => value !== '')
    );
    
    
    var columnHeadersKeys = Object.keys(columnHeaderMatch)
    var columnHeaders = Object.values(columnHeaderMatch)      
   
    // initialzie the system_datatype_table theader and emptry tbody
    var html = '<thead style="background-color: #000; color: white; border: solid 1px;"><tr class="text-center">'
    html += '<th>Label</th><th>Description</th>'
    columnHeaders.forEach(element =>{
      html += '<th scope="col" class="text-center">'+ element +'</th>'
    })
    html += '<th>Comment</th><th></th>'
              
    html += '</tr></thead><tbody><tr style="border: solid 1px">'
    html += '<td></td><td></td>'
    columnHeaders.forEach(element =>{
      html += '<td></td>'
    })
    html += '<td></td><td></td>'
    html += '</tr></tbody>'
      
    $('#system_datatype_table').html(html)

    // put the system datatype table with real type data
    if(all_datatype.length){
      html = '<tr>'
      all_datatype.forEach(element => {
        html += '<td>'+ element.label +'</td>'
        html += '<td>'+ element.description +'</td>'
        columnHeadersKeys.forEach(headerkey => {
          html += '<td>'+ element[headerkey] +'</td>'
        })
        html += '<td>'+ element.comment +'</td>'
        html += '<td><div class="inner-flex">\
        <span class="bi bi-pencil  p-1" data-id="'+ element.id +'" style="cursor:pointer"></span> \
        <span class="bi bi-trash  p-1" data-id="'+ element.id +'" style="cursor:pointer"></span> \
        </div></td></tr>'

      })
      $('#system_datatype_table tbody').html(html)
      
    }else{
      var html  = 'No data'
      $('#system_datatype_table tbody').html(html)
    }

  }
  // remove equipment
  if(select('#equipmentRemoveModal .btn-primary')){
    on('click','#equipmentRemoveModal .btn-primary' , function(){
      var selectedEquipmentId = $('#equipment_id').val()
      var remove_option = $('#remove_equipment_option').val()
      if(selectedEquipmentId){
        var reason = $('#remove_equipment_reason').val()
        var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent)  
        
        $.ajax({
          type: "GET",
          url: 'removeEquipment',
          data: {
            modified_by: currentUserName,
            remove_reason: reason,
            equipment_id: selectedEquipmentId ,
            remove_option: remove_option
          },
          success: function (data){
            data = JSON.parse(data)
            var result = data['result']
            var equipment_list = data['equipment_list']
            if(result){

              showSuccessNotification('The equipment has been  removed successfully!')
                
              $("#location_path").find('option').remove()
              $("#parent_path").find('option').remove()
              $('#all_equipment_types_select').find('option').remove()
              $('#equipment_id').val('')
              $('#equipment_full_identifier').val('')
              $('#equipment_local_identifier').val('')
              $('#equipment_use_parent_identifier').prop('checked' , false)
              $('#equipment_description').val('')
              $('#equipment_comment').val('')
              $('#basic-full-identifier').val('')
              $('#equipment_is_approved').prop('checked' , false)
              $('#remove_equipment_reason').val('')
              $("#equipmentRemoveModal").modal('hide');
              if(equipment_list){
                const html = createEquipmentTree(equipment_list)
                document.getElementById('all_equipment_tree').innerHTML = html
                $('.treeview-animated').mdbTreeview();
              }

            }
            else{
              showErrorNotification(data['message'])
            }
          }
          })
        
        
      }else{
        showErrorNotification('You need to select the equipment to be removed!')
      }
      
    })
  }

  // when clicking the add same equipment btn for modal
  if(select('#btn_equipment_add_same')){
    on('click','#btn_equipment_add_same' , function(){
      // make  all dropdown list empty
      $("#adding_parent_path").find('option').remove()
      $("#adding_location_path").find('option').remove()
      $("#adding_equipment_type").find('option').remove()

       var selectedEquipmentId = $('#equipment_id').val()
       if(selectedEquipmentId){
          
          allEquipment = JSON.parse(document.getElementById('all_equipment').textContent)
          allEquipmentTypes = JSON.parse(document.getElementById('all_equipment_types').textContent)

          selectedEquipment = allEquipment.filter(element => element.equipment_id == parseInt(selectedEquipmentId))

          // display parent path and location path
          var p = new Option('none' , '', undefined, false);
          $(p).html('none');
          $("#adding_location_path").append(p);

          var o = new Option('none' , '', undefined, false);
          $(o).html('none');
          $("#adding_parent_path").append(o);

          allEquipment.forEach( element => {

            element_equipment_path = element.equipment_path.join('.')
            var selected_element_path = selectedEquipment[0]['equipment_path']
            selected_element_path = selected_element_path.join('.')
           
            if(selected_element_path.indexOf('.'))
              selected_element_parent_path = selected_element_path.substr(0, selected_element_path.lastIndexOf('.'))
            else
              selected_element_parent_path = ''
            
            var selected = element_equipment_path === selected_element_parent_path ? true : false ;
            var o = new Option(element.equipment_full_identifier, element.equipment_path, undefined, selected);
            $(o).html(element.equipment_full_identifier);
            $("#adding_parent_path").append(o);
  
            
            var p = new Option(element.equipment_full_identifier, element.equipment_path, undefined, undefined);
            $(p).html(element.equipment_full_identifier);
            $("#adding_location_path").append(p);
  
          })
  
          // display type drop down 
          allEquipmentTypes.forEach( element => {
            var t = new Option(element.label, element.id, undefined, undefined);
            $(t).html(element.label);
            $("#adding_equipment_type").append(t);
          })

       }
       else{
          showErrorNotification('You have to select the equipment to be same!')
       }
    })
  }

  // when clicking the add child equipment btn for modal
  if(select('#btn_equipment_add_child')){
    on('click','#btn_equipment_add_child' , function(){
      // make  all dropdown list empty
      $("#adding_parent_path").find('option').remove()
      $("#adding_location_path").find('option').remove()
      $("#adding_equipment_type").find('option').remove()

       var selectedEquipmentId = $('#equipment_id').val()
       if(selectedEquipmentId){
          
          allEquipment = JSON.parse(document.getElementById('all_equipment').textContent)
          allEquipmentTypes = JSON.parse(document.getElementById('all_equipment_types').textContent)

          selectedEquipment = allEquipment.filter(element => element.equipment_id == parseInt(selectedEquipmentId))

          // display parent path and location path
          var p = new Option('none' , '', undefined, false);
          $(p).html('none');
          $("#adding_location_path").append(p);

          var o = new Option('none' , '', undefined, false);
          $(o).html('none');
          $("#adding_parent_path").append(o);

          allEquipment.forEach( element => {
            var element_equipment_path = element.equipment_path.join('.')
            var selected_element_path = selectedEquipment[0]['equipment_path']
            selected_element_path = selected_element_path.join('.')

            var selected = element_equipment_path === selected_element_path ? true : false ;
            var o = new Option(element.equipment_full_identifier, element.equipment_path, undefined, selected);
            $(o).html(element.equipment_full_identifier);
            $("#adding_parent_path").append(o);
  
            
            var p = new Option(element.equipment_full_identifier, element.equipment_path, undefined, undefined);
            $(p).html(element.equipment_full_identifier);
            $("#adding_location_path").append(p);
  
          })
  
          // display type drop down 
          allEquipmentTypes.forEach( element => {
            var t = new Option(element.label, element.id, undefined, undefined);
            $(t).html(element.label);
            $("#adding_equipment_type").append(t);
          })

       }
       else{
          showErrorNotification('You have to select the equipment to be same!')
       }
    })
  }

  // add euqipment in the modal
  if(select('#equipmentModal .btn-primary'))
  {
    on('click', '#equipmentModal .btn-primary', function(){
      var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent)
      var addingEquipmentIdentifier = $('#adding_equipment_identifier').val()
      var addingEquipmentReason = $('#adding_equipment_reason').val()
      var addingEquipmentLocationPath = $('#adding_location_path').val()
      // console.log(addingEquipmentIdentifier)
      if(addingEquipmentIdentifier && addingEquipmentReason && addingEquipmentLocationPath){
        if(confirm('Are you sure to add this equpment?')){
            var addingEquipmentDescription = $('#adding_equipment_description').val()
            var addingEquipmentParentPath = $('#adding_parent_path').val()
            addingEquipmentParentPath =  addingEquipmentParentPath.replaceAll(',', '.')
            
            addingEquipmentLocationPath = addingEquipmentLocationPath.replaceAll(',', '.')
            var addingEquipmentIncludeParentFlag = $('#adding_equipment_use_parent_identifier').prop('checked')
            var addingEquipmentTypeId = $('#adding_equipment_type').val()
            var addingEquipmentComment = $('#adding_equipment_comment').val()
            var addingEquipmentApproved = $('#adding_equipment_approved').prop('checked')
            $.ajax({
              type: "GET",
              url: 'addEquipment',
              data: {
                equipment_local_identifier: addingEquipmentIdentifier,  
                equipment_use_parent_identifier: addingEquipmentIncludeParentFlag,
                equipment_parent_path: addingEquipmentParentPath,
                equipment_description: addingEquipmentDescription,
                equipment_location_path: addingEquipmentLocationPath,
                equipment_type_id: addingEquipmentTypeId,
                equipment_comment: addingEquipmentComment,
                equipment_is_approved: addingEquipmentApproved,
                equipment_reason: addingEquipmentReason,
                equipment_added_by: currentUserName,
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']
                var equipment_list = data['equipment_list']
                if(result){
                  showSuccessNotification('The equipment has been inserted successfully!')
                  $('#adding_equipment_identifier').val('')
                  $('#adding_equipment_description').val('')
                  $('#adding_parent_path').find('option').remove()
                  $('#adding_location_path').find('option').remove()
                  $('#adding_equipment_use_parent_identifier').prop('checked', false)
                  $('#adding_equipment_type').find('option').remove()
                  $('#adding_equipment_comment').val('')
                  $('#adding_equipment_approved').prop('checked', false)
                  $('#adding_equipment_reason').val('')
                  $("#equipmentModal").modal('hide');
                  if(equipment_list){
                    const html = createEquipmentTree(equipment_list)
                    document.getElementById('all_equipment_tree').innerHTML = html
                    $('.treeview-animated').mdbTreeview();
                  }
    
                }
                else{
                  showErrorNotification(data['message'])
                }
              }
            })
        }
      }else{
        showErrorNotification('The equipment identifier, location_path and the reason should be not empty.')        
      }
      
    })
  }
 
  // update equipment
  if(select('.equipment_page #commit'))
  {
    on('click', '.equipment_page #commit', function(){
      var equipment_id = $('#equipment_id').val()
      if(equipment_id){
        let reason = prompt('Please write the reason why you update this equipment.', '')
        if(reason != null ){
          var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent)
          var equipment_local_identifier = $('#equipment_local_identifier').val()         
          var equipment_parent_path = $('#parent_path').val()
          var equipment_description = $('#equipment_description').val()
          var equipment_location_path = $('#location_path').val()
          var equipment_type_id = $('#all_equipment_types_select').val()
          var equipment_comment = $('#equipment_comment').val()
          var equipment_is_approved = $('#equipment_is_approved').prop('checked')
          var equipment_use_parent_identifier = $('#equipment_use_parent_identifier').prop('checked')
          
          $.ajax({
           type: "GET",
           url: 'updateEquipmentDetail',
           data: {
             equipment_id: equipment_id,
             equipment_local_identifier: equipment_local_identifier,  
             equipment_use_parent_identifier: equipment_use_parent_identifier,
             equipment_parent_path: equipment_parent_path,
             equipment_description: equipment_description,
             equipment_location_path: equipment_location_path,
             equipment_type_id: equipment_type_id,
             equipment_comment: equipment_comment,
             equipment_is_approved: equipment_is_approved,
             equipment_reason: reason,
             equipment_added_by: currentUserName,
           },
           success: function (data){
             data = JSON.parse(data)
             var result = data['result']
             var equipment_list = data['equipment_list']
             if(result){
               showSuccessNotification('The equipment has been updated successfully!')
 
               const html = createEquipmentTree(equipment_list)
               document.getElementById('all_equipment_tree').innerHTML = html
               $('.treeview-animated').mdbTreeview();
 
               $("#location_path").find('option').remove()
               $("#parent_path").find('option').remove()
               $('#all_equipment_types_select').find('option').remove()
               $('#equipment_id').val('')
               $('#equipment_full_identifier').val('')
               $('#equipment_local_identifier').val('')
               $('#equipment_use_parent_identifier').prop('checked' , false)
               $('#equipment_description').val('')
               $('#equipment_comment').val('')
               $('#basic-full-identifier').val('')
               $('#equipment_is_approved').prop('checked' , false)
             }
             else{
              showErrorNotification(data['message'])
             }
           }
          })
 
       }
      }else{
        showErrorNotification('You have to select the equipment to be updated!')
      }
      
    })
  }

  // update equipment attribute's property value
  $("#equipment_attribute").on("blur", 'td[contenteditable="true"]', function() {
    var currentValue = $(this).text();
    var sibTds = $(this).siblings('td')
    var selectedEquipmentId = sibTds.eq(0).text()
    var selectedResourceId = sibTds.eq(1).text()
    var selectedPropertyId = sibTds.eq(2).text()
    // console.log(selectedEquipmentId, selectedResourceId, selectedPropertyId , currentValue);
    $.ajax({
        type: "GET",
        url: 'updateEquipmentPropertyValue',
        data: {
          equipment_id: selectedEquipmentId,
          resource_id: selectedResourceId,
          property_id: selectedPropertyId,
          value: currentValue
        },
        success: function (data){
          data = JSON.parse(data)
          console.log(data)
          var result = data['result']
          if(result){
            showSuccessNotification('The value has been updated successfully!')
          }else{
            showErrorNotification('The error has happend while saving the information')
          }
        }
       }
    )
  });

  // update connection
  if(select('#btn_connection_commit'))
   {
     on('click', '#btn_connection_commit', function(){
      var connection_id = $('#connection_id').val()  
       if(connection_id){
        let reason = prompt('Please write the reason why you update this connection.', '')
        if(reason != null){
          var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent)
          var connection_identifier = $('#connection_identifier').val()
          var connection_use_parent_identifier = $('#connection_use_parent_identifier').prop('checked')
          var connection_parent_path = $('#connection_parent_path').val()
          var connection_description = $('#connection_description').val()
          var connection_start_equipment_id = $('#start_equipment').val()
          var connection_end_equipment_id = $('#end_equipment').val()
          var connection_start_interface_id = $('#start_interface').val()
          var connection_end_interface_id = $('#end_interface').val()
          var connection_type_id = $('#all_connection_type').val()
          var connection_comment = $('#connection_comment').val()
          var connection_length = $('#connection_length').val()
          var connection_is_approved = $('#connection_is_approved').prop('checked')
          
          $.ajax({
           type: "GET",
           url: 'updateConnectionDetail',
           data: {
             connection_id: connection_id,
             connection_identifier: connection_identifier,  
             connection_use_parent_identifier: connection_use_parent_identifier,
             connection_parent_path: connection_parent_path,
             connection_description: connection_description,
             connection_length: connection_length,
             connection_start_equipment_id: connection_start_equipment_id,
             connection_end_equipment_id: connection_end_equipment_id,
             connection_start_interface_id: connection_start_interface_id,
             connection_end_interface_id: connection_end_interface_id,
             connection_type_id: connection_type_id,
             connection_comment: connection_comment,
             connection_is_approved: connection_is_approved,          
             connection_reason: reason,
             connection_added_by: currentUserName,
           },
           success: function (data)
           {
             data = JSON.parse(data)
             var result = data['result']
             var connection_list = data['connection_list']
             if(result){
               showSuccessNotification('The connection has been updated successfully!')
 
               const html = createConnectionTree(connection_list)
               document.getElementById('all_connection_tree').innerHTML = html
               $('.treeview-animated').mdbTreeview();
 
               $("#connection_parent_path").find('option').remove()
               $("#all_connection_type").find('option').remove()
               $('#start_equipment').find('option').remove()
               $('#end_equipment').find('option').remove()
               $('#start_interface').find('option').remove()
               $('#end_interface').find('option').remove()
               $('#connection_id').val('')
               $('#connection_length').val('')
               $('#connection_identifier').val('')
               $('#connection_full_identifier').val('')
               $('#connection_use_parent_identifier').prop('checked' , false)
               $('#connection_description').val('')
               $('#connection_comment').val('')
               $('#basic-full-identifier').val('')
               $('#connection_is_approved').prop('checked' , false)
               
             }
             else{
              showErrorNotification(data['message'])
            }
           }
          })
 
       }
       }
       else{
        showErrorNotification('You have to select the connection to be updated!')
       }
       
     })
   }

   // when clicking the add same connection btn for modal
  if(select('#btn_connection_add_same')){
    on('click','#btn_connection_add_same' , function(){
      // make  all dropdown list empty
      $("#adding_connection_parent_path").find('option').remove()
      $("#adding_connection_start_equipment").find('option').remove()
      $("#adding_connection_end_equipment").find('option').remove()
      $("#adding_connection_start_interface").find('option').remove()
      $("#adding_connection_end_interface").find('option').remove()
      $("#adding_connection_type").find('option').remove()

       var selectedConnectionId = $('#connection_id').val()
       if(selectedConnectionId){
          
          allConnection = JSON.parse(document.getElementById('all_connection').textContent)
          allEquipment = JSON.parse(document.getElementById('all_equipment').textContent)
          allInterface = JSON.parse(document.getElementById('all_interface').textContent)
          allConnectionTypes = JSON.parse(document.getElementById('all_connection_types').textContent)

          selectedConnection = allConnection.filter(element => element.connection_id == parseInt(selectedConnectionId))

          // display parent path
          var p = new Option('none' , '', undefined, false);
          $(p).html('none');
          $("#adding_connection_parent_path").append(p);

          allConnection.forEach( element => {
            var selected_connection_parent_path
            element_connection_path = element.connection_path.join('.')
            var selected_connection_path = selectedConnection[0]['connection_path']
            selected_connection_path = selected_connection_path.join('.')
           
            if(selected_connection_path.indexOf('.'))
              selected_connection_parent_path = selected_connection_path.substr(0, selected_connection_path.lastIndexOf('.'))
            else
              selected_connection_parent_path = ''
            
            var selected = element_connection_path === selected_connection_parent_path ? true : false ;
            var o = new Option(element.connection_identifier, element.connection_path, undefined, selected);
            $(o).html(element.connection_identifier);
            $("#adding_connection_parent_path").append(o);

          })

          //display start and End equipment dropdown lists
          var p = new Option('none' , '', undefined, false);
          $(p).html('none');
          $("#adding_connection_start_equipment").append(p);

          var t = new Option('none' , '', undefined, false);
          $(t).html('none');
          $("#adding_connection_end_equipment").append(t);

          allEquipment.forEach(element => {
            
            var p = new Option(element.equipment_full_identifier, element.equipment_id,  undefined, undefined)
            $(p).html(element.equipment_full_identifier)
            $('#adding_connection_start_equipment').append(p)

            
            var t = new Option(element.equipment_full_identifier, element.equipment_id,  undefined, undefined)
            $(t).html(element.equipment_full_identifier)
            $('#adding_connection_end_equipment').append(t)

          })

          //display start and end interface with dropdown lists
          var p = new Option('none' , '', undefined, false);
          $(p).html('none');
          $("#adding_connection_start_interface").append(p);

          var t = new Option('none' , '', undefined, false);
          $(t).html('none');
          $("#adding_connection_end_interface").append(t);

          allInterface.forEach( element => {
            
            var p = new Option(element.identifier, element.id,  undefined, undefined)
            $(p).html(element.identifer)
            $('#adding_connection_start_interface').append(p)
            
            var t = new Option(element.identifier, element.id,  undefined, undefined)
            $(t).html(element.identifier)
            $('#adding_connection_end_interface').append(t)

          })

          // display type drop down 
          var t = new Option('none' , '', undefined, false);
          $(t).html('none');
          $("#adding_connection_type").append(t);
          allConnectionTypes.forEach( element => {
            var t = new Option(element.label, element.id, undefined, undefined);
            $(t).html(element.label);
            $("#adding_connection_type").append(t);
          })

       }
       else{
          showErrorNotification('You have to select the connection to be same!')
       }
    })
  }
   
  // when click the add child connection btn for modal
  if(select('#btn_connection_add_child')){
    on('click','#btn_connection_add_child' , function(){
      // make  all dropdown list empty
      $("#adding_connection_parent_path").find('option').remove()
      $("#adding_connection_start_equipment").find('option').remove()
      $("#adding_connection_end_equipment").find('option').remove()
      $("#adding_connection_start_interface").find('option').remove()
      $("#adding_connection_end_interface").find('option').remove()
      $("#adding_connection_type").find('option').remove()

       var selectedConnectionId = $('#connection_id').val()
       if(selectedConnectionId){
          
          allConnection = JSON.parse(document.getElementById('all_connection').textContent)
          allEquipment = JSON.parse(document.getElementById('all_equipment').textContent)
          allInterface = JSON.parse(document.getElementById('all_interface').textContent)
          allConnectionTypes = JSON.parse(document.getElementById('all_connection_types').textContent)

          selectedConnection = allConnection.filter(element => element.connection_id == parseInt(selectedConnectionId))

          // display parent path
          var p = new Option('none' , '', undefined, false);
          $(p).html('none');
          $("#adding_connection_parent_path").append(p);

          allConnection.forEach( element => {
            
            element_connection_path = element.connection_path.join('.')
            var selected_connection_path = selectedConnection[0]['connection_path']
            selected_connection_path = selected_connection_path.join('.')
           
            var selected = element_connection_path === selected_connection_path ? true : false ;
            var o = new Option(element.connection_identifier, element.connection_path, undefined, selected);
            $(o).html(element.connection_identifier);
            $("#adding_connection_parent_path").append(o);

          })

          //display start and End equipment dropdown lists
          var p = new Option('none' , '', undefined, false);
          $(p).html('none');
          $("#adding_connection_start_equipment").append(p);

          var t = new Option('none' , '', undefined, false);
          $(t).html('none');
          $("#adding_connection_end_equipment").append(t);

          allEquipment.forEach(element => {
            
            var p = new Option(element.equipment_full_identifier, element.equipment_id,  undefined, undefined)
            $(p).html(element.equipment_full_identifier)
            $('#adding_connection_start_equipment').append(p)

            
            var t = new Option(element.equipment_full_identifier, element.equipment_id,  undefined, undefined)
            $(t).html(element.equipment_full_identifier)
            $('#adding_connection_end_equipment').append(t)

          })

          //display start and end interface with dropdown lists
          var p = new Option('none' , '', undefined, false);
          $(p).html('none');
          $("#adding_connection_start_interface").append(p);

          var t = new Option('none' , '', undefined, false);
          $(t).html('none');
          $("#adding_connection_end_interface").append(t);

          allInterface.forEach( element => {
            
            var p = new Option(element.identifier, element.id,  undefined, undefined)
            $(p).html(element.identifer)
            $('#adding_connection_start_interface').append(p)
            
            var t = new Option(element.identifier, element.id,  undefined, undefined)
            $(t).html(element.identifier)
            $('#adding_connection_end_interface').append(t)

          })

          // display type drop down 
          var t = new Option('none' , '', undefined, false);
          $(t).html('none');
          $("#adding_connection_type").append(t);
          allConnectionTypes.forEach( element => {
            var t = new Option(element.label, element.id, undefined, undefined);
            $(t).html(element.label);
            $("#adding_connection_type").append(t);
          })

       }
       else{
          showErrorNotification('You have to select the connection to be child!')
       }
    })
  }
  // add connection in the modal
  if(select('#connectionModal .btn-primary'))
  {
    on('click', '#connectionModal .btn-primary', function(){
      var addingConnectionIdentifier = $('#adding_connection_identifier').val()
      var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent)
      var addingConnectionReason = $('#adding_connection_reason').val()
      if(addingConnectionIdentifier && addingConnectionReason){
        if(confirm('Are you sure to add this connection?')){
            var addingConnectionDescription = $('#adding_connection_description').val()
            var addingConnectionParentPath = $('#adding_connection_parent_path').val()
            addingConnectionParentPath =  addingConnectionParentPath.replaceAll(',', '.')
            
            var addingConnectionIncludeParentFlag = $('#adding_connection_use_parent_identifier').prop('checked')
            var addingConnectionTypeId = $('#adding_connection_type').val()
            var addingConnectionComment = $('#adding_connection_comment').val()
            var addingConnectionLength = $('#adding_connection_length').val()
            var addingConnectionStartEquipment = $('#adding_connection_start_equipment').val()
            var addingConnectionEndEquipment = $('#adding_connection_end_equipment').val()
            var addingConnectionStartInterface = $('#adding_connection_start_interface').val()
            var addingConnectionEndInterface = $('#adding_connection_end_interface').val()
            var addingConnectionApproved = $('#adding_connection_approved').prop('checked')            

            $.ajax({
              type: "GET",
              url: 'addConnection',
              data: {
                connection_local_identifier: addingConnectionIdentifier,  
                connection_use_parent_identifier: addingConnectionIncludeParentFlag,
                connection_parent_path: addingConnectionParentPath,
                connection_description: addingConnectionDescription,
                connection_start_equipment: addingConnectionStartEquipment,
                connection_end_equipment: addingConnectionEndEquipment,
                connection_start_interface: addingConnectionStartInterface,
                connection_end_interface: addingConnectionEndInterface,
                connection_type_id: addingConnectionTypeId,
                connection_length: addingConnectionLength,
                connection_comment: addingConnectionComment,
                connection_is_approved: addingConnectionApproved,
                connection_reason: addingConnectionReason,
                connection_added_by: currentUserName,          
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']
                var connection_list = data['connection_list']
                if(result){
                  showSuccessNotification('The connection has been inserted successfully!')

                  $('#adding_connection_identifier').val('')
                  $('#adding_connection_description').val('')
                  $('#adding_connection_parent_path').find('option').remove()
                  $('#adding_connection_start_equipment').find('option').remove()
                  $('#adding_connection_end_equipment').find('option').remove()
                  $('#adding_connection_start_interface').find('option').remove()
                  $('#adding_connection_end_interface').find('option').remove()
                  $('#adding_connection_length').val('')
                  $('#adding_connection_use_parent_identifier').prop('checked', false)
                  $('#adding_connection_type').find('option').remove()
                  $('#adding_connection_comment').val('')
                  $('#adding_connection_approved').prop('checked', false)
                  $('#adding_connection_reason').val('')
                  $("#connectionModal").modal('hide');

                  if(connection_list){
                    const html = createConnectionTree(connection_list)
                    document.getElementById('all_connection_tree').innerHTML = html
                    $('.treeview-animated').mdbTreeview();
                  }
    
                }
                else{
                  showErrorNotification(data['message'])
                }
              }
            })
        }
        
      }else{
        showErrorNotification('The connection identifier and Reason should not be empty.')
      }
      
    })
  }

  //remove connection
  if(select('#connectionRemoveModal .btn-primary')){
    on('click','#connectionRemoveModal .btn-primary' , function(){
      var selectedConnectionId = $('#connection_id').val()
      var remove_option = $('#remove_connection_option').val()
      if(selectedConnectionId){
        var reason = $('#remove_connection_reason').val()
        var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent)  
        if(confirm('Are you sure to remove this connection?')){
          $.ajax({
            type: "GET",
            url: 'removeConnection',
            data: {
              connection_id: selectedConnectionId,
              modified_by: currentUserName,
              remove_reason: reason,
              remove_option: remove_option
            },
            success: function (data){
              data = JSON.parse(data)
              var result = data['result']
              var connection_list = data['connection_list']
              if(result){

                showSuccessNotification('The connection has been removed successfully!')

                $("#connection_parent_path").find('option').remove()
                $("#all_connection_type").find('option').remove()
                $('#start_equipment').find('option').remove()
                $('#end_equipment').find('option').remove()
                $('#start_interface').find('option').remove()
                $('#end_interface').find('option').remove()
                $('#connection_id').val('')
                $('#connection_length').val('')
                $('#connection_identifier').val('')
                $('#connection_full_identifier').val('')
                $('#connection_use_parent_identifier').prop('checked' , false)
                $('#connection_description').val('')
                $('#connection_comment').val('')
                $('#basic-full-identifier').val('')
                $('#connection_is_approved').prop('checked' , false)
                $('#remove_connection_reason').val('')
                $("#connectionRemoveModal").modal('hide');
                if(connection_list){
                  const html = createConnectionTree(connection_list)
                  document.getElementById('all_connection_tree').innerHTML = html
                  $('.treeview-animated').mdbTreeview();
                }
  
              }
              else{
                showErrorNotification(data['message'])
              }
            }
           })
        }
      }else{
        showErrorNotification('You need to select the connection!')
      }
    })
  }

  // update equipment type
  if(select('#equipmentTypeUpdateCommitBtn'))
   {
     on('click', '#equipmentTypeUpdateCommitBtn', function(){
      var equipment_type_id = $('#equipment_type_id').val()  
      var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent) 

      if(equipment_type_id){
        let equipment_type_reason = prompt('Please write the reason why you update this equipment type.', '')
        if(equipment_type_reason != null){
          var equipment_type_label = $('#equipment_type_label').val()
          var equipment_type_parent_path = $('#equipment_type_parent_path').val()
          var equipment_type_description = $('#equipment_type_description').val()
          var equipment_type_modifier = $('#equipment_type_modifier').val()
          var equipment_type_manufacturer = $('#equipment_type_manufacturer').val()
          var equipment_type_model = $('#equipment_type_model').val()
          var equipment_type_comment = $('#equipment_type_comment').val()                
          var equipment_type_is_approved = $('#equipment_type_is_approved').prop('checked')
          
          
          $.ajax({
           type: "GET",
           url: 'updateEquipmentTypeDetail',
           data: {
              equipment_type_id: equipment_type_id,
              equipment_type_label: equipment_type_label,  
              equipment_type_parent_path: equipment_type_parent_path,
              equipment_type_description: equipment_type_description,
              equipment_type_modifier: equipment_type_modifier,
              equipment_type_manufacturer: equipment_type_manufacturer,
              equipment_type_model: equipment_type_model,
              equipment_type_comment: equipment_type_comment,
              equipment_type_is_approved: equipment_type_is_approved,       
              equipment_type_reason: equipment_type_reason ,    
              equipment_type_modified_by: currentUserName , 
           },
           success: function (data)
           {
             data = JSON.parse(data)
             var result = data['result']
             var allEquipmentTypes = data['all_equipment_types']
             if(result){
               showSuccessNotification('The equipment type has been updated successfully!')
               document.getElementById('all_equipment_types').textContent = JSON.stringify(allEquipmentTypes)
               const html = createEquipmentTypeTree(allEquipmentTypes)
               document.getElementById('all_equipment_types_tree').innerHTML = html
               $('.treeview-animated').mdbTreeview();
 
               $("#equipment_type_parent_path").find('option').remove()
               $('#equipment_type_id').val('')
               $('#equipment_type_label').val('')
               $('#equipment_type_description').val('')
               $('#equipment_type_modifier').val('')
               $('#equipment_type_manufacturer').val('')
               $('#equipment_type_model').val('')
               $('#equipment_type_comment').val('')
               $('#equipment_type_last_modified').val('')               
               $('#equipment_type_is_approved').prop('checked' , false)
             }
             else{
              showErrorNotification(data['message'])
            }
           },
           error:function(e){
            showErrorNotification('The error happened while requesting the server')
           }
          })
       }
       }
       else{
        showErrorNotification('You have to select the equipment type to be updated!')
       }
       
     })
   }

  // when clicking the add same equipment type btn for modal
  if(select('#btn_equipment_type_add_same')){
    on('click','#btn_equipment_type_add_same' , function(){
      // make  all dropdown list empty
      $("#adding_equipment_type_parent_path").find('option').remove()

       var selectedEquipmentTypeId = $('#equipment_type_id').val()
       if(selectedEquipmentTypeId){
         
          allEquipmentTypes = JSON.parse(document.getElementById('all_equipment_types').textContent)
          
          var selectedEquipmentType = allEquipmentTypes.filter(element => element.id == parseInt(selectedEquipmentTypeId))
          
          // display parent path
          var p = new Option('none' , '', undefined, false);
          $(p).html('none');
          $("#adding_equipment_type_parent_path").append(p);


          allEquipmentTypes.forEach( element => {

            element_path = element.path.join('.')
            var selected_element_path = selectedEquipmentType[0]['path']
            selected_element_path = selected_element_path.join('.')
           
            if(selected_element_path.indexOf('.'))
              selected_element_parent_path = selected_element_path.substr(0, selected_element_path.lastIndexOf('.'))
            else
              selected_element_parent_path = ''
            
            var selected = element_path === selected_element_parent_path ? true : false ;
            var o = new Option(element.label, element.path, undefined, selected);
            $(o).html(element.label);
            $("#adding_equipment_type_parent_path").append(o);
          })
       }
       else{
          showErrorNotification('You have to select the equipment type to be same!')
       }
    })
  }

  // when clicking the add child equipment type btn for modal
  if(select('#btn_equipment_type_add_child')){
    on('click','#btn_equipment_type_add_child' , function(){
      // make  all dropdown list empty
      $("#adding_equipment_type_parent_path").find('option').remove()

       var selectedEquipmentTypeId = $('#equipment_type_id').val()
       if(selectedEquipmentTypeId){
         
          allEquipmentTypes = JSON.parse(document.getElementById('all_equipment_types').textContent)
          

          var selectedEquipmentType = allEquipmentTypes.filter(element => element.id == parseInt(selectedEquipmentTypeId))
          
          // display parent path
          var p = new Option('none' , '', undefined, false);
          $(p).html('none');
          $("#adding_equipment_type_parent_path").append(p);


          allEquipmentTypes.forEach( element => {

            element_path = element.path.join('.')
            var selected_element_path = selectedEquipmentType[0]['path']
            selected_element_path = selected_element_path.join('.')

            var selected = element_path === selected_element_path ? true : false ;
            var o = new Option(element.label, element.path, undefined, selected);
            $(o).html(element.label);
            $("#adding_equipment_type_parent_path").append(o);
          })
       }
       else{
          showErrorNotification('You have to select the equipment type to be child!')
       }
    })
  }

   // add euqipment type in the modal
   if(select('#equipmentTypeModal .btn-primary'))
   {
     on('click', '#equipmentTypeModal .btn-primary', function(){
       var addingEquipmentTypeLabel = $('#adding_equipment_type_label').val()
       var addingEquipmentTypeDescription = $('#adding_equipment_type_description').val()
       var addingEquipmentTypeReason = $('#adding_equipment_type_reason').val()
       var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent)  

       if(addingEquipmentTypeLabel != "" && addingEquipmentTypeDescription != "" && addingEquipmentTypeReason != ''){
         if(confirm('Are you sure to add this equpment type?')){
             var addingEquipmentTypeModifier = $('#adding_equipment_type_modifier').val()
             var addingEquipmentTypeManufacturer = $('#adding_equipment_type_manufacturer').val()
             var addingEquipmentTypeModel = $('#adding_equipment_type_model').val()
             var addingEquipmentTypeComment = $('#adding_equipment_type_comment').val()
             var addingEquipmentTypeParentPath = $('#adding_equipment_type_parent_path').val()
             addingEquipmentTypeParentPath =  addingEquipmentTypeParentPath.replaceAll(',', '.')
             var addingEquipmentTypeApproved = $('#adding_equipment_type_approved').prop('checked')
 
             $.ajax({
               type: "GET",
               url: 'addEquipmentType',
               data: {
                addingEquipmentTypeLabel: addingEquipmentTypeLabel,  
                addingEquipmentTypeDescription: addingEquipmentTypeDescription,
                addingEquipmentTypeModifier: addingEquipmentTypeModifier,
                addingEquipmentTypeManufacturer: addingEquipmentTypeManufacturer,
                addingEquipmentTypeModel: addingEquipmentTypeModel,
                addingEquipmentTypeComment: addingEquipmentTypeComment,
                addingEquipmentTypeParentPath: addingEquipmentTypeParentPath,
                addingEquipmentTypeApproved: addingEquipmentTypeApproved,     
                addingEquipmentTypeReason: addingEquipmentTypeReason ,    
                addingEquipmentTypeModifiedBy: currentUserName ,        
               },
               success: function (data){
                 data = JSON.parse(data)
                 var result = data['result']
                 
                 if(result){
                    showSuccessNotification('The equipment type has been inserted successfully!')
 
                   $('#adding_equipment_type_label').val('')
                   $('#adding_equipment_type_description').val('')
                   $('#adding_equipment_type_parent_path').find('option').remove()
                   $('#adding_equipment_type_modifier').val('')
                   $('#adding_equipment_type_manufacturer').val('')
                   $('#adding_equipment_type_model').val('')
                   $('#adding_equipment_type_comment').val('')
                   $('#adding_equipment_type_reason').val('')
                   $('#adding_equipment_type_approved').prop('checked', false)
                   $("#equipmentTypeModal").modal('hide');
 
                   var allEquipmentTypes = data['all_equipment_types']
                   document.getElementById('all_equipment_types').textContent = JSON.stringify(allEquipmentTypes)
                   const html = createEquipmentTypeTree(allEquipmentTypes)
                   document.getElementById('all_equipment_types_tree').innerHTML = html
                   $('.treeview-animated').mdbTreeview();

                 }
                 else{
                   showErrorNotification(data['message'])
                 }
               },
               error: function(e){
                  showErrorNotification('The error has happend while requesting the server.')
               }
             })
         }
         
       }else{
         showErrorNotification('The label, description and Reason should not be empty.')
       }
     })
   }

   //remove equipment type
  if(select('#equipmentTypeRemoveModal .btn-primary')){
    on('click','#equipmentTypeRemoveModal .btn-primary' , function(){
      var selectedEquipmentTypeId = $('#equipment_type_id').val()
      var currentUserName = JSON.parse(document.getElementById('currentUserName').textContent)
      if(selectedEquipmentTypeId){
          let equipmentTypeRemoveReason = $('#remove_equipment_type_reason').val()
          let equipmentTypeRemoveOption = $('#remove_equipment_type_option').val()
          $.ajax({
            type: "GET",
            url: 'removeEquipmentType',
            data: {
              selectedEquipmentTypeId: selectedEquipmentTypeId,
              equipmentTypeRemoveReason: equipmentTypeRemoveReason,
              equipmentTypeRemoveOption: equipmentTypeRemoveOption,
              equipmentTypeRemovedBy: currentUserName
            },
            success: function (data){
              data = JSON.parse(data)
              var result = data['result']
              var allEquipmentTypes = data['all_equipment_types']
              if(result){

                showSuccessNotification('The equipment type has been removed successfully!')
                const html = createEquipmentTypeTree(allEquipmentTypes)
               document.getElementById('all_equipment_types_tree').innerHTML = html
               $('.treeview-animated').mdbTreeview();
 
               $("#equipment_type_parent_path").find('option').remove()
               $('#equipment_type_id').val('')
               $('#equipment_type_label').val('')
               $('#equipment_type_description').val('')
               $('#equipment_type_modifier').val('')
               $('#equipment_type_manufacturer').val('')
               $('#equipment_type_model').val('')
               $('#equipment_type_comment').val('')
               $('#equipment_type_last_modified').val('')     
               $('#remove_equipment_type_reason').val('')          
               $('#equipment_type_is_approved').prop('checked' , false)
               $("#equipmentTypeRemoveModal").modal('hide');
  
              }
              else{
                 showErrorNotification(data['message'])
              }
            },
            error: function(e){
              showErrorNotification('The error happend while requesting the server!')
              
            }
           })
        
      }else{
        showErrorNotification('You need to select the equipment type to be removed!')
      }
    })
  }

  // click the add equipment type resource btn for the modal
  if(select('#btn_add_equipment_type_resource')){
    on('click', '#btn_add_equipment_type_resource', function(){
      $("#addingEquipmentTypeResource").find('option').remove()
      var selectedEquipmentTypeId = $('#equipment_type_id').val()
      if(selectedEquipmentTypeId){
        let allResources = JSON.parse(document.getElementById('all_resources').textContent)
        var selectedEquipmentTypeLabel = $('#equipment_type_label').val()
        var selectedEquipmentTypeDescription = $('#equipment_type_description').val()
        $('#selectedEquipmentTypeLabel').val(selectedEquipmentTypeLabel + ' (' + selectedEquipmentTypeDescription + ')')
        
        allResources.forEach(element => {
          var o = new Option(element.modifier, element.id, undefined, undefined);
          $(o).html((element.modifier ? element.modifier: ' ') + ' (' + element.description + ')');
          $("#addingEquipmentTypeResource").append(o);
        })

      }else{
         showErrorNotification('You have to select the equipment type')
       }
     
    })
  }
  
  // add euqipment type resource in the modal
  if(select('#equipmentTypeResourceModal .btn-primary'))
  {
    on('click', '#equipmentTypeResourceModal .btn-primary', function(){
      var addingEquipmentTypeId = $('#equipment_type_id').val()
      var addingResourceId = $('#addingEquipmentTypeResource').val()
   
      if(addingEquipmentTypeId && addingResourceId){
        if(confirm('Are you sure to add this resource to the equpment type?')){
            var addingEquipmentTypeReourceComment = $('#addingEquipmentTypeResourceComment').val()
            $.ajax({
              type: "GET",
              url: 'addEquipmentTypeResource',
              data: {
                addingEquipmentTypeId: addingEquipmentTypeId,  
                addingResourceId: addingResourceId,
                addingEquipmentTypeReourceComment: addingEquipmentTypeReourceComment,
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']
                var associatedResource = data['associatedResource']
                
                if(result){
                  showSuccessNotification('The Resource has been inserted successfully!')                  
                  $('#addingEquipmentTypeResourceComment').val('')
                  $('#addingEquipmentTypeResource').find('option').remove()
                  $("#equipmentTypeResourceModal").modal('hide');

                  tableData = []
                  if(associatedResource.length){
                    
                    associatedResource.forEach(resource => {
                      tableData.push({
                        'type_id': resource.type_id,
                        'resource_id': resource.resource_id,              
                        'modifier': resource.modifier,
                        'description': resource.description,
                        'comment': resource.comment,
                      })
                    })
                  }
                  
                    $('#equipment_type_resource_table').DataTable({
                      data:  tableData ,
                      destroy: true,
                      columns: [
                        { data: 'type_id'},
                        { data: 'resource_id' },
                        { data: 'modifier' },
                        { data: 'description' },
                        { data: 'comment' },
                        
                      ],
                      columnDefs:[
                        { "visible": false, "targets": [0, 1] },
                        
                      ]
                    })
                }
                else{
                  showErrorNotification('The error has happend while adding the type resource')
                }
              },
              error: function(e){
                 showErrorNotification('The error has happend while requesting the server')
              }
            })
        }
        
      }else{
        showErrorNotification('you should select the Equipment type and the resource')
      }
      
    })
  }

  // remove type resource from the asociated Resource
  if(select('#btn_delete_equipment_type_resource')){
    on('click', '#btn_delete_equipment_type_resource', function(){
      var typeId = $('#equipment_type_id').val()
      var selectedResourceId = $('#selectedResourceId').val()
      
      if(typeId && selectedResourceId){
        if(confirm('Are you sure to remove the resource from the type resource?')){
          $.ajax({
            type: "GET",
            url: 'removeEquipmentTypeResource',
            data: {
              typeId: typeId,  
              selectedResourceId: selectedResourceId,            
            },
            success: function (data){
              $('#selectedResourceId').val('')
              data = JSON.parse(data)
              var result = data['result']
              var associatedResource = data['associatedResource']
              
              if(result){
                showSuccessNotification('The Resource has been removed successfully!')                  
                tableData = []
                if(associatedResource.length){
                  
                  associatedResource.forEach(resource => {
                    tableData.push({
                      'type_id': resource.type_id,
                      'resource_id': resource.resource_id,              
                      'modifier': resource.modifier,
                      'description': resource.description,
                      'comment': resource.comment,
                    })
                  })
                }
                $('#equipment_type_resource_table').DataTable({
                  data:  tableData ,
                  destroy: true,
                  columns: [
                    { data: 'type_id'},
                    { data: 'resource_id' },
                    { data: 'modifier' },
                    { data: 'description' },
                    { data: 'comment' },
                    
                  ],
                  columnDefs:[
                    { "visible": false, "targets": [0, 1] },
                  ]
                })
              }
              else{
                var message = data['message']
                if(message){
                  showErrorNotification(message)
                }else{
                  showErrorNotification('The error has happend while removing the type resource')
                }
              }
            },
            error: function(e){
               showErrorNotification('The error has happend while requesting the server')
            }
           })
        }
      }else{
        showErrorNotification('You should select the Resource to be removed!')
      }
    })
  }

  // click the add equipment type interface btn for the modal
  if(select('#btn_add_equipment_type_interface')){
    on('click', '#btn_add_equipment_type_interface', function(){
      $("#addingEquipmentTypeInterface").find('option').remove()
      var selectedEquipmentTypeId = $('#equipment_type_id').val()
      var selectedResourceId = $('#selectedResourceId').val()

      if(selectedEquipmentTypeId && selectedResourceId){
        let allInterfaces = JSON.parse(document.getElementById('all_interfaces').textContent)
        let allResources = JSON.parse(document.getElementById('all_resources').textContent)

        var selectedEquipmentTypeLabel = $('#equipment_type_label').val()
        var selectedEquipmentTypeDescription = $('#equipment_type_description').val()
        $('#selectedEquipmentTypeLabel2').val(selectedEquipmentTypeLabel + ' (' + selectedEquipmentTypeDescription + ')')
        
        var selectedResource = allResources.find(element => element.id == selectedResourceId)
        $('#selectedEquipmentTypeResource').val(selectedResource.modifier+ ' (' + selectedResource.description + ')')

        allInterfaces.forEach(element => {
          var o = new Option(element.identifier, element.id, undefined, undefined);
          $(o).html((element.identifier ? element.identifier: ' ') + ' (' + element.description + ')');
          $("#addingEquipmentTypeInterface").append(o);
        })

      }else{
         showErrorNotification('You have to select the equipment type and resource.')
       }
     
    })
  }

  // add euqipment type interface in the modal
  if(select('#equipmentTypeInterfaceModal .btn-primary'))
  {
    on('click', '#equipmentTypeInterfaceModal .btn-primary', function(){
      var addingTypeId = $('#equipment_type_id').val()
      var addingResourceId = $('#selectedResourceId').val()
   
      if(addingTypeId && addingResourceId){
        if(confirm('Are you sure to add this interface to the equipment type?')){
            var addingInterfaceId = $('#addingEquipmentTypeInterface').val()
            var is_active =  $('#addingEquipmentTypeInterfaceActive').prop('checked')
            var addingComment = $('#addingEquipmentTypeInterfaceComment').val()
            $.ajax({
              type: "GET",
              url: 'addEquipmentTypeInterface',
              data: {
                addingTypeId: addingTypeId,  
                addingResourceId: addingResourceId,
                addingInterfaceId: addingInterfaceId,
                is_active:is_active,
                addingComment: addingComment,
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']
                var associatedInterface = data['associatedInterface']
                
                if(result){
                  showSuccessNotification('The Resource has been inserted successfully!')                  
                  $('#addingEquipmentTypeInterfaceComment').val('')
                  $('#addingInterfaceId').find('option').remove()
                  $('#addingEquipmentTypeInterfaceActive').prop('checked', false)
                  $("#equipmentTypeInterfaceModal").modal('hide');

                  tableData = []
                  if(associatedInterface.length){
                    associatedInterface.forEach(element => {
                      tableData.push({
                        'interface_id': element.interface_id,
                        'identifier': element.interface_identifier,
                        'description': element.interface_description,              
                        'class_label': element.interface_class_label,
                        'comment': element.type_interface_comment,
                        'active': element.type_interface_is_active,
                       })
                    })
                  }
                  
                    $('#equipment_type_interface_table').DataTable({
                      data:  tableData ,
                      destroy: true,
                      columns: [
                        { data: 'interface_id'},
                        { data: 'identifier'},
                        { data: 'description' },
                        { data: 'class_label' },
                        { data: 'comment' },
                        { data: 'active' },
                        
                      ],
                      columnDefs:[
                        { "visible": false, "targets": [0] },
                      ]
                    })
                }
                else{
                  showErrorNotification('The error has happend while adding the interface')
                }
              },
              error: function(e){
                 showErrorNotification('The error has happend while requesting the server')
              }
            })
        }
        
      }else{
        showErrorNotification('you should select the Equipment type and the resource')
      }
      
    })
  }

  // remove type interface from the asociated interface
  if(select('#btn_delete_equipment_type_interface')){
    on('click', '#btn_delete_equipment_type_interface', function(){
      var typeId = $('#equipment_type_id').val()
      var selectedResourceId = $('#selectedResourceId').val()
      var selectedInterfaceId = $('#selectedInterfaceId').val()
      if(typeId && selectedResourceId && selectedInterfaceId){
        if(confirm('Are you sure to remove the interface from the type interface?')){
          $.ajax({
            type: "GET",
            url: 'removeEquipmentTypeInterface',
            data: {
              typeId: typeId,  
              selectedResourceId: selectedResourceId,    
              selectedInterfaceId:selectedInterfaceId,        
            },
            success: function (data){
              
              $('#selectedInterfaceId').val('')
              data = JSON.parse(data)
              var result = data['result']
              var associatedInterface = data['associatedInterface']
              
              if(result){
                showSuccessNotification('The Interface has been removed successfully!')                  
                tableData = []
                if(associatedInterface.length){
                  associatedInterface.forEach(element => {
                    tableData.push({
                      'interface_id': element.interface_id,
                      'identifier': element.interface_identifier,
                      'description': element.interface_description,              
                      'class_label': element.interface_class_label,
                      'comment': element.type_interface_comment,
                      'active': element.type_interface_is_active,
                     })
                  })
                }
                $('#equipment_type_interface_table').DataTable({
                  data:  tableData ,
                  destroy: true,
                  columns: [
                    { data: 'interface_id'},
                    { data: 'identifier'},
                    { data: 'description' },
                    { data: 'class_label' },
                    { data: 'comment' },
                    { data: 'active' },
                    
                  ],
                  columnDefs:[
                    { "visible": false, "targets": [0] },
                  ]
                })
               
              }
              else{
                var message = data['message']
                if(message){
                  showErrorNotification(message)
                }else{
                  showErrorNotification('The error has happend while removing the type interface')
                }
              }
            },
            error: function(e){
               showErrorNotification('The error has happend while requesting the server')
            }
           })
        }
      }else{
        showErrorNotification('You should select the interface to be removed!')
      }
    })
  }
  
  //add resource group in the modal
  if(select('#resourceGroupModal .btn-primary')){
    on('click', '#resourceGroupModal .btn-primary', function(){
      let label = $('#adding_resource_group_label').val()
      let description = $('#adding_resource_group_description').val()
      let is_report = $('#adding_resource_group_is_reportable').prop('checked')
      let comment = $('#adding_resource_group_comment').val()
      if(label && description){
        $.ajax({
          type: 'GET',
          url: 'addResourceGroup',
          data:{
            label:label,
            description: description,
            is_report: is_report,
            comment: comment
          },
          success: function(data){
            data = JSON.parse(data)
            let result = data['result']
            if(result){
              showSuccessNotification('The resource group has been added successfully')
              let all_resource_group = data['all_resource_group']
              document.getElementById('all_resource_group').textContent = JSON.stringify(all_resource_group)
              var html = ''
              all_resource_group.forEach(group => {
                  html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-group_id="'+ group.id + '"> \
                      '+group.label + '  (' + group.description +')</li>'
                
              });
              document.getElementById('all_equipment_resources_tree').innerHTML = html
              $('.treeview-animated').mdbTreeview();
              $('#resourceGroupModal').modal('hide')
            }else{
              showErrorNotification('The error happend while adding the resource group')
            }
          },
          error: function(e){
            showErrorNotification('The error happend while requesting the server')
          }
        })
      }else{
        showErrorNotification('The Label and Description can not be empty!')
      }
    })
  }

  // update resource group 
  if(select('#btn_update_resourcegroup')){
    on('click', '#btn_update_resourcegroup', function(){
      var selectedGroupId = $('#resource_group_id').val()
      if(selectedGroupId){
        let label  = $('#resource_group_label').val()
        let description  = $('#resource_group_description').val()
        let is_report  = $('#resource_group_is_reportable').prop('checked')
        let comment  = $('#resource_group_comment').val()
        if(label && description){
          if(confirm('Are you sure to update this resource group ?')){
            $.ajax({
              type: 'GET',
              url: 'updateResourceGroup',
              data:{
                groupId: selectedGroupId,
                label:label,
                description: description,
                is_report: is_report,
                comment: comment
              },
              success: function(data){
                data = JSON.parse(data)
                let result = data['result']
                if(result){
                  showSuccessNotification('The resource group has been updated successfully')
                  let all_resource_group = data['all_resource_group']
                  document.getElementById('all_resource_group').textContent = JSON.stringify(all_resource_group)
                  var html = ''
                  all_resource_group.forEach(group => {
                      html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-group_id="'+ group.id + '"> \
                          '+group.label + '  (' + group.description +')</li>'
                    
                  });
                  document.getElementById('all_equipment_resources_tree').innerHTML = html
                  $('.treeview-animated').mdbTreeview();
                  $('#resourceGroupModal').modal('hide')
                }else{
                  showErrorNotification('The error happend while updating the resource group')
                }
              },
              error: function(e){
                showErrorNotification('The error happend while requesting the server')
              }
            })
          }
        }else{
          showErrorNotification('Label and Description should not be empty string')
        }
      }else{
        showErrorNotification('You should select the resource group to be updated')
      }
    })
  }

  // remove resource group 
  if(select('#btn_remove_resource_group')){
    on('click', '#btn_remove_resource_group', function(){
      var selectedGroupId = $('#resource_group_id').val()
      if(selectedGroupId){
          if(confirm('Are you sure to remove this resource group?')){
            $.ajax({
              type: 'GET',
              url: 'removeResourceGroup',
              data:{
                groupId: selectedGroupId,
              },
              success: function(data){
                data = JSON.parse(data)
                let result = data['result']
                if(result){
                  showSuccessNotification('The resource group has been removed successfully')
                  let all_resource_group = data['all_resource_group']
                  document.getElementById('all_resource_group').textContent = JSON.stringify(all_resource_group)
                  var html = ''
                  all_resource_group.forEach(group => {
                      html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-group_id="'+ group.id + '"> \
                          '+group.label + '  (' + group.description +')</li>'
                    
                  });
                  document.getElementById('all_equipment_resources_tree').innerHTML = html
                  $('.treeview-animated').mdbTreeview();
                  $('#resourceGroupModal').modal('hide')
                }else{
                  showErrorNotification('The error happend while removing the resource group')
                }
              },
              error: function(e){
                showErrorNotification('The error happend while requesting the server')
              }
            })
          }
      }else{
        showErrorNotification('You should select the resource group to be removed')
      }
    })
  }

  // click the btn for adding included resource
  if(select('#btn_add_resource_togroup')){
    on('click', '#btn_add_resource_togroup', function(){
      $("#all_resources_to_group").find('option').remove()
      let selectedResourceGroupId = $('#resource_group_id').val()
      if(selectedResourceGroupId){
        all_resources = JSON.parse(document.getElementById('all_resources').textContent)
        all_resources.forEach( element => {
          var label = element.modifier + ' (' + element.description + ')'
          var p = new Option(label, element.id, undefined, undefined);
          $(p).html(label);
          $("#all_resources_to_group").append(p);
        })
      }else{
        showErrorNotification('You should select the resource group')
      }
    })
  }

  // add the resource to group in the modal
  if(select('#resourceToGroupModal .btn-primary'))
  {
    on('click', '#resourceToGroupModal .btn-primary', function(){
      let selectedResourceGroupId = $('#resource_group_id').val()
      let resourceGroupLabel = $('#resource_group_label').val()
      let resourceId = $("#all_resources_to_group").val()
      
      if(selectedResourceGroupId && resourceId){
        if(confirm('Are you sure to add this resource to the resource group:' + resourceGroupLabel+ '?')){
            let all_reesources = JSON.parse(document.getElementById('all_resources').textContent)
            let selectedResource = all_reesources.find(element => element.id ==  resourceId)
            $.ajax({
              type: "GET",
              url: 'updateReourceDetail',
              data: {
                resourceId: resourceId,
                modifier: selectedResource.modifier,
                description:selectedResource.description,
                comment: selectedResource.comment,
                resourceGroupId: selectedResourceGroupId
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']

                if(result){
                  showSuccessNotification('The Resource has been added to the group successfully!') 
                  $('#resourceToGroupModal').modal('hide')
                  var all_resources = data['all_resources']
                  document.getElementById('all_resources').textContent = JSON.stringify(all_resources)                 
                  includedResources = all_resources.filter(element => element.group_id == selectedResourceGroupId)
                  tableData = []
                  includedResources.forEach(
                    resource => { 
                      tableData.push({
                        'id': resource.id,
                        'modifier': resource.modifier,
                        'description': resource.description,
                        'comment': resource.comment
                      })
                  })

                  var resourceEditor = new DataTable.Editor({
                    idSrc:  'id',
                    fields: [
                      {
                        label: 'id',
                        name: 'id'
                      },
                      {
                        label: 'modifier',
                        name: 'modifier'
                      },
                      {
                        label: 'description',
                        name: 'description'
                      },
                      {
                        label: 'comment',
                        name: 'comment'
                      },
                    ],
                    table: '#resource_table'
                  })

                  
                  $('#resource_table').DataTable({
                    data:  tableData ,
                    destroy: true,
                    columns: [
                      { data: 'id' },
                      { data: 'modifier' },
                      { data: 'description' },
                      { data: 'comment' },
                    ],
                    order: [[1, 'asc']],
                    columnDefs:[
                      {
                        visible:false, 
                        targets:0
                      }
                      
                    ]
                  })

                  $('#resource_table').on('click', 'td', function(){
                    resourceEditor.inline(this)
                  })

                }
                else{
                  showErrorNotification('The error has happend while adding the resource')
                }
              },
              error: function(e){
                 showErrorNotification('The error has happend while requesting the server')
              }
            })
        }
        
      }else{
        showErrorNotification('you should select the resource group for adding the resource')
      }
    })
  }

  // remove resource from the resouce group
  if(select('#btn_remove_resource_fromgroup')){
    on('click', '#btn_remove_resource_fromgroup', function(){
      let resourceGroupLabel = $('#resource_group_label').val()
      let resourceId = $("#resource_id").val()
      let selectedResourceGroupId = $('#resource_group_id').val()
      if(resourceId){
        if(confirm('Are you sure to remove the resource from the group: ' + resourceGroupLabel + ' ?')){
          let all_reesources = JSON.parse(document.getElementById('all_resources').textContent)
          let selectedResource = all_reesources.find(element => element.id ==  resourceId)
          $.ajax({
            type: "GET",
            url: 'removeResourceFromGroup',
            data: {
              resourceId: resourceId,
              modifier: selectedResource.modifier,
              description:selectedResource.description,
              comment: selectedResource.comment              
            },
            success: function (data){
              data = JSON.parse(data)
              var result = data['result']

              if(result){
                showSuccessNotification('The Resource has been removed from the group successfully!') 
                
                var all_resources = data['all_resources']
                document.getElementById('all_resources').textContent = JSON.stringify(all_resources)                 
                includedResources = all_resources.filter(element => element.group_id == selectedResourceGroupId)
                tableData = []
                includedResources.forEach(
                  resource => { 
                    tableData.push({
                      'id': resource.id,
                      'modifier': resource.modifier,
                      'description': resource.description,
                      'comment': resource.comment
                    })
                })

                var resourceEditor = new DataTable.Editor({
                  idSrc:  'id',
                  fields: [
                    {
                      label: 'id',
                      name: 'id'
                    },
                    {
                      label: 'modifier',
                      name: 'modifier'
                    },
                    {
                      label: 'description',
                      name: 'description'
                    },
                    {
                      label: 'comment',
                      name: 'comment'
                    },
                  ],
                  table: '#resource_table'
                })

                
                $('#resource_table').DataTable({
                  data:  tableData ,
                  destroy: true,
                  columns: [
                    { data: 'id' },
                    { data: 'modifier' },
                    { data: 'description' },
                    { data: 'comment' },
                  ],
                  order: [[1, 'asc']],
                  columnDefs:[
                    {
                      visible:false, 
                      targets:0
                    }
                    
                  ]
                })

                $('#resource_table').on('click', 'td', function(){
                  resourceEditor.inline(this)
                })

              }
              else{
                showErrorNotification('The error has happend while adding the resource')
              }
            },
            error: function(e){
               showErrorNotification('The error has happend while requesting the server')
            }
          })
        }
      }else{
        showErrorNotification('You should select the resource to be removed from the group')
      }
    })
  }

  //update the property
  if(select('#btnEquipmentPropertyUpdate')){
    on('click', '#btnEquipmentPropertyUpdate', function(){
      let propertyId = $('#resource_property_id').val()
      if(propertyId){
         let propertyModifier = $('#resource_property_modifier').val()
         let propertyDescription = $('#resource_property_description').val()
         let propertyDeValue =  $('#resource_property_default_value').val()
         let propertyDeDataLabelId = $('#resource_property_default_datatype').val()
         let propertyDeComment =  $('#resource_property_comment').val()
         let attributeClassId =  $('#resource_property_attribute_class').val()
         let propertyReportable =  $('#resource_property_is_reportable').prop('checked')
         if(propertyDescription && attributeClassId){
          if(confirm('Are you sure to update this property?')){
            $.ajax({
              type: "GET",
              url: 'updatePropertyDetail',
              data: {
                propertyId: propertyId,
                propertyModifier: propertyModifier,
                propertyDescription: propertyDescription,
                propertyDeValue: propertyDeValue,
                propertyDeDataLabelId: propertyDeDataLabelId,
                propertyDeComment: propertyDeComment,
                attributeClassId:attributeClassId,
                propertyReportable: propertyReportable,
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']            
  
                if(result){
                  showSuccessNotification('The property has been updated successfully!')
                  var resourceProperty = data['resourceProperty']
                  document.getElementById('resourceProperty').textContent = JSON.stringify(resourceProperty)
                  var html = ''
                  all_attributeClass = JSON.parse(document.getElementById('all_attributeClass').textContent)
                  let attributeClassesHavingProperty = all_attributeClass.filter(element =>{
                      atcId = element.attribute_class_id
                      if(resourceProperty.find(element => element.attribute_class_id == atcId))
                          return true
                      else
                          return false
                  })                
                  html = createPropertyTree(resourceProperty, attributeClassesHavingProperty)
                  document.getElementById('all_resource_property_tree').innerHTML = html
                  $('.treeview-animated').mdbTreeview();
  
                }
                else{
                  showErrorNotification('The error happend while updating the property!')
                }
              },
              error:function(){
                showErrorNotification('The error happend while requesting the server')
              }
    
            })
          }
         }else{
           showErrorNotification('The description and attribute class should not be empty string.')
         }
      }else{
        showErrorNotification('You should select the property to be updated.')
      }
    })
  }

  //show Add equipment property modal
  if(select('#btnEquipmentPropertyAdd')){
    on('click', '#btnEquipmentPropertyAdd', function(){
      let all_datatype = JSON.parse(document.getElementById('all_datatype').textContent)
      let all_attributeClass = JSON.parse(document.getElementById('all_attributeClass').textContent)
      $('#adding_property_default_datatype_label').find('option').remove()
      $('#adding_property_attribute_class').find('option').remove()
      
      var p = new Option('none', 'none',  undefined, undefined)
      $(p).html('none')
      $('#adding_property_default_datatype_label').append(p)
      all_datatype.forEach(element => {
        var p = new Option(element.label, element.id,  undefined, undefined)
        $(p).html(element.label)
        $('#adding_property_default_datatype_label').append(p)
      })

      var p = new Option('none', '',  undefined, undefined)
      $(p).html('none')
      $('#adding_property_attribute_class').append(p)      
      all_attributeClass.forEach(element => {
        var p = new Option(element.attribute_class_label, element.attribute_class_id,  undefined, undefined)
        $(p).html(element.label)
        $('#adding_property_attribute_class').append(p)
      })

    })
  }

  // add the resource to group in the modal
  if(select('#equipmentPropertyModal .btn-primary'))
  {
    on('click', '#equipmentPropertyModal .btn-primary', function(){
      let modifier = $('#adding_property_modifier').val()
      let description = $('#adding_property_description').val()
      let defaultValue = $('#adding_property_default_value').val()
      let defaultDataTypeId = $('#adding_property_default_datatype_label').val()
      let comment = $('#adding_property_comment').val()
      let reportable = $('#adding_property_is_reportable').prop('checked')
      let attributeClassId = $('#adding_property_attribute_class').val()

      if(description && attributeClassId){
        if(confirm('Are you sure to add this property?')){
            
            $.ajax({
              type: "GET",
              url: 'addEquipmentProperty',
              data: {
                modifier: modifier,
                description: description,
                defaultValue: defaultValue,
                defaultDataTypeId: defaultDataTypeId,
                comment: comment,
                reportable: reportable,
                attributeClassId: attributeClassId
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']

                if(result){
                  showSuccessNotification('The Property has been added successfully!') 
                  $('#equipmentPropertyModal').modal('hide')
                  var resourceProperty = data['resourceProperty']
                  document.getElementById('resourceProperty').textContent = JSON.stringify(resourceProperty)
                  var html = ''
                  all_attributeClass = JSON.parse(document.getElementById('all_attributeClass').textContent)
                  let attributeClassesHavingProperty = all_attributeClass.filter(element =>{
                      atcId = element.attribute_class_id
                      if(resourceProperty.find(element => element.attribute_class_id == atcId))
                          return true
                      else
                          return false
                  })                
                  html = createPropertyTree(resourceProperty, attributeClassesHavingProperty)
                  document.getElementById('all_resource_property_tree').innerHTML = html
                  $('.treeview-animated').mdbTreeview();
                
                }
                else{
                  showErrorNotification('The error has happend while adding the property')
                }
              },
              error: function(e){
                 showErrorNotification('The error has happend while requesting the server')
              }
            })
        }
        
      }else{
        showErrorNotification('Description and Attribute Class should not be empty.')
      }
    })
  }

  // delete the property 
  if(select('#btn_equipment_property_delete')){
    on('click', '#btn_equipment_property_delete', function(){
      let propertyId = $('#resource_property_id').val()
      if(propertyId){
        if(confirm('Are you sure to remove this property?')){
          $.ajax({
            type: "GET",
            url: 'removeProperty',
            data: {
              propertyId: propertyId,
            },
            success: function (data){
              data = JSON.parse(data)
              var result = data['result']            

              if(result){

                showSuccessNotification('The property has been removed successfully!')
                $("#resource_property_default_datatype").find('option').remove()
    
                $('#resource_property_id').val('')
                $('#resource_property_modifier').val('')
                $('#resource_property_description').val('')
                $('#resource_property_is_reportable').prop('checked' , false)
                $('#resource_property_comment').val('')
                $('#resource_property_used').prop('checked' , false)
                $('#resource_property_default_value').val('')

                var resourceProperty = data['resourceProperty']
                document.getElementById('resourceProperty').textContent = JSON.stringify(resourceProperty)
                var html = ''
                all_attributeClass = JSON.parse(document.getElementById('all_attributeClass').textContent)
                let attributeClassesHavingProperty = all_attributeClass.filter(element =>{
                    atcId = element.attribute_class_id
                    if(resourceProperty.find(element => element.attribute_class_id == atcId))
                        return true
                    else
                        return false
                })                
                html = createPropertyTree(resourceProperty, attributeClassesHavingProperty)
                document.getElementById('all_resource_property_tree').innerHTML = html
                $('.treeview-animated').mdbTreeview();

              }
              else{
                showErrorNotification('The error happend while removing the property!')
              }
            },
            error:function(){
              showErrorNotification('The error happend while requesting the server')
            }
  
          })
        }
      }else{
        showErrorNotification('You should select the property to be removed.')
      }
    })
  }

  // show add resource property modal
  if(select('#btnResourcePropertyAdd')){
    on('click', '#btnResourcePropertyAdd', function(){
      let propertyId = $('#resource_property_id').val()
      $('#resourcePropertyModalLabel').html('Add Resource Property')
      $('#modal_resource_select_div').css('display', 'flex')
      $('#modal_resource_modifier_div').css('display', 'none')
      $('#modal_resource_description_div').css('display', 'none')
      $('#update_resource_property_btn').css('display', 'none')
      $('#add_resource_property_btn').css('display', 'flex')
      if(propertyId){
        let all_datatype = JSON.parse(document.getElementById('all_datatype').textContent)
        let all_resources = JSON.parse(document.getElementById('all_resources').textContent)
        $('#modal_resesource_default_datatype').find('option').remove()
        $('#modal_resesource_select').find('option').remove()
        var p = new Option('none', undefined,  undefined, undefined)
        $(p).html('none')
        $('#modal_resesource_default_datatype').append(p)
  
        all_datatype.forEach(element => {
          var p = new Option(element.label, element.id,  undefined, undefined)
          $(p).html(element.label)
          $('#modal_resesource_default_datatype').append(p)
        })
  
        all_resources.forEach(element => {
          var p = new Option(element.modifier + ' (' + element.description + ')', element.id,  undefined, undefined)
          $(p).html(element.modifier + ' (' + element.description + ')')
          $('#modal_resesource_select').append(p)
        })
  
        $('#modal_resource_modifier').val('')
        $('#modal_resource_description').val('')
        $('#modal_resource_value').val('')
        $('#modal_resource_comment').val('')
      }else{
        showErrorNotification('You should select the equipment property to add the resoruce.')
      }
    })
  }
  
  // show update resource property modal
  $('#resource_property_table').on('click', 'td', function(){
      
    let sTable = $('#resource_property_table').DataTable()
    let cell = sTable.cell(this)
    let row = cell.index().row;
    let rowData = sTable.row(row).data()
    let selectedResourceId = rowData.resource_id

    $('#modal_resource_select_div').css('display', 'none')
    $('#modal_resource_modifier_div').css('display', 'flex')
    $('#modal_resource_description_div').css('display', 'flex')
    $('#update_resource_property_btn').css('display', 'flex')
    $('#add_resource_property_btn').css('display', 'none')

    let all_datatype = JSON.parse(document.getElementById('all_datatype').textContent)
    $('#selectedResourceId').val(selectedResourceId)
    $('#modal_resesource_default_datatype').find('option').remove()
    let resourceProperty = JSON.parse(document.getElementById('resourceProperty').textContent)
    let propertyId = $('#resource_property_id').val()
    let resource = resourceProperty.find(element => (element.id == propertyId && element.resource_id == selectedResourceId))
    let datatypeId = resource.default_datatype_id
    $('#modal_resource_modifier').val(resource.resource_modifier)
    $('#modal_resource_description').val(resource.resource_description)
    $('#modal_resource_value').val(resource.resource_property_default_value)
    $('#modal_resource_comment').val(resource.resource_property_comment)
    
    var p = new Option('none', undefined,  undefined, undefined)
    $(p).html('none')
    $('#modal_resesource_default_datatype').append(p)

    all_datatype.forEach(element => {
      var selected = element.id === datatypeId ? true: false
      var p = new Option(element.label, element.id,  undefined, selected)
      $(p).html(element.label)
      $('#modal_resesource_default_datatype').append(p)
    })

    $('#resourcePropertyModal').modal('show') 
    $('#resourcePropertyModalLabel').html('Update Resource Property')

  })

  // update the resource property
  $('#update_resource_property_btn').on('click', function(){
    let resourceId = $('#selectedResourceId').val()
    let propertyId = $('#resource_property_id').val()
    let resourceModifier = $('#modal_resource_modifier').val()
    let resourceDescription = $('#modal_resource_description').val()
    let resourcePropertyDefaultValue = $('#modal_resource_value').val()
    let resourcePropertyComment = $('#modal_resource_comment').val()
    let resourcePropertyDatatypeId =  $('#modal_resesource_default_datatype').val()
    let all_resources = JSON.parse(document.getElementById('all_resources').textContent)
    let selectedResource = all_resources.find(element => element.id == resourceId)
    if(confirm('Are you sure to update this resource property?')){
      $.ajax({
        type: "GET",
        url: 'updateResourcePropertyDetail',
        data: {
          propertyId: propertyId,
          resourceId: resourceId,
          resourceModifier: resourceModifier,
          resourceDescription: resourceDescription,
          resourceGroupId: selectedResource.group_id,
          resourceComment: selectedResource.comment,
          resourcePropertyDefaultValue: resourcePropertyDefaultValue,
          resourcePropertyComment: resourcePropertyComment,
          resourcePropertyDatatypeId: resourcePropertyDatatypeId,
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          if(result){
            showSuccessNotification('The resource property has been updated successfully!')
            var resourceProperty = data['resourceProperty']
            var all_resources = data['all_resources']
            // update the resoruce proeprty and resouces with updated ones
            document.getElementById('resourceProperty').textContent = JSON.stringify(resourceProperty)
            document.getElementById('all_resources').textContent = JSON.stringify(all_resources)
            // update the tree view
            var html = ''
            var resource_id_list = []
            resourceProperty.forEach(n => {
                if(!resource_id_list.includes(n.id)){
                    resource_id_list.push(n.id)
                    html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-propertyId="'+ n.id + '"> \
                    ' + n.modifier + '  (' + n.description +')</li>'
                }
            });
            document.getElementById('all_resource_property_tree').innerHTML = html
            $('.treeview-animated').mdbTreeview();
            $('#resourcePropertyModal').modal('hide')
  
            // display resources using this property
            resources = resourceProperty.filter(element => element.id == propertyId)
            tableData = []
            resources.forEach(resource => {
              tableData.push({
                  'resource_id': resource.resource_id ,
                  'resource_modifier': resource.resource_modifier ,
                  'resource_description': resource.resource_description ,
                  'datatype_label': resource.resource_property_default_datatype_label ,
                  'datatype_description': resource.resource_property_default_datatype_comment,
                  'value':resource.resource_property_default_value ,
                  'comment':resource.resource_property_comment ,
                })
                
            })
            $('#resource_property_table').DataTable({
              data:  tableData ,
              destroy: true,
              columns: [
                { data: 'resource_id' },
                { data: 'resource_modifier' },
                { data: 'resource_description' },
                { data: 'datatype_label' },
                { data: 'datatype_description' },
                { data: 'value' },
                { data: 'comment' },
              ],
              order: [[1, 'asc']],
              columnDefs:[
                {
                  visible:false, 
                  targets:0
                }
                
              ]
            })
          }
          else{
            showErrorNotification('The error happend while updating the resource property!')
          }
        },
        error:function(){
          showErrorNotification('The error happend while requesting the server')
        }
      })
    }
  })

   // add the resource property
  $('#add_resource_property_btn').on('click', function(){
   
    let propertyId = $('#resource_property_id').val()
   
    let resourcePropertyDefaultValue = $('#modal_resource_value').val()
    let resourcePropertyComment = $('#modal_resource_comment').val()
    let resourcePropertyDatatypeId =  $('#modal_resesource_default_datatype').val()
    let resourceId = $('#modal_resesource_select').val()
    let resourceProperty = JSON.parse(document.getElementById('resourceProperty').textContent)
    let resource = resourceProperty.find(element => (element.id == propertyId && element.resource_id == resourceId))
    if(resource){
      showErrorNotification('This resource already is in reaource property table')
    }else{
      $.ajax({
        type: "GET",
        url: 'addResourceProperty',
        data: {
          propertyId: propertyId,
          resourceId: resourceId,
          resourcePropertyDefaultValue: resourcePropertyDefaultValue,
          resourcePropertyComment: resourcePropertyComment,
          resourcePropertyDatatypeId: resourcePropertyDatatypeId,
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']            

          if(result){
            showSuccessNotification('The resource property has been added successfully!')
            var resourceProperty = data['resourceProperty']
          
            // update the resoruce proeprty with added one
            document.getElementById('resourceProperty').textContent = JSON.stringify(resourceProperty)
          
            // update the tree view
            var html = ''
            var resource_id_list = []
            resourceProperty.forEach(n => {
                if(!resource_id_list.includes(n.id)){
                    resource_id_list.push(n.id)
                    html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-propertyId="'+ n.id + '"> \
                    ' + n.modifier + '  (' + n.description +')</li>'
                }
            });
            document.getElementById('all_resource_property_tree').innerHTML = html
            $('.treeview-animated').mdbTreeview();
            $('#resourcePropertyModal').modal('hide')

            // display resources using this property
            resources = resourceProperty.filter(element => element.id == propertyId)
            tableData = []
            resources.forEach(resource => {
              tableData.push({
                  'resource_id': resource.resource_id ,
                  'resource_modifier': resource.resource_modifier ,
                  'resource_description': resource.resource_description ,
                  'datatype_label': resource.resource_property_default_datatype_label ,
                  'datatype_description': resource.resource_property_default_datatype_comment,
                  'value':resource.resource_property_default_value ,
                  'comment':resource.resource_property_comment ,
                })
                
            })
            
            $('#resource_property_table').DataTable({
              data:  tableData ,
              destroy: true,
              columns: [
                { data: 'resource_id' },
                { data: 'resource_modifier' },
                { data: 'resource_description' },
                { data: 'datatype_label' },
                { data: 'datatype_description' },
                { data: 'value' },
                { data: 'comment' },
              ],
              order: [[1, 'asc']],
              columnDefs:[
                {
                  visible:false, 
                  targets:0
                }
                
              ]
            })

          }
          else{
            showErrorNotification('The error happend while updating the resource property!')
          }
        },
        error:function(){
          showErrorNotification('The error happend while requesting the server')
        }
      })
    }
  })

  // remove the resource from the resource property
  $('#btnResourcePropertyRemove').on('click', function(){
    let propertyId = $('#resource_property_id').val()
    let resourceId = $('#selectedResourceId').val()
    if(resourceId && propertyId){
      if(confirm('Are you sure to remove this resource from the resource property?')){
        $.ajax({
          type: "GET",
          url: 'removeResourceProperty',
          data: {
            propertyId: propertyId,
            resourceId: resourceId,
          },
          success: function (data){
            data = JSON.parse(data)
            var result = data['result']            
  
            if(result){
              showSuccessNotification('The resource property has been removed successfully!')
              var resourceProperty = data['resourceProperty']
            
              // update the resoruce proeprty with removed one
              document.getElementById('resourceProperty').textContent = JSON.stringify(resourceProperty)
            
              // update the tree view
              var html = ''
              var resource_id_list = []
              resourceProperty.forEach(n => {
                  if(!resource_id_list.includes(n.id)){
                      resource_id_list.push(n.id)
                      html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-propertyId="'+ n.id + '"> \
                      ' + n.modifier + '  (' + n.description +')</li>'
                  }
              });
              document.getElementById('all_resource_property_tree').innerHTML = html
              $('.treeview-animated').mdbTreeview();
              $('#resourcePropertyModal').modal('hide')
  
              // display resources using this property
              resources = resourceProperty.filter(element => element.id == propertyId)
              tableData = []
              resources.forEach(resource => {
                tableData.push({
                    'resource_id': resource.resource_id ,
                    'resource_modifier': resource.resource_modifier ,
                    'resource_description': resource.resource_description ,
                    'datatype_label': resource.resource_property_default_datatype_label ,
                    'datatype_description': resource.resource_property_default_datatype_comment,
                    'value':resource.resource_property_default_value ,
                    'comment':resource.resource_property_comment ,
                  })
                  
              })
              $('#resource_property_table').DataTable({
                data:  tableData ,
                destroy: true,
                columns: [
                  { data: 'resource_id' },
                  { data: 'resource_modifier' },
                  { data: 'resource_description' },
                  { data: 'datatype_label' },
                  { data: 'datatype_description' },
                  { data: 'value' },
                  { data: 'comment' },
                ],
                order: [[1, 'asc']],
                columnDefs:[
                  {
                    visible:false, 
                    targets:0
                  }
                ]
              })
  
            }
            else{
              showErrorNotification('The error happend while removing  the resource property!')
            }
          },
          error:function(){
            showErrorNotification('The error happend while requesting the server')
          }
        })
      }
    }else{
      showErrorNotification('You should select the resource fromt the table')
    }
  })

  // update equipment interface
  $('#btnUpdateEquipmentInterface').on('click', function(){
    let selectedInterfaceId = $('#equipment_interface_id').val()
    if(selectedInterfaceId){
      let identifier = $('#equipment_interface_identifier').val()      
      let description = $('#equipment_interface_description').val()
      let comment = $('#equipment_interface_comment').val()
      let interfaceClassId =  $('#equipment_interface_interface_class_label').val()
      let interfaceConnectingClassId =  $('#equipment_interface_connecting_class_label').val()
      let isIntermediate =  $('#equipment_interface_is_intermediate').prop('checked')
      if(identifier && interfaceClassId){
        if(confirm('Are you sure to update this interface?')){
          $.ajax({
            type: "GET",
            url: 'updateEquipmentInterfaceDetail',
            data: {
              selectedInterfaceId: selectedInterfaceId,
              identifier: identifier,
              description: description,
              comment: comment,
              interfaceClassId: interfaceClassId,
              interfaceConnectingClassId: interfaceConnectingClassId,
              isIntermediate: isIntermediate,
            },
            success: function (data){
              data = JSON.parse(data)
              var result = data['result']
              if(result){
                showSuccessNotification('The interface has been updated successfully!')
               
                var  all_interfaces = data['all_interfaces']
                // update the resoruce proeprty and resouces with updated ones
                document.getElementById('all_interfaces').textContent = JSON.stringify(all_interfaces)
               
                // update the tree view                
                all_interface_classes = JSON.parse(document.getElementById('all_interface_classes').textContent)
                let interfaceClasesHavingInterface = all_interface_classes.filter( element => {
                    itcId = element.id
                    if(all_interfaces.find(element => element.interface_class_id == itcId))
                        return true
                    else
                        return false
                })
                let html = createInterfaceTree(all_interfaces, interfaceClasesHavingInterface)
                document.getElementById('equipment_interface_tree').innerHTML = html
                $('.treeview-animated').mdbTreeview();
              }
              else{
                showErrorNotification('The error happend while updating the interface!')
              }
            },
            error:function(){
              showErrorNotification('The error happend while requesting the server')
            }
          })
        }
      }else[
        showErrorNotification('Indentifier and Interface Class should not be empty.')
      ]
    }else{
      showErrorNotification('You should select the interface to be updated')
    }
  })

  // show adding interface modal
  $('#btnAddEquipmentInterface').on('click', function(){
    $('#adding_interface_class_label').find('option').remove()
    $('#adding_interface_connecting_class_label').find('option').remove()
    let all_interface_classes = JSON.parse(document.getElementById('all_interface_classes').textContent)
    // initialize the drop down list for class labels
    var p = new Option('none', undefined, undefined, undefined)
    $(p).html('none')
    $('#adding_interface_class_label').append(p)
    all_interface_classes.forEach(element => {
      var p = new Option(element.label, element.id,  undefined, undefined)
      $(p).html(element.label + ' (' + element.description + ')')
      $('#adding_interface_class_label').append(p)
    })

    var p = new Option('none', 'none', undefined, undefined)
    $(p).html('none')
    $('#adding_interface_connecting_class_label').append(p)
    all_interface_classes.forEach(element => {
      var p = new Option(element.label, element.id,  undefined, undefined)
      $(p).html(element.label + ' (' + element.description + ')')
      $('#adding_interface_connecting_class_label').append(p)
    })
  })

  //add the equipment interface in the modal
  $('#equipmentInterfaceModal .btn-primary').on('click', function(){
    let identifier = $('#adding_interface_identifier').val()
    let description = $('#adding_interface_description').val()
    let classId = $('#adding_interface_class_label').val()
    let connectingClassId = $('#adding_interface_connecting_class_label').val()
    let comment = $('#adding_interface_comment').val()
    let isIntermediate= $('#adding_interface_is_intermediate').prop('checked')
    if(identifier && classId){
      $.ajax({
        type: "GET",
        url: 'addInterfaceDetail',
        data: {
          identifier: identifier,
          description: description,
          comment: comment,
          classId: classId,
          connectingClassId: connectingClassId,
          isIntermediate: isIntermediate,
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          if(result){
            showSuccessNotification('The interface has been added successfully!')
            $('#equipmentInterfaceModal').modal('hide')
            var  all_interfaces = data['all_interfaces']
            // update the resoruce proeprty and resouces with added ones
            document.getElementById('all_interfaces').textContent = JSON.stringify(all_interfaces)
           
            // update the tree view
            all_interface_classes = JSON.parse(document.getElementById('all_interface_classes').textContent)
                let interfaceClasesHavingInterface = all_interface_classes.filter( element => {
                    itcId = element.id
                    if(all_interfaces.find(element => element.interface_class_id == itcId))
                        return true
                    else
                        return false
                })
                let html = createInterfaceTree(all_interfaces, interfaceClasesHavingInterface)
           
            document.getElementById('equipment_interface_tree').innerHTML = html
            $('.treeview-animated').mdbTreeview();
          }
          else{
            showErrorNotification('The error happend while adding the interface!')
          }
        },
        error:function(){
          showErrorNotification('The error happend while requesting the server')
        }
      })
    }else{
      showErrorNotification('The identifier and interface class should not be empty.')
    }
  })

  //remove the inerface
  $('#btnRemoveEquipmentInterface').on('click', function(){
    let selectedInterfaceId = $('#equipment_interface_id').val()
    if(selectedInterfaceId){
      if(confirm('Are you sure to remove this interface?')){
        $.ajax({
          type: "GET",
          url: 'removeEquipmentInterface',
          data: {
            selectedInterfaceId: selectedInterfaceId,
          },
          success: function (data){
            data = JSON.parse(data)
            var result = data['result']
            if(result){
              showSuccessNotification('The interface has been removed successfully!')
             
              var  all_interfaces = data['all_interfaces']
              // update the resoruce proeprty and resouces with removed one
              document.getElementById('all_interfaces').textContent = JSON.stringify(all_interfaces)
             
              // update the tree view
              all_interface_classes = JSON.parse(document.getElementById('all_interface_classes').textContent)
                let interfaceClasesHavingInterface = all_interface_classes.filter( element => {
                    itcId = element.id
                    if(all_interfaces.find(element => element.interface_class_id == itcId))
                        return true
                    else
                        return false
                })
                let html = createInterfaceTree(all_interfaces, interfaceClasesHavingInterface)
              document.getElementById('equipment_interface_tree').innerHTML = html
              $('.treeview-animated').mdbTreeview();
            }
            else{
              showErrorNotification('The error happend while removing the interface!')
            }
          },
          error:function(){
            showErrorNotification('The error happend while requesting the server')
          }
        })
      }
    }else{
      showErrorNotification("You should select the interface to be removed.")
    }
  })

  // update the attribute class
  $('#btnUpdateAttributeClass').on('click', function(){
      let selectedClassId = $('#attribute_class_id').val()
      if(selectedClassId){
        let label = $('#attribute_class_label').val()
        let description = $('#attribute_class_description').val()
        let comment = $('#attribute_class_comment').val()
        if(label && description){
          if(confirm('Are you sure to update this attribute class?')){
            $.ajax({
              type: "GET",
              url: 'updateAttributeClassDetail',
              data: {
                id: selectedClassId,
                label: label,
                description: description,
                comment: comment,
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']
                if(result){
                  showSuccessNotification('The attribute class has been updated successfully!')
                  var  all_attributeClass = data['all_attributeClass']
                  document.getElementById('all_attributeClass').textContent = JSON.stringify(all_attributeClass)                  
                  var html = ''
                  all_attributeClass.forEach(n => {
                          html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-attributeClassId="'+ n.attribute_class_id + '"> \
                          ' + n.attribute_class_label + '  (' + n.attribute_class_description +')</li>'
                  });
                  document.getElementById('attribute_class_tree').innerHTML = html
                }
                else{
                  showErrorNotification('The error happend while updating the attribute class!')
                }
              },
              error:function(){
                showErrorNotification('The error happend while requesting the server')
              }
            })
          }
        }else{
          showErrorNotification('Label and description should not be emptry string')
        }
      }else{  
        showErrorNotification('You should select the attribute class to be updated')
      }
  })

  //add attribute class from the  modal
  $('#AttributeClassModal .btn-primary').on('click', function(){
     let label = $('#adding_attribute_class_label').val()
     let description= $('#adding_attribute_class_description').val()
     let comment = $('#adding_attribute_class_comment').val()
     if(label && description){
      $.ajax({
        type: "GET",
        url: 'addAttributeClass',
        data: {
          label: label,
          description: description,
          comment: comment,
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          if(result){
            showSuccessNotification('The attribute class has been added successfully!')
            $('#AttributeClassModal').modal('hide')
            var  all_attributeClass = data['all_attributeClass']
            document.getElementById('all_attributeClass').textContent = JSON.stringify(all_attributeClass)
            var html = ''
            all_attributeClass.forEach(n => {
                    html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-attributeClassId="'+ n.attribute_class_id + '"> \
                    ' + n.attribute_class_label + '  (' + n.attribute_class_description +')</li>'
            });
            document.getElementById('attribute_class_tree').innerHTML = html
          }
          else{
            showErrorNotification('The error happend while adding the attribute class!')
          }
        },
        error:function(){
          showErrorNotification('The error happend while requesting the server')
        }
      })
    }else{
      showErrorNotification('Label and description should not be emptry string')
    }
  })

  //remove attribute class
  $('#btnRemoveAttributeClass').on('click', function(){
    let selectedClassId = $('#attribute_class_id').val()
    if(selectedClassId){
      if(confirm('Are you sure to remove this attribute class?')){
        $.ajax({
          type: "GET",
          url: 'removeAttributeClassDetail',
          data: {
            id: selectedClassId          
          },
          success: function (data){
            data = JSON.parse(data)
            var result = data['result']
            if(result){
              showSuccessNotification('The attribute class has been removed successfully!')
              $('#attribute_class_id').val('')
              $('#attribute_class_label').val('')
              $('#attribute_class_description').val('')
              $('#attribute_class_comment').val('')
              var  all_attributeClass = data['all_attributeClass']
              document.getElementById('all_attributeClass').textContent = JSON.stringify(all_attributeClass)                  
              var html = ''
              all_attributeClass.forEach(n => {
                      html += '<li class="treeview-li"><div class="treeview-animated-element treeview-title" data-attributeClassId="'+ n.attribute_class_id + '"> \
                      ' + n.attribute_class_label + '  (' + n.attribute_class_description +')</li>'
              });
              document.getElementById('attribute_class_tree').innerHTML = html
            }
            else{
              showErrorNotification('The error happend while removing the attribute class!')
            }
          },
          error:function(){
            showErrorNotification('The error happend while requesting the server')
          }
        })
      }
    }else{  
      showErrorNotification('You should select the attribute class to be removed')
    }
  })

  //update connection type
  $('#btn_update_connection_type').on('click', function(){
    let connectionTypeId = $('#connection_type_id').val()
    if(connectionTypeId){
      let label = $('#connection_type_label').val()
      let modifier = $('#connection_type_modifier').val()
      let parentPath = $('#connection_type_parent_path').val()
      let description = $('#connection_type_description').val()
      let manufacturer = $('#connection_type_manufacturer').val()
      let model = $('#connection_type_model').val()
      let comment = $('#connection_type_comment').val()
      let isApproved = $('#connection_type_is_approved').prop('checked')
      if(label && description){
        if(confirm('Are you sure to update this connection type?')){
          $.ajax({
            type: "GET",
            url: 'updateConnectionTypeDetail',
            data: {
              id: connectionTypeId,
              label: label,
              modifier: modifier,
              parentPath: parentPath,
              description: description,
              manufacturer: manufacturer,
              model: model,
              comment: comment,
              isApproved: isApproved,
            },
            success: function (data)
            {
              data = JSON.parse(data)
              var result = data['result']
              var allConnectionTypes = data['all_connection_types']
              if(result){
                showSuccessNotification('The equipment type has been updated successfully!')
                // update the connection type tree
                document.getElementById('all_connection_types').textContent = JSON.stringify(allConnectionTypes)
                const html = createConnectionTypeTree(allConnectionTypes)
                document.getElementById('connection_type_tree').innerHTML = html
                $('.treeview-animated').mdbTreeview();
  
              }
              else{
               showErrorNotification('The error happend while updating the connection type!')
             }
            },
            error: function(){
              showErrorNotification('The error happend while requesting the server.')
            }
  
          })
        }
      }else{
        showErrorNotification('Label and description should not be empty string.')
      }
    }else{
      showErrorNotification('You should select the connection type to be updated.')
    }
  })

  //show adding connection type modal
  $('#btn_add_connection_type').on('click', function(){
    $("#adding_connection_type_parent_path").find('option').remove()
    let allConnectionTypes = JSON.parse(document.getElementById('all_connection_types').textContent)
    // display parent  path
    var p = new Option('none' , '', undefined, false);
    $(p).html('none');
    $("#adding_connection_type_parent_path").append(p);

    allConnectionTypes.forEach( element => {
     let element_path = element.path.join('.')
     var o = new Option(element.label, element_path, undefined, undefined);
     $(o).html(element.label);
     $("#adding_connection_type_parent_path").append(o);
   })
  })

  // add connection type from the modal
  $('#connectionTypeModal .btn-primary').on('click', function(){
    let label = $('#adding_connection_type_label').val()
    let modifier = $('#adding_connection_type_modifier').val()
    let parentPath = $('#adding_connection_type_parent_path').val()
    let description = $('#adding_connection_type_description').val()
    let manufacturer = $('#adding_connection_type_manufacturer').val()
    let model = $('#adding_connection_type_model').val()
    let comment = $('#adding_connection_type_comment').val()
    let isApproved = $('#adding_connection_type_approved').prop('checked')
    if(label && description){
      $.ajax({
        type: "GET",
        url: 'addConnectionType',
        data: {
          label: label,
          modifier: modifier,
          parentPath: parentPath,
          description: description,
          manufacturer: manufacturer,
          model: model,
          comment: comment,
          isApproved: isApproved,
        },
        success: function (data)
        {
          data = JSON.parse(data)
          var result = data['result']
          var allConnectionTypes = data['all_connection_types']
          if(result){
            showSuccessNotification('The equipment type has been updated successfully!')
            $('#connectionTypeModal').modal('hide')
            // update the connection type tree
            document.getElementById('all_connection_types').textContent = JSON.stringify(allConnectionTypes)
            const html = createConnectionTypeTree(allConnectionTypes)
            document.getElementById('connection_type_tree').innerHTML = html
            $('.treeview-animated').mdbTreeview();

          }
          else{
           showErrorNotification('The error happend while adding the connection type!')
         }
        },
        error: function(){
          showErrorNotification('The error happend while requesting the server.')
        }

      })
    }else{
      showErrorNotification('Label and description should not be empty string.')
    }

  })
  
  // remove connecion type
  $('#btn_remove_connection_type').on('click', function(){
      let id = $('#connection_type_id').val()
      if(id){
        if(confirm('Are you sure to remove this connection type?')){
          $.ajax({
            type: "GET",
            url: 'removeConnectionTypeDetail',
            data: {
              id: id,
            },
            success: function (data)
            {
              data = JSON.parse(data)
              var result = data['result']
              var allConnectionTypes = data['all_connection_types']
              if(result){
                showSuccessNotification('The equipment type has been updated successfully!')
                // update the connection type tree
                document.getElementById('all_connection_types').textContent = JSON.stringify(allConnectionTypes)
                const html = createConnectionTypeTree(allConnectionTypes)
                document.getElementById('connection_type_tree').innerHTML = html
                $('.treeview-animated').mdbTreeview();

                $('#connection_type_label').val('')
                $('#connection_type_modifier').val('')
                $('#connection_type_parent_path').find('option').remove()
                $('#connection_type_description').val('')
                $('#connection_type_manufacturer').val('')
                $('#connection_type_model').val('')
                $('#connection_type_comment').val('')
                $('#connection_type_is_approved').prop('checked', false)
              }
              else{
               showErrorNotification('The error happend while removing the connection type!')
             }
            },
            error: function(){
              showErrorNotification('The error happend while requesting the server.')
            }
          })
        }
      }else{
        showErrorNotification('You should select the connection type to be removed')
      }
    
  })

  $('#target_systems_table').on('click', 'td', function(){    
    let sTable = $('#target_systems_table').DataTable()
    let cell = sTable.cell(this)
    let row = cell.index().row;
    let rowData = sTable.row(row).data()
    let selectedId = rowData.id
    
    $('#target_system_id').val(selectedId)
  })
  // add target systems
  $('#targetSystemModal .btn-primary').on('click', function(){
    let label = $('#adding_system_settings_label').val()
    let value = $('#adding_system_settings_value').val()
    let comment = $('#adding_system_settings_comment').val()
    let target_systems = JSON.parse(document.getElementById('target_systems').textContent)
    let filter = target_systems.filter(element => element.label == label)

    if(!filter.length){
      $.ajax({
        type: "GET",
        url: 'addTargetSystemDetail',
        data: {       
          label: label,
          value: value,
          comment: comment
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          if(result){
            target_systems = data['target_systems']
            document.getElementById('target_systems').textContent = JSON.stringify(target_systems)
            showSuccessNotification('The target system has been added successfully!')
            let tableData = []
            target_systems.forEach(element => {
                tableData.push({
                  'id': element.system_settings_id,
                  'label': element.label ,
                  'value': element.value,
                  'comment' : element.comment,
                })
            })

            var targetSystemEditor = new DataTable.Editor({
              idSrc:  'id',
              fields: [
                {
                  label: 'id',
                  name: 'id'
                },
                {
                  label: 'label',
                  name: 'label'
                },
                {
                  label: 'value',
                  name: 'value'
                },
                {
                  label: 'comment',
                  name: 'comment'
                },
              ],
              table: '#target_systems_table'
            })
      
            $('#target_systems_table').DataTable({
              data:  tableData ,
              destroy: true,
              autoWidth: false,
              columns: [
                { data: 'id'},
                { data: 'label' },
                { data: 'value' },
                { data: 'comment' },
              
              ],
              order: [[1, 'asc']],
              columnDefs: [
                {
                  targets: [0],
                  visible: false
                }
              ]}
            )

            $('#target_systems_table').on('click', 'td:nth-child(n+2):nth-child(-n+4)', function(){
              targetSystemEditor.inline(this)
            })
            all_datatype = JSON.parse(document.getElementById('all_datatype').textContent)
            showDataTypeTable(target_systems, all_datatype)
            $('#targetSystemModal').modal('hide')
          }
          else{
            showErrorNotification('The error happend while adding the target system!')
          }
        },
        error: function(){
          showErrorNotification('The error happend while requesting the server')
        }
       })
    }else{
      showErrorNotification('The Label: ' + label + ' is exsting on the DB. Please check other label to be added.')
    }
  })
  // delete target systems
  $('#btn_delete_targetsystem').on('click', function(){
    let selectedId = $('#target_system_id').val()
    if(selectedId){
      $.ajax({
        type: "GET",
        url: 'removeTargetSystemDetail',
        data: {       
          id: selectedId
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          if(result){
            target_systems = data['target_systems']
            document.getElementById('target_systems').textContent = JSON.stringify(target_systems)
            showSuccessNotification('The target system has been removed successfully!')
            $('#target_system_id').val('')
            let tableData = []
            target_systems.forEach(element => {
                tableData.push({
                  'id': element.system_settings_id,
                  'label': element.label ,
                  'value': element.value,
                  'comment' : element.comment,
                })
            })

            var targetSystemEditor = new DataTable.Editor({
              idSrc:  'id',
              fields: [
                {
                  label: 'id',
                  name: 'id'
                },
                {
                  label: 'label',
                  name: 'label'
                },
                {
                  label: 'value',
                  name: 'value'
                },
                {
                  label: 'comment',
                  name: 'comment'
                },
              ],
              table: '#target_systems_table'
            })
      
            $('#target_systems_table').DataTable({
              data:  tableData ,
              destroy: true,
              autoWidth: false,
              columns: [
                { data: 'id'},
                { data: 'label' },
                { data: 'value' },
                { data: 'comment' },
              
              ],
              order: [[1, 'asc']],
              columnDefs: [
                {
                  targets: [0],
                  visible: false
                }
              ]}
            )

            $('#target_systems_table').on('click', 'td:nth-child(n+2):nth-child(-n+4)', function(){
              targetSystemEditor.inline(this)
            })
            all_datatype = JSON.parse(document.getElementById('all_datatype').textContent)
            showDataTypeTable(target_systems, all_datatype)
            $('#targetSystemModal').modal('hide')
          }
          else{
            showErrorNotification('The error happend while removing the target system!')
          }
        },
        error: function(){
          showErrorNotification('The error happend while requesting the server')
        }
       })
    }else{
      showErrorNotification('You should select the target system to be removed')
    }
  })

  //remove the datatype
  $('#system_datatype_table').on('click', '.bi-trash', function(){
    if(confirm('Are you sure to remove this datatype?')){
      let selectedId = this.getAttribute('data-id')
      $.ajax({
        type: "GET",
        url: 'removeDataTypeDetail',
        data: {       
          id: selectedId,
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          if(result){
            showSuccessNotification('The datatype has been removed successfully!')
            all_datatype = data['all_datatype']
            document.getElementById('all_datatype').textContent = JSON.stringify(all_datatype)
            target_systems = JSON.parse(document.getElementById('target_systems').textContent)
            showDataTypeTable(target_systems, all_datatype)
            
          }
          else{
            showErrorNotification('The error happend while removing the data type!')
          }
        },
        error: function(){
          showErrorNotification('The error happend while requesting the server')
        }
       })

      
    }
  })

  //show edit modal for the datatype
  $('#system_datatype_table').on('click', '.bi-pencil', function(){
    let selectedId = this.getAttribute('data-id')
    $('#datatype_id').val(selectedId)
    target_systems = JSON.parse(document.getElementById('target_systems').textContent) 
    all_datatype = JSON.parse(document.getElementById('all_datatype').textContent)
    let selectedDatatype = all_datatype.find(element => element.id == selectedId)
    $('#datatype_label').val(selectedDatatype.label)
    $('#datatype_description').val(selectedDatatype.description)
    $('#datatype_comment').val(selectedDatatype.comment)
    // get the matched headers for datatype table
    var columnHeaderMatch = {
      'scada_1': target_systems.find(element => element.label ==='scada_1')? target_systems.find(element => element.label ==='scada_1').value :'',
      'scada_2': target_systems.find(element => element.label ==='scada_2')? target_systems.find(element => element.label ==='scada_2').value :'',
      'scada_3': target_systems.find(element => element.label ==='scada_3')? target_systems.find(element => element.label ==='scada_3').value :'',
      'scada_4': target_systems.find(element => element.label ==='scada_4')? target_systems.find(element => element.label ==='scada_4').value :'',
      'scada_5': target_systems.find(element => element.label ==='scada_5')? target_systems.find(element => element.label ==='scada_5').value :'',
      'control_1': target_systems.find(element => element.label ==='control_1')? target_systems.find(element => element.label ==='control_1').value :'',
      'control_2': target_systems.find(element => element.label ==='control_2')? target_systems.find(element => element.label ==='control_2').value :'',
      'control_3': target_systems.find(element => element.label ==='control_3')? target_systems.find(element => element.label ==='control_3').value :'',
      'control_4': target_systems.find(element => element.label ==='control_4')? target_systems.find(element => element.label ==='control_4').value :'',
      'control_5': target_systems.find(element => element.label ==='control_5')? target_systems.find(element => element.label ==='control_5').value :'',
    }
    // filter the matched headers with not null string headers
    columnHeaderMatch = Object.fromEntries(
      Object.entries(columnHeaderMatch).filter(([key, value]) => value !== '')
    );
    var columnHeadersKeys = Object.keys(columnHeaderMatch)
    var columnHeaders = Object.values(columnHeaderMatch) 
    // initialize the datatype filed on the modal
    let html = ''
    columnHeadersKeys.forEach((element, index) =>{
      html += '<div class="row mt-1"> \
      <label class="col-md-5 col-form-label text-secondary">'+ columnHeaders[index] + ' ('+  element +')' +'</label>\
      <div class="col-md-7">\
        <input type="text" class="form-control" value="'+ selectedDatatype[element] +'" id="datatype_'+ element +'">\
      </div>\
    </div>'
    })
    $('#datatype_field').html(html)
    $('#datatypeModal').modal('show')
  })

  //show add modal for the datatype
  $('#btn_add_datatype').on('click', function(){
    $('#datatype_id').val('')
    target_systems = JSON.parse(document.getElementById('target_systems').textContent) 
    all_datatype = JSON.parse(document.getElementById('all_datatype').textContent)
    
    $('#datatype_label').val('')
    $('#datatype_description').val('')
    $('#datatype_comment').val('')
    // get the matched headers for datatype table
    var columnHeaderMatch = {
      'scada_1': target_systems.find(element => element.label ==='scada_1')? target_systems.find(element => element.label ==='scada_1').value :'',
      'scada_2': target_systems.find(element => element.label ==='scada_2')? target_systems.find(element => element.label ==='scada_2').value :'',
      'scada_3': target_systems.find(element => element.label ==='scada_3')? target_systems.find(element => element.label ==='scada_3').value :'',
      'scada_4': target_systems.find(element => element.label ==='scada_4')? target_systems.find(element => element.label ==='scada_4').value :'',
      'scada_5': target_systems.find(element => element.label ==='scada_5')? target_systems.find(element => element.label ==='scada_5').value :'',
      'control_1': target_systems.find(element => element.label ==='control_1')? target_systems.find(element => element.label ==='control_1').value :'',
      'control_2': target_systems.find(element => element.label ==='control_2')? target_systems.find(element => element.label ==='control_2').value :'',
      'control_3': target_systems.find(element => element.label ==='control_3')? target_systems.find(element => element.label ==='control_3').value :'',
      'control_4': target_systems.find(element => element.label ==='control_4')? target_systems.find(element => element.label ==='control_4').value :'',
      'control_5': target_systems.find(element => element.label ==='control_5')? target_systems.find(element => element.label ==='control_5').value :'',
    }
    // filter the matched headers with not null string headers
    columnHeaderMatch = Object.fromEntries(
      Object.entries(columnHeaderMatch).filter(([key, value]) => value !== '')
    );
    var columnHeadersKeys = Object.keys(columnHeaderMatch)
    var columnHeaders = Object.values(columnHeaderMatch) 
    let html = ''
    // initialize the datatype filed on the modal
    columnHeadersKeys.forEach((element, index) =>{
      html += '<div class="row mt-1"> \
      <label class="col-md-5 col-form-label text-secondary">'+ columnHeaders[index] + ' ('+  element +')' +'</label>\
      <div class="col-md-7">\
        <input type="text" class="form-control" value="" id="datatype_'+ element +'">\
      </div>\
    </div>'
    })
    $('#datatype_field').html(html)
    $('#datatypeModal').modal('show')
  })

  // click save the datatype on the modal
  $('#datatypeModal .btn-primary').on('click', function(){
    let selectedId = $('#datatype_id').val()
    let label = $('#datatype_label').val()
    if(label){
      let description = $('#datatype_description').val()
      let comment = $('#datatype_comment').val()
      
      let control_1 = select('#datatype_control_1')? $('#datatype_control_1').val(): ''
      let control_2 =  select('#datatype_control_2')? $('#datatype_control_2').val(): ''
      let control_3 =  select('#datatype_control_3')? $('#datatype_control_3').val(): ''
      let control_4 =  select('#datatype_control_4')? $('#datatype_control_4').val(): ''
      let control_5 =  select('#datatype_control_5')? $('#datatype_control_5').val(): ''
      let scada_1 = select('#datatype_scada_1')? $('#datatype_scada_1').val(): ''
      let scada_2 = select('#datatype_scada_2')? $('#datatype_scada_2').val(): ''
      let scada_3 = select('#datatype_scada_3')? $('#datatype_scada_3').val(): ''
      let scada_4 = select('#datatype_scada_4')? $('#datatype_scada_4').val(): ''
      let scada_5 = select('#datatype_scada_5')? $('#datatype_scada_5').val(): ''
      if(selectedId){
        // update the datatype
        $.ajax({
          type: "GET",
          url: 'updateDataTypeDetail',
          data: {       
            id: selectedId,
            label: label,
            description: description,
            comment: comment,
            control_1: control_1,
            control_2: control_2,
            control_3: control_3,
            control_4: control_4,
            control_5: control_5,
            scada_1: scada_1,
            scada_2: scada_2,
            scada_3: scada_3,
            scada_4: scada_4,
            scada_5: scada_5,
          },
          success: function (data){
            data = JSON.parse(data)
            var result = data['result']
            if(result){
              showSuccessNotification('The datatype has been updated successfully!')
              all_datatype = data['all_datatype']
              document.getElementById('all_datatype').textContent = JSON.stringify(all_datatype)
              target_systems = JSON.parse(document.getElementById('target_systems').textContent)
              showDataTypeTable(target_systems, all_datatype)
              $('#datatypeModal').modal('hide')
            }
            else{
              showErrorNotification('The error happend while updating the data type!')
            }
          },
          error: function(){
            showErrorNotification('The error happend while requesting the server')
          }
         })
      }else{
        // add the datatype
        $.ajax({
          type: "GET",
          url: 'addDataType',
          data: {       
            label: label,
            description: description,
            comment: comment,
            control_1: control_1,
            control_2: control_2,
            control_3: control_3,
            control_4: control_4,
            control_5: control_5,
            scada_1: scada_1,
            scada_2: scada_2,
            scada_3: scada_3,
            scada_4: scada_4,
            scada_5: scada_5,
          },
          success: function (data){
            data = JSON.parse(data)
            var result = data['result']
            if(result){
              showSuccessNotification('The new datatype has been added successfully!')
              all_datatype = data['all_datatype']
              document.getElementById('all_datatype').textContent = JSON.stringify(all_datatype)
              target_systems = JSON.parse(document.getElementById('target_systems').textContent)
              showDataTypeTable(target_systems, all_datatype)
              $('#datatypeModal').modal('hide')
            }
            else{
              showErrorNotification('The error happend while updating the data type!')
            }
          },
          error: function(){
            showErrorNotification('The error happend while requesting the server')
          }
         })
      }
    }else{
      showErrorNotification('The label should not be empty string.')
    }
    
  })

  // add authority from the modal
  $('#authorityModal .btn-primary').on('click', function(){
    let label = $('#adding_auth_label').val()
    let description = $('#adding_auth_description').val()
    let comment = $('#adding_auth_comment').val()
    if(label && description){
      $.ajax({
        type: "GET",
        url: 'addAuthority',
        data: {
          label: label,
          description: description,
          comment: comment
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          
          if(result){
            showSuccessNotification('The authority has been added successfully!')
            $('#authorityModal').modal('hide')
            let all_authority = data['all_authority']
            document.getElementById('all_authority').textContent = JSON.stringify(all_authority)
            if(all_authority.length){
              let tableData = []
              all_authority.forEach(element => {
                   tableData.push({
                    'id': element.authority_id,
                    'label': element.authority_label ,
                    'description': element.authority_description,
                    'comment': element.authority_comment,
                   })
                })

                $('#authority_table').DataTable({
                  data:  tableData ,
                  destroy: true,
                  columns: [
                    { data: 'id' },
                    { data: 'label' },
                    { data: 'description' },
                    { data: 'comment' },
                  ],
                  columnDefs: [
                    {
                      targets: [0], 
                      visible: false 
                    }
                  ]
                })
            }
          }
          else{
            showErrorNotification('The error happend while adding the authority detail!')
          }
        },
        error: function(e){
          showErrorNotification('The error happend while requesting the server')
        }
      })
    }else{
      showErrorNotification('Label and description should not be empty string.')
    }
  })

  //remove authority
  $('#btn_authority_delete').on('click', function(){
    let id = $('#authority_id').val()
    if(id){
      $.ajax({
        type: "GET",
        url: 'removeAuthorityDetail',
        data: {
          id: id
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          
          if(result){
            showSuccessNotification('The authority has been removed successfully!')
          
            let all_authority = data['all_authority']
            document.getElementById('all_authority').textContent = JSON.stringify(all_authority)
            $('#authority_id').val('')
            if(all_authority.length){
              let tableData = []
              all_authority.forEach(element => {
                   tableData.push({
                    'id': element.authority_id,
                    'label': element.authority_label ,
                    'description': element.authority_description,
                    'comment': element.authority_comment,
                   })
                })

                $('#authority_table').DataTable({
                  data:  tableData ,
                  destroy: true,
                  columns: [
                    { data: 'id' },
                    { data: 'label' },
                    { data: 'description' },
                    { data: 'comment' },
                  ],
                  columnDefs: [
                    {
                      targets: [0], 
                      visible: false 
                    }
                  ]
                })
            }
          }
          else{
            showErrorNotification('The error happend while removing the authority detail!')
          }
        },
        error: function(e){
          showErrorNotification('The error happend while requesting the server')
        }
      })
    }else{
      showErrorNotification('You should select the authority to be removed.')
    }
  })

  // update state by changing authority label  event
  $('#possible_state_table').on('change', 'select', function(){
    
    let selectedStateId = this.getAttribute('data-id')
    var authId = $(this).val()
    var all_possible_state = JSON.parse(document.getElementById('all_possible_state').textContent)
    let selectedState = all_possible_state.find(element => element.state_id == selectedStateId)
    let label = selectedState.state_label
    let description =  selectedState.state_description
    let equipment_state =  selectedState.valid_for_equipment
    let connection_state =  selectedState.valid_for_connection
    let comment =  selectedState.state_comment

    $.ajax({
      type: "GET",
      url: 'updateStateDetail',
      data: {
        id: selectedStateId,
        label: label,
        description: description,
        comment: comment,
        equipmentState: equipment_state,
        connectionState: connection_state,
        authId: authId,
      },
      success: function (data){
        data = JSON.parse(data)
        var result = data['result']
        
        if(result){
          showSuccessNotification('The state has been updated successfully!')
          let all_possible_state = data['all_possible_state']
          let all_authority = JSON.parse(document.getElementById('all_authority').textContent )
          document.getElementById('all_possible_state').textContent = JSON.stringify(all_possible_state)
          if(all_possible_state.length){
            let tableData = []
            all_possible_state.forEach(element => {
              tableData.push({
               'id': element.state_id,
               'label': element.state_label ,
               'description': element.state_description,              
               'equipment_state': element.valid_for_equipment,
               'connection_state': element.valid_for_connection,
               'comment': element.state_comment,
               'authority_label': element.authority_label
              })
           })

           $('#possible_state_table').DataTable({
             data:  tableData ,
             destroy: true,
             columns: [
               { data: 'id' },
               { data: 'label' },
               { data: 'description' },
               { data: 'equipment_state'},
               { data: 'connection_state'},
               { data: 'comment'},
               { 
                 data: 'authority_label' ,
                 render: function (data, type, rowData){
                   var selectOptions = all_authority.map(option => {
                     if(option.authority_label === data){
                         return  `<option value="${option.authority_id}" selected>${option.authority_label}</option>`
                     }
                     else{
                         return  `<option value="${option.authority_id}">${option.authority_label}</option>`
                     }
                   }
                   ).join('');
                   return `<select data-id="`+ rowData.id +`"style="width: 100%">${selectOptions}</select>`;
                 
                 }
               },
               
             ],
             columnDefs: [
               {
                 targets: [0], 
                 visible: false 
               }
             ]
           }
           )

          }
        }
        else{
          showErrorNotification('The error happend while updating the state detail!')
        }
      },
      error: function(e){
        showErrorNotification('The error happend while requesting the server')
      }
    })

  })

  // show add state modal
  $('#add_state_btn').on('click', function(){
    $("#state_auth_label").find('option').remove();
    let all_authority = JSON.parse(document.getElementById('all_authority').textContent)    
    all_authority.forEach(element => {
      
      var o = new Option(element.authority_label, element.authority_id, undefined, undefined);
      $(o).html(element.authority_label);
      $("#state_auth_label").append(o);
    })
  })

  // add state from the modal
  $('#stateModal .btn-primary').on('click', function(){
    let label = $('#state_label').val()
    let description = $('#state_description').val()
    let equipmentState = $('#state_equipment_state').prop('checked')
    let connectionState = $('#state_connection_state').prop('checked')
    let comment = $('#state_comment').val()
    let authId = $('#state_auth_label').val()
    if(label && description){
      $.ajax({
        type: "GET",
        url: 'addState',
        data: {
          label: label,
          description: description,
          comment: comment,
          equipmentState: equipmentState,
          connectionState: connectionState,
          authId: authId,
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          
          if(result){
            showSuccessNotification('The state has been added successfully!')
            $('#stateModal').modal('hide')
            let all_possible_state = data['all_possible_state']
            let all_authority = JSON.parse(document.getElementById('all_authority').textContent )
            document.getElementById('all_possible_state').textContent = JSON.stringify(all_possible_state)
            if(all_possible_state.length){
              let tableData = []
              all_possible_state.forEach(element => {
                tableData.push({
                 'id': element.state_id,
                 'label': element.state_label ,
                 'description': element.state_description,              
                 'equipment_state': element.valid_for_equipment,
                 'connection_state': element.valid_for_connection,
                 'comment': element.state_comment,
                 'authority_label': element.authority_label
                })
             })
  
             $('#possible_state_table').DataTable({
               data:  tableData ,
               destroy: true,
               columns: [
                 { data: 'id' },
                 { data: 'label' },
                 { data: 'description' },
                 { data: 'equipment_state'},
                 { data: 'connection_state'},
                 { data: 'comment'},
                 { 
                   data: 'authority_label' ,
                   render: function (data, type, rowData){
                     var selectOptions = all_authority.map(option => {
                       if(option.authority_label === data){
                           return  `<option value="${option.authority_id}" selected>${option.authority_label}</option>`
                       }
                       else{
                           return  `<option value="${option.authority_id}">${option.authority_label}</option>`
                       }
                     }
                     ).join('');
                     return `<select data-id="`+ rowData.id +`"style="width: 100%">${selectOptions}</select>`;
                   }
                 },                 
               ],
               columnDefs: [
                 {
                   targets: [0], 
                   visible: false 
                 }
               ]
             }
             )
  
            }
          }
          else{
            showErrorNotification('The error happend while adding the state detail!')
          }
        },
        error: function(e){
          showErrorNotification('The error happend while requesting the server')
        }
      })
    }
    else{
      showErrorNotification('The label and description should not be empty string.')
    }
  })
 //remove state 
  $('#btn_possible_state_delete').on('click', function(){
    let selectedStateId = $('#state_id').val()
    if(selectedStateId){
      $.ajax({
        type: "GET",
        url: 'removeStateDetail',
        data: {
          id: selectedStateId
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          
          if(result){
            showSuccessNotification('The state has been removed successfully!')
            $('#state_id').val('')
            let all_possible_state = data['all_possible_state']
            let all_authority = JSON.parse(document.getElementById('all_authority').textContent )
            document.getElementById('all_possible_state').textContent = JSON.stringify(all_possible_state)
            if(all_possible_state.length){
              let tableData = []
              all_possible_state.forEach(element => {
                tableData.push({
                 'id': element.state_id,
                 'label': element.state_label ,
                 'description': element.state_description,              
                 'equipment_state': element.valid_for_equipment,
                 'connection_state': element.valid_for_connection,
                 'comment': element.state_comment,
                 'authority_label': element.authority_label
                })
             })
  
             $('#possible_state_table').DataTable({
               data:  tableData ,
               destroy: true,
               columns: [
                 { data: 'id' },
                 { data: 'label' },
                 { data: 'description' },
                 { data: 'equipment_state'},
                 { data: 'connection_state'},
                 { data: 'comment'},
                 { 
                   data: 'authority_label' ,
                   render: function (data, type, rowData){
                     var selectOptions = all_authority.map(option => {
                       if(option.authority_label === data){
                           return  `<option value="${option.authority_id}" selected>${option.authority_label}</option>`
                       }
                       else{
                           return  `<option value="${option.authority_id}">${option.authority_label}</option>`
                       }
                     }
                     ).join('');
                     return `<select data-id="`+ rowData.id +`"style="width: 100%">${selectOptions}</select>`;
                   }
                 },                 
               ],
               columnDefs: [
                 {
                   targets: [0], 
                   visible: false 
                 }
               ]
             }
             )
  
            }
          }
          else{
            showErrorNotification('The error happend while removing the state detail!')
          }
        },
        error: function(e){
          showErrorNotification('The error happend while requesting the server')
        }
      })
    }else{
      showErrorNotification('You should select the state to be removed')
    }
  })
} )
();

