function calculate(){
  // 1. init & validate
  const switcher = input.get('switcher').raw();
  const z = [
    0      , 0.00399, 0.00798, 0.01197, 0.01595, 0.01994, 0.02392, 0.0279 , 0.03188, 0.03586,
    0.03983, 0.0438 , 0.04776, 0.05172, 0.05567, 0.05962, 0.06356, 0.06749, 0.07142, 0.07535,
    0.07926, 0.08317, 0.08706, 0.09095, 0.09483, 0.09871, 0.10257, 0.10642, 0.11026, 0.11409,
    0.11791, 0.12172, 0.12552, 0.1293 , 0.13307, 0.13683, 0.14058, 0.14431, 0.14803, 0.15173,
    0.15542, 0.1591 , 0.16276, 0.1664 , 0.17003, 0.17364, 0.17724, 0.18082, 0.18439, 0.18793,
    0.19146, 0.19497, 0.19847, 0.20194, 0.2054 , 0.20884, 0.21226, 0.21566, 0.21904, 0.2224 ,
    0.22575, 0.22907, 0.23237, 0.23565, 0.23891, 0.24215, 0.24537, 0.24857, 0.25175, 0.2549 ,
    0.25804, 0.26115, 0.26424, 0.2673 , 0.27035, 0.27337, 0.27637, 0.27935, 0.2823 , 0.28524,
    0.28814, 0.29103, 0.29389, 0.29673, 0.29955, 0.30234, 0.30511, 0.30785, 0.31057, 0.31327,
    0.31594, 0.31859, 0.32121, 0.32381, 0.32639, 0.32894, 0.33147, 0.33398, 0.33646, 0.33891,
    0.34134, 0.34375, 0.34614, 0.34849, 0.35083, 0.35314, 0.35543, 0.35769, 0.35993, 0.36214,
    0.36433, 0.3665 , 0.36864, 0.37076, 0.37286, 0.37493, 0.37698, 0.379  , 0.381  , 0.38298,
    0.38493, 0.38686, 0.38877, 0.39065, 0.39251, 0.39435, 0.39617, 0.39796, 0.39973, 0.40147,
    0.4032 , 0.4049 , 0.40658, 0.40824, 0.40988, 0.41149, 0.41308, 0.41466, 0.41621, 0.41774,
    0.41924, 0.42073, 0.4222 , 0.42364, 0.42507, 0.42647, 0.42785, 0.42922, 0.43056, 0.43189,
    0.43319, 0.43448, 0.43574, 0.43699, 0.43822, 0.43943, 0.44062, 0.44179, 0.44295, 0.44408,
    0.4452 , 0.4463 , 0.44738, 0.44845, 0.4495 , 0.45053, 0.45154, 0.45254, 0.45352, 0.45449,
    0.45543, 0.45637, 0.45728, 0.45818, 0.45907, 0.45994, 0.4608 , 0.46164, 0.46246, 0.46327,
    0.46407, 0.46485, 0.46562, 0.46638, 0.46712, 0.46784, 0.46856, 0.46926, 0.46995, 0.47062,
    0.47128, 0.47193, 0.47257, 0.4732 , 0.47381, 0.47441, 0.475  , 0.47558, 0.47615, 0.4767 ,
    0.47725, 0.47778, 0.47831, 0.47882, 0.47932, 0.47982, 0.4803 , 0.48077, 0.48124, 0.48169,
    0.48214, 0.48257, 0.483  , 0.48341, 0.48382, 0.48422, 0.48461, 0.485  , 0.48537, 0.48574,
    0.4861 , 0.48645, 0.48679, 0.48713, 0.48745, 0.48778, 0.48809, 0.4884 ,  0.4887, 0.48899,
    0.48928, 0.48956, 0.48983, 0.4901 , 0.49036, 0.49061, 0.49086, 0.49111, 0.49134, 0.49158,
    0.4918 , 0.49202, 0.49224, 0.49245, 0.49266, 0.49286, 0.49305, 0.49324, 0.49343, 0.49361,
    0.49379, 0.49396, 0.49413, 0.4943 , 0.49446, 0.49461, 0.49477, 0.49492, 0.49506, 0.4952 ,
    0.49534, 0.49547, 0.4956 , 0.49573, 0.49585, 0.49598, 0.49609, 0.49621, 0.49632, 0.49643,
    0.49653, 0.49664, 0.49674, 0.49683, 0.49693, 0.49702, 0.49711, 0.4972 , 0.49728, 0.49736,
    0.49744, 0.49752, 0.4976 , 0.49767, 0.49774, 0.49781, 0.49788, 0.49795, 0.49801, 0.49807,
    0.49813, 0.49819, 0.49825, 0.49831, 0.49836, 0.49841, 0.49846, 0.49851, 0.49856, 0.49861,
    0.49865, 0.49869, 0.49874, 0.49878, 0.49882, 0.49886, 0.49889, 0.49893, 0.49896, 0.499  ,
    0.49903, 0.49906, 0.4991 , 0.49913, 0.49916, 0.49918, 0.49921, 0.49924, 0.49926, 0.49929,
    0.49931, 0.49934, 0.49936, 0.49938, 0.4994 , 0.49942, 0.49944, 0.49946, 0.49948, 0.4995 ,
    0.49952, 0.49953, 0.49955, 0.49957, 0.49958, 0.4996 , 0.49961, 0.49962, 0.49964, 0.49965,
    0.49966, 0.49968, 0.49969, 0.4997 , 0.49971, 0.49972, 0.49973, 0.49974, 0.49975, 0.49976,
    0.49977, 0.49978, 0.49978, 0.49979, 0.4998 , 0.49981, 0.49981, 0.49982, 0.49983, 0.49983,
    0.49984, 0.49985, 0.49985, 0.49986, 0.49986, 0.49987, 0.49987, 0.49988, 0.49988, 0.49989,
    0.49989, 0.4999 , 0.4999 , 0.4999 , 0.49991, 0.49991, 0.49992, 0.49992, 0.49992, 0.49992,
    0.49993, 0.49993, 0.49993, 0.49994, 0.49994, 0.49994, 0.49994, 0.49995, 0.49995, 0.49995,
    0.49995, 0.49995, 0.49996, 0.49996, 0.49996, 0.49996, 0.49996, 0.49996, 0.49997, 0.49997,
    0.49997, 0.49997, 0.49997, 0.49997, 0.49997, 0.49997, 0.49998, 0.49998, 0.49998, 0.49998
  ];

  switch(switcher){
    case 'Z-score Calculator':{
      const x = input.get('raw_score').number().val();
      const m = input.get('population_mean').number().val();
      const s = input.get('standart_deviation').positive().val();
      if(!input.valid()) return;

      // 2. calculate
      const zScore = calc('(x-m)/s',{x,m,s});
      let lb, rb;
      if(x > m) {
        rb = x;
        lb = m;
      } else {
        rb = m;
        lb = x;
      }
      const l = calc(`(${lb}-${m})/${s}`); 
      const r = calc(`(${rb}-${m})/${s}`);
      const zl = calc(`round(abs(${l}*100))<${z.length}`) ? z[calc(`round(abs(${l}*100))`)] : 0.5;
      const zr = calc(`round(abs(${r}*100))<${z.length}`) ? z[calc(`round(abs(${r}*100))`)] : 0.5;
      const p = r >=0 && l >=0 || r <= 0 && l <=0 ? calc(`abs(${zr}-${zl})`) : calc(`${zr}+${zl}`);
      const pLessLb = calc(`0.5 + ${l<=0?-zl:zl}`);
      const pMoreRb = calc(`0.5 + ${r>=0?-zr:zr}`);

      // 3. output
      _('result_z_score').innerHTML = format(zScore);
      _('result_x').innerHTML = x;
      _('result_lt_x').innerHTML = format(x > m ? 1 - pMoreRb : pLessLb);
      _('result_x_2').innerHTML = x;
      _('result_gt_x').innerHTML = format(x > m ? pMoreRb : 1 - pLessLb);
      _('result_lb').innerHTML = lb;
      _('result_rb').innerHTML = rb;
      _('result_p').innerHTML = format(p);
    }break;

    case 'Probability Converter':{
      const type = input.get('score_or_pobability').raw();
      const number = input.get('probability_or_z_score')[type == 'Z-score'?'number':'probability']().val();
      if(type == 'P(0<x<Z)' && number > 0.5){
        input.error('probability_or_z_score','Please provide a P(0&lt;x&lt;Z) value between 0 and 0.5.');
      }
      if(!input.valid()) return;

      // 2. calculate
      let zScore, zSign = 1, zIndex, pXltZ, pXgtZ, p0ltXltZ, pMinusZltXltZ, pXltMinusZorXgtZ;
      const calcProbabilities = () => {
        pXltZ = zSign * p0ltXltZ + 0.5;
        pXgtZ = 0.5 - zSign * p0ltXltZ;
        pMinusZltXltZ = 2 * p0ltXltZ;
        pXltMinusZorXgtZ = 1 - pMinusZltXltZ;
      };
      const calcUsingZScore = () => {
        zSign = zScore > 0 ? 1 : -1;
        zIndex = calc(`round(abs(${zScore}*100))`);
        p0ltXltZ = zIndex < z.length ? z[zIndex] : 0.5;
        calcProbabilities();
      };
      const calcUsingP0ltXltZ = () => {
        if(p0ltXltZ == 0.5){
          zScore = zSign * Infinity;
        } 
        else { // find zScore
          zIndex = z.findIndex(p=>p0ltXltZ<=p);
          zScore = zSign * (zIndex / 100);
        }
        calcProbabilities();
      };
      switch(type){
        case 'Z-score':
          zScore = number;
          calcUsingZScore();
        break;
        case 'P(x<Z)': 
          pXltZ = number;
          zSign = pXltZ - 0.5 > 0 ? 1 : -1;
          p0ltXltZ = math.abs(pXltZ-0.5);
          calcUsingP0ltXltZ();
        break;
        case 'P(x>Z)': 
          pXgtZ = number;
          zSign = 0.5 - pXgtZ > 0 ? 1 : -1;
          p0ltXltZ = math.abs(0.5-pXgtZ);
          calcUsingP0ltXltZ();
        break;
        case 'P(0<x<Z)': 
          p0ltXltZ = number;
          calcUsingP0ltXltZ();
        break;
        case 'P(-Z<x<Z)': 
          pMinusZltXltZ = number;
          p0ltXltZ = pMinusZltXltZ/2;
          calcUsingP0ltXltZ();
        break;
        case 'P(x<-Z or x>Z)': 
          pXltMinusZorXgtZ = number;
          p0ltXltZ = (1-pXltMinusZorXgtZ)/2;
          calcUsingP0ltXltZ();
        break;
      }

      // 3. output
      _('result_z_score_2').innerHTML = format(zScore);
      _('result_x_lt_z').innerHTML = format(pXltZ);
      _('result_x_gt_z').innerHTML = format(pXgtZ);
      _('result_0_lt_x_lt_z').innerHTML = format(p0ltXltZ);
      _('result_-z_lt_x_lt_z').innerHTML = format(pMinusZltXltZ);
      _('result_x_lt_-z_or_x_gt_z').innerHTML = format(pXltMinusZorXgtZ);
    }break;

    case 'Two Z-scores':{
      const l = input.get('left_bound').number().val();
      const r = input.get('right_bound').number().val();
      if(l > r) {
        input.error('left_bound','Please specify the left bound value less than or equal to the right bound value');
      }
      if(!input.valid()) return;

      // 2. calculate
      const zLIndex = calc(`round(abs(${l}*100))`);
      const zRIndex = calc(`round(abs(${r}*100))`);
      const zl = zLIndex<z.length ? z[zLIndex] : 0.5;
      const zr = zRIndex<z.length ? z[zRIndex] : 0.5;
      const pInner = r >=0 && l >=0 || r <= 0 && l <=0 ? calc(`abs(${zr}-${zl})`) : calc(`${zr}+${zl}`);
      const pOuter = 1 - pInner;
      const pLtLb = calc(`0.5 + ${l<=0?-zl:zl}`);
      const pGtRb = calc(`0.5 + ${r>=0?-zr:zr}`);

      // 3. output
      $$('#result_lb_3').forEach(el=>el.innerHTML=l);
      $$('#result_rb_3').forEach(el=>el.innerHTML=r);
      _('result_p_inner').innerHTML = format(pInner);
      _('result_p_outer').innerHTML = format(pOuter);
      _('result_lt_lb').innerHTML = format(pLtLb);
      _('result_gt_rb').innerHTML = format(pGtRb);
    }break;
  }
}
