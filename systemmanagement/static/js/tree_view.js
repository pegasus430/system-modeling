$(function() {
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

  // Selected Level
  $(".js-treeview").on("click", ".level-title", function() {
    let isSelected = $(this).closest("[data-level]").hasClass("selected");
    !isSelected && $(this).closest(".js-treeview").find("[data-level]").removeClass("selected");
    $(this).closest("[data-level]").toggleClass("selected");
  }); 
});
