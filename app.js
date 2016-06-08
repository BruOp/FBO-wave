
var simWidth = 1024, simHeight = 512;

var mouse = THREE.Vector2(0.5, 0.5);

var simulation;

window.onload = function() {
  var shaderLoader = new ShaderLoader();
  shaderLoader.loadShaders({
    passthrough_vertex: "passthrough/vertex",
    passthrough_fragment: "passthrough/fragment",
    simulation_vertex: "simulation/vertex",
    simulation_fragment : "simulation/fragment"
  }, "shaders/", init );
}


function init() {
  var shaderHash = {
    simulation: {
      vertex: ShaderLoader.get('simulation_vertex'),
      fragment: ShaderLoader.get('simulation_fragment')
    },
    passThrough: {
      vertex: ShaderLoader.get('passthrough_vertex'),
      fragment: ShaderLoader.get('passthrough_fragment')
    }
  };

  simulation = new Simulation(simWidth, simHeight, shaderHash);
  simulation.init();
  
  document.body.appendChild(simulation.renderer.domElement);
  simulation.renderer.domElement.addEventListener('click', simulation.onMouseClick.bind(simulation));
  
  render();
}

function render() {
  requestAnimationFrame(render);
  simulation.update();
  simulation.passThroughRender( simulation.rtPositionCur );
}