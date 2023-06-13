status="";
object=[];

function preload(){
    img = loadImage("bathroom.jpg");
}

function setup(){
    canvas = createCanvas(700,500);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Detecting Object";
    document.getElementById("quantity").innerHTML="2/5 objects detected";
}

function modelLoaded(){
    console.log("model loaded");
    status= true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
    console.log(results);
    object=results;
    }
}

function draw(){
    image(img, 0, 0, 700, 500);

    if(status != "")
    {
        for(i=0; i<object.length; i++)
        {
            document.getElementById("status").innerHTML="Status: Object Detected";

            fill("blue");
            percent=floor(object[i].confidence * 100);
            stroke("blue");
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            text(object[i].label + " "+ percent + "%", object[i].x+10, object[i].y+20);

        }
    }
}