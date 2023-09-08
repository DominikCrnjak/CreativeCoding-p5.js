let img;

let canvas
let canvasX;
let canvaxY;

let densitySlider;
let weightSlider;
let strokeSlider;
let curveSlider;

let shapeSelect;
let blendModeSelect;
let algorithSelect;

function preload() {
  img = loadImage('https://picsum.photos/400');
}

function setup() {
  canvas= createCanvas(img.width,img.height);
  canvas.position(10, 95);
  
  let densityLabel = createElement("Pixel_density","Density");
  densityLabel.style('color', '#FFFFFF');
  densityLabel.style('font-family', 'sans-serif');
  densityLabel.style('font-weight', 'bold');
  densityLabel.position(10, 10);
  densitySlider = createSlider(1,5,2,0.5);
  densitySlider.position(10, 30);
  
  let weightLabel = createElement("Rotation", "Rotation");
  weightLabel.style('color', '#FFFFFF');
  weightLabel.style('font-family', 'sans-serif');
  weightLabel.style('font-weight', 'bold');
  weightLabel.position(150, 10);
  weightSlider = createSlider(1, 360,120 ,15);
  weightSlider.position(150, 30);
  
  let strokeLabel = createElement("Stroke", "Stroke");
  strokeLabel.style('color', '#FFFFFF');
  strokeLabel.style('font-family', 'sans-serif');
  strokeLabel.style('font-weight', 'bold');
  strokeLabel.position(10, 60);
  strokeSlider = createSlider(1, 20, 3, 1);
  strokeSlider.position(10, 80);
  
  let curveLabel = createElement("Curve", "Curve");
  curveLabel.style('color', '#FFFFFF');
  curveLabel.style('font-family', 'sans-serif');
  curveLabel.style('font-weight', 'bold');
  curveLabel.position(150, 60);
  curveSlider = createSlider(1, 200, 10, 10);
  curveSlider.position(150, 80);
  
  algorithSelect = createSelect();
  algorithSelect.position(300, 80);
  algorithSelect.option('Random');
  algorithSelect.option('Noise');
  algorithSelect.option('Gaussian');
  algorithSelect.option('Algorithm');
  algorithSelect.disable('Algorithm');
  algorithSelect.selected('Algorithm');
  algorithSelect.style("width","100px")
  algorithSelect.style('font-family', 'sans-serif');
  algorithSelect.style('font-weight', 'bold');
  
  shapeSelect = createSelect();
  shapeSelect.position(300, 55);
  shapeSelect.option('None');
  shapeSelect.option('Point');
  shapeSelect.option('Triangle');
  shapeSelect.option('Rectangle');
  shapeSelect.option('Shape');
  shapeSelect.disable('Shape');
  shapeSelect.selected('Shape');
  shapeSelect.style("width","100px")
  shapeSelect.style('font-family', 'sans-serif');
  shapeSelect.style('font-weight', 'bold');
  
  blendModeSelect = createSelect();
  blendModeSelect.position(300, 30);
  blendModeSelect.option('Blend');
  blendModeSelect.option('Darkest');
  blendModeSelect.option('Lightest ');
  blendModeSelect.option('Multiply');
  blendModeSelect.option('Exclusion');
  blendModeSelect.option('Overlay');
  blendModeSelect.option('Blend Mode');
  blendModeSelect.disable('Blend Mode');
  blendModeSelect.selected('Blend Mode');
  blendModeSelect.style("width","100px")
  blendModeSelect.style('font-family', 'sans-serif');
  blendModeSelect.style('font-weight', 'bold');

  
  input = createFileInput(handleFile);
  input.position(10,windowHeight-30)
  input.style("color","white")
  input.style('font-family', 'sans-serif');
  input.style('font-weight', 'bold');
  

  
  let generateButton=createButton("GENERATE");
  generateButton.position(420,45);
  generateButton.mousePressed(generate);
  generateButton.style("width","100px")
  generateButton.style("padding","8px")
  generateButton.style("color","white")
  generateButton.style("background-color","#5CADEE")
  generateButton.style('font-family', 'sans-serif');
  generateButton.style('font-weight', 'bold');
  
  let originalButton=createButton("ORIGINAL");
  originalButton.position(540,45);
  originalButton.mousePressed(showOriginal);
  originalButton.style("width","100px")
  originalButton.style("padding","8px")
  originalButton.style("color","white")
  originalButton.style("background-color","#A0F0E8")
  originalButton.style('font-family', 'sans-serif');
  originalButton.style('font-weight', 'bold');
  
  let saveButton=createButton("SAVE");
  saveButton.position(660,45);
  saveButton.mousePressed(saveImage);
  saveButton.style("width","100px")
  saveButton.style("padding","8px")
  saveButton.style("color","white")
  saveButton.style("background-color","#9DA8E7")
  saveButton.style('font-family', 'sans-serif');
  saveButton.style('font-weight', 'bold');
    
  noLoop();
  
}

