// JavaScript Document

//variables
//For screen resolution
var displayWidth=screen.availWidth;
var displayHeight=screen.availHeight;

//For Box creating
var genreCollection;
var optimizeScale=1;
var BlockHeight=265*optimizeScale;
var hznBlockWidth=380*optimizeScale;
var vtclBlockWidth=188*optimizeScale;
var adjImgWidth;
var cuType;
var cuImg=new Array();
var nameSpace=new Array(); 
initialize();
//creating main area block
function initialize(){
	$('header').append('<div><a href="aktvtinput.html"><img src="icon/plus.png"/></a></div>');
	getSource();
	windowOptimize()
	
	for(var i=0;i<genreCollection.length;i++){
		
		genreAdding(i);
		generateBox(i,4);
	}
	//place at middle
	var offset=(displayWidth-(hznBlockWidth+vtclBlockWidth)*2-5*6)/2
	$('#mainBlock').css('margin-left',offset+'px');
	$('header').css({'width':displayWidth+'px'})
	$('header div').css({'margin-left':displayWidth-200+'px','display':'inline-block','margin-top':-60+'px'});
}
function getSource(){
	genreCollection=new Array(10);
	for(var i=0;i<genreCollection.length;i++){
		var genreArray=new Array(15);
		genreCollection[i]=genreArray;
		for(j=0;j<genreArray.length;j++){
			var blockProperties=new Object();
			blockProperties.title='活動標題';
			blockProperties.created=false;
			switch(j%6){
				case 0:
					blockProperties.imgURL='pic/IMG_1977.JPG';
				break;
				case 1:
					blockProperties.imgURL='pic/IMG_1978.JPG';
				break;
				case 2:
					blockProperties.imgURL='pic/IMG_1989.JPG';
				break;
				case 3:
					blockProperties.imgURL='pic/IMG_2081.JPG';
				break;
				case 4:
					blockProperties.imgURL='pic/IMG_2089.JPG';
				break;
				case 5:
					blockProperties.imgURL='pic/IMG_2097.JPG';
				break;
			}
			genreCollection[i][j]=blockProperties;
		}
		
	}
	
	
}
function windowOptimize(){
	//deciding optimize scale
	var widthScale=displayWidth/1600;
	var heightScale=displayHeight/900;
	if(widthScale>0.7&&heightScale>0.7){
		if(widthScale<=heightScale){
			optimizeScale=widthScale;
		}else if(widthScale>heightScale){
			optimizeScale=heightScale;
		}
	}else{
		optimizeScale=0.7;
	}
	
	$('body').css({'width':displayWidth-40+'px','height':displayHeight+'px'});
	$('header img').css('height',60*optimizeScale+'px');
	//refresh variable
	BlockHeight=265*optimizeScale;
	hznBlockWidth=380*optimizeScale;
	vtclBlockWidth=188*optimizeScale;
}
function genreAdding(genre){
	$('#mainBlock').append('<div class=genreBlock id=genre'+genre+'></div>');
	var name='#genre'+genre;
	var queryName=multiLine(titleMatching(genre));
	$(name).append('<div class=genreName>'+queryName+'</div>');
	$('.genreName').css({'height':BlockHeight+'px',"width":'50px','top':-BlockHeight+70+'px'});
	
}
function multiLine(Str){
	var result='';
	for(var i=0;i<Str.length;i++){
		result+=Str.charAt(i)+'<br/>';
		
	}
	return result;
}
function titleMatching(genre){
	var feedback='類別';
	switch(genre){
		case 0:
		feedback='繪畫';
		break;
		case 1:
		feedback='學術';
		break;
		case 2:
		feedback='義工';
		break;
		case 3:
		feedback='音樂';
		break;
		case 4:
		feedback='設計';
		break;
		case 5:
		feedback='個人';
		break;
		}
	return feedback;
}
function generateBox(genre,vol){
	var realHeight=BlockHeight*optimizeScale;
	var realVtclWidth=vtclBlockWidth*optimizeScale;
	var realhrznWidth=hznBlockWidth*optimizeScale;
	var suitableVol=vol;
	
	var name='#genre'+genre;
	for(var i=0;i<suitableVol;i++){
		var blockImg=new Image();
		var reference=genreCollection[genre][i]
		if(i%2){
			$(name).append('<div class=VtclBlock><div class=coverMask id='+genre+i+'></div></div>')
			
			reference.triggerID="#"+genre+i
			reference.img=blockImg;
			blockImg.src=reference.imgURL;
			cuType=0;
			blockImg.addEventListener('load',cutImage,false);
			//
		}else{
			$(name).append('<div class=HrznBlock><div class=coverMask id='+genre+i+'></div></div>')
			reference.triggerID="#"+genre+i
			reference.img=blockImg;
			blockImg.src=reference.imgURL;
			cuType=1;
			blockImg.addEventListener('load',cutImage,false);
		}
	}
	//
	$('.coverMask').css({'margin-top':-BlockHeight+'px','height':BlockHeight+'px'})
	$('.HrznBlock').css({'width':hznBlockWidth+'px','height':BlockHeight+'px'});
	$('.VtclBlock').css({'width':vtclBlockWidth+'px','height':BlockHeight+'px'});
	$('.coverMask').click(function(e) {
        location.href='exampleaktvt.htm';
    });
}

