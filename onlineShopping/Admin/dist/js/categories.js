function categories() {
  document.getElementById('addProduct').hidden=true;
  document.getElementById('breadcrumb-item').innerHTML="Categories";
 document.getElementById('card-title').innerHTML="Categories";
 document.getElementById('addProduct').hidden=true;
 document.getElementById('editCustomer').hidden=true;
  document.getElementById('showDTTable').hidden=true;
 document.getElementById("welcome").hidden=true;
  document.getElementById('categories').hidden=false;
  RetrieveCategories();
}
function RetrieveCategories(){
	$('#categoriesTableBody').empty();
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/Categories/",
		dataType: "json",
	}).then(function(data){
		for(var i=0; i<data.length; i++){
			var id = data[i].id;
			var parent_Categories = data[i].parent_Categories;
			var child_Categories = data[i].child_Categories;
			document.getElementById("categoriesTableBody").insertRow(-1).innerHTML = '<tr><td>'+id+'</td>'+
																			'<td>'+parent_Categories+'</td>'+
																			'<td>'+child_Categories+'</td>'+
																			'<td><button type="button" class="btn btn-info btn-md" data-toggle="modal" data-target="#categoriesUpdateModal" onclick="InsertDataIntoCategoriesUpdateModal('+id+');">EDIT</button></td></tr>';
		}
	});
};

// -------------------------------------------------------------------------------------

function InsertDataIntoCategoriesUpdateModal(id){
	if(id != "")
	{
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8000/Categories/"+id+"/",
			dataType: "json",
		}).then(function(data){
			$('#uId').val(data.id);
			$('#uParent').val(data.parent_Categories);
			$('#uChild').val(data.child_Categories);
		});
	}
	else
	{
		alert("ID is null");
	}
};

// ------------------------------------------------------------------------------------------------------------------

function CreateCategories(){
	// var id = document.getElementById("reId").value;
	var parent = document.getElementById("reP").value;
	var child = document.getElementById("reC").value;

	if(parent != "" && child != "")
	{
		var postData = {
			// "id":id,
			"parent_Categories": parent,
			"child_Categories": child,
		};
		$.ajax({
			type: "POST",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Categories/",
			data : JSON.stringify(postData),
			dataType: "json",
			success: function(){
				ClearCategoriesRegisterModal();
        RetrieveCategories();
				$('#showCategories').click();
			}
		});
	}
	else
	{
		alert("Please fill out this fields.");
	}
};

// ----------------------------------------------------------------------------------------------------------------

function ClearCategoriesRegisterModal(){
	// document.getElementById("reId").value = "";
	document.getElementById("reP").value = "";
	document.getElementById("reC").value = "";
	//
	$('#categoriesRegisterModal').modal('hide');
};
// -----------------------------------------------------------------------------------------
// Update Employee Information by id
function UpdateCategories(){
	var id = document.getElementById("uId").value;
	var parent = document.getElementById("uParent").value;
	var child = document.getElementById("uChild").value;

	if(id != "" && parent != "" && child != "")
	{
		var putData = {
			"id": id,
			"parent_Categories": parent,
			"child_Categories": child,
		};
		$.ajax({
			type : "PUT",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Categories/"+id+"/",
			data : JSON.stringify(putData),
			dataType: "json",
			success: function(){
				ClearCategoriesUpdateModal();
        RetrieveCategories();
				$('#showCategories').click();
			}
		});
	}
	else
	{
		alert("Please insert data!");
	}
};

// -------------------------------------------------------------------------------------------------------------------

function DeleteCategories(){
	var id = document.getElementById("uId").value;
	if(id != "")
	{
		$.ajax({
			type : "DELETE",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Categories/"+id+"/",
			dataType: "json",
			success: function(){
				ClearCategoriesUpdateModal();
        RetrieveCategories();
				$('#showCategories').click();
			}
		});
	}
	else
	{
		alert("Please insert categories ID");
	}
};
// -----------------------------------------------------------------------------

function ClearCategoriesUpdateModal(){
	document.getElementById("uId").value = "";
	document.getElementById("uParent").value = "";
	document.getElementById("uChild").value = "";
	//
	$('#categoriesUpdateModal').modal('hide');

};

// ----------------------------------------------------------------------------------------------------------------------------
