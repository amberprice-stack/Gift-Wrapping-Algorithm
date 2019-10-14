const ThePoints = [];
const Framework = [];

let Left;
let Vertex;
let UpcomingVertex;
let Index;
let UpcomingIndex = -1;


function setup() {
  createCanvas(600, 600);
  let Cushion = 20;
  for (let i = 0; i < 50; i++) {
    ThePoints.push(createVector(random(Cushion, width - Cushion), random(Cushion, height - Cushion)));
  }
  ThePoints.sort((x,y) => x.x - y.x);
  Left = ThePoints[0];
  Vertex = Left;
  Framework.push(Vertex);
  UpcomingVertex = ThePoints[1];
  Index = 2;
}

function draw() {
  background(0);

  stroke(355);
  strokeWeight(6);
  for (let a of ThePoints) {
    point(a.x, a.y);
  }

  stroke(300, 0, 355);
  fill(300, 0, 355, 50);
  beginShape();
  for (let a of Framework) {
    vertex(a.x, a.y);
  }
  endShape(CLOSE);

  stroke(255, 204, 0);
  strokeWeight(32);
  point(Left.x, Left.y);

  stroke('red');
  strokeWeight(32);
  point(Vertex.x, Vertex.y);

  stroke(255, 204, 0);
  strokeWeight(2);
  line(Vertex.x, Vertex.y, UpcomingVertex.x, UpcomingVertex.y);

  let Test = ThePoints[Index];
  stroke(355);
  line(Vertex.x, Vertex.y, Test.x, Test.y);

  const x = p5.Vector.sub(UpcomingVertex, Vertex);
  const y = p5.Vector.sub(Test, Vertex);
  const Intersect = x.cross(y);

  if (Intersect.z < 0) {
    UpcomingVertex = Test;
    UpcomingIndex = Index;
  }

  Index = Index + 1;
  if (Index == ThePoints.length) {
    if (UpcomingVertex == Left) {
      console.log('done');
      noLoop();
    } else {
      Framework.push(UpcomingVertex);
      Vertex = UpcomingVertex;
      Index = 0;
      UpcomingVertex = Left;
    }
  }
}
