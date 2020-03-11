void setup() {
  Serial.begin(9600);
  pinMode(10, OUTPUT);
}

void loop() {
  int pressure = analogRead(A0);
  int potentiometer = analogRead(A1);
  int mapPressure = map(pressure, 0, 998, 0, 255);
  int mapPotentiometer = map(potentiometer, 0, 1023, 0, 255);
  
  Serial.print(mapPressure);
  Serial.print(",");
  Serial.println(mapPotentiometer);
  delay(1);

  if(mapPotentiometer > 1){
    digitalWrite(10, HIGH);
  }
}
