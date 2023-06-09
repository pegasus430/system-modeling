$(function() {

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
      const children = nodeWithParent.filter(d => d.parent === n.equipment_path)
      let html = '<li> \
                    <div class="treeview__level" data-level="&#x26AC;" data-equipmentpath="'+ n.equipment_path +'"> \
                        <span class="level-title">'+ n.equipment_full_identifier + '(' + n.equipment_description + ')' +'</span> \
                        <div class="treeview__level-btns"> \
                          <div class="btn btn-default btn-sm level-add"><span class="bi bi-plus-lg"></span></div> \
                          <div class="btn btn-default btn-sm level-remove"><span class="bi bi-trash text-danger"></span></div> \
                          <div class="btn btn-default btn-sm level-same"><span>+ Same</span></div> \
                          <div class="btn btn-default btn-sm level-sub"><span>+ Child</span></div> \
                        </div> \
                      </div>'
      if(children.length>0) {
        html += '<ul>' 
          + children.map( getNodeHtml).join('')
          + '</ul>'
      }
      html += '</li>'
      return html
    }

    // Get all root nodes (without parent)
    // const root = nodeWithParent.filter(d => d.parent === null)
    const root = nodeWithParent.filter(d=> d.parent === nodeWithParent[0].parent ) 

    return root.map(getNodeHtml).join('')
  }

  // Selected Level for left tree
  $(".left_object_hierarchy .js-treeview").on("click", ".level-title", function() {
    let isSelected = $(this).closest("[data-level]").hasClass("selected");
    !isSelected && $(this).closest(".js-treeview").find("[data-level]").removeClass("selected");
    $(this).closest("[data-level]").toggleClass("selected");
    
    selectedEquipmentPath = $(this).closest(".treeview__level").attr("data-equipmentpath")
    
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
      }
    })
  }); 

  //selected equipment in right tree
  $(".right_object_hierarchy .js-treeview").on("click", ".level-title", function() {
    
    selectedEquipmentPath = $(this).closest(".treeview__level").attr("data-equipmentpath")
    selectedEquipment = gChildEquipments.filter(d=> d.equipment_path === selectedEquipmentPath)
    console.log(selectedEquipment)
    
    }); 
});
