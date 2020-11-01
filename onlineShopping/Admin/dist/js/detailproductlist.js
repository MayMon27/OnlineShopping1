
// $("#dttable").DataTable({
//       "responsive": true,
//       "autoWidth": false,
//     });
 src="../../plugins/jquery/jquery.min.js";
function addHeader(nowPage) {
if(nowPage=='productList'){
  document.getElementById('addProduct').hidden=true;
  document.getElementById('showDTTable').hidden=false;
  document.getElementById("editCustomer").hidden=true;
  document.getElementById('categories').hidden=true;
  document.getElementById("welcome").hidden=true;
  productList();
}


}
function productList() {
  document.getElementById('breadcrumb-item').innerHTML="Product List";
 document.getElementById('card-title').innerHTML="Product List";
 document.getElementById('th1').innerHTML="Code";
document.getElementById('th2').innerHTML="Image";
document.getElementById('th3').innerHTML="Main";
document.getElementById('th4').innerHTML="Sub";
document.getElementById('th5').innerHTML="Color";
document.getElementById('th6').innerHTML="Size";
document.getElementById('th7').innerHTML="Price";
document.getElementById('th8').innerHTML="Inhand";

var datatable=$("#dttable").DataTable();
datatable.rows().remove();
var rowdata="";

   $.ajax({
   type : "GET",
   contentType: "application/json; charset=utf-8",
   url : "http://localhost:8000/SearchedProduct/",
   data:{name:"pdlist"},
   dataType: "json",
   beforeSend: function() {
     $('#load').show();
   },
   success:function(data){
     document.getElementById('tablebody').innerHTML=null;

     for (let i=0; i<data.length; i++){
     var inhand=data[i].storedQty-data[i].soldQty;
     datatable.row.add([
        rowdata+data[i].id,
        rowdata+'<img src="'+data[i].imageOne+'" width="100px" height="70px">',
        rowdata+data[i].name,
        rowdata+data[i].brand,
        rowdata+data[i].color,
        rowdata+data[i].size,
        rowdata+data[i].price,
        rowdata+inhand,


     ]).draw(false);
   }

 },
 complete:function(data) {
   $('#load').hide();
 }
 });
 }
// $(document).ready(function(){
//   var datatable=$("#dttable").DataTable();
//   var rowdata="";
//
//   $.ajax({
//   type : "GET",
//   contentType: "application/json; charset=utf-8",
//   url : "http://localhost:8000/SearchedProduct/",
//   data:{name:"pdlist"},
//   dataType: "json",
//   success:function(data){
//     // console.log(data);
//
//   for (let i=0; i<data.length; i++){
//     var inhand=data[i].storedQty-data[i].soldQty;
//     datatable.row.add([
//        rowdata+data[i].id,
//        rowdata+'<img src="'+data[i].imageOne+'" width="100px" height="70px">',
//        rowdata+data[i].name,
//        rowdata+data[i].brand,
//        rowdata+data[i].price,
//        rowdata+data[i].color,
//        rowdata+data[i].size,
//        rowdata+inhand,
//
//
//     ]).draw(false);
//   }
//   }
// });
// });
