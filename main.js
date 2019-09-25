var image;
var imagePieces = [];
var array=[0,1,2,3,4,5,6,7,8];
var suffleArray=[];

function img2(){
  loadImage("https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg");
  document.getElementById("level").style.display = 'block';
}

function img1(){
  loadImage("https://petapixel.com/assets/uploads/2019/06/manipulatedelephant-800x534.jpg");
  document.getElementById("level").style.display = 'block';
}

function img3(){
  loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwpIKcA0riXAujiwphld6GEXUSNUZmqDjReaPQrIIQcsQjdJGW");
  document.getElementById("level").style.display = 'block';
}

function img4(){
  loadImage("https://envato-shoebox-0.imgix.net/4646/3935-85f4-41a0-b940-708875ee0a15/tajak+019.jpg?w=500&h=278&fit=crop&crop=edges&auto=compress%2Cformat&s=c45335aca948555287bc4229b1632950");
  document.getElementById("level").style.display = 'block';
}


function loadImage(s){
  image = new Image();
  image.setAttribute('crossOrigin', 'anonymous');
  image.onload = cutImageUp;
  image.src = s;
}

function beg(){
 document.getElementById("puzzle").style.display = 'block'; 
}

function int(){
 document.getElementById("puzzle").style.display = 'block'; 
}

function ad(){
 document.getElementById("puzzle").style.display = 'block'; 
}

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
	// While there are elements in the array
	    while (ctr > 0) {
	// Pick a random index
	        index = Math.floor(Math.random() * ctr);
	// Decrease ctr by 1
	        ctr--;
	// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
	    return arra1;
}

function cutImageUp() {
    for(var x = 0; x < 3; ++x) {
        for(var y = 0; y < 3; ++y) {
            var canvas = document.createElement('canvas');
            var w=this.width/3;
            var h=this.height/3;
            canvas.width = w;
            canvas.height = h;
            var context = canvas.getContext('2d');
            context.drawImage(image, y * w, x * h, w, h, 0, 0, w, h);
            imagePieces.push(canvas.toDataURL());
        }
    }

    var anImageElement;
   
    for (var i=0;i<9;i++){
    	anImageElement=document.getElementById('i'+(i+1));
    	anImageElement.src = imagePieces[i];
    }

    var array=[0,1,2,3,4,5,6,7,8];
	   suffleArray=shuffle(array);

	for (var i=0;i<9;i++){
    	anImageElement=document.getElementById('f'+(i+1));
    	anImageElement.src = imagePieces[array[i]];
    }
}

document.ondragstart = function(event) {
  event.dataTransfer.setData("Text", event.target.id);
};

var swapId=null;
var a,b;
document.ondrag = function(event) {
	if(event.target.className=="drag"){
		swapId=event.target.id;
	}
	else
		swapId=null;
};

/* Events fired on the drop target */
document.ondragover = function(event) {
  event.preventDefault();
};

function swapImage(id1,id2){
  var audio = document.getElementById("cut");
    audio.play();   
	var a=document.getElementById(id1);
	a.src = imagePieces[suffleArray[id2[1]-1]];
	a=document.getElementById(id2);
	a.src = imagePieces[suffleArray[id1[1]-1]];
	var temp=suffleArray[id1[1]-1];
	suffleArray[id1[1]-1]=suffleArray[id2[1]-1];
	suffleArray[id2[1]-1]=temp;
	var flag=0;
  var x = parseInt(document.getElementById("pp").innerText,10);
  x++;
  document.getElementById("pp").innerText=x.toString();
	for (var i=0;i<array.length;i++){
		if(suffleArray[i]!=array[i])
			flag=1;
	}
	if(flag==0)
		document.getElementById("a2").style.fontSize = "0";
}

function canSwap(swapId,targetId,idArray){
  var flag=0;
  for(var i=0;i<idArray.length;i++){
    if(targetId == idArray[i]){
      flag=1;
      swapImage(swapId,targetId);
    }
  }
  if(flag==0)
  {
    if(targetId!=swapId){
      var audio = document.getElementById("no");
      audio.play();   
    }
  }
}

document.ondrop = function(event) {
  event.preventDefault();
  console.log(suffleArray);
  if(swapId!=null){
  	if(swapId=="f1"){
      canSwap("f1",event.target.id,["f2","f4"]);
  	}

  	else if(swapId=="f2"){
      canSwap("f2",event.target.id,["f1","f3","f5"]);
  	}

  	else if(swapId=="f3"){
      canSwap("f3",event.target.id,["f2","f6"]);
  	}

  	else if(swapId=="f4"){
      canSwap("f4",event.target.id,["f5","f7","f1"]);
  	}

  	else if(swapId=="f5"){
      canSwap("f5",event.target.id,["f2","f4","f6","f8"]);
  	}

  	else if(swapId=="f6"){
      canSwap("f6",event.target.id,["f3","f9","f5"]);
  	}

  	else if(swapId=="f7"){
      canSwap("f7",event.target.id,["f4","f8"]);
  	}

  	else if(swapId=="f8"){
      canSwap("f8",event.target.id,["f7","f9","f5"]);
  	}

  	else if(swapId=="f9"){
      canSwap("f9",event.target.id,["f6","f8"]);
  	}

  }
};


function newGame(){
  cutImageUp();
  ocument.getElementById("pp").innerText="0";
}