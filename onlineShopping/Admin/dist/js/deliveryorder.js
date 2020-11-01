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
var pdDatas;
var confirmData;
var neworder='true';
function showOrder(order){
      document.getElementById('categories').hidden=true;
    document.getElementById("editCustomer").hidden=true;
    document.getElementById('addProduct').hidden=true;
    document.getElementById('showDTTable').hidden=false;
    document.getElementById("welcome").hidden=true;
    document.getElementById('breadcrumb-item').innerHTML="Order";
    document.getElementById('card-title').innerHTML="Order List";
  document.getElementById('th1').innerHTML="No";
   document.getElementById('th2').innerHTML="InvoiceID";
   document.getElementById('th3').innerHTML="Customer";
   document.getElementById('th4').innerHTML="Phone";
   document.getElementById('th5').innerHTML="Address    ";
   document.getElementById('th6').innerHTML="Price";
   document.getElementById('th7').innerHTML="Date";
   document.getElementById('th8').innerHTML="";
   document.getElementById('th1').style="width:5%";

  var datatable=$("#dttable").DataTable();
  datatable.rows().remove();
  var rowdata="";
  // for neworderList


   $.ajax({
   type : "GET",
   contentType: "application/json; charset=utf-8",
   url : "http://127.0.0.1:8000/AdminInvoice/",
   data:{address:order},
   dataType: "json",
   beforeSend: function() {
     $('#load').show();
   },
   success:function(data){
     console.log(data);
 var btn=document.createElement("BUTTON");
 var btn='';
 document.getElementById('tablebody').innerHTML=null;
   for (let i=0; i<data.length; i++){
     btn="<button   onclick=detail("+data[i].productCode+",'"+order+"') class='btn btn-warning'>Detail</button>";

     // else{
     //   $("#dttable td:nth-child("+8+")").hide();
     //   $("#dttable th:nth-child("+8+")").hide();
     // }
     price=data[i].price+(data[i].price*0.05);

     datatable.row.add([
        rowdata+(i+1),
        rowdata+data[i].productCode,
        rowdata+data[i].name,
        rowdata+data[i].size,
        rowdata+data[i].color,
        rowdata+price,
        rowdata+data[i].stored_Date,
        rowdata+btn,


        ]).draw(false);

   }
 },
 complete:function(data) {
   $('#load').hide();
 }
 });

    }
function detail(invoiceID,state) {
  //select data and then put data to pdDatas
  if(invoiceID)
  {
    $.ajax({
			type : "GET",
      contentType: "application/json; charset=utf-8",
			url : "http://localhost:8000/OrderList/",
       data:{invoice_id:invoiceID},
		  dataType: "json",
      success:function(data){
				console.log(data);
        var subtotal=0;
        if(state=='False' ){
          $('#btnorderConfirm').show();
          confirmData=data;
        }
      else{
        $('#btnorderConfirm').hide();

      }
			 for(i=0;i<data.length;i++){
            amount=(data[i].storedQty*data[i].price);
            innerData= '<tr ><td>'+(i+1)+'</td>'+
                        '<td>'+'<img src=" '+data[i].imageOne+'" width="100px" height="70px"></td>'+
                        '<td>'+data[i].id+'</td>'+
                        '<td>'+data[i].storedQty+'</td>'+
                        '<td>'+data[i].price+'</td>'+
                        '<td>'+amount+'</td></tr>';
          document.getElementById("orderDetail").insertRow(-1).innerHTML =innerData;
          subtotal+=amount;
          }



          document.getElementById("orderDetail").insertRow(-1).innerHTML = '<tr ><td style="text-align:right;" id="dark" colspan=5>Subtotal  :  </td><td id="dark" >'+subtotal+'</td></tr>';
          document.getElementById("orderDetail").insertRow(-1).innerHTML = '<tr ><td style="text-align:right;" colspan=5 id="dark">Tax Fees  :  </td><td id="dark" >'+Math.floor(subtotal*0.05)+'</td></tr>';
          document.getElementById("orderDetail").insertRow(-1).innerHTML = '<tr ><td style="text-align:right;" colspan=5 id="dark">Total  :  </td><td id="dark" >'+(subtotal+Math.floor(subtotal*0.05))+'</td></tr>';
          $('#orderDetailModal').modal('show');
            // $('#registerModal').modal('show');
      }

    });
	}

}

function comfirm(){
       data=confirmData;
      del="True";
        var putData = {
        "delivered": del,
       };
       // console.log("putData");

      $.ajax({
        type : "PATCH",
        contentType : "application/json; charset=utf-8",
        url : "http://localhost:8000/Invoice/"+data[0].productCode+"/",
        data : JSON.stringify(putData),
        dataType: "json",
        success: function(){

          // alert("lote dl");
        // $('#'+order_id).css('background-color','#f47121');
        // var data={}
        }
      });
      for(i=0;i<data.length;i++){

          var putData = {
          "soldQty": (data[i].soldQty+1),
         };
         // console.log("putData");

        $.ajax({
          type : "PATCH",
          contentType : "application/json; charset=utf-8",
          url : "http://localhost:8000/Product/"+data[i].id+"/",
          data : JSON.stringify(putData),
          dataType: "json",
          success: function(){
            ClearInvoiceModal();
            showOrder('False');
          }
        });
      }
      // $('#'+invoice_id).css('background-color','#f47121');
    }

 function ClearInvoiceModal() {
  $('#btnconfirm').hide();
document.getElementById("orderDetail").innerHTML=" ";
   	$('#orderDetailModal').modal('hide');

 }
