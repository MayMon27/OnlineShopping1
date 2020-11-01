var customerId=sessionStorage.getItem('customerId');
var productCode=sessionStorage.getItem('productCode');
var nowPDId;
var buyData;
var buyImage;
var buyState;
 var ratingStar=0;

function sizeSelect(now){

  $.ajax({
    type : "GET",
    contentType: "application/json; charset=utf-8",
    url : "http://localhost:8000/SearchedProduct/",
     data:{'productCode':productCode,'size':now,'name':'selectsize'},
    dataType: "json",
    success:function(data){
      if(now=='true'){
        var sizeOptions="<option value='All'>All</option>";
        for(i=0;i<data.length;i++){
          sizeOptions+= "<option value="+data[i].size+">"+data[i].size+"</option>";
        }
        document.getElementById('size').innerHTML=sizeOptions;
      }
      else {
        var colorOptions;
        for(i=0;i<data.length;i++){
          colorOptions+= "<option value="+data[i].color+">"+data[i].color+"</option>";
        }
        colorOptions+="<option value='All'>All</option>";
        document.getElementById('color').innerHTML=colorOptions;
      }
    },
  }).then(function(data){
 });
}
////////////////////////
function colorSelect(now){
  $.ajax({
    type : "GET",
    contentType: "application/json; charset=utf-8",
    url : "http://localhost:8000/SearchedProduct/",
     data:{'productCode':productCode,'color':now,'name':'selectcolor'},
    dataType: "json",
    success:function(data){
      if(now=='true'){
        var colorOptions="<option value='All'>All</option>";
        for(i=0;i<data.length;i++){
          colorOptions+= "<option value="+data[i].color+">"+data[i].color+"</option>";
        }
        document.getElementById('color').innerHTML=colorOptions;
      }
      else {
        var sizeOptions;
        for(i=0;i<data.length;i++){
          sizeOptions+= "<option value="+data[i].size+">"+data[i].size+"</option>";
        }
        sizeOptions+="<option value='All'>All</option>";
        document.getElementById('size').innerHTML=sizeOptions;
      }
    },
  }).then(function(data){
 });
}
///////////////////////////
  function sizechange() {
    var size=$("#size").val();
    if(size=='All'){ colorSelect('true');}
    else {sizeSelect(size);}
  }
  function colorchange() {
    var color=$("#color").val();
    if(color=='All'){ sizeSelect('true');}
    else {colorSelect(color);}

  }
