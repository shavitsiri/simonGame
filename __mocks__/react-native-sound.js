class Sound {
    constructor(filename, basePath, errorCallback) {
      // Mock the constructor if needed
    }
  
    play(successCallback, errorCallback) {
      // Implement a mock for the play method if needed
      successCallback(); // Simulate success
    }
  
    // You can add other methods used in your code
  
    // For Tts, you may need to mock methods used in your code
    static getInitStatus() {
      return Promise.resolve();
    }
  
    static speak(text) {
      return Promise.resolve();
    }
  }
  
  module.exports = Sound;
  