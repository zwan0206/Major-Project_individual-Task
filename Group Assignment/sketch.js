let circles = [];
let numCircles = 5;
let circleSize;
let noiseOffset = 0;
// A flag used to control whether all circles explode or not.
let allExploded = false;

function setup() {
  createCanvas(600, 600);
  // Calculate the diameter of the circle
  circleSize = sqrt(sq(width) + sq(height)) / numCircles;

  //Initializes the position of the circle on the diagonal
  for (let i = 0; i < numCircles; i++) {
    let posX = (i + 1) * (circleSize * 0.5) + i * (circleSize * 0.25);
    let posY = posX;
    circles.push({ x: posX, y: posY, size: circleSize, exploded: false, progress: 0 });
  }

  // Initializes the position of the circle above the diagonal
  for (let j = 0; j < numCircles - 1; j++) {
    let upperCircleX = j * (circleSize * 0.80) + (circleSize * 1.55);
    let upperCircleY = j * (circleSize * 0.80) + (circleSize * 0.15);
    circles.push({ x: upperCircleX, y: upperCircleY, size: circleSize, exploded: false, progress: 0 });
  }

  for (let a = 0; a < numCircles - 2; a++) {
    let upperCircleX1 = a * (circleSize * 0.80) + (circleSize * 2.7);
    let upperCircleY1 = a * (circleSize * 0.80) - (circleSize * 0.125);
    circles.push({ x: upperCircleX1, y: upperCircleY1, size: circleSize, exploded: false, progress: 0 });
  }

  // Initializes the position of the circle below the diagonal
  for (let b = 0; b < numCircles - 1; b++) {
    let lowerCircleX = b * (circleSize * 0.75) + (circleSize * 0.15);
    let lowerCircleY = b * (circleSize * 0.80) + (circleSize * 1.5);
    circles.push({ x: lowerCircleX, y: lowerCircleY, size: circleSize, exploded: false, progress: 0 });
  }

  for (let c = 0; c < numCircles - 3; c++) {
    let lowerCircleX1 = c * (circleSize * 0.75) - (circleSize * 0.2);
    let lowerCircleY1 = c * (circleSize * 0.85) + (circleSize * 2.5);
    circles.push({ x: lowerCircleX1, y: lowerCircleY1, size: circleSize, exploded: false, progress: 0 });
  }
}

function draw() {
  background(0, 85, 128);

  // Check if the mouse is inside a circle
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];

    if (!allExploded) {
      // The ‘dist()’ function is used to calculate the distance between two points on a plane, in this case to detect if the mouse is within a circle.
      let distance = dist(mouseX, mouseY, circle.x, circle.y);
      if (distance < circle.size / 2) {
        circle.exploded = true;
      } else {
        circle.exploded = false;
      }
    } else {
      // If all circles explode, set exploded to true.
      circle.exploded = true;
    }
  }

  // Draw all circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    if (circle.exploded) {
      if (circle.progress < 1) {
        // Control the speed at which fireworks explode
        circle.progress += 0.05; 
      }
    } else {
      if (circle.progress > 0) {
        // Control the speed at which fireworks resume
        circle.progress -= 0.05; 
      }
    }

    // When the animation progress of the fireworks starts, only the fireworks are drawn, and vice versa, the original graphics are drawn.
    if (circle.progress > 0) {
      drawFirework(circle.x, circle.y, circle.size, circle.progress);
    } else {
      drawConcentricCircles(circle.x, circle.y, circle.size);
      drawEllipsesAroundCircle(circle.x, circle.y, circle.size);
      drawSurroundingCircles(circle.x, circle.y, 15, numCircles, circle.size);
      if (i != 5 && i != 8 && i != 13) {
        drawFilledSurroundingCircles(circle.x, circle.y, circle.size);
      }
      if (i == 0 || i == 1 || i == 2 || i == 5 || i == 7 || i == 9 || i == 14 || i == 16 || i == 17) {
        drawExtendingLine(circle.x, circle.y, circle.size);
      }
      if (i == 5 || i == 8 || i == 13) {
        drawZigzagLines(circle.x, circle.y, circle.size);
      }
    }
  }
}

// Draw fireworks effects
function drawFirework(centerX, centerY, size, progress) {
  // Initializes the number and angle of fireworks particles.
  let numParticles = 100;
  let angleStep = TWO_PI / numParticles;

  for (let i = 0; i < numParticles; i++) {
    let angle = i * angleStep;
    // The 'lerp()' function returns an intermediate value between two values based on the given weight, which is used to control the position of the particles in the fireworks effect so that they gradually expand outward from the center of the circle.
    let x = centerX + lerp(0, random(size * 0.1, size), progress) * cos(angle);
    let y = centerY + lerp(0, random(size * 0.1, size), progress) * sin(angle);
    drawParticle(x, y, progress);
  }
}

// Draw individual particles
function drawParticle(x, y, progress) {
  // The 'color()' function is used to create a color object, where it creates a completely transparent white color.
  // The 'lerpColor()' function calculates a transition color from transparent white to a random color, which is controlled by progress.
  fill(lerpColor(color(255, 255, 255, 0), randomColor(), progress));
  noStroke();
  ellipse(x, y, 10, 10);
}

