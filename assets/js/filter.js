noseX = 0;
noseY = 0;
function preload() {
  clown_nose = loadImage("assets/images/astronaut.png");
  console.log(clown_nose);
}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}
function draw() {
  image(video, 0, 0, 300, 300);
  image(clown_nose, noseX-100, noseY-100, 180, 180);
}
function takeSnapshot() {
  save(`ClownFilter${new Date()}.png`);
}
function modelLoaded() {
  console.log("Posenet is Initialized");
}
function gotPoses(results) {
    console.log(results)
  if (results.length > 0) {
    console.log(results);
    console.log("nose x: " + results[0].pose.nose.x);
    console.log("nose y: " + results[0].pose.nose.y);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
  }
}
