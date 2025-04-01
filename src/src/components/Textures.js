
import React, { useState } from "react";
const [result, setResult] = useState(null);

const calculateParts = (width, height, depth, selectedModel, shelfCount) => {
    let parts = [];

    switch (selectedModel) {
      case "egyajtos":
        parts = [
          { name: "Oldallap", width: depth, height },
          { name: "Tetolap", width, height: depth },
          { name: "Ajtó", width, height },
        ];
        break;
      case "ketajtos":
        parts = [
          { name: "Oldallap", width: depth, height },
          { name: "Tetőlap", width, height: depth },
          { name: "Ajtó 1", width: width / 2, height },
          { name: "Ajtó 2", width: width / 2, height },
        ];
        break;
      case "fiokos":
        for (let i = 0; i < shelfCount; i++) {
          parts.push({ name: "Fiók" `${i + 1}`, width, height: depth / 2 });
        }
        parts.push({ name: "Oldallap", width: depth, height });
        parts.push({ name: "Tetőlap", width, height: depth });
        break;
      case "polcos":
        parts = [
          { name: "Oldallap", width: depth, height },
          { name: "Tetőlap", width, height: depth },
          { name: "Fiókelőlap", width, height: height / 3 },
        ];
        break;
      default:
        parts = [];
    }

    return parts;
  };

  const handleCalculate = () => {
    const numWidth = parseFloat(width);
    const numHeight = parseFloat(height);
    const numDepth = parseFloat(depth);

    if (numWidth > 0 && numHeight > 0 && numDepth > 0) {
      const parts = calculateParts(numWidth, numHeight, numDepth, selectedModel, shelfCount);
      setResult(parts);
    } else {
      alert("Minden mezőt ki kell tölteni érvényes értékekkel!");
    }
  };

  export default Calculations;
