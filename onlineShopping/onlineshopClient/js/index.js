var user_id="";

function registerForm(state) {

  if(state=="buy"){
      ClearloginModal();
  }

  $('#registerModal').modal('show');
}
function loginHome() {

 $('#loginModal').modal('show');
}
function ClearloginModal(){

	document.getElementById("email").value = "";
	document.getElementById("password").value = "";
	$('#loginModal').modal('hide');

};
function ClearRegisterModal(){

	document.getElementById("rname").value = "";
	document.getElementById("remail").value = "";
  document.getElementById("rpassword").value = "";
  document.getElementById("confirmPassword").value = "";
  document.getElementById("address").value = "";
	document.getElementById("phone").value = "";
  document.getElementById("cardNumber").value = "";
	//
	$('#registerModal').modal('hide');

};
function loadNav(){
 var customerId=sessionStorage.getItem('customerId');
  if(customerId){
    sessionStorage.setItem('cartNum',0);
    $('#login').hide();
  $('#register').hide();
  $('#logout').show();
    $('#profile').show();
    $('#navcart').show();
    $('#history').show();
    showCartNum();
  }
  else {
    $('#login').show();
  $('#register').show();
  $('#logout').hide();
  $('#profile').hide();
  $('#navcart').hide();
  $('#history').hide();
  }
}
function logOut(now) {

  sessionStorage.removeItem('customerId');
  loadNav();

  if(now=='back'){
    location.href="home.html";
  }

  if(now=='admin'){
    location.href="../../../onlineshopClient/home.html";
  }

}

function loginCheck(){
  var user_email = document.getElementById("email").value;
  var user_password = document.getElementById("password").value;

  if(user_email != "" && user_password != "")
  {
    $.ajax({
      type : "GET",
      contentType: "application/json; charset=utf-8",
      url : "http://localhost:8000/Owner/",
       data:{email:user_email,password:user_password},
      dataType: "json",
      success:function(data){
          if(data!=""){
            user_id=data[0].id;

             sessionStorage.setItem('customerId',user_id);
            location.href="../Admin/pages/tables/data.html";
          }


      },
    }).then(function(data){

      $.ajax({
  			type : "GET",
        contentType: "application/json; charset=utf-8",
  			url : "http://localhost:8000/CustomerCheck/",
        data:{email:user_email,password:user_password},
  		  dataType: "json",
        success:function(data){

          if(data.length==0){
              alert("Please login again...");
          }
          else{
            user_id=data[0].id;

            sessionStorage.setItem('customerId',user_id);
            loadNav();
            ClearloginModal();
            showCartNum();
            var state=sessionStorage.getItem('buyState');
            if(state!=null){
              buyItem(state);
            }

          }
        },
      }).then(function(data){
       });
     });

	}
	else
	{
		alert("fill Email and PassWord");
	}
};

 function insertCustomer(state){
   var name = $('#rname').val();
   var email = $('#remail').val();
   var password=$('#rpassword').val();
   var address=$('#address').val();
   var phone=$('#phone').val();
   var cardNumber=$('#cardNumber').val();
   if(name != "" && email != "" && password != "" && address != "" && phone!="" && cardNumber!="")
 	{
 		var postData = {
 			"name": name,
 			"email": email,
 			"password": password,
      "address":address,
 			"phone_Number": phone,
      "card_Number": cardNumber,
 		};
    $.ajax({
      type: "POST",
      contentType : "application/json; charset=utf-8",
      url : "http://localhost:8000/Customer/",
      data : JSON.stringify(postData),
      dataType: "json",
      success: function(){
        ClearRegisterModal();
        alert('Your Registeration is Successfully completed.');
        $('#loginModal').modal('show');
      }
    });
  }
  else
  {
    alert("Please fill  all fields.");
  }

};
//////////////////////////
function RetrieveCustomer(email){
  $('#editCustomer').hide();
	$('#customerTableBody').empty();
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/CustomerCheck/",
		dataType: "json",
    data:{email:email},
    success: function(data){
      for(var i=0; i<data.length; i++){
  			var id = data[i].id;
  			var name = data[i].name;
  			var email = data[i].email;
  			var password = data[i].password;
  			var address = data[i].address;
        var phone = data[i].phone_Number;
        var cardNumber = data[i].card_Number;
        var date = data[i].join_Date;
  			document.getElementById("customerTableBody").insertRow(-1).innerHTML = '<tr><td>'+(i+1)+'</td>'+
                                        '<tr><td>'+id+'</td>'+
  																			'<td>'+name+'</td>'+
  																			'<td>'+email+'</td>'+
  																			'<td>'+password+'</td>'+
  																			'<td>'+address+'</td>'+
                                        '<td>'+phone+'</td>'+
                                        '<td>'+cardNumber+'</td>'+
                                        '<td>'+date+'</td>'+
  																			'<td><button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#employeeUpdateModal" onclick="ShowEachCustomer('+id+');">EDIT</button></td>'+
                                        '<td><button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#employeeDeleteModal" onclick="DeleteCustomer('+id+');">Delete</button></td></tr>';

   }
 }
});
};

