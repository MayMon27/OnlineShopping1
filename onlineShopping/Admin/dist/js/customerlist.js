function showCustomerList() {
  // document.getElementById('customerByEmail').value="";
  document.getElementById('addProduct').hidden=true;
  document.getElementById('breadcrumb-item').innerHTML="CustomerList";
 document.getElementById('card-title').innerHTML="Customer Data";
 document.getElementById('addProduct').hidden=true;
 document.getElementById('categories').hidden=true;
 document.getElementById('showDTTable').hidden=false;

 document.getElementById('th1').innerHTML="ID";
document.getElementById('th2').innerHTML="Name";
document.getElementById('th3').innerHTML="Email";
document.getElementById('th4').innerHTML="Phone";
document.getElementById('th5').innerHTML="Address";
document.getElementById('th6').innerHTML="Joined_Date";
document.getElementById('th7').innerHTML=" ";
document.getElementById('th8').innerHTML=" ";

// var datatable=$("#dttable").DataTable();
// datatable.rows().remove();
// var rowdata="";

  RetrieveCustomer("All");
}
function RetrieveCustomer(email){
  document.getElementById("editCustomer").hidden=true;
  document.getElementById("showDTTable").hidden=false;
  document.getElementById("welcome").hidden=true;

  var datatable=$("#dttable").DataTable();
  datatable.rows().remove();
  var rowdata="";
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/Customer/",
		dataType: "json",
    beforeSend: function() {
      $('#load').show();
    },
    success: function(data){
      document.getElementById('tablebody').innerHTML=null;
      for (let i=0; i<data.length; i++){

        datatable.row.add([

           rowdata+data[i].id,
           rowdata+data[i].name,
           rowdata+data[i].email,
           rowdata+data[i].phone_Number,
           rowdata+data[i].address,
           rowdata+data[i].join_Date,
           rowdata+'<button type="button" class="btn btn-warning btn-md" data-toggle="modal" data-target="#employeeUpdateModal" onclick="ShowEachCustomer('+data[i].id+');">Detail</button>',
           rowdata+'<button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#employeeDeleteModal" onclick="DeleteCustomer('+data[i].id+');">Delete</button>',

        ]).draw(false);
      }

 },
 complete:function(data) {
   $('#load').hide();
 }
});
};
function cancelEdit() {
  document.getElementById('showDTTable').hidden=false;
  // document.getElementById('editCustomer').hidden=True;
  $('#editCustomer').hide();
};
