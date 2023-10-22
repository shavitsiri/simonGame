// sequenceUtils.ts

const buttonColors = ['red', 'green', 'blue', 'yellow'];

export const generateRandomSequence = (length: number): string[] => {
  const newSequence: string[] = [];
  for (let i = 0; i < length; i++) {
    const randomColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
    newSequence.push(randomColor);
  }
  console.log("newSequenceUtils = ", newSequence);
  
  return newSequence;
};
