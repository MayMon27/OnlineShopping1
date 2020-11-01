var jnow=1;
var showdata;
$(document).ready(
	function() {
		$('#cart').show();
		$('#h1img').show();
    $('#list').hide();
		$('#rev').hide();
		$('#tab').hide();
    RetrieveSelect();
    RetrieveSelectChild();
	}
);

function RetrieveSelect(){
	$('#parent').empty();
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/CategoriesParent/",
		data:{parent_Categories:"All"},
		dataType: "json",
	}).then(function(data){
    var nowCategories='aa';
    var test='<option>All</option>';
		for(var i=0; i<data.length; i++){
        var parent_Categories = data[i].parent_Categories;
        test+='<option>'+parent_Categories+'</option>';
		}
    document.getElementById("parent").innerHTML =test;
	});
};

function RetrieveSelectChild(){
	$('#child').empty();
		$.ajax({
		 type: "GET",
		 contentType: "application/json; charset=utf-8",
		 url: "http://localhost:8000/Categories/",
		 dataType: "json",
	 }).then(function(data){
			var test='<option>All</option>';
		 for(var i=0; i<data.length; i++){
				var child_Categories = data[i].child_Categories;
				test+='<option>'+child_Categories+'</option>';
		 }
			document.getElementById("child").innerHTML =test;
	 });
};

function Search() {
	$('#cart').show();
	$('#h1img').hide();
	$('#list').show();
	$('#rev').hide();
	$('#tab').hide();
  var m=document.getElementById("parent").value;
  var c=document.getElementById("child").value;
	var categories_id;


	if(m!="All" && c=="All")
	{
		$.ajax({
			type : "GET",
			contentType: "application/json; charset=utf-8",
			url : "http://localhost:8000/QQPM/",
			 data:{parent_Categories:m},
			// async: false,
			dataType: "json",
			beforeSend: function() {
     $('#load').show();
   },
			success:function(data){
				showdata=data;
				show(showdata);
			},
			complete:function(data) {
   $('#load').hide();
 }
		}).then(function(data){


		 });
	}
	else{
		if(m== 'All' && c=='All'){
			categories_id='All';
			ProductByCategoriesId(categories_id);
		}
		else if (m!= 'All' && c!='All'){

			$.ajax({
				type : "GET",
	      contentType: "application/json; charset=utf-8",
				url : "http://localhost:8000/SelectCategoriesId/",
	      data:{parent_Categories:m,child_Categories:c},
			  dataType: "json",
				beforeSend: function() {
     $('#load').show();
   },
	      success:function(data){
	        categories_id=data[0].id;
					ProductByCategoriesId(categories_id);
	      },
				complete:function(data) {
   $('#load').hide();
 }

		});

		}

	}

	}
	function ProductByCategoriesId(categories_id) {

		$.ajax({
		 type : "GET",
			contentType: "application/json; charset=utf-8",
		 url : "http://localhost:8000/ProductByCategoriesId/",
			 data:{categories_id:categories_id},
			dataType: "json",
			beforeSend: function() {
     $('#load').show();
   },
			success:function(data){
				showdata=data;
				show(showdata);
			},
			complete:function(data) {
   $('#load').hide();
 },

		});
	}

///////////////////////////////////////////////////////////////

function show(data) {
	var tbodydata="";
	var count=0;
var i=0;
var imin=0;
var imax=0;
var jcount=Math.floor(data.length/12)+1;

imin=(jnow-1)*8;
if(jnow*8<=data.length){
	imax=jnow*8;
}
else{

	imax=data.length;
}
		for(var i=imin;i<imax;i++){

		if(count==0){
			tbodydata+='<tr>';
		}
		if(count==4 || count==data.length){
			tbodydata+='</tr>';
			count=0;
		}
		tbodydata+="<td onclick='detail("+data[i].productCode+");'><img src="+data[i].imageOne+" style='width:200px;height:250px;margin:40px;'><h4 align='center'>"+data[i].name+"</h4><h4 align='center'>$"+data[i].price+"</td>";
		count++;

	 }
	 if(jnow==1){
	 	document.getElementById("b2").hidden=true;
	 }
	 else{
	 	document.getElementById("b2").hidden=false;

	 }

	 if(data.length<imax+1){
	 	document.getElementById("b1").hidden=true;
	 }
	 else {
	 	document.getElementById("b1").hidden=false;

	 }
	document.getElementById("searchproduct").innerHTML=tbodydata;


}
function next() {
		jnow++;
	show(showdata);
}
function previous() {
	jnow--;
	show(showdata);
}

//////////////////////////////////////////////////////////////////
function TPTC(){
  var p = document.getElementById("parent").value;
  var c = document.getElementById("child").value;

  if(p != "" && c != "")
  {
    $.ajax({
			type : "GET",
      contentType: "application/json; charset=utf-8",
			url : "http://localhost:8000/TPTCCategories/",
       data:{parent_Categories:p,child_Categories:c},

		  dataType: "json",
      success:function(data){
				var test="<option>All</option>";
				for(var i=0;i<data.length;i++)
				{
					var c = data[i].child_Categories;
						test+='<option>'+c+'</option>';
					}
				document.getElementById("child").innerHTML=test;

      },


    }).then(function(data){


     });
	}
	else
	{
		alert("Fail to process!");
	}
};

function detail(productCode) {
   sessionStorage.setItem("productCode",productCode);
	 location.href="productDetail.html";
}
