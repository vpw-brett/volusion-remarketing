// Sets default values
var pagetype = "other";
var googleprice;
var googleprodid;
var pathname = window.location.pathname;
var href = window.location.href;

// Default Volusion homepage URLs
if (pathname == '/' || pathname.toLowerCase() == '/default.asp') {
	pagetype = "home";
}

// Default search results page URL
if (href.indexOf('SearchResults.asp?Search') > -1) {
	pagetype = "searchresults";
}

// Product page URLs
if (pathname.indexOf('-p/') > -1 || pathname.indexOf('ProductDetails.asp') > -1) {
	pagetype = "product";
	googleprodid = global_Current_ProductCode;
	
	// substring removes the currency symbol from the price
	googleprice = $('span[itemprop="price"]').text().substring(1);
}

// Category page URLs
if(pathname.indexOf('-s/') > -1 || href.indexOf('SearchResults.asp?Cat') > -1) {
	pagetype = "category";
}

// Shopping cart data
if (pathname.toLowerCase().indexOf('shoppingcart.asp') > -1) {
	pagetype = "cart";
	
	// The replace statement removes all currency symbols and whitespace.
	googleprice = $(".pricecolor.colors_productprice b").text().replace(/[^0-9.]/g, '');

	var cartquantity = $('a.cart-item-name').length;
	var link, substr, pcode;

	for (var i = 0; i < cartquantity; i++) {
		// Finding each product code via their URL
		link = $('a.cart-item-name').eq(i).attr('href');
		pcode = decodeURI(link.split('&')[0].split('=')[1]);
		
		if (i == 0) {
			googleprodid = pcode;
		} else {
			googleprodid += "," + pcode;
		}
	}
}

// Checkout Page
if (pathname.toLowerCase().indexOf('one-page-checkout') > -1) {
	pagetype = "cart";
	googleprice = $("#TotalsTotalTD").html().replace(/[^\d.,]+/,'');
}

// Order Complete
if (pathname.toLowerCase().indexOf('orderfinished') > -1) {
	pagetype = "purchase";
	googleprice = Order[2];
	
	for (var i=0; i < OrderDetails.length; i++) {
		if (i == 0) {
			googleprodid = OrderDetails[i][2];
		} else {
			googleprodid += "," + OrderDetails[i][2];
		}
	}
}

var google_tag_params = {
	ecomm_prodid: googleprodid,
	ecomm_pagetype: pagetype,
	ecomm_totalvalue: googleprice
}