/////////////////////////////
function ShowEachCustomer(data){
  if(data=='customer'){
    cartNum=sessionStorage.getItem('navCartNum');
    document.getElementById('lblCartCount').innerHTML=cartNum;
    id=sessionStorage.getItem('customerId');
  }
  else{
    id=data;
    document.getElementById('showDTTable').hidden=true;
     document.getElementById('editCustomer').hidden=false;
     $('#editCustomer').show();
  }

 if(id != "")
 {
   $.ajax({
     type: "GET",
     contentType: "application/json; charset=utf-8",
     url: "http://localhost:8000/Customer/"+id+"/",
     dataType: "json",
   }).then(function(data){
     $('#name').val(data.name);
     $('#email').val(data.email);
     $('#password').val(data.password);
     $('#phone').val(data.phone_Number);
     $('#address').val(data.address);
      $('#cardNumber').val(data.card_Number);
   });
 }
 else
 {
   alert("ID is null");
 }
if(data=="customer"){
  document.getElementById('saveBtn').innerHTML="<button type='button'  class='btn btn-primary' onclick=updateCustomer('"+data+"');>Update</button>"+
                                                "&nbsp;&nbsp;<a href='home.html'><button type='button'  class='btn btn-primary'>Cancel</button></a>";


}
 else{
   document.getElementById('saveBtn').innerHTML="&nbsp;&nbsp;<button type='button'  class='btn btn-primary' onclick='cancelEdit();'>Close</button>";
 }
};


///////////////////////////////
function DeleteCustomer(id){
	if(id != "")
	{
		$.ajax({
			type : "DELETE",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Customer/"+id+"/",
			dataType: "json",
			success: function(){
        RetrieveCustomer();
			}
		});
	}

};
///////////////////////////////////
function updateCustomer(data){
  if(data=='customer'){
    id=sessionStorage.getItem('customerId');
  }
  else {
    id=data;
  }
  var name = $('#name').val();
  var email = $('#email').val();
  var password=$('#password').val();
  var address=$('#address').val();
  var phone=$('#phone').val();
  var cardNumber=$('#cardNumber').val();
  if(name != "" && email != "" && password != "" && address != "" && phone!="" && cardNumber!="")
  {

   var putData = {
     "name": name,
     "email": email,
     "password": password,
     "address":address,
     "phone_Number": phone,
     "card_Number": cardNumber,
   };
   console.log(putData);
    $.ajax({
      type : "PUT",
      contentType : "application/json; charset=utf-8",
      url : "http://localhost:8000/Customer/"+id+"/",
      data : JSON.stringify(putData),
      dataType: "json",
      success: function(){
        if(data=='customer'){location.href='home.html';}
        else {showCustomerList();}

      }
    });
  }
  else
  {
    alert("Please fill Fields!");
  }
};

//////////////////////
function customerByEmail(){
  var email=document.getElementById('customerByEmail').value;

  if(email){
    RetrieveCustomer(email);
  }
  else {
    alert('Fill the Email!');
  }
}
/////////////////////////////
function calluserdata(){
  var user_id = 2;

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
        document.getElementById('user_data').innerHTML="<h2>"+user_name+"</h2><h4>Phone_Number:"+user_phonenumber+
                                                       "</h4><h4>Address:"+user_address+"</h4>";

      },
    }).then(function(data){

         });
  }

}
/////////////////////////////////////////////
function showCartNum() {
  var customerid=sessionStorage.getItem('customerId');

  var cartNum=0;
  if(customerid){
    $.ajax({

    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: "http://localhost:8000/Cart/",
    dataType: "json",
    data:{customer_id:customerid,state:'navBar'},
    success:function(data){
      console.log(data);
      if(data.length!=0){
          cartNum=data[0].quantity;
          sessionStorage.setItem('navCartNum',cartNum);
          document.getElementById('lblCartCount').innerHTML=cartNum;
      }

    },
  });
  sessionStorage.setItem('navCartNum',cartNum);
  document.getElementById('lblCartCount').innerHTML=cartNum;
  }

}

function cartClick() {
  sessionStorage.setItem('buyState',"cart");
  location.href="cartList.html";
}
/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
