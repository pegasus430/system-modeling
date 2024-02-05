$(document).ready(function() {
    // Treeview Initialization
    
  let gChildEquipments
  let sTable

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

  var stateFunction = function(data) {
    if(data == true)
      return '<span class="bi bi-check" style="font-size: 1.5rem; color: rgb(0, 255, 0);"></span>'
    if(data == false)
      return '<span class="bi bi-x" style="font-size: 1.5rem; color: rgb(255, 0, 0);"></span>'
    else
      return ''
}

  function createEquipmentChildElementTree(data) {
    const nodeWithParent = []
    
    // make the equipment_path as string from list
    data.forEach(element => {
      path = element.equipment_path.join('.')
      element.equipment_path = path        
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
          html += '<li class="treeview-animated-items"> \
                      <a class="closed"> \
                        <i class="fas fa-angle-right"></i> \
                        <span class="ml-1" data-equipmentpath="'+ n.equipment_path +'">'+ n.equipment_full_identifier + '  (' + n.equipment_description + ')</span> \
                      </a> \
                      <ul class="nested">' 
            + children.map( getNodeHtml).join('')
            + '</ul></li>'
        }
        else{
          html += '<li><div class="treeview-animated-element" data-equipmentpath="'+ n.equipment_path + '"> \
          '+n.equipment_full_identifier + '  (' + n.equipment_description +')</li>'
        }
        
      return html
    }

    // Get all root nodes (without parent)
    // const root = nodeWithParent.filter(d => d.parent === null)
    const root = nodeWithParent.filter(d=> d.parent === nodeWithParent[0].parent ) 

    return root.map(getNodeHtml).join('')
  }

  function createConnectionChildElementTree(data) {
    const nodeWithParent = []
    
    // make the equipment_path as string from list
    data.forEach(element => {
      path = element.connection_path.join('.')
      element.connection_path = path        
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
          html += '<li class="treeview-animated-items"> \
                      <a class="closed"> \
                        <i class="fas fa-angle-right"></i> \
                        <span class="ml-1" data-connectionpath="'+ n.connection_path +'">'+ 
                        n.connection_local_identifier + '  (' + n.connection_description + ')</span> \
                      </a> \
                      <ul class="nested">' 
            + children.map( getNodeHtml).join('')
            + '</ul></li>'
        }
        else{
          html += '<li><div class="treeview-animated-element" data-connectionpath="'+ n.connection_path + '"> \
          '+n.connection_local_identifier + '  (' + n.connection_description +')</li>'
        }
        
      return html
    }

    // Get all root nodes (without parent)
    // const root = nodeWithParent.filter(d => d.parent === null)
    const root = nodeWithParent.filter(d=> d.parent === nodeWithParent[0].parent ) 

    return root.map(getNodeHtml).join('')
  }

  function isValidDateFormat(dateString) {
    const regex = /^(\d{4}-\d{2}-\d{2})?$/;
    return regex.test(dateString);
  }

  function validateNumber(value) {
    return /^\d+$/.test(value);
  }

  // Selected Level for left tree on Equipment page
  $(".equipment_page .left_object_hierarchy").on("click", ".treeview-li .treeview-title", function() {
    
    $("#location_path").find('option').remove()
    $("#parent_path").find('option').remove()
    $('#all_equipment_types_select').find('option').remove()

    selectedEquipmentPath = $(this).attr("data-equipmentpath")
    
    $.ajax({
      type: "GET",
      url: 'getEquipmentChildElements',
      data: {
        selectedEquipmentPath: selectedEquipmentPath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        
        childEquipments = jsonData['child_equipments']
        gChildEquipments = childEquipments
        const html = createEquipmentChildElementTree(childEquipments)
        document.getElementById('child_equipment_tree').innerHTML = html
        
        $('.child-treeview').mdbTreeview();
        $('.child-treeview a').trigger('click');
        selectedEquipment = gChildEquipments.filter(d=> d.equipment_path === selectedEquipmentPath)
        allEquipment = JSON.parse(document.getElementById('all_equipment').textContent)
        
        allEquipmentTypes = JSON.parse(document.getElementById('all_equipment_types').textContent)
        selectedEquipmentId = selectedEquipment[0]['equipment_id']

        // displaying the detailed information of the equipment
        $('#equipment_id').val(selectedEquipmentId)
        $('#equipment_full_identifier').val(selectedEquipment[0]['equipment_full_identifier'])
        $('#equipment_local_identifier').val(selectedEquipment[0]['equipment_local_identifier'])
        if(selectedEquipment[0]['equipment_use_parent_identifier']){
          $('#equipment_use_parent_identifier').prop('checked' , true)
        }else{
          $('#equipment_use_parent_identifier').prop('checked' , false)
        }
        $('#equipment_description').val(selectedEquipment[0]['equipment_description'])
        $('#equipment_comment').val(selectedEquipment[0]['equipment_comment'])
        $('#basic-full-identifier').val(selectedEquipment[0]['equipment_full_identifier'] + ' ('+ selectedEquipment[0]['equipment_description'] + ')')
        if(selectedEquipment[0]['equipment_is_approved']){
          $('#equipment_is_approved').prop('checked' , true)
        }else{
          $('#equipment_is_approved').prop('checked' , false)
        }

        allEquipmentExceptSelectedOne = allEquipment.filter( d => d.equipment_id !== selectedEquipment[0]['equipment_id'])
        
        // display parent and location path
          var p = new Option('none' , '', undefined, false);
          $(p).html('none');
          $("#location_path").append(p);

          var o = new Option('none' , '', undefined, false);
          $(o).html('none');
          $("#parent_path").append(o);
         

        allEquipmentExceptSelectedOne.forEach( element => {
          element_equipment_path = element.equipment_path.join('.')
          
          selected_element_parent_path = selectedEquipment[0]['equipment_path']
          selected_element_parent_path = selected_element_parent_path.substr(0, selected_element_parent_path.lastIndexOf('.'))
          
          var selected = element_equipment_path === selected_element_parent_path ? true : false ;
          var o = new Option(element.equipment_full_identifier, element.equipment_path, undefined, selected);
          $(o).html(element.equipment_full_identifier);
          $("#parent_path").append(o);

          location_path = selectedEquipment[0]['equipment_location_path']
          var locationSelected = element_equipment_path === location_path ? true : false
          var p = new Option(element.equipment_full_identifier, element.equipment_path, undefined, locationSelected);
          
          $(p).html(element.equipment_full_identifier);
          $("#location_path").append(p);

        })

        // display type drop down 
        var t = new Option('none' , '', undefined, false);
        $(t).html('none');
        $("#all_equipment_types_select").append(t);

        allEquipmentTypes.forEach( element => {
          var selected = element.id === selectedEquipment[0]['type_id'] ? true : false ;
          if(element.id === selectedEquipment[0]['type_id'] ){
              typeLabelDescription = element.description + '('+ (element.is_approved ? 'approved' : 'not approved') +')'
          }
          var t = new Option(element.label, element.id, undefined, selected);
          $(t).html(element.label);
          $("#all_equipment_types_select").append(t);
        })
        

        // display Equipment Attributes tables
        $.ajax({
          type: "GET",
          url: 'getEquipmentDetailsTableData',
          data: {
            selectedEquipmentId: selectedEquipmentId
          },
          success: function (data){
            var html = ''
            equipmentAttributes = JSON.parse(data)
            propertyList = equipmentAttributes['property_list']
            resoureList = equipmentAttributes['resource_list']
            
            interfaceList = equipmentAttributes['interface_list']
            
            if(resoureList.length){
              resoureList.forEach(resource => {
                  html +='<tr style="background-color: #eee ;border-top: solid 3px; border-left: 1px; border-right: 1px;"> \
                    <td>'+ (resource.modifier !== null ? resource.modifier :'' )+ ' (' + resource.description + ')' + '</td> \
                    <td>Interface</td> \
                    <td>Used</td> \
                    </tr>'
                  resource_interface = interfaceList.filter(interface => interface.resource_id == resource.resource_id)
                  
                  // show interface details per selected resource
                  if(resource_interface.length){
                    resource_interface.forEach(interface =>{
                      html += '  <tr style=" border-left: 1px; border-right: 1px;"> \
                      <td></td> \
                      <td>'+ interface.interface_identifier + ' (' + interface.interface_description + ')</td> \
                      <td>'+ (interface.used === "Not used"? '': '<span class="bi bi-check" style="font-size: 1rem; color: rgb(0, 255, 0);"></span>') +'</td> \
                    </tr>'
                    }
                    )
                  }else{
                    html += '<tr style=" border-left: 1px; border-right: 1px;"> \
                    <td></td> \
                    <td>None</td> \
                    <td></td> \
                  </tr>'
                  }
                 
                  // show property details per selected resource
                  html += '<tr style=" background-color: #eee ;border-left: 1px; border-right: 1px;"> \
                    <td></td> \
                    <td>Property</td> \
                    <td>Value</td></tr>'

                  resource_property = propertyList.filter(property => property.resource_id == resource.resource_id)
                  if(resource_property.length){
                    resource_property.forEach(property => {
                      html += '<tr style=" border-left: 1px; border-right: 1px;"> \
                      <td style="display: none">'+ selectedEquipmentId +'</td> \
                      <td style="display: none">'+ property.resource_id +'</td> \
                      <td style="display: none">'+ property.property_id +'</td> \
                      <td></td> \
                      <td>' + property.property_modifier + ' ('+ property.property_description + ')</td> \
                      <td contenteditable="true">'+ property.property_value +'</td> \
                    </tr>'
                    })
                      
                  }
                  else{
                    html += '<tr style=" border-left: 1px; border-right: 1px;"> \
                    <td></td> \
                    <td>None</td> \
                    <td></td> \
                  </tr>'
                  }
              })
             
            }else{
              html += '<tr style="border: solid 1px"> \
              <td></td> \
              <td></td> \
              <td></td> \
            </tr>'
            }
            $('#equipment_attribute').html( html )
          }
        })
      }
    })
    }); 

  // Selected Level for left tree on connecction page
  $(".connection_page .left_object_hierarchy").on("click", '.treeview-li .treeview-title', function() {
      
    $("#connection_parent_path").find('option').remove()
    $("#start_equipment").find('option').remove()
    $("#end_equipment").find('option').remove()
    $("#start_interface").find('option').remove()
    $("#end_interface").find('option').remove()
    $('#all_connection_type').find('option').remove()

    selectedConnectionPath = $(this).attr("data-connectionpath")
    
    $.ajax({
      type: "GET",
      url: 'getConnectionChildElements',
      data: {
        selectedConnectionPath: selectedConnectionPath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        childConnection = jsonData['child_connection']
        const html = createConnectionChildElementTree(childConnection)
        document.getElementById('child_connection_tree').innerHTML = html
        
        selectedConnection = childConnection.filter(d=> d.connection_path === selectedConnectionPath)
        allEquipment = JSON.parse(document.getElementById('all_equipment').textContent)
        allInterface = JSON.parse(document.getElementById('all_interface').textContent)
        allConnection = JSON.parse(document.getElementById('all_connection').textContent)
        allConnectionTypes = JSON.parse(document.getElementById('all_connection_types').textContent)
        
        selectedConnectionId = selectedConnection[0]['connection_id']
        
        //displaying the detailed information of the selected connection
        $('#connection_id').val(selectedConnectionId)
        $('#connection_full_identifier').val(selectedConnection[0]['connection_identifier'])
        $('#connection_identifier').val(selectedConnection[0]['connection_local_identifier'])
        if(selectedConnection[0]['connection_use_parent_identifier']){
          $('#connection_use_parent_identifier').prop('checked' , true)
        }else{
          $('#connection_use_parent_identifier').prop('checked' , false)
        }
        $('#connection_description').val(selectedConnection[0]['connection_description'])
        $('#connection_comment').val(selectedConnection[0]['connection_comment'])
        $('#connection_length').val(selectedConnection[0]['connection_length'])
        $('#basic_connection_full_identifier').val(selectedConnection[0]['connection_identifier'] + ' ('+ selectedConnection[0]['connection_description'] + ')')
        if(selectedConnection[0]['connection_is_approved']){
          $('#connection_is_approved').prop('checked', true)
        }else{
          $('#connection_is_approved').prop('checked', false)
        }

        allConnectionExceptSelectedone = allConnection.filter( d => d.connection_id !== selectedConnectionId)
        
        // display parent  path lists
        var o = new Option('none' , '', undefined, false);
        $(o).html('none');
        $("#connection_parent_path").append(o);

        allConnectionExceptSelectedone.forEach( element => {
          element_connection_path = element.connection_path.join('.')
          
          selected_element_parent_path = selectedConnection[0]['connection_path']
          selected_element_parent_path = selected_element_parent_path.substr(0, selected_element_parent_path.lastIndexOf('.'))
          
          var selected = element_connection_path === selected_element_parent_path ? true : false ;
          var o = new Option(element.connection_identifier, element.connection_path, undefined, selected);
          $(o).html(element.connection_identifier);
          $("#connection_parent_path").append(o);
        })

        //display start and End equipment dropdown lists
        var p = new Option('none' , '', undefined, false);
        $(p).html('none');
        $("#start_equipment").append(p);

        var t = new Option('none' , '', undefined, false);
        $(t).html('none');
        $("#end_equipment").append(t);

        allEquipment.forEach(element => {
          var selected = element.equipment_id === selectedConnection[0]['start_equipment_id'] ? true: false
          var p = new Option(element.equipment_full_identifier, element.equipment_id,  undefined, selected)
          $(p).html(element.equipment_full_identifier)
          $('#start_equipment').append(p)

          selected = element.equipment_id === selectedConnection[0]['end_equipment_id'] ? true: false
          var t = new Option(element.equipment_full_identifier, element.equipment_id,  undefined, selected)
          $(t).html(element.equipment_full_identifier)
          $('#end_equipment').append(t)

        })

        //display start and end interface with dropdown lists
        var p = new Option('none' , '', undefined, false);
        $(p).html('none');
        $("#start_interface").append(p);

        var t = new Option('none' , '', undefined, false);
        $(t).html('none');
        $("#end_interface").append(t);

        allInterface.forEach(element => {
          var selected = element.id === selectedConnection[0]['start_interface_id'] ? true: false
          var p = new Option(element.identifier, element.id,  undefined, selected)
          $(p).html(element.identifer)
          $('#start_interface').append(p)

          selected = element.id === selectedConnection[0]['end_interface_id'] ? true: false
          var t = new Option(element.identifier, element.id,  undefined, selected)
          $(t).html(element.identifier)
          $('#end_interface').append(t)

        })

        //diplay connection type dropdown lists

        var t = new Option('none' , '', undefined, false);
        $(t).html('none');
        $("#all_connection_type").append(t);

        allConnectionTypes.forEach( element => {
          var selected = selectedConnection[0]['connection_type_id'] === element.id ? true : false ;
          var o = new Option(element.label, element.id, undefined, selected);
          $(o).html(element.label);
          $("#all_connection_type").append(o);
        })


        var connectionHtml = ""
        childConnection.forEach((element, index) => {
          if(index == 0){
            connectionHtml += '<tr style="background-color: #eee;"> \
            <td>'+ element.connection_identifier + ' ('+ element.connection_description +')</td> \
            <td></td> \
            <td>'+ element.start_interface_full_identifier + ' ('+ element.start_interface_description + ')</td> \
            <td>'+ element.end_interface_full_identifier + ' ('+ element.end_interface_description + ')</td>  \
          </tr>'
          }else{
            connectionHtml += '<tr> \
            <td></td> \
            <td>'+ element.connection_identifier + ' ('+ element.connection_description +')</td> \
            <td>'+ element.start_interface_full_identifier + ' ('+ element.start_interface_description + ')</td> \
            <td>'+ element.end_interface_full_identifier + ' ('+ element.end_interface_description + ')</td>  \
          </tr>'
          }
            
        })
        $('#connection_attribute').html( connectionHtml )
      }
    })
    }); 

  $('.equipment-type-purchase-overview').on('click', '.treeview-li .treeview-title', function(){
    selectedTypePath = $(this).attr("data-typepath")
    $.ajax({
      type: "GET",
      url: 'getEquipmentTypePurchasingOverview',
      data: {
        selectedTypePath: selectedTypePath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        var tableData = []

        child_purchasing_equipment_type = jsonData['child_equipmenttype']
        
        if(child_purchasing_equipment_type.length){
          child_purchasing_equipment_type.forEach(element => {
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
    })

  })

  $('.connection-type-purchase-overview').on('click', '.treeview-li .treeview-title',function(){
    selectedTypePath = $(this).attr("data-typepath")
    
    $.ajax({
      type: "GET",
      url: 'getConnectionTypePurchasingOverview',
      data: {
        selectedTypePath: selectedTypePath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        var tableData = []

        child_purchasing_connection_type = jsonData['child_connectiontype']        
        if(child_purchasing_connection_type.length){
            child_purchasing_connection_type.forEach(element => {
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
    })

  })

  $('.equipment-type-purchase-detail').on('click', '.treeview-li .treeview-title', function(){
    selectedTypePath = $(this).attr("data-typepath")
    $.ajax({
      type: "GET",
      url: 'getEquipmentTypePurchasingDetail',
      data: {
        selectedTypePath: selectedTypePath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        var tableData = []

        child_purchasing_equipment_type = jsonData['child_equipmenttype']
        if(child_purchasing_equipment_type.length){
          child_purchasing_equipment_type.forEach(element => {
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
              idSrc:  'equipment_commercial_id',
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
                  label: 'Leadtime(Days)',
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
              dom: 'Bfrtip',
              destroy: true,
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

            $('#purchasing_detail_equipment_type_table').on('click', 'td:nth-child(n+5):nth-child(-n+9)', function (){
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
    })

  })

  $('.connection-type-purchase-detail').on('click', '.treeview-li .treeview-title', function(){
    selectedTypePath = $(this).attr("data-typepath")
    
    $.ajax({
      type: "GET",
      url: 'getConnectionTypePurchasingDetail',
      data: {
        selectedTypePath: selectedTypePath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        var tableData = []

        child_purchasing_connection_type = jsonData['child_connectiontype']       

        if(child_purchasing_connection_type.length){
            child_purchasing_connection_type.forEach(element => {
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
    })

  })

  $('.delivery-equipment').on('click', '.treeview-li .treeview-title', function(){
    selectedTypePath = $(this).attr("data-typepath")
    $.ajax({
      type: "GET",
      url: 'getEquipmentTypePurchasingDetail',
      data: {
        selectedTypePath: selectedTypePath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        var tableData = []

        child_purchasing_equipment_type = jsonData['child_equipmenttype']
        
        if(child_purchasing_equipment_type.length){
          child_purchasing_equipment_type.forEach(element => {
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
              dom: 'Bfrtip',
              destroy: true,
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
              ]}
            )

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
    })

  })

  $('.delivery-connection').on('click', '.treeview-li .treeview-title',function(){
    selectedTypePath = $(this).attr("data-typepath")
    
    $.ajax({
      type: "GET",
      url: 'getConnectionTypePurchasingDetail',
      data: {
        selectedTypePath: selectedTypePath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        var tableData = []
        child_purchasing_connection_type = jsonData['child_connectiontype']       
        if(child_purchasing_connection_type.length){
          child_purchasing_connection_type.forEach(element => {
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
             { "visible": false, "targets": 0 } 
           ]
         }
         )
        }
      }
    })

  })

  $('.state-equipment').on('click', '.treeview-li .treeview-title',function(){
    selectedEquipmentPath = $(this).attr("data-equipmentpath")
  
    $.ajax({
      type: "GET",
      url: 'getEquipmentStateDetail',
      data: {
        selectedEquipmentPath: selectedEquipmentPath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        
        var tableData = []

        state_equipment_detail = jsonData['state_equipment_detail']       
        
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
              ]}
            )
            
        }
      }
    })

  })

  $('.state-connection').on('click', '.treeview-li .treeview-title',function(){
    selectedConnectionPath = $(this).attr("data-connectionpath")
    
    $.ajax({
      type: "GET",
      url: 'getConnectionStateDetail',
      data: {
        selectedConnectionPath: selectedConnectionPath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        var tableData = []

        state_connection_detail = jsonData['state_connection_detail']       
        
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
                { data: 'connection_id'},
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
              ]}
            )
        }
      }
    })

  })

  $(".equipment_type_page .left_object_hierarchy").on("click", '.treeview-li .treeview-title', function() {
    
    allEquipmentTypes = JSON.parse(document.getElementById('all_equipment_types').textContent)
    
    $("#equipment_type_parent_path").find('option').remove()
    $('#selectedResourceId').val('')
    $('#selectedInterfaceId').val('')
    selectedtypeId = $(this).attr("data-typeid")
    selectedTypeElement = allEquipmentTypes.filter( d=> d.id == selectedtypeId )
    
    $('#equipment_type_id').val(selectedtypeId)
    $('#equipment_type_label').val(selectedTypeElement[0].label)
    $('#equipment_type_description').val(selectedTypeElement[0].description)
    $('#equipment_type_modifier').val(selectedTypeElement[0].modifier)
    $('#equipment_type_manufacturer').val(selectedTypeElement[0].manufacturer)
    $('#equipment_type_model').val(selectedTypeElement[0].model)
    $('#equipment_type_comment').val(selectedTypeElement[0].comment)
    $('#equipment_type_last_modified').val(selectedTypeElement[0].modified_at)
    if(selectedTypeElement[0]['is_approved']){
      $('#equipment_type_is_approved').prop('checked' , true)
    }else{
      $('#equipment_type_is_approved').prop('checked' , false)
    }
    allEquipmentTypeExceptSelectedOne = allEquipmentTypes.filter( d => d.id != selectedtypeId)
        
    // display parent and location path
      var p = new Option('none' , '', undefined, false);
      $(p).html('none');
      $("#equipment_type_parent_path").append(p);

    allEquipmentTypeExceptSelectedOne.forEach( element => {
      element_path = element.path.join('.')
      
      selected_element_parent_path = selectedTypeElement[0]['path']
      selected_element_parent_path = selected_element_parent_path.join('.')
      selected_element_parent_path = selected_element_parent_path.substr(0, selected_element_parent_path.lastIndexOf('.'))
      
      var selected = element_path === selected_element_parent_path ? true : false ;
      var o = new Option(element.label, element_path, undefined, selected);
      $(o).html(element.label);
      $("#equipment_type_parent_path").append(o);
    })
    
    $.ajax({
      type: "GET",
      url: 'getEquipmentTypesAttributes',
      data: {
        selectedtypeId: selectedtypeId
      },
      success: function (data){
        jsonData = JSON.parse(data)
        associatedResource = jsonData['associatedResource']
        tableData = []
        if(associatedResource.length){
          
          associatedResource.forEach(resource => {
            tableData.push({
              'type_resource_id': resource.id,
              'type_id': resource.type_id,
              'resource_id': resource.resource_id,              
              'modifier': resource.modifier,
              'description': resource.description,
              'comment': resource.comment,
             })
          })
        }
        
          sTable = $('#equipment_type_resource_table').DataTable({
            data:  tableData ,
            destroy: true,
            columns: [
              { data: 'type_resource_id'},
              { data: 'type_id'},
              { data: 'resource_id' },
              { data: 'modifier' },
              { data: 'description' },
              { data: 'comment' },
              
            ],
            columnDefs:[
              { "visible": false, "targets": [0, 1, 2] },
            ]})
          
          tableData = []
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
    })
    
  }); 

  // When clicking the cell in associated reource table on definitions/equpment_type page
  $('#equipment_type_resource_table').on('click', 'tbody tr', function(e){
    sTable = $('#equipment_type_resource_table').DataTable()
    var row = sTable.row(this).data()
    var selectedTypeResourceId = row.type_resource_id    
    var selectedTypeId = row.type_id
    var selectedResourceId = row.resource_id
    $('#selectedResourceId').val(selectedResourceId)
    $('#selectedTypeResourceId').val(selectedTypeResourceId)
    $('#selectedInterfaceId').val('')

    $.ajax({
      type: "GET",
      url: 'getEquipmentTypesInterface',
      data: {
        selectedTypeId: selectedTypeId,
        selectedResourceId: selectedResourceId
      },
      success: function (data){
        jsonData = JSON.parse(data)
        typeInterfaceList = jsonData['typeInterfaceList']
        
        tableData = []
        if(typeInterfaceList.length){
          typeInterfaceList.forEach(interface => {
            tableData.push({
              'type_interface_id': interface.type_interface_id,
              'identifier': interface.interface_identifier,
              'description': interface.interface_description,              
              'class_label': interface.interface_class_label,
              'comment': interface.type_interface_comment,
              'active': interface.type_interface_is_active,
             })
          })
        }

        $('#equipment_type_interface_table').DataTable({
          data:  tableData ,
          destroy: true,
          columns: [
            { data: 'type_interface_id'},
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
    })

  })

  $('#equipment_type_interface_table').on('click', 'tbody tr', function(e){
    sTable = $('#equipment_type_interface_table').DataTable()
    var row = sTable.row(this).data()    
    $('#selectedTypeInterfaceId').val(row.type_interface_id)
  })

  $('.equipment_resource_page').on('click', '.treeview-li .treeview-title',function(){
    selectedResourceGroupId = $(this).attr("data-group_id")
    all_resources = JSON.parse(document.getElementById('all_resources').textContent)
    all_resources_group= JSON.parse(document.getElementById('all_resource_group').textContent)
    $('#resource_id').val('')
    // display resource group detail
    selectedResourceGroup = all_resources_group.find(element => element.id == selectedResourceGroupId)
    $('#resource_group_id').val(selectedResourceGroupId)
    $('#resource_group_label').val(selectedResourceGroup.label)
    $('#modal_resource_group_label').val(selectedResourceGroup.label + ' (' + selectedResourceGroup.description + ')')
    $('#resource_group_description').val(selectedResourceGroup.description)
    if(selectedResourceGroup['is_reportable']){
      $('#resource_group_is_reportable').prop('checked' , true)
    }else{
      $('#resource_group_is_reportable').prop('checked' , false)
    }
    $('#resource_group_comment').val(selectedResourceGroup.comment)
    if(selectedResourceGroup['is_used']){
      $('#resource_group_used').prop('checked' , true)
    }else{
      $('#resource_group_used').prop('checked' , false)
    }
    $('#resource_group_used').prop('disabled' , true)

    // display included resources
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
      sTable = $('#resource_table').DataTable()
      let cell = sTable.cell(this)
      let row = cell.index().row;
      let rowData = sTable.row(row).data()
      let resourceId = rowData.id
      $('#resource_id').val(resourceId)
    })

    resourceEditor.on('edit', function(e, datatable, cell){
      let resourceId = cell.id
      $('#resource_id').val(resourceId)

      let modifier = cell.modifier
      let description = cell.description
      let comment = cell.comment
      let resourceGroupId = selectedResourceGroupId
      let modifiedBy = JSON.parse(document.getElementById('currentUserName').textContent)
      let reason = prompt('Please write the reason why you update this resource.', '')
      if(description && reason){
        $.ajax({
          type: 'GET',
          url: 'updateResourceDetail',
          data: {
            resourceId: resourceId,
            modifier: modifier,
            description: description,
            comment: comment,
            resourceGroupId: resourceGroupId,
            reason: reason,
            modifiedBy: modifiedBy,
          },
          success: function (data){
            data = JSON.parse(data)
            var result = data['result']
            var all_resources = data['all_resources']
            
            if(result){
              showSuccessNotification('The resource has been updated successfully!')
              document.getElementById('all_resources').textContent = JSON.stringify(all_resources)
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
        showErrorNotification('The reason and description should not be empty string.')
      }

    })
    
  })

  $('.equipment_property_page').on('click','.treeview-li .treeview-title', function(){
    selectedPropertyId = $(this).attr("data-property-id")
    if(selectedPropertyId){
      resourceProperty = JSON.parse(document.getElementById('resourceProperty').textContent)
      all_property = JSON.parse(document.getElementById('all_property').textContent)
      all_datatype = JSON.parse(document.getElementById('all_datatype').textContent)
      all_attributeClass = JSON.parse(document.getElementById('all_attributeClass').textContent)

      // display resource property detail
      selectedProperty= all_property.find(element => element.id == selectedPropertyId)
      console.log(selectedProperty)
      selectedPropertyFromResourceProperty = resourceProperty.find(element => element.id == selectedPropertyId)
      $("#resource_property_default_datatype").find('option').remove()
      $('#resource_property_attribute_class').find('option').remove()
      
      $('#resource_property_id').val(selectedPropertyId)  
      $('#resource_property_modifier').val(selectedProperty.modifier)
      $('#resource_property_description').val(selectedProperty.description)

      if(selectedProperty['is_reportable']){
        $('#resource_property_is_reportable').prop('checked' , true)
      }else{
        $('#resource_property_is_reportable').prop('checked' , false)
      }

      $('#resource_property_comment').val(selectedProperty.comment)
      if(selectedPropertyFromResourceProperty['property_is_used']){
        $('#resource_property_used').prop('checked' , true)
      }else{
        $('#resource_property_used').prop('checked' , false)
      }
      $('#resource_property_used').prop('disabled' , true)
      $('#resource_property_default_value').val(selectedProperty.default_value)
  
      var p = new Option('none', undefined,  undefined, undefined)
      $(p).html('none')
      $('#resource_property_default_datatype').append(p)
      
      all_datatype.forEach(element => {
        var selected = element.id === selectedProperty.default_datatype_id ? true: false
        var p = new Option(element.label, element.id,  undefined, selected)
        $(p).html(element.label)
        $('#resource_property_default_datatype').append(p)
      })
  
      var p = new Option('none', '',  undefined, undefined)
      $(p).html('none')
      $('#resource_property_attribute_class').append(p)
      
      all_attributeClass.forEach(element => {
        var selected = element.attribute_class_id === selectedProperty.attribute_class_id ? true: false
        var p = new Option(element.attribute_class_label, element.attribute_class_id,  undefined, selected)
        $(p).html(element.attribute_class_label)
        $('#resource_property_attribute_class').append(p)
      })
  
      // display resources using this property
      resources = resourceProperty.filter(element => element.id == selectedPropertyId)
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
  })

  $('.equipment_interface_page').on('click', '.treeview-li .treeview-title', function(){
    selectedInterfaceId = $(this).attr("data-interfaceId")
    if(selectedInterfaceId){
      all_interfaces = JSON.parse(document.getElementById('all_interfaces').textContent)
      all_interface_classes = JSON.parse(document.getElementById('all_interface_classes').textContent)
      $("#equipment_interface_interface_class_label").find('option').remove()
      $("#equipment_interface_connecting_class_label").find('option').remove()
      
      selectedInterface = all_interfaces.find(element => element.id == selectedInterfaceId)
      
      $('#equipment_interface_id').val(selectedInterfaceId)
      $('#equipment_interface_identifier').val(selectedInterface.identifier)
      $('#equipment_interface_description').val(selectedInterface.description)
      $('#equipment_interface_comment').val(selectedInterface.comment)
      if(selectedInterface['is_intermediate']){
        $('#equipment_interface_is_intermediate').prop('checked' , true)
      }else{
        $('#equipment_interface_is_intermediate').prop('checked' , false)
      }
    
      if(selectedInterface['is_used']){
        $('#equipment_interface_used').prop('checked' , true)
        $('#equipment_interface_used').prop('disabled', true)
      }else{
        $('#equipment_interface_used').prop('checked' , false)
        $('#equipment_interface_used').prop('disabled', true)
      }
      
      var p = new Option('none', 'none', undefined, undefined)
      $(p).html('none')
      $('#equipment_interface_interface_class_label').append(p)
      all_interface_classes.forEach(element => {
        var selected = element.id === selectedInterface.interface_class_id ? true: false
        var p = new Option(element.label, element.id,  undefined, selected)
        $(p).html(element.label + ' (' + element.description + ')')
        $('#equipment_interface_interface_class_label').append(p)
      })
  
      var p = new Option('none', 'none', undefined, undefined)
      $(p).html('none')
      $('#equipment_interface_connecting_class_label').append(p)
  
      all_interface_classes.forEach(element => {
        var selected = element.id === selectedInterface.connecting_interface_class_id ? true: false
        var p = new Option(element.label, element.id,  undefined, selected)
        $(p).html(element.label + ' (' + element.description + ')')
        $('#equipment_interface_connecting_class_label').append(p)
      })
    }
  })

  $('.attribute_class_page ').on('click', '.treeview-li .treeview-title',function(){
    selectedAttributeClassId = $(this).attr("data-attributeClassId")    
    all_attributeClass = JSON.parse(document.getElementById('all_attributeClass').textContent)
    selectedAttributeClass = all_attributeClass.find(element => element.attribute_class_id == selectedAttributeClassId)
    $('#attribute_class_id').val(selectedAttributeClassId)
    $('#attribute_class_label').val(selectedAttributeClass.attribute_class_label)
    $('#attribute_class_description').val(selectedAttributeClass.attribute_class_description)
    $('#attribute_class_comment').val(selectedAttributeClass.attribute_class_comment)
    if(selectedAttributeClass['is_used']){
      $('#attribute_class_used').prop('checked' , true)
    }else{
      $('#attribute_class_used').prop('checked' , false)
    }
    $('#attribute_class_used').prop('disabled' , true)
  })

  $(".connection_type_page .left_object_hierarchy").on("click",  '.treeview-li .treeview-title', function() {
    
    allConnectionTypes = JSON.parse(document.getElementById('all_connection_types').textContent)
    
    $("#connection_type_parent_path").find('option').remove()

    selectedtypeId = $(this).attr("data-typeid")
    selectedTypeElement = allConnectionTypes.filter( d=> d.id == selectedtypeId )
    
    $('#connection_type_id').val(selectedtypeId)
    $('#connection_type_label').val(selectedTypeElement[0].label)
    $('#connection_type_description').val(selectedTypeElement[0].description)
    $('#connection_type_modifier').val(selectedTypeElement[0].modifier)
    $('#connection_type_manufacturer').val(selectedTypeElement[0].manufacturer)
    $('#connection_type_model').val(selectedTypeElement[0].model)
    $('#connection_type_comment').val(selectedTypeElement[0].comment)
    
    if(selectedTypeElement[0]['is_approved']){
      $('#connection_type_is_approved').prop('checked' , true)
    }else{
      $('#connection_type_is_approved').prop('checked' , false)
    }

    if(selectedTypeElement[0]['used']){
      $('#connection_type_used').prop('checked' , true)
    }else{
      $('#connection_type_used').prop('checked' , false)
    }
    $('#connection_type_used').prop('disabled' , true)

    allEquipmentTypeExceptSelectedOne = allConnectionTypes.filter( d => d.id != selectedtypeId)
        
    // display parent and location path
      var p = new Option('none' , '', undefined, false);
      $(p).html('none');
      $("#connection_type_parent_path").append(p);

    allEquipmentTypeExceptSelectedOne.forEach( element => {
      element_path = element.path.join('.')
      
      selected_element_parent_path = selectedTypeElement[0]['path']
      selected_element_parent_path = selected_element_parent_path.join('.')
      selected_element_parent_path = selected_element_parent_path.substr(0, selected_element_parent_path.lastIndexOf('.'))
      
      var selected = element_path === selected_element_parent_path ? true : false ;
      var o = new Option(element.label, element_path, undefined, selected);
      $(o).html(element.label);
      $("#connection_type_parent_path").append(o);
    })
 
  }); 
  

}); 