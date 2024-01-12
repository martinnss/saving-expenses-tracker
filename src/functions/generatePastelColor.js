function generatePastelColor() {
    const baseColor = Math.floor(Math.random() * 360); // Random hue
    const saturation = Math.floor(Math.random() * 20) + 70; // Random saturation between 70 and 90
    const lightness = Math.floor(Math.random() * 20) + 55; // Random lightness between 70 and 90
  
    return `hsl(${baseColor}, ${saturation}%, ${lightness}%)`;
  }

export default generatePastelColor