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

        $('#equipment_id').innerHTML = selectedEquipmentId
        $('#equipment_full_identifier').val(selectedEquipment[0]['equipment_full_identifier'])
        $('#equipment_description').val(selectedEquipment[0]['equipment_description'])
        $('#equipment_comment').val(selectedEquipment[0]['equipment_comment'])
        $('#basic-full-identifier').val(selectedEquipment[0]['equipment_full_identifier'] + ' ('+ selectedEquipment[0]['equipment_description'] + ')')
        if(selectedEquipment[0]['equipment_is_approved']){
          $('#equipment_is_approved').attr("checked", "checked")
          $('#equipment_is_approved').checked = true
        }

        allEquipmentExceptSelectedOne = allEquipment.filter( d => d.equipment_id !== selectedEquipment[0]['equipment_id'])

        // display parent and location path
        allEquipmentExceptSelectedOne.forEach( element => {
          element_equipment_path = element.equipment_path.join('.')
          
          selected_element_parent_path = selectedEquipment[0]['equipment_path']
          selected_element_parent_path = selected_element_parent_path.substr(0, selected_element_parent_path.lastIndexOf('.'))
          
          var selected = element_equipment_path === selected_element_parent_path ? true : false ;
          var o = new Option(element.equipment_full_identifier, element.equipment_full_identifier, undefined, selected);
          $(o).html(element.equipment_full_identifier);
          $("#parent_path").append(o);

          location_path = selectedEquipment[0]['equipment_location_path']
          var locationSelected = element_equipment_path === location_path ? true : false
          var p = new Option(element.equipment_full_identifier, element.equipment_full_identifier, undefined, locationSelected);
          
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
          var t = new Option(element.label, element.label, undefined, selected);
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
        
        $('.child-treeview').mdbTreeview();
        $('.child-treeview a').trigger('click');
        selectedConnection = childConnection.filter(d=> d.connection_path === selectedConnectionPath)
        allEquipment = JSON.parse(document.getElementById('all_equipment').textContent)
        
        allConnectionTypes = JSON.parse(document.getElementById('all_connection_types').textContent)
        selectedConnectionId = selectedEquipment[0]['connection_id']

      }
    })
    
    
    }); 

  
  }); 
