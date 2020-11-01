const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


 async function getOption() {
  var productcode = document.getElementById("productcode").value;
  var description=document.getElementById("description").value;
  var brand=document.getElementById("brand").value;
  var price=document.getElementById("price").value;
  main_Categories=document.querySelector('#select1').value;
  var table = document.getElementById("dataTable");
  var rowCount = table.rows.length;
  for(i=2;i<rowCount;i++){
    for(j=1;j<3;j++){
      var bb=i+" "+j;
    }
  }

/////////////
// var rowCount = table.rows.length;
for(i=2;i<rowCount;i++){
  for(j=6;j<8;j++){
     cc="i"+i+""+j;
     let  ee=document.querySelector("#"+cc).files[0];
      if(ee){
        gg=await toBase64(ee);
        num1=i+" "+(j-2);
        document.getElementById(num1).value=gg;
      }
    }
}

  productcode=document.getElementById('productcode').value;
  name=document.getElementById('productname').value;
  categories=document.querySelector('#select1').value;
  brand=document.getElementById('brand').value;
  description=document.getElementById('description').value;
  price=document.getElementById('price').value;

  table=$("#myForm").serializeArray();
  // console.log(table);

var postdata=[];
// console.log("*********************************");
for (var i=0;i<table.length;i+=5){
  // console.log(table[i].value);
  var rowData={
    "productCode":productcode,
    "name":name,
    "categories_id":categories,
    "brand":brand,
    "description":description,
    "price":price,
    "color": table[i].value,
    "size": table[i+1].value,
    "imageOne": table[i+3].value,
    "imageTwo": table[i+4].value,
    "storedQty": table[i+2].value,
  };
  // console.log('in loop');
   console.log(rowData);

  $.ajax({
    type : "POST",
    contentType: "application/json; charset=utf-8",
    url : "http://localhost:8000/Product/",
    data:JSON.stringify(rowData),
    dataType: "json",
    success:function(){
      alert("Successfully Inserted!");
      // clear Data
      maxproductcode();
      document.getElementById("description").value=" ";
      document.getElementById("productname").value=" ";
      document.getElementById("brand").value=" ";
      document.getElementById("price").value=" ";
      document.querySelector('#select1').value="All";
      document.getElementById("addPdtBody").innerHTML="<tr><th scope='row' ></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";

    }
  });
}
// console.log("#####################################");

};

function addRow(tableID) {

  var table = document.getElementById(tableID);


  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);


  var cell1 = row.insertCell(0);
  var element1 = document.createElement("input");
  element1.type = "checkbox";
  element1.name="chkbox[]";

  cell1.appendChild(element1);

  var cell2 = row.insertCell(1);
   var element1 = document.createElement("input");
  element1.type = "text";
  element1.name = "txtbox[]";
  element1.style='width:150px;';
  element1.id=rowCount+" "+1

  element1.contenteditable='true';
  cell2.appendChild(element1);

  var cell3 = row.insertCell(2);
  var element2 = document.createElement("input");
  element2.type = "text";
  element2.name = "txtbox[]";
  element2.style='width:150px;';
  element2.id=rowCount+" "+2

  cell3.appendChild(element2);

  var cell4 = row.insertCell(3);
  var element3 = document.createElement("input");
  element3.type = "text";
  element3.name = "txtbox[]";
  element3.style='width:150px;';
  element3.id=rowCount+" "+3;
  cell4.appendChild(element3);


  var cell5 = row.insertCell(4);
  var element4 = document.createElement("input");
  element4.type="text";
  element4.name = "txtbox[]";
  element4.style='width:100px;';
  element4.hidden="true";
  element4.id=rowCount+" "+4;
  cell5.appendChild(element4);

  var cell6 = row.insertCell(5);
  var element5 = document.createElement("input");
  element5.type="text";
  element5.name = "txtbox[]";
  element5.style='width:100px;';
  element5.hidden="true";
  element5.id=rowCount+" "+5;
  cell6.appendChild(element5);

  var cell7 = row.insertCell(6);
  var element6 = document.createElement("input");
  element6.type = "file";
  element6.id="i"+rowCount+""+6;
  element6.name = "filebutton[]";
  element6.style='width:150px;';
  cell7.appendChild(element6);

  var cell8 = row.insertCell(7);
  var element7 = document.createElement("input");
  element7.type = "file";
  element7.id="i"+rowCount+""+7;
  element7.name = "filebutton[]";
  element7.style='width:150px;';
  cell8.appendChild(element7);



}

function deleteRow(tableID) {
  try {
  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;

  for(var i=0; i<rowCount; i++) {
    var row = table.rows[i];
    var chkbox = row.cells[0].childNodes[0];
    if(null != chkbox && true == chkbox.checked) {
      table.deleteRow(i);
      rowCount--;
      i--;
    }


  }
  }catch(e) {
    alert(e);
  }
 }

 function pulldata(){
   catselect();
   maxproductcode();
 }

 function catselect(){
  $.ajax({
    type : "GET",
    contentType: "application/json; charset=utf-8",
    url : "http://localhost:8000/Categories/",
    dataType: "json",
    success:function(data){
      // console.log(data);
      var catOptions="<option value='All'>All</option>";
      for(i=0;i<data.length;i++){
        catOptions+= "<option value="+data[i].id+">"+data[i].parent_Categories+" "+data[i].child_Categories+"</option>";
      }
      document.getElementById('select1').innerHTML=catOptions;
    }

 });
}


function maxproductcode(){
  var name="max";
 $.ajax({
   type : "GET",
   contentType: "application/json; charset=utf-8",
   url : "http://localhost:8000/SearchedProduct/",
   dataType: "json",
   data:{'name':name},
   success:function(data){
     // console.log(data);

     document.getElementById('productcode').value=data[0].productCode+1;
   }

});
}

function AddnewProduct() {
  pulldata();
  document.getElementById('breadcrumb-item').innerHTML="Add New Products";
 document.getElementById('card-title').innerHTML="Add  Products";
  document.getElementById('addProduct').hidden=false;
  document.getElementById('showDTTable').hidden=true;
  document.getElementById("editCustomer").hidden=true;
  document.getElementById("welcome").hidden=true;
  document.getElementById('categories').hidden=true;
}
