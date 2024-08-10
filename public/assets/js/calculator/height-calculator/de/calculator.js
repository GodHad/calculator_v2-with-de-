function calculate(){const gender=input.get('gender').raw();const age=input.get('age').gt(0).lte(18).val();const height=input.get('height').gt(0).val();const weight=input.get('weight').gt(0).val();const motherHeight=input.get('mother_height').gt(0).val();const fatherHeight=input.get('father_height').gt(0).val();if(!input.valid())return;const cH=cmToInches(height);const cW=kgToPounds(weight);const mH=cmToInches(motherHeight);const fH=cmToInches(fatherHeight);let rs=0;if(gender=="male"){if(age<4){rs=khamis_calc(3.000,0,0,1.00000,mH,fH,cH,cW);}
else if(age<=4){rs=khamis_calc(-10.25670,1.23812,-0.08724,0.50286,mH,fH,cH,cW);}
else if(age<=4.5){rs=khamis_calc(-10.71900,1.15964,-0.07445,0.52887,mH,fH,cH,cW);}
else if(age<=5){rs=khamis_calc(-11.02130,1.10674,-0.06478,0.53919,mH,fH,cH,cW);}
else if(age<=5.5){rs=khamis_calc(-11.15560,1.07480,-0.05776,0.53691,mH,fH,cH,cW);}
else if(age<=6){rs=khamis_calc(-11.11380,1.05923,-0.05295,0.52513,mH,fH,cH,cW);}
else if(age<=6.5){rs=khamis_calc(-11.02210,1.05542,-0.04989,0.50692,mH,fH,cH,cW);}
else if(age<=7){rs=khamis_calc(-10.99840,1.05877,-0.04814,0.48538,mH,fH,cH,cW);}
else if(age<=7.5){rs=khamis_calc(-11.02140,1.06467,-0.04726,0.46361,mH,fH,cH,cW);}
else if(age<=8){rs=khamis_calc(-11.06960,1.06853,-0.04678,0.44469,mH,fH,cH,cW);}
else if(age<=8.5){rs=khamis_calc(-11.12200,1.06572,-0.04626,0.43171,mH,fH,cH,cW);}
else if(age<=9){rs=khamis_calc(-11.15710,1.05166,-0.04525,0.42776,mH,fH,cH,cW);}
else if(age<=9.5){rs=khamis_calc(-11.14050,1.02174,-0.04331,0.43593,mH,fH,cH,cW);}
else if(age<=10){rs=khamis_calc(-11.03800,0.97135,-0.03998,0.45932,mH,fH,cH,cW);}
else if(age<=10.5){rs=khamis_calc(-10.82860,0.89589,-0.03481,0.50101,mH,fH,cH,cW);}
else if(age<=11){rs=khamis_calc(-10.49170,0.81239,-0.02905,0.54781,mH,fH,cH,cW);}
else if(age<=11.5){rs=khamis_calc(-10.00650,0.74134,-0.02417,0.58409,mH,fH,cH,cW);}
else if(age<=12){rs=khamis_calc(-9.35220,0.68325,-0.02008,0.60927,mH,fH,cH,cW);}
else if(age<=12.5){rs=khamis_calc(-8.60550,0.63869,-0.01668,0.62279,mH,fH,cH,cW);}
else if(age<=13){rs=khamis_calc(-7.86320,0.60818,-0.01390,0.62407,mH,fH,cH,cW);}
else if(age<=13.5){rs=khamis_calc(-7.13480,0.59228,-0.01162,0.61253,mH,fH,cH,cW);}
else if(age<=14){rs=khamis_calc(-6.42990,0.59151,-0.00978,0.58762,mH,fH,cH,cW);}
else if(age<=14.5){rs=khamis_calc(-5.75780,0.60643,-0.00826,0.54875,mH,fH,cH,cW);}
else if(age<=15){rs=khamis_calc(-5.12820,0.63757,-0.00699,0.49536,mH,fH,cH,cW);}
else if(age<=15.5){rs=khamis_calc(-4.50920,0.68548,-0.00586,0.42687,mH,fH,cH,cW);}
else if(age<=16){rs=khamis_calc(-3.92920,0.75069,-0.00480,0.34271,mH,fH,cH,cW);}
else if(age<=16.5){rs=khamis_calc(-3.48730,0.83375,-0.00370,0.24231,mH,fH,cH,cW);}
else if(age<=17){rs=khamis_calc(-3.28300,0.93520,-0.00247,0.12510,mH,fH,cH,cW);}
else if(age<=18){rs=khamis_calc(-3.41560,1.05558,-0.00103,-0.00950,mH,fH,cH,cW);}}
else if(gender=="female"){if(age<4){rs=khamis_calc(-3.00000,0,0,1.00000,mH,fH,cH,cW);}
else if(age<=4){rs=khamis_calc(-8.13250,1.24768,-0.19435,0.44774,mH,fH,cH,cW);}
else if(age<=4.5){rs=khamis_calc(-6.47656,1.22177,-0.18519,0.41381,mH,fH,cH,cW);}
else if(age<=5){rs=khamis_calc(-5.13583,1.19932,-0.17530,0.38460,mH,fH,cH,cW);}
else if(age<=5.5){rs=khamis_calc(-4.13791,1.17880,-0.16484,0.36039,mH,fH,cH,cW);}
else if(age<=6){rs=khamis_calc(-3.51039,1.15866,-0.15400,0.34105,mH,fH,cH,cW);}
else if(age<=6.5){rs=khamis_calc(-3.14322,1.13737,-0.14294,0.32672,mH,fH,cH,cW);}
else if(age<=7){rs=khamis_calc(-2.87645,1.11342,-0.13184,0.31748,mH,fH,cH,cW);}
else if(age<=7.5){rs=khamis_calc(-2.66291,1.08525,-0.12086,0.31340,mH,fH,cH,cW);}
else if(age<=8){rs=khamis_calc(-2.45559,1.05135,-0.11019,0.31457,mH,fH,cH,cW);}
else if(age<=8.5){rs=khamis_calc(-2.20728,1.01018,-0.09999,0.32105,mH,fH,cH,cW);}
else if(age<=9){rs=khamis_calc(-1.87098,0.96020,-0.09044,0.33291,mH,fH,cH,cW);}
else if(age<=9.5){rs=khamis_calc(-1.06330,0.89989,-0.08171,0.35025,mH,fH,cH,cW);}
else if(age<=10){rs=khamis_calc(0.33468,0.82771,-0.07397,0.37312,mH,fH,cH,cW);}
else if(age<=10.5){rs=khamis_calc(1.97366,0.74213,-0.06739,0.40161,mH,fH,cH,cW);}
else if(age<=11){rs=khamis_calc(3.50436,0.67173,-0.06136,0.42042,mH,fH,cH,cW);}
else if(age<=11.5){rs=khamis_calc(4.57747,0.64150,-0.05518,0.41686,mH,fH,cH,cW);}
else if(age<=12){rs=khamis_calc(4.84365,0.64452,-0.04894,0.39490,mH,fH,cH,cW);}
else if(age<=12.5){rs=khamis_calc(4.27869,0.67386,-0.04272,0.35850,mH,fH,cH,cW);}
else if(age<=13){rs=khamis_calc(3.21417,0.72260,-0.03661,0.31163,mH,fH,cH,cW);}
else if(age<=13.5){rs=khamis_calc(1.83456,0.78383,-0.03067,0.25826,mH,fH,cH,cW);}
else if(age<=14){rs=khamis_calc(0.32425,0.85062,-0.02500,0.20235,mH,fH,cH,cW);}
else if(age<=14.5){rs=khamis_calc(-1.13224,0.91605,-0.01967,0.14787,mH,fH,cH,cW);}
else if(age<=15){rs=khamis_calc(-2.35055,0.97319,-0.01477,0.09880,mH,fH,cH,cW);}
else if(age<=15.5){rs=khamis_calc(-3.10326,1.01514,-0.01037,0.05909,mH,fH,cH,cW);}
else if(age<=16){rs=khamis_calc(-3.17885,1.03496,-0.00655,0.03272,mH,fH,cH,cW);}
else if(age<=16.5){rs=khamis_calc(-2.41657,1.02573,-0.00340,0.02364,mH,fH,cH,cW);}
else if(age<=17){rs=khamis_calc(-0.65579,0.98054,-0.00100,0.03584,mH,fH,cH,cW);}
else if(age<=18){rs=khamis_calc(2.26429,0.89246,0.00057,0.07327,mH,fH,cH,cW);}}
let result='';if(!isMetricSystem()){result=gToFeetAndInches(rs);}
else{result=roundTo(rs*2.54,0)+' cm';}
output.val(result).set('result');}
function cmToInches(cm){return cm*0.393701;}
function kgToPounds(kg){return kg*2.20462;}
function gToFeetAndInches(strInches){var strReturnValue='';let feet=(strInches-(parseInt(strInches)%12))/12;let inches=(parseInt(strInches)%12);strReturnValue=plural(feet,'Fuße:Fuß:Fuße:Fuße:Fuße:Fuße')+' '+plural(inches,'Zoll:Zoll:Zoll:Zoll:Zoll:Zoll');return strReturnValue;}
function khamis_calc(beta0,beta1,beta2,beta3,mHeight,fHeight,cHeight,cWeight){var pAvgHeight=((mHeight+fHeight)/2);var aHeight=beta0+(beta1*cHeight)+(beta2*cWeight)+(beta3*pAvgHeight);return Math.round(aHeight);}