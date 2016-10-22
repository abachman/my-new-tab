export default class Color {
  static colorIsLight(r, g, b) {
    // Counting the perceptive luminance
    // human eye favors green color...
    var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return (a < 0.5);
  }

  static componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  static rgbToHex(r, g, b) {
    return "#" + Color.componentToHex(r) +
                 Color.componentToHex(g) +
                 Color.componentToHex(b);
  }

  static hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  static hexIsLight(hex) {
    const rgb = Color.hexToRgb(hex)
    if (rgb) {
      return Color.colorIsLight(rgb.r, rgb.g, rgb.b)
    } else {
      // by default, assume we're asking about a background and it's white or transparent
      return true
    }
  }
}
