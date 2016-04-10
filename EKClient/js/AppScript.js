var baseuri = "http://localhost:61409";
//var baseuri = "https://microsoft-apiappf9dd2bcab98e46909f4b22de40382044.azurewebsites.net";
var Products;
				
///////// Function will execute on document load
function LoadApp(){
	getProducts ();
}

///////// Generic Error Message
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function getProducts() {

    function setHeader(xhr) {

        xhr.setRequestHeader('Authorization', 'bearer goxfuwoZmPiQwb9oZ4DP8fucgsHLeuLe4TYEedXw_FjRcQHIh3W9EjLrVRMsau8BeeL1cIucynS9N1xluXFS46GYpTOY9u2PkGMjVUAwUlhNtuOxgE2PzpAKgtjYwpr7KNGO9qgZIacVGB5jnbOHdJbMr4xrXGPpGcPUNI4fdmybvTeOHM982LPtBxK1ae1rENeNS3QPNRdacwVVkVbzW7PhGGdeWCPS5CEAtWpncPrW5THhruJ6bA4cX_Jz0PmuvHkVIey7-rcbTxC7xNpCr2IeCd2H8tyzZh08JLgUqo375BwtmSGKpz4Z9VNiCNO-JFqeDTGWBV2YBkFNEFO7X5mEnhXEQBoeuEF2cDemlYEgmeno9AP_pNbyyBdqW2CFqbrTA5h19RSxVxE3x45S4hiSeyawHu5dxD_o9DY9r5nLisAiMXT0WZ3lg7Cwule4K3iQWIvKWAlLFO5O9s33feLgkcjJTmlPejuiaUnLjk0');
       // xhr.setRequestHeader('SomethingElse', 'abcdefg');

    }

   /* $.ajax({

        url: 'www.google.com',
        type: 'POST',
        datatype: 'json',
        success: function () { alert("Success"); },
        error: function () { alert('Failure!'); },
        beforeSend: setHeader

    });*/
    
    $.ajax({
        async: false,
        //url: 'https://microsoft-apiappf9dd2bcab98e46909f4b22de40382044.azurewebsites.net/odata/Products',
        url: 'http://localhost:61409/odata/Products',

        dataType: 'json',
        method: "GET",
        //crossDomain: true,
       beforeSend: setHeader,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        },
        success: function (data, textStatus, jqXHR) {
            Products = data.value;
			showProducts();
            if (data.Error || data.Response) {
                exists = 0;
            }
        }
    });
	
}

var tokendata;
$("#login").click(function () {
    var user = $("#username").val();
    var password = $("#password").val();

    $.ajax({
        async: false,
        //url: 'https://microsoft-apiappf9dd2bcab98e46909f4b22de40382044.azurewebsites.net/token',
        url: 'http://localhost:61409/token',

        dataType: "",
        method: "POST",
        data: "username="+user+"&password="+password+"&grant_type=password",
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        },
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            tokendata = data;
            if (data.Error || data.Response) {
                exists = 0;
            }
        }
    });


})
function showProducts(){
	
	if (Products.length!=0){
		$("#allProducts").html('');
		for (var i = 0;i<Products.length;i++)
		{
			$("<li id ='"+Products[i].Id+"'><a href='#' data-transition='slide' onClick=showProduct("+Products[i].Id+")><img width=80 height=80  src='"+baseuri+Products[i].ImageURL+"'/> <h2>"+Products[i].Model+ "</h2><p>"+Products[i].Brand+"</p></a><a href='#' data-transition='pop' data-icon='plus'onClick=AddToCart("+Products[i].id+")></a></li>").appendTo("#allProducts")
			//console.log(Products[i].name);
			
		}
		$("#allProducts").listview("refresh");
	}
	else{
		$("#allProducts").html('<h2 align = "center" >No Products Available<h2>');
	}
	
}
//////////////////////////////////////////// Dom Manipulation and Other Validation ///////////////////
function getProduct(id){
	/*var siteO;
	for (var i = 0;i<sites.length;i++)
	{
		if (sites[i].id == id) {
			siteO = sites[i];
		}
	}
	return siteO;*/
}
var s;
function showProduct(id){
	/*s = getProduct(id);
	if (s){	
		imgpath=s.img; //sets the current image to memory to recocnise any changes when updating
		lat=s.lat;
		longt=s.longt;
		$("#eImg").attr("src",s.img)
		$("#eName").val(s.name);
		$("#eNotes").val(s.notes);
		audiopath = s.other
		$("#emap").trigger("refresh");	
	}
	else{
		$.mobile.changePage( "#Home");
	}*/
	
}

$( document ).on( "pageshow", "#editSitePage", function() {
			//showMap("#emap",lat,longt);
});

$( document ).on( "pageshow", "#addVenue", function() {
			//getLocation('#map');
});



function AddToCart(){
	
}


$("#signup").click(function () {

    //$("#accountdiv").s
   // $("#login").slideup(3000);


})


///////////////////////////// UI Javascript /////////////////////////////////////////
$('#addSite').click(function(){
	if ($("#sName").val()!= ''){
		validateAdd();
	}
	else{
		alert("Enter a name")
	}
	
});

function validateAdd(){
	if (imgpath!=""){
		if (lat!=""){
			copyImage(imgpath);
			addNewSite($("#sName").val(),$("#sNotes").val(),lat,longt,imgpath,audiopath);
		}
		else
		{
			alert("Location Not Available");
		}
	}
	else{alert("Image Not Avialable");}
}

$('#updateSite').click(function(){
	if ($("#eName").val()!= ''){
		updateSiteValidate(s.id);
	}
	else{
		alert("Enter a name")
	}
	
});

$("a[href='#Home']").click(function(){
			clearAddSitePage();
			clearEditSitePage();
			lat="";
			longt="";
			imgpath="";
			audiopath="";
			
})
			
function clearAddSitePage(){
	$("#sLoc").html("");
	$("#sName").val("");
	$("#sNotes").val("");
	$("#sLat").val("");
	$("#sLongt").val("");
	$("#sOther").val("");
	$("#siteImg").attr('src','img/pna.jpg');
	audiopath="";
	imgpath="";
	lat="";
	longt="";
	$('#map').html('');
}

function clearEditSitePage(){
	$("#eName").val("");
	$("#eNotes").val("");
	$("#eLat").val("");
	$("#eLongt").val("");
	$("#eImage").val("");
	$("#eOther").val("");
	$("#eImg").attr('src','img/pna.jpg');
	$("#eLoc").html("");
	audiopath="";
	imgpath="";
	lat="";
	longt="";
	$('#emap').html('');
}




