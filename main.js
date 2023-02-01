objects = [] ; 
status = "" ; 
 
function preload() {
    
video = createVideo("video.mp4");

}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector( 'cocossd', modelLoaded );
    document.getElementById("status").innerHTML = "status detectando objetos" ; 
}

function modelLoaded() {
    console.log("modelo cargado");
    status = true ;
    video.loop();
    video.speed(0.9);
    video.volume(1);
}

function gotResult( error, results ) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results ;
    }
}

function draw() {
    
image( video, 0, 0, 480, 380 );
if(status != "") {
    objectDetector.detect( video, gotResult );
    for ( index = 0; index < objects.length; index++) {
        document.getElementById("status").innerHTML = "status : objeto detectado";
        document.getElementById("number_of_objects").innerHTML = "numero de objetos: "+ objects.length;
        fill("#ff0000");
        pescent = floor(objects[index].confidence*100);
        text(objects[index].label, objects[index].x, objects[index].y);
        noFill();
        stroke("#ff0000");
        rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height );
    }
}

} 