function cutImage(){
	var originalWidth=this.width;
	var originalHeight=this.height;
	//size adjusting
	switch(cuType){
		case 0:
			if(originalWidth>originalHeight){
				adjImgWidth=originalWidth*BlockHeight/originalHeight;
			}else{
				adjImgWidth=vtclBlockWidth;
			}
		break;
		case 1:
			if(originalWidth>originalHeight){
				adjImgWidth=hznBlockWidth;
			}else{
				adjImgWidth=originalWidth*BlockHeight/originalHeight;
			}
		break;
	}
	
	$(this).css('width',adjImgWidth+'px');
	//append to the correct place and Adding title
	for(var i=0;i<genreCollection.length;i++){
		for(var j=0;j<genreCollection[i].length;j++){
			if(!genreCollection[i][j].created){
				
				var tempName=genreCollection[i][j].triggerID;
				if(this==genreCollection[i][j].img){
					$(tempName).before(this);
					genreCollection[i][j].created=true;
					$(tempName).before('<div class=title>'+genreCollection[i][j].title+'</div>')
					$('.title').css({'margin-top':-50+'px','height':'50px'});
				}
			}
		}
	}
}
     //Genre title Adding

//creating left Navigation area

var currentLevel=0;
var currentMaxLevel=2;
var optionOpened=false;

initial()
function initial(){
	$('#level0').append('<div class=option>地點</div>');
	$('#level0').append('<div class=option>時間</div>');
	$('#level0').append('<div class=option>性質</div>');
	$('.option').click(function(e) {
		
    newOption($(this).text());
	$('.optionSelected').attr('class','option');
	$(this).attr('class','optionSelected');
	console.log($(this).text());
});
}
function queryData(option){
	var resultArray=new Array();
	resultArray[0]='test';
	resultArray[1]='testT'
	resultArray[2]='testF'
	return resultArray;
}
function newOption(option){
	deleteOption(currentLevel+1);
	var data=queryData(option);
	var newLevel='#level'+(currentLevel+1);
	$('#left').append('<div id=level'+(currentLevel+1)+'></div>');
	for(var i=0;i<data.length;i++){
		$(newLevel).append('<div class=option>'+data[i]+'</div>');
	}
	$('.option').click(function(e) {
	var mom=$(this).parent();
	var str=mom.attr('id');
	currentLevel=parseInt(str.charAt(5));
	console.log(str)
    newOption($(this).text());
	var tmp='#'+str+' .optionSelected'
	var judge=$(tmp).parent();
	var st=judge.attr('id');
	console.log(st);
	if(str==st){
		$(tmp).attr('class','option');
	}
	$(this).attr('class','optionSelected');
	
})
}
function deleteOption(level){
	for(var i=level;i<=currentMaxLevel;i++){
		var tmpName='#level'+i;
		$(tmpName).remove();
	}
	currentMaxLevel=level;
	
}
function shortTween(){
	
}