// 实现思路参考了从HSL到HEX色值的转换, 利用HSL色值建模,
// 默认saturation是100%, lightness是50%, 通过拖动条位置
// 来获取hue值, 最后转换为响应的HEX色值, 参考公式:
// https://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4
// 转换实例和效果测试可见: http://hslpicker.com/
define([
    'core/color',
    'tmpl/colorpicker'
], function(colorUtils, tmpl) {
    return function(options) {
        var defaults = {
                colors: [
                    [0, 0, 0],
                    [360, 1, 1],
                    [0, 0.6, 0.5],
                    [320, 0.6, 0.5],
                    [208, 0.8, 0.5],
                    [120, 0.6, 0.5],
                    'transparent'
                ],
                h: 0,
                s: 1,
                l: 0.5,
                change: function() {
                }
            },
            opts = _.extend(defaults, options),

            $picker = $(tmpl({
                colors: opts.colors,
                colorUtils: colorUtils
            })),
            $colors = $picker.find('.colors'),
            $color = $picker.find('.color-bar'),
            $saturation = $picker.find('.saturation-bar'),
            $llightness = $picker.find('.llightness-bar'),

            h = opts.h,
            s = opts.s,
            l = opts.l,

            setSaturation = function(ui) {
                if (_.isNumber(ui.value)) {
                    h = ui.value / 100;
                }
                var hex = colorUtils.hsl2hex(h, s, l);
                $saturation.css('background', hex);
                return hex;
            },

            setLlightness= function(ui) {
                if (_.isNumber(ui.value)) {
                    h = ui.value / 100;
                }
                var hex = colorUtils.hsl2hex(h, s, l);
                $llightness.css('background', hex);
                return hex;
            };

        $color.slider({
            value: h * 100,
            create: function(e, ui) {
                $('<div class="color-bg"></div>').appendTo($color);
                setSaturation(ui);
                setLlightness(ui);
            },
            change: function(e, ui) {
                opts.change(setSaturation(ui));
                opts.change(setLlightness(ui));
            },
            stop: function(e, ui) {
                $colors.find('> .on').removeClass('on');
                ui.handle.blur();
            }
        });

        $saturation.slider({
            value: s * 100,
            create: function() {
                $('<div class="mask"></div>').appendTo($saturation);
            },
            change: function(e, ui) {
                s = ui.value / 100;
                var hex = colorUtils.hsl2hex(h, s, l);
                opts.change(hex);
            },
            stop: function(e, ui) {
                $colors.find('> .on').removeClass('on');
                ui.handle.blur();
            }
        });

        $llightness.slider({
            value: l * 100,
            create: function() {
                $('<div class="mask"></div>').appendTo($llightness);
            },
            change: function(e, ui) {
                l = ui.value / 100;
                var hex = colorUtils.hsl2hex(h, s, l);
                opts.change(hex);
            },
            stop: function(e, ui) {
                $colors.find('> .on').removeClass('on');
                ui.handle.blur();
            }
        });

        $colors.on('click', '> :not(.on)', function() {
            var $this = $(this),
                hsl = $this.find('i').data('hsl');

            $colors.find('> .on').removeClass('on');
            $this.addClass('on');

            if (_.isArray(hsl)) {
                $color.slider('value', hsl[0] * 100);
                $saturation.slider('value', hsl[1] * 100);
                $llightness.slider('value', hsl[1] * 100);
            } else {
                opts.change(hsl);
            }
        });

        if (h === defaults.h && s === defaults.s && l === defaults.l) {
            $colors.find('.color-transparent').parent().addClass('on');
        } else {
            $colors.find('.color-' + colorUtils.hsl2hex(h, s, l).substr(1)).parent().addClass('on');
        }

        return $picker;
    };
});
