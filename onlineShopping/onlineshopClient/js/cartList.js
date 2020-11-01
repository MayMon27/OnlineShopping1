var buyData=JSON.parse(sessionStorage.getItem('buyData'));
var buyState=sessionStorage.getItem('buyState');
var customerid=sessionStorage.getItem('customerId');
var cartData;

function RetrieveCart(){

	$('#address').hide();
		document.getElementById("cart").innerHTML="";
if(buyState=="cart" ){
		$.ajax({

		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/CartList/",
		dataType: "json",
		data:{customerid:customerid},
		success:function(data){

			if(data.length==0){
				  $('#carttableshow').hide();
					 document.getElementById('nodata').innerHTML="There is no item in your cart.";
			}
			else{
				console.log(data);
				cartTable(data,'cart');
				cartData=data;
			}

		},
	}).then(function(data){

	});
}
else {
		cartTable(buyData,'buy');
}
}

function cartTable(data,state) {

	var subtotal=0;
	for(var i=0; i<data.length; i++){
		 var id = data[i].soldQty;
		 var imageOne=data[i].imageOne;
		var product = data[i].name;
		var size = data[i].size;
		var color = data[i].color;
		var price = data[i].price;
		var quantity = data[i].storedQty;
		var amount = (quantity*price);


		innerData= '<tr onclick="showBack('+data[i].productCode+');"><td>'+(i+1)+'</td>'+
																	'<td>'+'<img src=" '+imageOne+'" width="100px" height="70px"></td>'+
																	'<td>'+product+'</td>'+
																		'<td>'+color+'</td>'+
																		'<td>'+size+'</td>'+
																		'<td>'+quantity+'</td>'+
																		'<td>'+price+'</td>'+
																		'<td>'+amount+'</td>';
																		if(state=='cart'){
																			innerData+='<td><button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#employeeDeleteModal" onclick="DeleteCart('+id+');">Delete</button></td></tr>';
																		}
																		else{ innerData+='</tr>';}
				document.getElementById("cart").insertRow(-1).innerHTML =innerData;
								subtotal+=amount;

	}

	document.getElementById("cart").insertRow(-1).innerHTML = '<tr ><td style="text-align:right;" id="dark" colspan=7>Subtotal  :  </td><td id="dark" colspan=2>'+subtotal+'</td></tr>';
	document.getElementById("cart").insertRow(-1).innerHTML = '<tr ><td style="text-align:right;" colspan=7 id="dark">Tax Fees  :  </td><td id="dark" colspan=2>'+Math.floor(subtotal*0.05)+'</td></tr>';
	document.getElementById("cart").insertRow(-1).innerHTML = '<tr ><td style="text-align:right;" colspan=7 id="dark">Total  :  </td><td id="dark" colspan=2>'+(subtotal+Math.floor(subtotal*0.05))+'</td></tr>';

}
function DeleteCart(id){
	if(id != "")
	{
		$.ajax({
			type : "DELETE",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Cart/"+id+"/",
			dataType: "json",
			success: function(){
				alert("Delete successful");
				nowcartNum=sessionStorage.getItem('navCartNum')-1;
				sessionStorage.setItem('nowcartNum',nowcartNum);
				document.getElementById('lblCartCount').innerHTML=nowcartNum;
      RetrieveCart();
			}
		});
}
}
////////////////////////////////////////////order/////////////////////
var user_cardNum;
function calluserdata(){
  var user_id=sessionStorage.getItem('customerId');
  $('#address').show();
  $('#checkbtns').hide();
  if(user_id != "")
  {

    $.ajax({
      type : "GET",
      contentType: "application/json; charset=utf-8",
      url : "http://localhost:8000/CustomerCheck/",
      data:{user_id:user_id},

      // async: false,
      dataType: "json",
      success:function(data){

        user_name=data[0].name;
        user_phonenumber=data[0].phone_Number;
        user_address=data[0].address;
        user_cardNum=data[0].card_Number;
        document.getElementById('user_data').innerHTML="Name : <label>"+ user_name +"</label><br>Phone_Number : <label id='oldphone'>" + user_phonenumber +"</label><br>Address : <label id='oldaddress'>" + user_address +"</label>";
      },
    }).then(function(data){
         });
  }

};

function insertorderform(userAddress){

  var customer_id=sessionStorage.getItem('customerId');

   var phone;
   var address;

  if (userAddress=='old'){
    phone = document.getElementById('oldphone').innerHTML;
    address=document.getElementById('oldaddress').innerHTML;
  }
  else{

    phone = $('#ph_no').val();
    address=$('#newAddress').val();

  }
   if( phone != "" && address !="")
  {
    var rowData = {
      "customer_id": customer_id,
      "address": address,
      "phone_Number": phone,
      "card_Number": user_cardNum,
    };

    $.ajax({
      type: "POST",
      contentType : "application/json; charset=utf-8",
      url : "http://localhost:8000/Invoice/",
      data : JSON.stringify(rowData),
      dataType: "json",
      success: function(){
        $.ajax({
      type: "GET",
      contentType : "application/json; charset=utf-8",
      url : "http://localhost:8000/LastInvoice/",
      dataType: "json",
      success: function(data){
				console.log(data);
				if(data.length==0){invoiceID=0;}
				else{invoiceID= data[0].id;}


      if(buyData!=null){

        addOrder(buyData,invoiceID);
      }
      else {
				addOrder(cartData,invoiceID);
      }
		},
    });

      },
    });
  }
  else
  {
    alert("Please fill  all fields.");
  }

 };
 function addOrder(data,invoiceID) {
	 for(i=0;i<data.length;i++){
		 rowData={
			 invoice_id:invoiceID,
			 product_id:data[i].id,
			 order_Quantity:data[i].storedQty,
		 }
		 $.ajax({
			 type: "POST",
			 contentType : "application/json; charset=utf-8",
			 url : "http://localhost:8000/Order/",
			 data : JSON.stringify(rowData),
			 dataType: "json",
			 success: function(){
				 if(buyData!=null){
					 sessionStorage.removeItem('buyData');
				 }
				 else {
					 $.ajax({
						 type: "GET",
						 contentType : "application/json; charset=utf-8",
						 url : "http://localhost:8000/Cart/",
						 data : {customer_id:customerid,state:'deleteCart'},
						 dataType: "json",
						 success: function(){
							 alert("Delete successful");
			 				sessionStorage.setItem('nowcartNum',0);
			 				document.getElementById('lblCartCount').innerHTML=0;
						 },
					 });
				 }
				 	$('#address').hide();
						$('#checkout').hide();
				 document.getElementById('carttableshow').innerHTML='<h2 style="background-color:orange;">Your Order is Successful!</h2><br><a href="home.html"><input type="button" name="" value="Continute Shooping"></a>';
			 },
		 });
	 }
 }