// Draw extension lines based on the mouse position.
function drawExtendingLine(centerX, centerY, circleSize) {
  // The 'atan2()' function is a mathematical function that calculates the angle from the origin (0,0) to the point (x, y), here it is used to calculate the angle from the center of the circle to the position of the mouse. 
  // Use 'noise()'  for smoothing out changes.
  let angle = atan2(mouseY - centerY, mouseX - centerX) + noise(noiseOffset) * PI - PI / 2; 
  let radius = circleSize / 1.6;

  let xEnd = centerX + radius * cos(angle);
  let yEnd = centerY + radius * sin(angle);
  
  // The control point x-coordinate is the midpoint of the start and end points.
  let controlX = centerX + radius * 0.4 * cos(angle); 
  // The y-coordinate of the control point is the y-coordinate of the center of the circle.
  let controlY = centerY + radius * 1 * sin(angle); 

  stroke(255, 20, 147);
  strokeWeight(4);

  // Draw a curve with the start point being the center of the circle, the end point being a point on the circumference, and the control point being the coordinates of the control point.
  noFill();
  beginShape();
  // The 'vertex()' function is a function used to define vertices, which is used to create and draw shapes, and here it is used to define the starting point of the extension line.
  vertex(centerX, centerY);
  // The 'quadraticVertex()' function is a function used to plot quadratic Bezier curves. A quadratic Bezier curve is defined by a starting point, a control point, and an end point. This function makes the curve bend smoothly between the start and end points by giving the coordinates of the control points. Here it is used to plot a quadratic Bezier curve that extends from the center of the circle to the circumference.
  quadraticVertex(controlX, controlY, xEnd, yEnd);
  endShape();
}


// Draw ellipses
function drawEllipse(centerX, centerY, ellipseWidth, ellipseHeight, rotation) {
  push();
  translate(centerX, centerY);
  rotate(rotation);
  beginShape();
  for (let i = 0; i < 100; i++) {
    fill(randomColor());
    stroke(255, 117, 26);
    strokeWeight(2);
    let angle = TWO_PI * i / 100;
    let x = ellipseWidth * cos(angle);
    let y = ellipseHeight * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

// Draw ellipses to enclose circles
function drawEllipsesAroundCircle(centerX, centerY, circleSize) {
  let numEllipses = 33;  
  let ellipseWidth = circleSize / 19;  
  let ellipseHeight = circleSize / 40; 
  // The distance from the ellipse to the center of the circle
  let radius = circleSize / 1.8; 

  for (let i = 0; i < numEllipses; i++) {
    let angle = TWO_PI * i / numEllipses;
    let ellipseCenterX = centerX + radius * cos(angle);
    let ellipseCenterY = centerY + radius * sin(angle);
    // Rotating the ellipse makes the long axis of the ellipse perpendicular to the radius of the circle.
    let rotation = angle + HALF_PI;  
    drawEllipse(ellipseCenterX, ellipseCenterY, ellipseWidth, ellipseHeight, rotation);
  }
}

// Draw zigzag lines
function drawZigzagLines(centerX, centerY, circleSize) {
  let radius = circleSize / 2;
  let numZigzags = 80;
  let angleStep = 360 / numZigzags;

  push();
  stroke(255, 0, 0); 
  noFill();
  strokeWeight(2);

  beginShape();
  for (let i = 0; i <= numZigzags; i++) {
    let angle = radians(i * angleStep);
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
    vertex(x, y);
    // Alternate between two radii for zigzag effect
    radius = i % 2 === 0 ? circleSize / 2 : circleSize / 4;
  }
  endShape(CLOSE);
  pop();
}

// Draw small circles inside circles
function drawFilledSurroundingCircles(centerX, centerY, circleSize) {
  let smallCircleSize = circleSize / 25;
  // The distance from the center of the minor circle to the center of the great circle
  let radius = circleSize / 2 - smallCircleSize / 2 - 2;
  
  for (let i = 0; i < 5; i++) {
    for (angle = 0; angle < 360; angle += 10) {
      let rad = radians(angle);
      noStroke();
      let x = centerX + (radius - (i * 10)) * cos(rad);
      let y = centerY + (radius - (i * 10)) * sin(rad);
      circle(x, y, smallCircleSize);
    }
  }
}

// Draw small circles around circles
function drawSurroundingCircles(centerX, centerY, angle, numCircles, circleSize) {
  let smallCircleSize = circleSize / 15;
  // The distance from the center of the minor circle to the center of the great circle
  let radius = circleSize / 2 + smallCircleSize / 2 + 2; 

  for (let i = 0; i < numCircles; i++) {
    for (angle; angle < 360; angle += 72) {
      fill(randomColor());
      stroke(0, 0, 0);
      strokeWeight(4);
      let rad = radians(angle);
      let x = centerX + radius * cos(rad);
      let y = centerY + radius * sin(rad);
      circle(x, y, smallCircleSize);
    }
  }
}

// Draw combinations of concentric circles
function drawConcentricCircles(x, y, size) {
  // Random number of layers
  const layers = random(4, 10); 
  let currentSize = size;

  for (let i = 0; i < layers; i++) {
    stroke(0, 0, 0);
    strokeWeight(random(3));
    // Use the random color function
    fill(randomColor()); 
    ellipse(x, y, currentSize, currentSize);
    // The level is decreasing in size
    currentSize *= 0.7; 
  }
}

// Set a random color
function randomColor() {
  return color(random(255), random(255), random(255));
}

// Keyboard Events: When the spacebar is pressed, all large circles explode or resume
function keyPressed() {
  if (key === ' ') {
    allExploded = !allExploded; // Toggles the exploding state of all circles
  }
}
