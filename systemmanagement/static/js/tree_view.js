$(function() {
    // Treeview Initialization
    
      
    
  let gChildEquipments
  let treeview = {
    resetBtnToggle: function() {
      $(".js-treeview")
        .find(".level-add")
        .find("span")
        .removeClass()
        .addClass("bi bi-plus-lg");
      $(".js-treeview")
        .find(".level-add")
        .siblings()
        .removeClass("in");
    },
    addSameLevel: function(target) {
      let ulElm = target.closest("ul");
      let sameLevelCodeASCII = target
        .closest("[data-level]")
        .attr("data-level")
        .charCodeAt(0);
      ulElm.append($("#levelMarkup").html());
      ulElm
        .children("li:last-child")
        .find("[data-level]")
        .attr("data-level", String.fromCharCode(sameLevelCodeASCII));
    },
    addSubLevel: function(target) {
      let liElm = target.closest("li");
      // let nextLevelCodeASCII = liElm.find("[data-level]").attr("data-level").charCodeAt(0) + 1;
      let nextLevelCodeASCII = liElm.find("[data-level]").attr("data-level").charCodeAt(0);
      liElm.children("ul").append($("#levelMarkup").html());
      liElm.children("ul").find("[data-level]")
        .attr("data-level", String.fromCharCode(nextLevelCodeASCII));
    },
    removeLevel: function(target) {
      target.closest("li").remove();
      
    }
  };

  // Treeview Functions
  $(".js-treeview").on("click", ".level-add", function() {
    $(this).find("span").toggleClass("bi-plug-lg").toggleClass("bi-x-lg text-danger");
    $(this).siblings().toggleClass("in");
  });

  // Add same level
  $(".js-treeview").on("click", ".level-same", function() {
    if (confirm('Are you sure?')) {
      treeview.addSameLevel($(this));
      treeview.resetBtnToggle();
    }
  });

  // Add sub level
  $(".js-treeview").on("click", ".level-sub", function() {
    if (confirm('Are you sure?')) {
      treeview.addSubLevel($(this));
      treeview.resetBtnToggle();
    }
  });
    // Remove Level
  $(".js-treeview").on("click", ".level-remove", function() {
    if (confirm('Are you sure?')) {
      treeview.removeLevel($(this));
    }
  }); 

  function createChildElementTree(data) {
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

  // Selected Level for left tree
  $(".left_object_hierarchy .treeview-li").on("click", ".treeview-title", function() {
    
    $("#location_path").find('option').remove()
    $("#parent_path").find('option').remove()
    $('#all_equipment_types_select').find('option').remove()

    selectedEquipmentPath = $(this).attr("data-equipmentpath")
    
    $.ajax({
      type: "GET",
      url: '/getChildElements',
      data: {
        selectedEquipmentPath: selectedEquipmentPath
      },
      success: function (data){
        jsonData = JSON.parse(data)
        childEquipments = jsonData['child_equipments']
        gChildEquipments = childEquipments
        const html = createChildElementTree(childEquipments)
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

      }
    })
    
    // display Equipment Attributes tables
    $.ajax({
      type: "GET",
      url: '/getEquipmentDetailsTableData',
      data: {
        selectedEquipmentId: selectedEquipmentId
      },
      success: function (data){
        console.log('Resource Details ' ,data)
        // jsonData = JSON.parse(data)
        // childEquipments = jsonData['child_equipments']
        // gChildEquipments = childEquipments
        // const html = createChildElementTree(childEquipments)
        // document.getElementById('child_equipment_tree').innerHTML = html
      }
    })
    }); 

  }); 
