function customerHistory(){
  navCartNum=sessionStorage.getItem('navCartNum');
	document.getElementById('lblCartCount').innerHTML=navCartNum;
	var customer_id = sessionStorage.getItem('customerId');
  if(customer_id)
  {
    $.ajax({
			type : "GET",
      contentType: "application/json; charset=utf-8",
			url : "http://localhost:8000/OrderList/",
       data:{customer_id:customer_id},
		  dataType: "json",
      success:function(data){
				console.log(data);
				if(data.length==0){
					document.getElementById('customerHistory').innerHTML="<h3>There is no History!</h3>";
				}
				else{
					var orderData;
					var subtotal=0;
					var invoiceID=0;
					header1='<div class="container" align="center" ><table ><tr id="dark" align="right"><td colspan="7"><h3>';
				 	header2='</h3></td></tr><tr class="thead" id="dark" ><th style="width:10%"></th><th style="width:10%;text-align:center;">Name</th><th style="width:5%;text-align:center;">Color</th><th style="width:5%;text-align:center;">Size</th><th style="width:5%">Price</th><th style="width:3%;text-align:center;">Qty</th><th style="width:5%;text-align:center;">Amount</th></tr>' ;
					endTable1= '<tr ><td style="text-align:right;" id="dark" colspan=6>Subtotal  :  </td><td id="dark" colspan=2>';
					endTable2= '</td></tr><tr ><td style="text-align:right;" colspan=6 id="dark">Tax Fees  :  </td><td id="dark" colspan=2>';
					endTable3= '</td></tr><tr ><td style="text-align:right;" colspan=6 id="dark">Total  :  </td><td id="dark" colspan=2>';
					endTable4='</td></tr></table></div>';

	        for (i=0;i<data.length;i++){

						amout=data[i].price*data[i].storedQty;

						if(i==0 ){

							invoiceID=data[i].productCode;

							$("#customerHistory").append(header1);
							$("#customerHistory").append(data[i].stored_Date);
							$("#customerHistory").append(header2);
						}
						if ( invoiceID!=data[i].productCode ) {
							invoiceID=data[i].productCode;
							$("#customerHistory").append(endTable1+subtotal+endTable2+Math.floor(subtotal*0.05)+endTable3+(subtotal+Math.floor(subtotal*0.05))+endTable4);
							$("#customerHistory").append(header1);
							$("#customerHistory").append(data[i].stored_Date);
							$("#customerHistory").append(header2);
							subtotal=0;

				  		}

    				orderData="<tr ><td ><img  style='width:100px;'src='"+data[i].imageOne+"'/></td><td>"+data[i].name+"</td><td>"+data[i].color+"</td><td>"+data[i].size+"</td><td>"+data[i].price+"</td><td>"+data[i].storedQty+"</td> <td>"+amout+"</td></tr><br><br>";
	 					$("#customerHistory").append(orderData);
						subtotal+=amout;
	  				if( i==(data.length-1)){
							$("#customerHistory").append(endTable1+subtotal+endTable2+Math.floor(subtotal*0.05)+endTable3+(subtotal+Math.floor(subtotal*0.05))+endTable4);

						}
				  }
				}
      },
    });
	}

}
function showDetail() {
	alert('detail');
}
