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
      throw new Error("Invalid material selected"); // Handle invalid texture
  }

  const Sides = 2 * ((depth - thickness) * height * thickness);
  const TopBottom = 2 * ((width - thickness * 2) * (depth - thickness) * thickness);
  const Back = height * width * thickness;

  const volume = (Sides + TopBottom + Back) / 1000000; // m^3
  const weight = volume * density; // kg
  return weight;
}

export default WeightCalculate;



