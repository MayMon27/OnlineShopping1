//
// $("#dttable").DataTable({
//       "responsive": true,
//       "autoWidth": false,
//     });
//
//
//     $(document).ready(function(){
//       document.getElementById('breadcrumb-item').innerHTML="Order";
//      document.getElementById('card-title').innerHTML="Order List";
//         showneworder();
//     });

    function showOrder(order){
      document.getElementById('categories').hidden=true;
    document.getElementById("editCustomer").hidden=true;
    document.getElementById('addProduct').hidden=true;
    document.getElementById('showDTTable').hidden=false;
    document.getElementById("welcome").hidden=true;
    document.getElementById('breadcrumb-item').innerHTML="Order";
    document.getElementById('card-title').innerHTML="Order List";
  document.getElementById('th1').innerHTML="NO";
   document.getElementById('th2').innerHTML="OrderID";
   document.getElementById('th3').innerHTML="ProductID";
   document.getElementById('th4').innerHTML="Qty";
   document.getElementById('th5').innerHTML="OrderedDate";
   document.getElementById('th6').innerHTML="Address";
   document.getElementById('th7').innerHTML="Phone";
   document.getElementById('th8').innerHTML="OrderComfrim";

  var datatable=$("#dttable").DataTable();
  datatable.rows().remove();
  var rowdata="";
  // for neworderList


   $.ajax({
   type : "GET",
   contentType: "application/json; charset=utf-8",
   url : "http://127.0.0.1:8000/Invoice/",
   data:{address:order},
   dataType: "json",
   beforeSend: function() {
     $('#load').show();
   },
   success:function(data){
 var btn=document.createElement("BUTTON");
 var btn='';
 document.getElementById('tablebody').innerHTML=null;
   for (let i=0; i<data.length; i++){
     if(order=='new'){
       btn="<button  id= "+data[i].id+" onclick='comfirm("+data[i].id+")' class='btn btn-primary'>Comfirm</button>";

     }
     else {
       btn=data[i].comfirm_Date;
     }
     datatable.row.add([
       rowdata+(i+1),
        rowdata+data[i].id,
        rowdata+data[i].customer_id,
        rowdata+data[i].delivered,
        rowdata+data[i].invoice_Date,
        rowdata+data[i].address,
        rowdata+data[i].phone_Number,
        rowdata+btn,
       ]).draw(false);
   }
 },
 complete:function(data) {
   $('#load').hide();
 }
 });

    }

    function comfirm(order_id){
      // alert(order_id);
      del="TRUE";
        var putData = {
        "delivered": del,
       };
       // console.log("putData");

      $.ajax({
        type : "PATCH",
        contentType : "application/json; charset=utf-8",
        url : "http://localhost:8000/Order/"+order_id+"/",
        data : JSON.stringify(putData),
        dataType: "json",
        success: function(){

          // alert("lote dl");
        $('#'+order_id).css('background-color','#f47121');
        }
      });

    }
