/* 
 * Defines a simple mapping between keyboard keys and a scale.
 */

function KeyMap_linearHomerow(key) {
  switch(key) {
    // Middle row: asdfghjkl;'
    case 65: return 0;
    case 83: return 1;
    case 68: return 2;
    case 70: return 3;
    case 71: return 4;
    case 72: return 5;
    case 74: return 6;
    case 75: return 7;
    case 76: return 8;
    case 186: case 59: return 9;  // Semicolon different on different browsers.
    case 222: return 10;
    // Default.
    default: return null;
  }
}

function KeyMap_linearFull(key) {
  switch(key) {
    // Extra: [
    case 219: return 30;
    // Top row: qwertyuiop
    case 81: return 20;
    case 87: return 21;
    case 69: return 22;
    case 82: return 23;
    case 84: return 24;
    case 89: return 25;
    case 85: return 26;
    case 73: return 27;
    case 79: return 28;
    case 80: return 29;
    // Middle row: asdfghjkl;
    case 65: return 10;
    case 83: return 11;
    case 68: return 12;
    case 70: return 13;
    case 71: return 14;
    case 72: return 15;
    case 74: return 16;
    case 75: return 17;
    case 76: return 18;
    case 186: case 59: return 19;
    // Bottom row: zxcvbnm,./
    case 90: return 0;
    case 88: return 1;
    case 67: return 2;
    case 86: return 3;
    case 66: return 4;
    case 78: return 5;
    case 77: return 6;
    case 188: return 7;
    case 190: return 8;
    case 191: return 9;
    // Default.
    default: return null;
  }
}

