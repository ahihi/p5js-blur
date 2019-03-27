var blur_iterations = 5;

var g;
var g_image_shader;
var blur_shader;
var image_shader;
var img;

function preload() {
    g_image_shader = loadShader("default.vert", "image.frag");
    blur_shader = loadShader("default.vert", "blur.frag");
    image_shader = loadShader("default.vert", "image.frag");
    img = loadImage("06a.png");
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    g = createGraphics(width, height, WEBGL);
    frameRate(60);

    noStroke();
    g.noStroke();    
}

function draw() {
    var blur = (Math.sin(0.001*millis()) + 1.0) * 0.5;
    
    // initialize g with the input image

    g.shader(g_image_shader);
    g_image_shader.setUniform("image", img);
    g.rect(-0.5*width, -0.5*height, width, height);

    // blur
    
    for(var i = 0; i < blur_iterations; i++) {
        g.shader(blur_shader);
        blur_shader.setUniform("resolution", [width, height]);
        blur_shader.setUniform("image", g);
        blur_shader.setUniform("direction", [blur, 0.0]);
        g.rect(-0.5*width, -0.5*height, width, height);

        g.shader(blur_shader);
        blur_shader.setUniform("resolution", [width, height]);
        blur_shader.setUniform("image", g);
        blur_shader.setUniform("direction", [0.0, blur]);
        g.rect(-0.5*width, -0.5*height, width, height);
    }

    // display the contents of g

    shader(image_shader);
    image_shader.setUniform("image", g);
    rect(-0.5*width, -0.5*height, width, height);
}