///////////////////////////////////
function showDetail(pduCode) {
  productCode=pduCode;
  sessionStorage.setItem('productCode',pduCode);
  productDetail();
}
////////////////////////
function relatedItem(categoriesId){
  $.ajax({
    type : "GET",
    contentType: "application/json; charset=utf-8",
    url : "http://localhost:8000/SearchedProduct/",
     data:{'productCode':productCode,'categoriesId':categoriesId},
    dataType: "json",
    success:function(data){
      var rldData="";

      for(i=0;i<data.length;i++){

        rldData+= "  <td style='padding:7px;' onclick='showDetail("+data[i].productCode+")' ><img src="+data[i].imageOne+" style='width:200px;height:200px;'><h4>"+data[i].name+"</h4><h4>"+data[i].price+"</h4></td>";
        if(i==5){i=data.length;}
      }
      document.getElementById('rldItems').innerHTML=rldData;
    },
  }).then(function(data){
 });
}
///////////////////////////
function rating(productCode){

  $.ajax({
    type : "GET",
    contentType: "application/json; charset=utf-8",
    url : "http://localhost:8000/ProductRating/",
     data:{'productCode':productCode},
    dataType: "json",
    success:function(data){
      cusNum=0;
      rate=0;
      document.getElementById('rating1').innerHTML=" ";
      if(data.length!=0 ){
        rate=(data[0].rating_Value)/(data[0].customer_id);
        cusNum=data[0].customer_id;
      }

      var ratingValue = rate;
      for (var j = 1; j <= 5; j++) {
      $("#rating1").append('<i class="fa fa-star' + ((j <= ratingValue) ? '' : ((j < ratingValue + 1) ? '-half-o' : '-o')) + '" aria-hidden="true"></i>');

      }
      $("#rating1").append((" "+cusNum));
    },
  }).then(function(data){
 });

}
////////////////////////////
function productDetail(){
  loadNav();

  document.getElementById('commentTableBody').innerHTML=" ";
  $.ajax({
    type : "GET",
    contentType: "application/json; charset=utf-8",
    url : "http://localhost:8000/SearchedProduct/",
     data:{'productCode':productCode,'color':'false'},
    dataType: "json",
    success:function(data){
      nowPDId=data[0].id;
      document.getElementById('name').innerHTML=data[0].name;
      document.getElementById('brand').innerHTML="Brand:<label style='color:lightblue;'/>"+data[0].brand;
      document.getElementById('price').innerHTML="Price:<label style='color:orange;'/>"+data[0].price;
      document.getElementById('description').innerHTML="Detail:"+data[0].description;
      var slideNumData="";
      var slideImgData="";
      var imgCount=0;
      for(i=0;i<data.length;i++){

        if(data[i].imageOne!="" ){

          if(imgCount==0){
            buyImage=data[i].imageOne;
            console.log(buyImage);
            slideNumData+="<li data-target='#myCarousel' data-slide-to='"+imgCount+"' class='active'>";
            slideImgData+="<div class='item active'><img  src="+data[i].imageOne+"  style='width:100%;height:400px;'></div>";
          }
          else {
            slideNumData+="<li data-target='#myCarousel' data-slide-to="+imgCount+" >";
          slideImgData+="<div  class='item'><img  src="+data[i].imageOne+"  style='width:100%;height:400px;'></div>";

        }
          imgCount++;
        }

        if(data[i].imageTwo!=""){
          slideNumData+="<li data-target='#myCarousel' data-slide-to='"+imgCount+"' >";
          slideImgData+="<div class='item'><img  src="+data[i].imageTwo+"  style='width:100%;height:400px;'></div>";
          imgCount++;
        }
      }
      if(imgCount==1){
        document.getElementById('slideBtn').hidden=true;
        document.getElementById('slideNum').hidden=true;
        document.getElementById('urRating').hidden=true;
    }
      document.getElementById('slideNum').innerHTML=slideNumData;
      document.getElementById('slideImg').innerHTML=slideImgData;
      sizeSelect('true');
      colorSelect('true');
      relatedItem(data[0].categories_id);
      rating(productCode);
      console.log(customerId);
      if(!customerId){
        $('#customerRateStar').hide();
        $('#customerReview').hide();
        $('#urRating').hide();

      }
      else {
        productCheck(customerId,productCode);

      }
    },
  }).then(function(data){
 });
}
//////////////////////////////productCheck in orderlist////////////
function productCheck(customerId,productCode) {
$.ajax({
    type : "GET",
    contentType: "application/json; charset=utf-8",
    url : "http://localhost:8000/Invoice/",
     data:{'customer_id':customerId,'productCode':productCode},
    dataType: "json",
    success:function(data){
      console.log(data);
      if(data.length==0){
        $('#customerRateStar').hide();
        $('#customerReview').hide();
          $('#urRating').hide();
      }
      else{

        $('#customerReview').show();

      document.getElementById('rating2').innerHTML=" ";
  $.ajax({
    type : "GET",
    contentType: "application/json; charset=utf-8",
    url : "http://localhost:8000/ProductRating/",
     data:{'customer_id':customerId,'productCode':productCode},
    dataType: "json",
    success:function(data){

      if(data.length!=0 ){
        ratingValue=(data[0].rating_Value);
        for (var j = 1; j <= 5; j++) {
        $("#rating2").append('<i class="fa fa-star' + ((j <= ratingValue) ? '' : ((j < ratingValue + 1) ? '-half-o' : '-o')) + '" aria-hidden="true"></i>');
        $('#customerRateStar').hide();
        }
      }
      else {
        $("#rating2").hide();
        $('#customerRateStar').show();
      }

    },
  })

      }
    },
  });
}
/////////////////////////////////////////////productDetailEnd/////////////////////
function buy(state) {

    color=document.getElementById('color').value;
    size=document.getElementById('size').value;
    qty=document.getElementById('qty').value;
    console.log(size+""+color);
    if(size=="All" || color=="All"){
       alert('Select Size and Color!!');
     }
    else{
      customerId=sessionStorage.getItem('customerId');
      if(!customerId){

          $('#loginModal').modal('show');

      }
      else{
        buyItem(state);

    }
  }

}

