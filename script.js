$( document ).ready(function(){
	$.get("import.html", function(data) {
				var content = $(data).html();
				$.getJSON('products.json', function(data) {
    			for(var i=0;i<data.length; i++){
						$("#products_section").append(content); 	
	    	}
	    	var div = $(".product");
	    	//массивы с ценами за упаковку
	    	var arrGoldPr = [];
    		var arrRetPr = [];
				//массивы с ценами за кв.м
    		var arrGoldPrA = [];
    		var arrRetPrA = [];

	    	for(var j=0; j< data.length ; j++){
	    		var cod = data[j].code;
	    		
    			var title = data[j].title;
    			var assoc = data[j].assocProducts;
    			//за кв.м
    			var priceGoldA = data[j].priceGoldAlt;
    			var priceRetA = data[j].priceRetailAlt;

    		//за упаковку
    			var priceGold = data[j].priceGold;
    			var priceRet = data[j].priceRetail;
    			
    			var unitRat = data[j].unitRatioAlt;
    			var id = data[j].productId;
    			var ind = ""+j;
    			var nextInd = ""+(j+1);
	    		
	    		//2.add string modificator
	    		var img = data[j].primaryImageUrl;
	    		var pos = img.search( /.jpg/i);
	    		var str = '_220x220_1';
	    		var newImg = img.substring(0, pos) + str + img.substring(pos);

	    		jQuery(div[j]).removeClass(ind);
	    		jQuery(div[j]).addClass(nextInd);
	    		$('div.' + nextInd + '> .product_code' ).text("Код: " + parseInt(cod));
 					$('div.' + nextInd + '>div.product_photo > a').append('<img src="' + newImg + '">');
					$('div.' + nextInd + '>div.product_description>a').text(title);
		  		$('div.' + nextInd + '> .product_tags').append('<a>' + assoc + '</a>');
		  		$('div.' + nextInd + '> p.product_price_club_card > span.goldPrice').text(priceGoldA);
		 			$('div.' + nextInd + '> p.product_price_default > span.retailPrice').text(priceRetA);
		 			$('div.' + nextInd + '> div.list--unit-desc > div.unit--info > div.unit--desc-t > p > span.unit--infoInn').text("1 упак. = " + unitRat + " м. кв.");
	    		//1.add ID product
	    		$('div.' + nextInd + '> div.product__wrapper > span.btn.btn_cart').attr('data-product-id', id);

	    		arrGoldPr.push(priceGold);
    			arrRetPr.push(priceRet);
    			arrGoldPrA.push(priceGoldA);
    			arrRetPrA.push(priceRetA);

	    	}
				addVal();
				changePrice(arrGoldPrA,arrRetPrA, arrGoldPr,arrRetPr);
				});
	});
});

//3.change counts of goods
function addVal(){
  var btns = document.querySelectorAll('span.btn.btn_cart');
  for(var i=0; i< btns.length; i++){
    btns[i].addEventListener('click', function(){
    	var presentInp = this.previousElementSibling.children[0].children[0];
    	var number = presentInp.getAttribute('value');
    	number++;
      presentInp.setAttribute('value', number);
      });
  }
}

//4.change price of goods
function changePrice(goldA, retA, gold, ret){
	var els = document.querySelectorAll('div.unit--select');
	for(var i=0;i<els.length;i++){
		els[i].addEventListener('click', function() {
			this.classList.add('unit--active');
			for(var j=1;j<goldA.length;j++){
				if(this.nextElementSibling && this.parentNode.parentNode.parentNode.classList.contains(""+j)) {
					this.parentNode.parentNode.nextElementSibling.children[1].innerHTML = goldA[j-1];
					this.parentNode.parentNode.nextElementSibling.nextElementSibling.children[0].innerHTML = retA[j-1];
					this.nextElementSibling.classList.remove('unit--active');
				}
				if(this.previousElementSibling && this.parentNode.parentNode.parentNode.classList.contains(""+j)){
					this.parentNode.parentNode.nextElementSibling.children[1].innerHTML = gold[j-1];
					this.parentNode.parentNode.nextElementSibling.nextElementSibling.children[0].innerHTML = ret[j-1];
					this.previousElementSibling.classList.remove('unit--active');
				}
			}	
		});
	}
}
