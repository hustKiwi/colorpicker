define(function(){

return function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="colorpicker">\n<div class="item">\n<label>选择颜色</label>\n<div class="color-bar"></div>\n</div>\n<div class="item">\n<label>调整饱和度</label>\n<div class="saturation-bar"></div>\n</div>\n<div class="item">\n<label>调整亮度</label>\n<div class="llightness-bar"></div>\n</div>\n<div class="item recommend">\n<label>推荐色彩</label>\n<ul class="colors">\n';
 _.each(colors, function(hsl, i) { ;
__p += '\n<li>\n';

if (_.isArray(hsl)) {
var h = hsl[0] / 360,
s = hsl[1],
l = hsl[2],
cls = colorUtils.hsl2hex(h, s, l).substr(1);
;
__p += '\n<i class="color-' +
__e( cls ) +
'" data-hsl="' +
__e( JSON.stringify([h, s, l]) ) +
'" style="background: ' +
__e( colorUtils.hsl2hex(h, s, l) ) +
'">\n';
 } else if (hsl === 'transparent') { ;
__p += '\n<i class="color-transparent transparent" data-hsl="' +
__e( hsl ) +
'">\n';
 } ;
__p += '\n</i><span class="selected"></span>\n</li>\n';
 }); ;
__p += '\n</ul>\n</div>\n</div>';

}
return __p
}

});