img = "";
status = "";
objects = [];
alarm = "";

function preload() {
    img = loadImage('dog_cat.jpg');
    alarm = loadSound('alarm.mp3');
}



function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function draw() {
    image(video, 0, 0, 380, 380);

   

    if(status != "")
    {
        
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are: " + objects.length;
            

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label=="person" ){
               alarm.stop();
               document.getElementById("person_detect").innerHTML = "Person Detected"; 
            }
            else{
                alarm.play();
                document.getElementById("person_detect").innerHTML = "Person not Detected";
            }
        }  
    }
       
        

}

function modelLoaded() {
    console.log("Model Loaded!!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"; 
}
