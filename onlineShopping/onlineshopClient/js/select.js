function Fashion() {
  var shion=document.getElementsByName("fashion");
  if(shion[0].value=="Men's Fashion"){
  location.replace("MenFashion.html");
  }

}

function Color(){
  var c1=document.getElementsByName("color");
  if(c1[0].value=="Grey"){
     location.replace("shirt11.html");

}

}

function Save() {
  alert("You cart has been save!")
}
