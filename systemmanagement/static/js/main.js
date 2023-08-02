/**
* Template Name: NiceAdmin
* Updated: Mar 09 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
// Treeview Initialization
$(document).ready(function() {
  $('.treeview-animated').mdbTreeview();
  $('#version').html('1.0.31 (31/07/2023)')

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
              $.toast({
                heading: 'Error',
                text: 'Due Date format error! You should input the date as YYYY-MM-DD.',
                icon: 'error',              
                bgColor : '#red',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
              return
            }
            p_leadtime = cell.leadtime
            if(p_leadtime == '' || p_leadtime ==  null) p_leadtime = 0
            if(!validateNumber(p_leadtime)){
              $.toast({
                heading: 'Error',
                text: 'Leadtime(Days) format error! You should input the date as the number',
                icon: 'error',              
                bgColor : '#red',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
              return
            }
            p_po_date = cell.po_date
            if(p_po_date == null) p_po_date = ""
            if(!isValidDateFormat(p_po_date)){
              $.toast({
                heading: 'Error',
                text: 'Po Date format error! You should input the date as YYYY-MM-DD.',
                icon: 'error',              
                bgColor : '#red',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
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
                  $.toast({
                    heading: 'Success',
                    text: 'The purchased equipment has been  removed successfully!',
                    icon: 'info',              
                    bgColor : '#2cc947',  
                    showHideTransition : 'slide',
                    position : 'top-right'
                  })
                }
                else{
                  $.toast({
                    heading: 'Error',
                    text: 'The error happend while updating the purchased equipment!',
                    icon: 'error',              
                    bgColor : '#red',  
                    showHideTransition : 'slide',
                    position : 'top-right'
                  })
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
                $.toast({
                  heading: 'Error',
                  text: 'Due Date format error! You should input the date as YYYY-MM-DD.',
                  icon: 'error',              
                  bgColor : '#red',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })
                return
              }
              p_leadtime = cell.leadtime
              if(p_leadtime == '' || p_leadtime ==  null) p_leadtime = 0
              if(!validateNumber(p_leadtime)){
                $.toast({
                  heading: 'Error',
                  text: 'Leadtime(Days) format error! You should input the date as the number',
                  icon: 'error',              
                  bgColor : '#red',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })
                return
              }
              p_po_date = cell.po_date
              if(p_po_date == null) p_po_date = ""
              if(!isValidDateFormat(p_po_date)){
                $.toast({
                  heading: 'Error',
                  text: 'Po Date format error! You should input the date as YYYY-MM-DD.',
                  icon: 'error',              
                  bgColor : '#red',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })
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
                    $.toast({
                      heading: 'Success',
                      text: 'The purchased connection has been  removed successfully!',
                      icon: 'info',              
                      bgColor : '#2cc947',  
                      showHideTransition : 'slide',
                      position : 'top-right'
                    })
                  }
                  else{
                    $.toast({
                      heading: 'Error',
                      text: 'The error happend while updating the purchased connection!',
                      icon: 'error',              
                      bgColor : '#red',  
                      showHideTransition : 'slide',
                      position : 'top-right'
                    })
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
                $.toast({
                  heading: 'Error',
                  text: 'Due Date format error! You should input the date as YYYY-MM-DD.',
                  icon: 'error',              
                  bgColor : '#red',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })
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
                $.toast({
                  heading: 'Error',
                  text: 'Received Date format error! You should input the date as YYYY-MM-DD.',
                  icon: 'error',              
                  bgColor : '#red',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })
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
                    $.toast({
                      heading: 'Success',
                      text: 'The purchased equipment has been  removed successfully!',
                      icon: 'info',              
                      bgColor : '#2cc947',  
                      showHideTransition : 'slide',
                      position : 'top-right'
                    })
                  }
                  else{
                    $.toast({
                      heading: 'Error',
                      text: 'The error happend while updating the purchased equipment!',
                      icon: 'error',              
                      bgColor : '#red',  
                      showHideTransition : 'slide',
                      position : 'top-right'
                    })
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
              $.toast({
                heading: 'Error',
                text: 'Due Date format error! You should input the date as YYYY-MM-DD.',
                icon: 'error',              
                bgColor : '#red',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
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
              $.toast({
                heading: 'Error',
                text: 'Received Date format error! You should input the date as YYYY-MM-DD.',
                icon: 'error',              
                bgColor : '#red',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
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
                  $.toast({
                    heading: 'Success',
                    text: 'The purchased connection has been  removed successfully!',
                    icon: 'info',              
                    bgColor : '#2cc947',  
                    showHideTransition : 'slide',
                    position : 'top-right'
                  })
                }
                else{
                  $.toast({
                    heading: 'Error',
                    text: 'The error happend while updating the purchased connection!',
                    icon: 'error',              
                    bgColor : '#red',  
                    showHideTransition : 'slide',
                    position : 'top-right'
                  })
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
            $.toast({
              heading: 'Success',
              text: 'The equipment commercial information has been updated  successfully!',
              icon: 'info',              
              bgColor : '#2cc947',  
              showHideTransition : 'slide',
              position : 'top-right'
            })
            $('#equipmentStateModal').modal('hide')
          }else{
            $.toast({
              heading: 'Error',
              text: 'Error while updating the equipment commercail date',
              icon: 'error',              
              bgColor : 'red',  
              showHideTransition : 'slide',
              position : 'top-right'
            })
          }
          
        },
        error: function(){
          $.toast({
            heading: 'Error',
            text: 'Error while requesting the equipment commercail date',
            icon: 'error',              
            bgColor : 'red',  
            showHideTransition : 'slide',
            position : 'top-right'
          })
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
            $.toast({
              heading: 'Success',
              text: 'The connection commercial information has been updated  successfully!',
              icon: 'info',              
              bgColor : '#2cc947',  
              showHideTransition : 'slide',
              position : 'top-right'
            })
            $('#connectionStateModal').modal('hide')
          }else{
            $.toast({
              heading: 'Error',
              text: 'Error while updating the connection commercail date',
              icon: 'error',              
              bgColor : 'red',  
              showHideTransition : 'slide',
              position : 'top-right'
            })
          }
          
        },
        error: function(){
          $.toast({
            heading: 'Error',
            text: 'Error while requesting the connection commercail date',
            icon: 'error',              
            bgColor : 'red',  
            showHideTransition : 'slide',
            position : 'top-right'
          })
        }
      })
    })

    if(document.getElementById('system_parameters')){
  
      var system_parameters = JSON.parse(document.getElementById('system_parameters').textContent)
      
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
              $.toast({
                heading: 'Error',
                text: "The label can't be empty string",
                icon: 'error',              
                bgColor : '#red',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
              return
            }
            p_value = cell.value
            if(p_value == ""){
              $.toast({
                heading: 'Error',
                text: "The value can't be empty string",
                icon: 'error',              
                bgColor : '#red',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
              return
            }
            p_comment = cell.comment
          
            $.ajax({
              type: "GET",
              url: 'updateSystemParameters',
              data: {
                p_id: p_id,
                p_label: p_label,
                p_value: p_value,
                p_comment: p_comment,
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']
                
                if(result){
                  $.toast({
                    heading: 'Success',
                    text: 'The system parameter has been  updated successfully!',
                    icon: 'info',              
                    bgColor : '#2cc947',  
                    showHideTransition : 'slide',
                    position : 'top-right'
                  })
                  
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
                  $.toast({
                    heading: 'Error',
                    text: 'The error happend while updating the system parameters!',
                    icon: 'error',              
                    bgColor : '#red',  
                    showHideTransition : 'slide',
                    position : 'top-right'
                  })
                }
              },
              error: function(e){
                
                $.toast({
                  heading: 'Error',
                  text: 'The error happend while requesting the server',
                  icon: 'error',              
                  bgColor : '#red',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })
              }
            })
          });

      }
    }

    // add system parameter in the modal
    $('#systemParamerterModal .btn-primary').on('click', function(){
       var label = $('#adding_systemParamerter_label').val()
       if(label == ""){
        $.toast({
          heading: 'Error',
          text: "The label can't be empty string",
          icon: 'error',              
          bgColor : '#red',  
          showHideTransition : 'slide',
          position : 'top-right'
        })
        return
       }

       var value = $('#adding_systemParamerter_value').val()
       if(value == ""){
        $.toast({
          heading: 'Error',
          text: "The value can't be empty string",
          icon: 'error',              
          bgColor : '#red',  
          showHideTransition : 'slide',
          position : 'top-right'
        })
        return
       }

       var comment =  $('#adding_systemParamerter_comment').val()

       $.ajax({
        type: "GET",
        url: 'addSystemParameters',
        data: {
          
          p_label: label,
          p_value: value,
          p_comment: comment,
        },
        success: function (data){
          data = JSON.parse(data)
          var result = data['result']
          
          if(result){
            $.toast({
              heading: 'Success',
              text: 'The system parameter has been  added successfully!',
              icon: 'info',              
              bgColor : '#2cc947',  
              showHideTransition : 'slide',
              position : 'top-right'
            })
            
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

            $('#systemParamerterModal').modal('hide')

          }
          else{
            $.toast({
              heading: 'Error',
              text: 'The error happend while adding the system parameters!',
              icon: 'error',              
              bgColor : '#red',  
              showHideTransition : 'slide',
              position : 'top-right'
            })
          }
        },
        error: function(e){
          
          $.toast({
            heading: 'Error',
            text: 'The error happend while requesting the server',
            icon: 'error',              
            bgColor : '#red',  
            showHideTransition : 'slide',
            position : 'top-right'
          })
        }
      })


    })

    // remove system paramter from the table
    $('#system_paramter_table').on('click', '.bi-trash', function(){

      if(confirm('Are you sure to remove this system parameter?')){
        selectedPId = this.getAttribute('data-id')
        $.ajax({
          type: "GET",
          url: 'removeSystemParameters',
          data: {
            selectedPId: selectedPId,
          },
          success: function (data){
            data = JSON.parse(data)
            var result = data['result']
            
            if(result){
              $.toast({
                heading: 'Success',
                text: 'The system parameter has been  removed successfully!',
                icon: 'info',              
                bgColor : '#2cc947',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
              
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
              $.toast({
                heading: 'Error',
                text: 'The error happend while removing the system parameters!',
                icon: 'error',              
                bgColor : '#red',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
            }
          },
          error: function(e){
            
            $.toast({
              heading: 'Error',
              text: 'The error happend while requesting the server',
              icon: 'error',              
              bgColor : '#red',  
              showHideTransition : 'slide',
              position : 'top-right'
            })
          }
        })
      }
    })

    if(document.getElementById('target_systems')){
      target_systems = JSON.parse(document.getElementById('target_systems').textContent)
      all_datatype = JSON.parse(document.getElementById('all_datatype').textContent)
    
      if(target_systems.length){
        target_systems.forEach(element => {
              tableData.push({
              'label': element.label ,
              'description': element.value,
              'comment' : element.comment,
         
              })
          })
     
          $('#target_systems_table').DataTable({
            data:  tableData ,
            destroy: true,
            autoWidth: false,
            columns: [
              { data: 'label' },
              { data: 'description' },
              { data: 'comment' },
            
            ]}
          )

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

          columnHeaderMatch = Object.fromEntries(
            Object.entries(columnHeaderMatch).filter(([key, value]) => value !== '')
          );
          
          
          var columnHeadersKeys = Object.keys(columnHeaderMatch)
          var columnHeaders = Object.values(columnHeaderMatch)      
         
          
          var html = '<thead style="background-color: #000; color: white; border: solid 1px;"><tr class="text-center">'
          html += '<th>Label</th><th>Description</th>'
          columnHeaders.forEach(element =>{
            html += '<th scope="col" class="text-center">'+ element +'</th>'
          })
          html += '<th>Comment</th>'
                    
          html += '</tr></thead><tbody><tr style="border: solid 1px">'
          html += '<td></td><td></td>'
          columnHeaders.forEach(element =>{
            html += '<td></td>'
          })
          html += '<td></td>'
          html += '</tr></tbody>'
            
          $('#system_datatype_table').html(html)

          
          if(all_datatype.length){
            html = '<tr>'
            all_datatype.forEach(element => {
              html += '<td>'+ element.label +'</td>'
              html += '<td>'+ element.description +'</td>'
              columnHeadersKeys.forEach(headerkey => {
                html += '<td>'+ element[headerkey] +'</td>'
              })
              html += '<td>'+ element.comment +'</td></tr>'

            })
            $('#system_datatype_table tbody').html(html)
          }else{
            var html  = 'No data'
            $('#system_datatype_table tbody').html(html)
          }


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
              'comment': element.authority_comment,
              'equipment_state': element.valid_for_equipment,
              'connection_state': element.valid_for_connection,
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
              { 
                data: 'authority_label' ,
                render: function (data){
                  var selectOptions = all_authority.map(option => {
                    if(option.authority_label === data){
                        return  `<option value="${option.authority_label}" selected>${option.authority_label}</option>`
                    }
                    else{
                        return  `<option value="${option.authority_label}">${option.authority_label}</option>`
                    }
                  }
                  ).join('');
                  return `<select style="width: 100%">${selectOptions}</select>`;
                
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
      }else{
        html = 'No data'
        $('#possible_state_table tbody').html(html)
      }
    }
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

  // remove equipment
  if(select('#btn_equipment_delete')){
    on('click','#btn_equipment_delete' , function(){
      var selectedEquipmentId = $('#equipment_id').val()
      if(selectedEquipmentId){
        
        if(confirm('Are you sure to remove the equipment?')){
          $.ajax({
            type: "GET",
            url: 'removeEquipment',
            data: {
              equipment_id: selectedEquipmentId    
            },
            success: function (data){
              data = JSON.parse(data)
              var result = data['result']
              var equipment_list = data['equipment_list']
              if(result){

                $.toast({
                  heading: 'Success',
                  text: 'The equipment has been  removed successfully!',
                  icon: 'info',              
                  bgColor : '#2cc947',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })

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

                if(equipment_list){
                  const html = createEquipmentTree(equipment_list)
                  document.getElementById('all_equipment_tree').innerHTML = html
                  $('.treeview-animated').mdbTreeview();
                }
  
              }
              else{
                $.toast({
                  heading: 'Error',
                  text: 'The error happend while removing the equipment!',
                  icon: 'error',              
                  bgColor : '#red',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })
              }
            }
           })
        }
      }else{
        $.toast({
          heading: 'Error',
          text: 'You need to select the equipment!',
          icon: 'error',              
          bgColor : '#red',  
          showHideTransition : 'slide',
          position : 'top-right'
        })
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
          $.toast({
            heading: 'Error',
            text: 'You have to select the equipment to be same!',
            icon: 'error',              
            bgColor : '#red',  
            showHideTransition : 'slide',
            position : 'top-right'
          })
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

            element_equipment_path = element.equipment_path.join('.')
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
          $.toast({
            heading: 'Error',
            text: 'You have to select the equipment to be same!',
            icon: 'error',              
            bgColor : '#red',  
            showHideTransition : 'slide',
            position : 'top-right'
          })
       }
    })
  }

  // add euqipment in the modal
  if(select('#equipmentModal .btn-primary'))
  {
    on('click', '#equipmentModal .btn-primary', function(){
      var addingEquipmentIdentifier = $('#adding_equipment_identifier').val()
      // console.log(addingEquipmentIdentifier)
      if(addingEquipmentIdentifier){
        if(confirm('Are you sure to add this equpment?')){
            var addingEquipmentDescription = $('#adding_equipment_description').val()
            var addingEquipmentParentPath = $('#adding_parent_path').val()
            addingEquipmentParentPath =  addingEquipmentParentPath.replaceAll(',', '.')
            var addingEquipmentLocationPath = $('#adding_location_path').val()
            addingEquipmentLocationPath = addingEquipmentLocationPath.replaceAll(',', '.')
            var addingEquipmentIncludeParentFlag = $('#adding_equipment_use_parent_identifier').prop('checked')
            var addingEquipmentTypeId = $('#adding_equipment_type').val()
            var addingEquipmentComment = $('#adding_equipment_comment').val()
            var addingEquipmentApproved = $('#adding_equipment_approved').prop('checked')
            // console.log(addingEquipmentDescription, addingEquipmentParentPath , addingEquipmentLocationPath, addingEquipmentIncludeParentFlag, addingEquipmentTypeId, addingEquipmentComment,  addingEquipmentApproved)

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
                equipment_is_approved: addingEquipmentApproved          
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']
                var equipment_list = data['equipment_list']
                if(result){

                  $.toast({
                    heading: 'Success',
                    text: 'The equipment has been inserted successfully!',
                    icon: 'info',              
                    bgColor : '#2cc947',  
                    showHideTransition : 'slide',
                    position : 'top-right'
                  })

                  $('#adding_equipment_identifier').val('')
                  $('#adding_equipment_description').val('')
                  $('#adding_parent_path').find('option').remove()
                  $('#adding_location_path').find('option').remove()
                  $('#adding_equipment_use_parent_identifier').prop('checked', false)
                  $('#adding_equipment_type').find('option').remove()
                  $('#adding_equipment_comment').val('')
                  $('#adding_equipment_approved').prop('checked', false)

                  $("#equipmentModal").modal('hide');

                  if(equipment_list){
                    const html = createEquipmentTree(equipment_list)
                    document.getElementById('all_equipment_tree').innerHTML = html
                    $('.treeview-animated').mdbTreeview();
                  }
    
                }
                else{
                  $.toast({
                    heading: 'Error',
                    text: 'The error has happend while adding the equipment',
                    icon: 'error',              
                    bgColor : '#red',  
                    showHideTransition : 'slide',
                    position : 'top-right'
                  })
                }
              }
            })
        }
        
      }else{
        $.toast({
          heading: 'Error',
          text: 'You have to put the new equipment identifier.',
          icon: 'error',              
          bgColor : '#red',  
          showHideTransition : 'slide',
          position : 'top-right'
        })
        
      }
      
    })
  }
 
  // update equipment
  if(select('.equipment_page #commit'))
  {
    on('click', '.equipment_page #commit', function(){
      var equipment_id = $('#equipment_id').val()
      if(equipment_id){
        if(confirm('Are you sure to update this equipment?')){
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
             equipment_is_approved: equipment_is_approved          
           },
           success: function (data){
             data = JSON.parse(data)
             var result = data['result']
             var equipment_list = data['equipment_list']
             if(result){
               $.toast({
                 heading: 'Success',
                 text: 'The equipment has been updated successfully!',
                 icon: 'info',              
                 bgColor : '#2cc947',  
                 showHideTransition : 'slide',
                 position : 'top-right'
               })
 
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
              
                $.toast({
                  heading: 'Error',
                  text: 'The error has happend while updating the equipment information',
                  icon: 'error',              
                  bgColor : '#red',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })
              
             }
           }
          })
 
       }
      }else{
        $.toast({
          heading: 'Error',
          text: 'You have to select the equipment to be updated!',
          icon: 'error',              
          bgColor : '#red',  
          showHideTransition : 'slide',
          position : 'top-right'
        })
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
            $.toast({
              heading: 'Success',
              text: 'The value has been updated successfully!',
              icon: 'info',              
              bgColor : '#2cc947',  
              showHideTransition : 'slide',
              position : 'top-right'
            })
          }else{
            $.toast({
              heading: 'Error',
              text: 'The error has happend while saving the information',
              icon: 'error',              
              bgColor : '#red',  
              showHideTransition : 'slide',
              position : 'top-right'
            })
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
        if(confirm('Are you sure to update this connection?')){
          
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
           },
           success: function (data)
           {
             data = JSON.parse(data)
             var result = data['result']
             var connection_list = data['connection_list']
             if(result){
               $.toast({
                 heading: 'Success',
                 text: 'The connection has been updated successfully!',
                 icon: 'info',              
                 bgColor : '#2cc947',  
                 showHideTransition : 'slide',
                 position : 'top-right'
               })
 
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
              $.toast({
                heading: 'Error',
                text: 'The error happend while updating the connection!',
                icon: 'error',              
                bgColor : '#red',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
            }
           }
          })
 
       }
       }
       else{
        $.toast({
          heading: 'Error',
          text: 'You have to select the connection to be updated!',
          icon: 'error',              
          bgColor : '#red',  
          showHideTransition : 'slide',
          position : 'top-right'
        })
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
          $.toast({
            heading: 'Error',
            text: 'You have to select the connection to be same!',
            icon: 'error',              
            bgColor : '#red',  
            showHideTransition : 'slide',
            position : 'top-right'
          })
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
          $.toast({
            heading: 'Error',
            text: 'You have to select the connection to be child!',
            icon: 'error',              
            bgColor : '#red',  
            showHideTransition : 'slide',
            position : 'top-right'
          })
       }
    })
  }
  // add connection in the modal
  if(select('#connectionModal .btn-primary'))
  {
    on('click', '#connectionModal .btn-primary', function(){
      var addingConnectionIdentifier = $('#adding_connection_identifier').val()
      
      if(addingConnectionIdentifier){
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
            // console.log(addingEquipmentDescription, addingEquipmentParentPath , addingEquipmentLocationPath, addingEquipmentIncludeParentFlag, addingEquipmentTypeId, addingEquipmentComment,  addingEquipmentApproved)

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
                connection_is_approved: addingConnectionApproved          
              },
              success: function (data){
                data = JSON.parse(data)
                var result = data['result']
                var connection_list = data['connection_list']
                if(result){

                  $.toast({
                    heading: 'Success',
                    text: 'The connection has been inserted successfully!',
                    icon: 'info',              
                    bgColor : '#2cc947',  
                    showHideTransition : 'slide',
                    position : 'top-right'
                  })

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

                  $("#connectionModal").modal('hide');

                  if(connection_list){
                    const html = createConnectionTree(connection_list)
                    document.getElementById('all_connection_tree').innerHTML = html
                    $('.treeview-animated').mdbTreeview();
                  }
    
                }
                else{
                  $.toast({
                    heading: 'Error',
                    text: 'The error happend while adding the connection!',
                    icon: 'error',              
                    bgColor : '#red',  
                    showHideTransition : 'slide',
                    position : 'top-right'
                  })
                }
              }
            })
        }
        
      }else{
        $.toast({
          heading: 'Error',
          text: 'You have to put the new connection identifier.',
          icon: 'error',              
          bgColor : '#red',  
          showHideTransition : 'slide',
          position : 'top-right'
        })
        
      }
      
    })
  }

  //remove connection
  if(select('#btn_connection_delete')){
    on('click','#btn_connection_delete' , function(){
      var selectedConnectionId = $('#connection_id').val()
      if(selectedConnectionId){
        
        if(confirm('Are you sure to remove this connection?')){
          $.ajax({
            type: "GET",
            url: 'removeConnection',
            data: {
              connection_id: selectedConnectionId    
            },
            success: function (data){
              data = JSON.parse(data)
              var result = data['result']
              var connection_list = data['connection_list']
              if(result){

                $.toast({
                  heading: 'Success',
                  text: 'The connection has been removed successfully!',
                  icon: 'info',              
                  bgColor : '#2cc947',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })

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

                if(connection_list){
                  const html = createConnectionTree(connection_list)
                  document.getElementById('all_connection_tree').innerHTML = html
                  $('.treeview-animated').mdbTreeview();
                }
  
              }
              else{
                $.toast({
                  heading: 'Error',
                  text: 'The error happend while removing the connection!',
                  icon: 'error',              
                  bgColor : '#red',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })
              }
            }
           })
        }
      }else{
        $.toast({
          heading: 'Error',
          text: 'You need to select the connection!',
          icon: 'error',              
          bgColor : '#red',  
          showHideTransition : 'slide',
          position : 'top-right'
        })
      }
    })
  }

  // update equipment type
  if(select('#equipmentTypeUpdateCommitBtn'))
   {
     on('click', '#equipmentTypeUpdateCommitBtn', function(){
      var equipment_type_id = $('#equipment_type_id').val()  
       if(equipment_type_id){
        if(confirm('Are you sure to update this equipment type?')){
          
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
           },
           success: function (data)
           {
             data = JSON.parse(data)
             var result = data['result']
             var allEquipmentTypes = data['all_equipment_types']
             if(result){
               $.toast({
                 heading: 'Success',
                 text: 'The equipment type has been updated successfully!',
                 icon: 'info',              
                 bgColor : '#2cc947',  
                 showHideTransition : 'slide',
                 position : 'top-right'
               })
 
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
              $.toast({
                heading: 'Error',
                text: 'The error happend while updating the equipment type!',
                icon: 'error',              
                bgColor : '#red',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
            }
           },
           error:function(e){
            $.toast({
              heading: 'Error',
              text: 'The error happened while requesting the server',
              icon: 'error',              
              bgColor : '#red',  
              showHideTransition : 'slide',
              position : 'top-right'
            })
           }
          })
 
       }
       }
       else{
        $.toast({
          heading: 'Error',
          text: 'You have to select the equipment type to be updated!',
          icon: 'error',              
          bgColor : '#red',  
          showHideTransition : 'slide',
          position : 'top-right'
        })
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
          $.toast({
            heading: 'Error',
            text: 'You have to select the equipment type to be same!',
            icon: 'error',              
            bgColor : '#red',  
            showHideTransition : 'slide',
            position : 'top-right'
          })
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
          $.toast({
            heading: 'Error',
            text: 'You have to select the equipment type to be child!',
            icon: 'error',              
            bgColor : '#red',  
            showHideTransition : 'slide',
            position : 'top-right'
          })
       }
    })
  }

   // add euqipment in the modal
   if(select('#equipmentTypeModal .btn-primary'))
   {
     on('click', '#equipmentTypeModal .btn-primary', function(){
       var addingEquipmentTypeLabel = $('#adding_equipment_type_label').val()
       var addingEquipmentTypeDescription = $('#adding_equipment_type_description').val()
    
       if(addingEquipmentTypeLabel != "" && addingEquipmentTypeDescription != ""){
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
                addingEquipmentTypeApproved: addingEquipmentTypeApproved          
               },
               success: function (data){
                 data = JSON.parse(data)
                 var result = data['result']
                 
                 if(result){
 
                   $.toast({
                     heading: 'Success',
                     text: 'The equipment type has been inserted successfully!',
                     icon: 'info',              
                     bgColor : '#2cc947',  
                     showHideTransition : 'slide',
                     position : 'top-right'
                   })
 
                   $('#adding_equipment_type_label').val('')
                   $('#adding_equipment_type_description').val('')
                   $('#adding_equipment_type_parent_path').find('option').remove()
                   $('#adding_equipment_type_modifier').val('')
                   $('#adding_equipment_type_manufacturer').val('')
                   $('#adding_equipment_type_model').val('')
                   $('#adding_equipment_type_comment').val('')
                   $('#adding_equipment_type_approved').prop('checked', false)
 
                   $("#equipmentTypeModal").modal('hide');
 
                   var allEquipmentTypes = data['all_equipment_types']
                   document.getElementById('all_equipment_types').textContent = JSON.stringify(allEquipmentTypes)
                   const html = createEquipmentTypeTree(allEquipmentTypes)
                   document.getElementById('all_equipment_types_tree').innerHTML = html
                   $('.treeview-animated').mdbTreeview();

                 }
                 else{
                   $.toast({
                     heading: 'Error',
                     text: 'The error has happend while adding the equipment type',
                     icon: 'error',              
                     bgColor : '#red',  
                     showHideTransition : 'slide',
                     position : 'top-right'
                   })
                 }
               },
               error: function(e){
                  $.toast({
                    heading: 'Error',
                    text: 'The error has happend while requesting the server',
                    icon: 'error',              
                    bgColor : '#red',  
                    showHideTransition : 'slide',
                    position : 'top-right'
                  })
               }
             })
         }
         
       }else{
         $.toast({
           heading: 'Error',
           text: 'Label and description can not be empty string',
           icon: 'error',              
           bgColor : '#red',  
           showHideTransition : 'slide',
           position : 'top-right'
         })
         
       }
       
     })
   }

   //remove equipment type
  if(select('#btn_equipment_type_delete')){
    on('click','#btn_equipment_type_delete' , function(){
      var selectedEquipmentTypeId = $('#equipment_type_id').val()
      if(selectedEquipmentTypeId){
        
        if(confirm('Are you sure to remove this equipment type?')){
          $.ajax({
            type: "GET",
            url: 'removeEquipmentType',
            data: {
              selectedEquipmentTypeId: selectedEquipmentTypeId    
            },
            success: function (data){
              data = JSON.parse(data)
              var result = data['result']
              var allEquipmentTypes = data['all_equipment_types']
              if(result){

                $.toast({
                  heading: 'Success',
                  text: 'The equipment type has been removed successfully!',
                  icon: 'info',              
                  bgColor : '#2cc947',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })

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
                $.toast({
                  heading: 'Error',
                  text: 'The error happend while removing the euqipment type!',
                  icon: 'error',              
                  bgColor : '#red',  
                  showHideTransition : 'slide',
                  position : 'top-right'
                })
              }
            },
            error: function(e){
              $.toast({
                heading: 'Error',
                text: 'The error happend while requesting the server!',
                icon: 'error',              
                bgColor : '#red',  
                showHideTransition : 'slide',
                position : 'top-right'
              })
            }
           })
        }
      }else{
        $.toast({
          heading: 'Error',
          text: 'You need to select the equipment type to be removed!',
          icon: 'error',              
          bgColor : '#red',  
          showHideTransition : 'slide',
          position : 'top-right'
        })
      }
    })
  }
 
} )
();