function buyItem(state) {
  sessionStorage.setItem('buyState',state);

      $.ajax({
        type : "GET",
        contentType: "application/json; charset=utf-8",
        url : "http://localhost:8000/SearchedProduct/",
         data:{'productCode':productCode,'size':size,'color':color},
        dataType: "json",
        success:function(data){

          if(state=='buy'){
            data[0].storedQty=qty;
            if(!data[0].imageOne){data[0].imageOne==buyImage;}
            // alert(data[0].imageOne;)
            sessionStorage.setItem('buyData',JSON.stringify(data));
            location.href='cartList.html';
          }
          else{
            var rowData={
              "customer_id":customerId,
              "product_id":data[0].id,
              "quantity":qty,
            }
            addItem(rowData);
          }
        },
      })

}
function addItem(rowData) {

  $.ajax({
    type : "POST",
    contentType: "application/json; charset=utf-8",
    url : "http://localhost:8000/Cart/",
    data:JSON.stringify(rowData),
    dataType: "json",
    success:function(){
      alert(" Added to Cart!");
      var aa=parseInt(document.getElementById('lblCartCount').innerHTML);
      if(aa>=1){  aa=aa+1;}
      else{aa=1}
      document.getElementById('lblCartCount').innerHTML=aa;
      sessionStorage.setItem('navCartNum',aa);

    }
  });
}
////////////////////////////////////////////////Buy/CartEnd/////////////////////////////////

function RetrieveComment(){
	$('#commentTableBody').empty();
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/productComment/",
    data:{'productCode':productCode},
		dataType: "json",
		success:function(data){
      console.log(data);
			if(data.length!=0){
        var test="";
  			for(var i=0; i<data.length; i++){
          console.log(data[i]);
  				var name=data[i].name;
  				var date = data[i].join_Date;
  				var message = data[i].address;
  				test+='<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="font-size:50px;">'+
  							'<path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>'+
  							'<path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>'
  						+'</svg>'+name+'<h5>'+date+'</h5>'+message+'<hr>'
  		}
  				document.getElementById("commentTableBody").innerHTML =test;
      }
      else {
        document.getElementById("commentTableBody").innerHTML ="  Sorry,No Review.  ";
      }
		}
	}).then(function(data){

	});

};
/////////////////////////commentModal
function CreateComment(){
	var message = document.getElementById("reM").value;
     if(message != "")
  {
    customerId=sessionStorage.getItem('customerId');
    var rowData = {
      "customer_id": customerId,
      "product_id":nowPDId,
      "productCode": productCode,
      "message": message,
    };
    console.log(rowData);

    $.ajax({
      type: "POST",
      contentType : "application/json; charset=utf-8",
      url : "http://localhost:8000/Comment/",
      data : JSON.stringify(rowData),
      dataType: "json",
      success: function(){
        ClearCommentModal();
        RetrieveComment();

      }
    });
  }
  else
  {
    alert("Please fill out this fields.");
  }

}

function ClearCommentModal(){
	document.getElementById("reM").value = "";
	$('#commentModal').modal('hide');
};
///////////////////////////////////////////Customer Rating//////////////////
$(function() {
    $("div.star-rating > s, div.star-rating-rtl > s").on("click", function(e) {
    $(this).closest('div').find('.active').removeClass('active');

    $(e.target).parentsUntil("div").addClass('active'); // all elements up from the clicked one excluding self
    $(e.target).addClass('active');  // the element user has clicked on


        var numStars = $(e.target).parentsUntil("div").length+1;
        btn='&nbsp;&nbsp;<button type="button"  name="button" class="btn btn-success"  id="btnStar"  onclick="customRating('+numStars+');">Rate</button>';
        document.getElementById('show-result').innerHTML=numStars + (numStars == 1 ? " star " : " stars! ")+btn;

    });
});
//////////////////////////Insert///
function customRating(ratingStar) {

  var rowData = {
    "customer_id": customerId,
    "product_id":nowPDId,
    "productCode": productCode,
    "rating_Value": ratingStar,
  };
   console.log(rowData);

  $.ajax({
    type: "POST",
    contentType : "application/json; charset=utf-8",
    url : "http://localhost:8000/Rating/",
    data : JSON.stringify(rowData),
    dataType: "json",
    success: function(){
      alert('Thanks for Rating!');
      $('#show-result').hide();
      rating(productCode);
      document.getElementById('show-rating').hover.disable=true;

    }
  });

}