function draw() { 

    if (img) {
      
      
       if(img.height > 500){
      img.resize(0,500);
      }
      if(img.width>600){
        img.resize(600,0);
      }

    resizeCanvas(img.width,img.height)
    canvasX=(windowWidth-img.width)/2
      canvasY=(windowHeight-img.height)/2
    canvas.position(canvasX,canvasY);
      
      console.log(shapeSelect.value());

     for(let col=0;col<img.width;col+=densitySlider.value()){
       for(let row=0;row<img.height;row+=densitySlider.value()){
        
         push();
         
        let c=img.get(col,row);

        switch (blendModeSelect.value()) {
          case 0:
            background(255);
            break;
            case "Blend":
            blendMode(BLEND);
            break;
            case "Darkest":
            blendMode(DARKEST);
            break;
            case "Lightest":
            blendMode(LIGHTEST);  
            break;
            case "Multipy":
            blendMode(MULTIPLY);  
            break;
            case "Exclusion":
            blendMode(EXCLUSION);  
            break;
            case "Overlay":
            blendMode(OVERLAY);  
            break;
          default:
          blendMode(BLEND);
  }
         
         translate(col,row);
        rotate(radians(random(weightSlider.value())));
   
         noFill()
         
 
         stroke(color(c));
         
         strokeWeight(random(2))
         
         if (shapeSelect.value()=="Point") {
          point(col,row);
         }
         if(shapeSelect)
           
           
           switch (shapeSelect.value()) {
            case "Point":
            point(col,row);
            break;
            case "Triangle":
            triangle(col,row,col+random(3),row+random(3),col-random(3),row-random(3));
            break;
            case "Rectangle": 
            break;
          default:
  }
          

         strokeWeight(random(strokeSlider.value()))
         
         
         
         
         if(algorithSelect.value()=="Random"){
           
           curve(col,
               row,
               cos(col),
               sin(row)*random(30)*cos(row),
               cos(col)*random(30),
               sin(row)*random(30),
               cos(col)*random(30),
               sin(row)*random(30));
           
         }
         
        
         if(algorithSelect.value()=="Noise" || algorithSelect.value()==null){
           
          curve(col,
               row,
               cos(col),
               sin(row)*noise(30)*cos(row),
               cos(col)*noise(30),
               sin(row)*noise(30),
               cos(col)*noise(30),
               sin(row)*noise(30));
           
         }
         if(algorithSelect.value()=="Gaussian"){
           
          curve(col,
               row,
               cos(col),
               sin(row)*randomGaussian(30)*cos(row),
               cos(col)*randomGaussian(30),
               sin(row)*randomGaussian(30),
               cos(col)*randomGaussian(30),
               sin(row)*randomGaussian(30));
           
         }
         
         pop();
        
       }
     }
      

  }

}

function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      console.log('Image loaded');
    });

  } else {
    console.log('Invalid file type');
  }
  
}

function generate(){
  redraw();
}

function showOriginal(){
   image(img, 0, 0);
}

function saveImage() {
  saveCanvas('mosaic', 'jpg');
}