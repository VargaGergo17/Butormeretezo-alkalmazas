function WeightCalculate(width, height, depth, thickness, selectedTexture) {
  let density;
  
  switch (selectedTexture) { // Use selectedTexture instead of material
    case "Darkwood.jpg":
      density = 700; 
      break;
    case "wood.jpg":
      density = 650; 
      break;
    case "Oak1.jpg":
      density = 750; 
      break;
    case "natural.jpg":
      density = 600; 
      break;
    case "rosewood.jpg":
      density = 850; 
      break;
    case "plywood.jpg":
      density = 500; 
      break;
    case "Oak.jpg":
      density = 550; 
      break;
    default:
      throw new Error("Invalid material selected"); 
  }

  
  const t_cm = thickness / 10;

  const Sides = 2 * ((depth - t_cm) * height * t_cm);
  const TopBottom = 2 * ((width - t_cm * 2) * (depth - t_cm) * t_cm);
  const Back = height * width * t_cm;

  
  const volume = (Sides + TopBottom + Back) / 1000000; 
  const weight = volume * density; 
  return weight;
}

export default WeightCalculate;



