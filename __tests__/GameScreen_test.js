import { generateRandomSequence } from "../functions/sequenceUtils";

test('create an array length 20', () => {
    const randomSequence = generateRandomSequence(20);
    expect(randomSequence.length).toEqual(20);
});
