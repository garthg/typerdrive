/*
 * Defines a SamChillian key layout where pitch corresponds to
 * left and right sides of the keyboard.
 */
function samChillianKeyMap(key) {
  switch(key) {
    // Top row: qwertyuiop
    // Currently skipped.
    // Middle row: asdfghjkl;
    case 65: return -2;
    case 83: return -2;
    case 68: return -1;
    case 70: return -1;
    case 71: return 0;
    case 72: return 0;
    case 74: return 1;
    case 75: return 1;
    case 76: return 2;
    case 186: return 2;
    // Bottom row: zxcvbnm,./
    case 90: return -4;
    case 88: return -3;
    case 67: return -2;
    case 86: return -1;
    case 66: return 0;
    case 78: return 0;
    case 77: return 1;
    case 188: return 2;
    case 190: return 3;
    case 191: return 4;
    // Default.
    default: return null;
  }
}
