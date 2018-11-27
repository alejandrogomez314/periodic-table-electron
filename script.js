// $(function () {
//     $('li[class^="element-"]').mouseover(function () {
//         var currentClass = $(this).attr('class').split(' ')[0];
//         if (currentClass != 'empty') {
//             $('.main > li').addClass('deactivate');
//             $('.' + currentClass).removeClass('deactivate');
//         }
//     });

//     $('li[class^="prop-"]').mouseover(function () {
//         var currentClass = $(this).attr('class').split(' ')[0];
//         $('.main > li').addClass('deactivate');
//         $('.' + currentClass).removeClass('deactivate');
//     });

//     $('.main > li').mouseout(function () {
//         var currentClass = $(this).attr('class').split(' ')[0];
//         $('.main > li').removeClass('deactivate');
//     });

// });

jQuery(document).ready(function($) {
    $(".element").click(function(event) {   //get the position of data
    var id= $(this).data('pos') -1;  
    
    //alert(id);
    $.getJSON( 'PeriodicTableJSON.json', function(json ) {
        var items = [];
        
        //cleae modal before
        $(".modal-content").empty();
        items.push("<span class='close' onclick='closemodal()'>&times;</span>");
        items.push( "<h3>" + json.elements[id].name + "</h3>" );
        items.push( "<br/> <b>Atomic Mass:</b> " + json.elements[id].atomic_mass);
        items.push( "   </t> <b>Boiling Point:</b> " + json.elements[id].boil);
        items.push( "   </t> <b>Melting Point:</b> " + json.elements[id].melt);
        items.push( "<br/> <br/> <p>" + json.elements[id].summary+ "</p>" );
        $(".modal-content").append(items);
       });

       $("#myModal").css({display: "block"});
      
     
    });   
    });

   