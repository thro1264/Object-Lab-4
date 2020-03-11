var serial; 
var portName = '/dev/cu.usbmodem1411'; 
var circleSize = 10;
var color = 10;

function setup() {
  createCanvas(400, 300);

  serial = new p5.SerialPort(); //a new instance of serial port library

  //set up events for serial communication
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);

  //open our serial port
  serial.open(portName);
  // serial.on('list', printList); //set a callback function for the serialport list event
  // serial.list(); //list the serial ports
}

function draw() {
  background('dodgerblue');
  if(color < 36){  
    fill('red');
  }
  else if(color < 72 && color >= 36){
    fill('orange');
  }
  else if(color < 108 && color >= 72){
    fill('yellow');
  }
  else if(color < 144 && color >= 108){
    fill('green');
  }
  else if(color < 180 && color >= 144){
    fill('blue');
  }
  else if(color < 216 && color >= 180){
    fill('indigo');
  }
  else{
    fill('violet');
  }
  noStroke();
  ellipse(width/2,height/2,circleSize,circleSize);

}


//all my callback functions are down here:
//these are useful for giving feedback

function serverConnected(){
	console.log('connected to the server');
}

function portOpen(){
  console.log('the serial port opened!');
}

//THIS IS WHERE WE RECEIVE DATA!!!!!!
//make sure you're reading data based on how you're sending from arduino
function serialEvent(){
  var data = serial.readLine();
  var array = split(data,",");
  var num1 = array[0];
  var num2 = array[1];
  if(data.length > 0) { //check to make sure we're actually getting data
    console.log(num1, ",",num2);
    circleSize = Number(num2);
    color = Number(num1);
  }
}

function serialError(err){
  console.log('something went wrong with the port. ' + err);
}

function portClose(){
  console.log('the port was closed');
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}