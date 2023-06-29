$(function() {
    // Treeview Initialization
    
  let gChildEquipments
 

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

  // Selected Level for left tree on Equipment page
  $(".equipment_page .left_object_hierarchy .treeview-li .treeview-title").on("click",  function() {
    $('#div_equipment_local_identifier').addClass('d-none')
    $("#location_path").find('option').remove()
    $("#parent_path").find('option').remove()
    $('#all_equipment_types_select').find('option').remove()

    selectedEquipmentPath = $(this).attr("data-equipmentpath")
    
    $.ajax({
      type: "GET",
      url: '/getEquipmentChildElements',
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

        $('#equipment_id').val(selectedEquipmentId)
        $('#equipment_full_identifier').val(selectedEquipment[0]['equipment_full_identifier'])
        $('#equipment_local_identifier').val(selectedEquipment[0]['equipment_local_identifier'])
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
        typeLabelDescription = ''
        allEquipmentTypes.forEach( element => {
          var selected = element.id === selectedEquipment[0]['type_id'] ? true : false ;
          if(element.id === selectedEquipment[0]['type_id'] ){
              typeLabelDescription = element.description + '('+ (element.is_approved ? 'approved' : 'not approved') +')'
          }
          var t = new Option(element.label, element.id, undefined, selected);
          $(t).html(element.label);
          $("#all_equipment_types_select").append(t);
        })
        $('#type_label').val(typeLabelDescription)

        // display Equipment Attributes tables
        $.ajax({
          type: "GET",
          url: '/getEquipmentDetailsTableData',
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
                    <td>Details</td> \
                    </tr>'
                  resource_interface = interfaceList.filter(interface => interface.resource_id == resource.resource_id)
                  
                  if(resource_interface.length){
                    resource_interface.forEach(interface =>{
                      html += '  <tr style=" border-left: 1px; border-right: 1px;"> \
                      <td></td> \
                      <td></td> \
                      <td>'+ interface.interface_full_identifier + ' (' + interface.interface_description + ') - '+ interface.used +'</td> \
                    </tr>'
                    })
                  }else{
                    html += '<tr style=" border-left: 1px; border-right: 1px;"> \
                    <td></td> \
                    <td></td> \
                    <td>None</td> \
                  </tr>'
                  }
                 

                  html += '<tr style=" background-color: #eee ;border-left: 1px; border-right: 1px;"> \
                    <td></td> \
                    <td>Property</td> \
                    <td>Details</td></tr>'

                  resource_property = propertyList.filter(property => property.resource_id == resource.resource_id)
                  if(resource_property.length){
                    resource_property.forEach(property => {
                      html += '<tr style=" border-left: 1px; border-right: 1px;"> \
                      <td></td> \
                      <td></td> \
                      <td>'+ property.property_modifier + ' ('+ property.property_description + ' - ' + property.datatype_label +')</td> \
                    </tr>'
                    })
                      
                  }
                  else{
                    html += '<tr style=" border-left: 1px; border-right: 1px;"> \
                    <td></td> \
                    <td></td> \
                    <td>None</td> \
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
  $(".connection_page .left_object_hierarchy .treeview-li .treeview-title").on("click",  function() {
      
    $("#connection_parent_path").find('option').remove()
    $("#start_equipment").find('option').remove()
    $("#end_equipment").find('option').remove()
    $('#all_connection_type').find('option').remove()

    selectedConnectionPath = $(this).attr("data-connectionpath")
    
    $.ajax({
      type: "GET",
      url: '/getConnectionChildElements',
      data: {
        selectedConnectionPath: selectedConnectionPath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        childConnection = jsonData['child_connection']
        const html = createConnectionChildElementTree(childConnection)
        document.getElementById('child_connection_tree').innerHTML = html
        
        // $('.child-treeview').mdbTreeview();
        // $('.child-treeview a').trigger('click');
        selectedConnection = childConnection.filter(d=> d.connection_path === selectedConnectionPath)
        allEquipment = JSON.parse(document.getElementById('all_equipment').textContent)
        allConnection = JSON.parse(document.getElementById('all_connection').textContent)
        
        allConnectionTypes = JSON.parse(document.getElementById('all_connection_types').textContent)
        selectedConnectionId = selectedConnection[0]['connection_id']
        
        $('#connection_full_identifier').val(selectedConnection[0]['connection_identifier'])
        $('#connection_identifier').val(selectedConnection[0]['connection_local_identifier'])
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
        allConnectionExceptSelectedone.forEach( element => {
          element_connection_path = element.connection_path.join('.')
          
          selected_element_parent_path = selectedConnection[0]['connection_path']
          selected_element_parent_path = selected_element_parent_path.substr(0, selected_element_parent_path.lastIndexOf('.'))
          
          var selected = element_connection_path === selected_element_parent_path ? true : false ;
          var o = new Option(element.connection_identifier, element.connection_identifier, undefined, selected);
          $(o).html(element.connection_identifier);
          $("#connection_parent_path").append(o);
        })

        //display start and End equipment dropdown lists
        allEquipment.forEach(element => {
          var selected = element.equipment_id === selectedConnection[0]['start_equipment_id'] ? true: false
          var p = new Option(element.equipment_full_identifier, element.equipment_full_identifier,  undefined, selected)
          $(p).html(element.equipment_full_identifier)
          $('#start_equipment').append(p)

          selected = element.equipment_id === selectedConnection[0]['end_equipment_id'] ? true: false
          var t = new Option(element.equipment_full_identifier, element.equipment_full_identifier,  undefined, selected)
          $(t).html(element.equipment_full_identifier)
          $('#end_equipment').append(t)

        })

        //diplay connection type dropdown lists
        allConnectionTypes.forEach( element => {
          var selected = selectedConnection[0]['connection_type_id'] === element.id ? true : false ;
          var o = new Option(element.label, element.label, undefined, selected);
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

  $('.equipment-type-purchase-overview .treeview-li .treeview-title').on('click', function(){
    selectedTypePath = $(this).attr("data-typepath")
    $.ajax({
      type: "GET",
      url: '/getEquipmentTypePurchasingOverview',
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

  $('.connection-type-purchase-overview .treeview-li .treeview-title').on('click', function(){
    selectedTypePath = $(this).attr("data-typepath")
    
    $.ajax({
      type: "GET",
      url: '/getConnectionTypePurchasingOverview',
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

  $('.equipment-type-purchase-detail .treeview-li .treeview-title').on('click', function(){
    selectedTypePath = $(this).attr("data-typepath")
    $.ajax({
      type: "GET",
      url: '/getEquipmentTypePurchasingDetail',
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
            
            $('#purchasing_detail_equipment_type_table').DataTable({
              data:  tableData ,
              destroy: true,
              columns: [
                { data: 'full_identifier' },
                { data: 'description' },
                { data: 'manufacturer' },
                { data: 'model' },
                { data: 'quote_reference'},
                { data: 'leadtime' },
                { data: 'po_date' },
                { data: 'po_reference' },
                { data: 'due_date' }
              ]}
            )
        }
      }
    })

  })

  $('.connection-type-purchase-detail .treeview-li .treeview-title').on('click', function(){
    selectedTypePath = $(this).attr("data-typepath")
    
    $.ajax({
      type: "GET",
      url: '/getConnectionTypePurchasingDetail',
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
                'location_identifier': element.connection_location_identifier ,
                'description': element.connection_description,
                'quote_reference': element.quote_reference,
                'leadtime': element.lead_time_days ,
                'po_date': element.purchase_order_date,
                'po_reference': element.purchase_order_reference,
                'due_date': element.due_date,
               })
            })
            
            $('#purchasing_detail_connection_type_table').DataTable({
              data:  tableData ,
              destroy: true,
              columns: [
                { data: 'location_identifier' },
                { data: 'description' },
                { data: 'quote_reference' },
                { data: 'leadtime' },
                { data: 'po_date' },
                { data: 'po_reference' },
                { data: 'due_date' }
              ]}
            )
        }
      }
    })

  })

  $('.delivery-equipment .treeview-li .treeview-title').on('click', function(){
    selectedTypePath = $(this).attr("data-typepath")
    $.ajax({
      type: "GET",
      url: '/getEquipmentTypePurchasingDetail',
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
                'full_identifier': element.equipment_full_identifier ,
                'description': element.equipment_description,
                'manufacturer' : element.manufacturer,
                'po_reference': element.purchase_order_reference,
                'po_date': element.purchase_order_date,
                'due_date': element.due_date,
                'received_data': element.received_date,
                'serial_number': element.unique_code,
                'location': element.location
               })
            })
            
            $('#delivery_equipment_type_table').DataTable({
              data:  tableData ,
              scrollX: true,
              destroy: true,
              columns: [
                { data: 'full_identifier' },
                { data: 'description' },
                { data: 'manufacturer' },
                { data: 'po_reference' },
                { data: 'po_date' },
                { data: 'due_date' },
                { data: 'received_data' },
                { data: 'serial_number' },
                { data: 'location' },
              ]}
            )
        }
      }
    })

  })

  $('.delivery-connection .treeview-li .treeview-title').on('click', function(){
    selectedTypePath = $(this).attr("data-typepath")
    
    $.ajax({
      type: "GET",
      url: '/getConnectionTypePurchasingDetail',
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
                'location_identifier': element.connection_location_identifier ,
                'description': element.connection_description,
                'po_reference': element.purchase_order_reference,
                'po_date': element.purchase_order_date,
                'due_date': element.due_date,
                'received_data': element.received_date,
                'serial_number': element.unique_code,
                'location': element.location
               })
            })
            
            $('#delivery_connection_type_table').DataTable({
              data:  tableData ,
              scrollX: true,
              destroy: true,
              columns: [
                { data: 'location_identifier' },
                { data: 'description' },
                { data: 'po_reference' },
                { data: 'po_date' },
                { data: 'due_date' },
                { data: 'received_data' },
                { data: 'serial_number' },
                { data: 'location' },
              ]}
            )
        }
      }
    })

  })

  $('.state-equipment .treeview-li .treeview-title').on('click', function(){
    selectedEquipmentPath = $(this).attr("data-equipmentpath")
  
    $.ajax({
      type: "GET",
      url: '/getEquipmentStateDetail',
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
                'full_identifier': element.equipment_full_identifier ,
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
              scrollX: true,
              destroy: true,
              columns: [
                { data: 'full_identifier' },
                { data: 'description' },
                { data: 'quoted' },
                { data: 'ordered' },
                { data: 'received' },
                { data: 'installed' },
                { data: 'in_warranty' },
                { data: 'design_approved' },
                { data: 'configured' },
                { data: 'fat_complete' },
                { data: 'sat_complete' },
                { data: 'commissioning_complete' },
              ]}
            )
        }
      }
    })

  })

  $('.state-connection .treeview-li .treeview-title').on('click', function(){
    selectedConnectionPath = $(this).attr("data-connectionpath")
    
    $.ajax({
      type: "GET",
      url: '/getConnectionStateDetail',
      data: {
        selectedConnectionPath: selectedConnectionPath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        var tableData = []

        state_connection_detail = jsonData['state_connection_detail']       
        console.log(state_connection_detail)
        if(state_connection_detail.length){
          state_connection_detail.forEach(element => {
               tableData.push({
                'full_identifier': element.connection_local_identifier ,
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
              scrollX: true,
              destroy: true,
              columns: [
                { data: 'full_identifier' },
                { data: 'description' },
                { data: 'quoted' },
                { data: 'ordered' },
                { data: 'received' },
                { data: 'installed' },
                { data: 'in_warranty' },
                { data: 'design_approved' },
                { data: 'fat_complete' },
                { data: 'sat_complete' },
                { data: 'commissioning_complete' },
              ]}
            )
        }
      }
    })

  })


}); 