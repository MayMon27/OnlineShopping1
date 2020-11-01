// var user_cardNum;
// function calluserdata(){
//   var user_id=sessionStorage.getItem('customerId');
//   $('#address').show();
//   $('#checkbtns').hide();
//   if(user_id != "")
//   {
//
//     $.ajax({
//       type : "GET",
//       contentType: "application/json; charset=utf-8",
//       url : "http://localhost:8000/CustomerCheck/",
//       data:{user_id:user_id},
//
//       dataType: "json",
//       success:function(data){
//
//         user_name=data[0].name;
//         user_phonenumber=data[0].phone_Number;
//         user_address=data[0].address;
//         user_cardNum=data[0].card_Number;
//         document.getElementById('user_data').innerHTML="Name : <label>"+ user_name +"</label><br>Phone_Number : <label id='oldphone'>" + user_phonenumber +"</label><br>Address : <label id='oldaddress'>" + user_address +"</label>";
//       },
//     }).then(function(data){
//          });
//   }
//
// };
//
// function insertorderform(userAddress){
//
//   var customer_id=sessionStorage.getItem('customerId');
//
//    var phone;
//    var address;
//
//   if (userAddress=='old'){
//     phone = document.getElementById('oldphone').innerHTML;
//     address=document.getElementById('oldaddress').innerHTML;
//   }
//   else{
//
//     phone = $('#ph_no').val();
//     address=$('#newAddress').val();
//
//   }
//    if( phone != "" && address !="")
//   {
//     var rowData = {
//       "customer_id": customer_id,
//       "address": address,
//       "phone_Number": phone,
//       "card_Number": user_cardNum,
//     };
//     console.log(rowData);
//
//     $.ajax({
//       type: "POST",
//       contentType : "application/json; charset=utf-8",
//       url : "http://localhost:8000/Invoice/",
//       data : JSON.stringify(rowData),
//       dataType: "json",
//       success: function(){
//         alert("invoice success");
//         $.ajax({
//       type: "GET",
//       contentType : "application/json; charset=utf-8",
//       url : "http://localhost:8000/LastInvoice/",
//       dataType: "json",
//       success: function(data){
//
//       invoiceID= data[0].id;
//       alert(data[0].id);
//       buyData=JSON.parse(sessionStorage.getItem('buyData'));
//       if(buyData!='null'){
//         addOrder(buyData);
//       }
//       else {
//
//       }
//     });
//
//       },
//     });
//   }
//   else
//   {
//     alert("Please fill  all fields.");
//   }
//
//  };
