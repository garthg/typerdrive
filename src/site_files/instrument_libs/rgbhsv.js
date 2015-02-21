function RGB2HSV (RGBr, RGBg, RGBb) {
	var r = RGBr / 255;
  var g = RGBg / 255;
  var b = RGBb / 255;

	var minVal = Math.min(r, g, b);
	var maxVal = Math.max(r, g, b);
	var delta = maxVal - minVal;

  var h, s, v;
	v = maxVal;

	if (delta == 0) {
		h = 0;
		s = 0;
	} else {
		s = delta / maxVal;
		var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
		var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
		var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

		if (r == maxVal) {HSV.h = del_B - del_G;}
		else if (g == maxVal) {h = (1 / 3) + del_R - del_B;}
		else if (b == maxVal) {h = (2 / 3) + del_G - del_R;}
		
		if (h < 0) {h += 1;}
		if (h > 1) {h -= 1;}
	}
	h *= 360;
	s *= 100;
	v *= 100;
  return {'h':h, 's':s, 'v':v};
}

function HSV2RGB (HSVh, HSVs, HSVv) {
	var h = HSVh / 360; var s = HSVs / 100; var v = HSVv / 100;
  var r, g, b;
	if (s == 0) {
		r = v * 255;
		g = v * 255;
		b = v * 255;
	} else {
		var_h = h * 6;
		var_i = Math.floor(var_h);
		var_1 = v * (1 - s);
		var_2 = v * (1 - s * (var_h - var_i));
		var_3 = v * (1 - s * (1 - (var_h - var_i)));
		
		if (var_i == 0) {var_r = v; var_g = var_3; var_b = var_1}
		else if (var_i == 1) {var_r = var_2; var_g = v; var_b = var_1}
		else if (var_i == 2) {var_r = var_1; var_g = v; var_b = var_3}
		else if (var_i == 3) {var_r = var_1; var_g = var_2; var_b = v}
		else if (var_i == 4) {var_r = var_3; var_g = var_1; var_b = v}
		else {var_r = v; var_g = var_1; var_b = var_2};
		
		r = var_r * 255;
		g = var_g * 255;
		b = var_b * 255;
	}
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  return {'r':r, 'g':g, 'b':b};
}

