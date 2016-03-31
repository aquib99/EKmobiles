var baseuri = "http://localhost:61409"
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

function getProducts (){
    
    $.ajax({
        async: false,
        url: 'http://localhost:61409/odata/Products',
        dataType: 'json',
        method: "GET",
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




