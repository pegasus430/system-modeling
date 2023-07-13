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
  $('#version').html('1.0.14 (14/07/2023)')

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
    if(document.getElementById('purchasing_detail_connection')){
      tableData = []

      purchasing_connection = JSON.parse(document.getElementById('purchasing_detail_connection').textContent)

        if(purchasing_connection.length){
          purchasing_connection.forEach(element => {
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
    if(document.getElementById('purchasing_delivery_equipment')){
      tableData = []
      purchasing_delivery_equipment = JSON.parse(document.getElementById('purchasing_delivery_equipment').textContent)
      
      
      if(purchasing_delivery_equipment.length){
        purchasing_delivery_equipment.forEach(element => {
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
    if(document.getElementById('purchasing_delivery_connection')){
      tableData = []

      purchasing_delivery_connection = JSON.parse(document.getElementById('purchasing_delivery_connection').textContent)

      if(purchasing_delivery_connection.length){
        purchasing_delivery_connection.forEach(element => {
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
   
    if(document.getElementById('all_equipment')){
      tableData = []

      state_equipment_detail = JSON.parse(document.getElementById('all_equipment').textContent)
      
      if(state_equipment_detail.length){
        state_equipment_detail.forEach(element => {
             tableData.push({
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
            ]}
          )
      }
    }
    if(document.getElementById('all_connection')){
      tableData = []

      state_connection_detail =  JSON.parse(document.getElementById('all_connection').textContent)      
      
      if(state_connection_detail.length){
        state_connection_detail.forEach(element => {
             tableData.push({
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
            ]}
          )
      }
    }

    if(document.getElementById('system_parameters')){
  
      var system_parameters = JSON.parse(document.getElementById('system_parameters').textContent)
      
      var tableData = []
      if(system_parameters.length){
          system_parameters.forEach(element => {
             tableData.push({
              'label': element.label ,
              'value': element.value,
              'comment': element.comment,
              'last_modified': element.modified_at,
              'action': '<div class="inner-flex">\
                <span class="bi bi-pencil p-1" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#systemParamerterModal"></span> \
                <span class="bi bi-trash p-1" style="cursor:pointer"></span> \
                </div>'
             })
          })
          
          $('#system_paramter_table').DataTable({
            data:  tableData ,
            destroy: true,
            columns: [
              { data: 'label' },
              { data: 'value' },
              { data: 'comment' },
              { data: 'last_modified' },
              { data: 'action'}
            ]}
          )
      }
    }

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

  if(select('#btn_equipment_delete')){
    on('click','#btn_equipment_delete' , function(){
      if(confirm('Are you sure to remove the equipment?')){
        allEquipment = JSON.parse(document.getElementById('all_equipment').textContent)
        
      }
    })
  }

  if(select('#btn_connection_delete')){
    on('click','#btn_connection_delete' , function(){
      if(confirm('Are you sure to remove the connection?')){
        allEquipment = JSON.parse(document.getElementById('all_connection').textContent)
        
      }
    })
  } 
  

  if(select('.equipment_page #commit'))
  {
    on('click', '.equipment_page #commit', function(){
      if(confirm('Are you sure to update this equipment?')){
         var equipment_local_identifier = $('#equipment_local_identifier').val()
         var equipment_id = $('#equipment_id').val()
         var equipment_parent_path = $('#parent_path').val()
         var equipment_description = $('#equipment_description').val()
         var equipment_location_path = $('#location_path').val()
         var equipment_type_id = $('#all_equipment_types_select').val()
         var equipment_comment = $('#equipment_comment').val()
         var equipment_is_approved = $('#equipment_is_approved').prop('checked')
         console.log(equipment_location_path)
         $.ajax({
          type: "GET",
          url: 'updateEquipmentDetail',
          data: {
            equipment_id: equipment_id,
            equipment_local_identifier: equipment_local_identifier,  
            equipment_parent_path: equipment_parent_path,
            equipment_description: equipment_description,
            equipment_location_path: equipment_location_path,
            equipment_type_id: equipment_type_id,
            equipment_comment: equipment_comment,
            equipment_is_approved: equipment_is_approved          
          },
          success: function (data){
            console.log(data)

          }
         })

      }
    })
  }
  
 
} )
();

