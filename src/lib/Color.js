export default class Color {
  static colorIsLight(r, g, b) {
    // Counting the perceptive luminance
    // human eye favors green color...
    var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return a < 0.5
  }

  static componentToHex(c) {
    var hex = c.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  static random(lightness) {
    return Color.hslToHex(Math.random(), 1.0, lightness)
  }

  static hslToHex(h, s, l) {
    /**
     * Converts an HSL color value to hex RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Array}           The RGB representation
     */
    let r, g, b

    if (s === 0) {
      r = g = b = l // achromatic
    } else {
      let hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s
      let p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    return Color.rgbToHex(
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    )
  }

  static rgbToHex(r, g, b) {
    return (
      "#" +
      Color.componentToHex(r) +
      Color.componentToHex(g) +
      Color.componentToHex(b)
    )
  }

  static hexToRgb(hex) {
    if (!Color.valid(hex)) return null

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
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

  static valid(hex) {
    return /^#?([a-f\d]{6}|[a-f\d]{3})$/i.test(hex)
  }
}
