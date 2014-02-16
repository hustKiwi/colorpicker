define(function() {
    var math = Math,
        mathRound = math.round,
        mathMax = math.max,
        mathMin = math.min,

        r = {
            // http://stackoverflow.com/a/9493060
            hsl2rgb: function(h, s, l) {
                var r, g, b;

                if (s === 0) {
                    r = g = b = l;
                } else {
                    var hue2rgb = function(p, q, t) {
                            if (t < 0) {
                                t += 1;
                            }
                            if (t > 1) {
                                t -= 1;
                            }
                            if (t < 1/6) {
                                return p + (q - p) * 6 * t;
                            }
                            if (t < 1/2) {
                                return q;
                            }
                            if (t < 2/3) {
                                return p + (q - p) * (2/3 - t) * 6;
                            }
                            return p;
                        },
                        q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                        p = 2 * l - q;

                    r = hue2rgb(p, q, h + 1/3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1/3);
                }

                return [r * 255, g * 255, b * 255];
            },

            // https://github.com/bgrins/TinyColor/blob/master/tinycolor.js
            rgb2hex: function(r, g, b) {
                var pad2 = function(c) {
                        return c.length === 1 ? '0' + c : '' + c;
                    },
                    hex = [
                        pad2(mathRound(r).toString(16)),
                        pad2(mathRound(g).toString(16)),
                        pad2(mathRound(b).toString(16))
                    ];

                if (typeof allow3Char === 'undefined') {
                    allow3Char = true;
                }

                return '#' + hex.join('');
            },

            hsl2hex: function(h, s, l) {
                var rgb = this.hsl2rgb(h, s, l);
                return this.rgb2hex(rgb[0], rgb[1], rgb[2]);
            },

            rgb2hsl: function(r, g, b) {
                r /= 255, g /= 255, b /= 255;

                var max = mathMax(r, g, b),
                    min = mathMin(r, g, b),
                    h, s, l = (max + min) / 2;

                if (max === min) {
                    h = s = 0;
                } else {
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch(max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }

                return [h, s, l];
            },

            // 参考: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
            hex2rgb: function(hex) {
                // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

                hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                    return r + r + g + g + b + b;
                });

                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

                return result ? [
                    parseInt(result[1], 16),
                    parseInt(result[2], 16),
                    parseInt(result[3], 16)
                ] : null;
            },

            hex2hsl: function(hex) {
                if (!hex) {
                    return null;
                }
                var rgb = this.hex2rgb(hex);
                return rgb ? this.rgb2hsl(rgb[0], rgb[1], rgb[2]) : null;
            }
        };

    _.bindAll(r, 'hsl2hex', 'hex2hsl');

    return r;
});
