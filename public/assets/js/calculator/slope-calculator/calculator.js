function calculate(){
  // 1. init & validate
  const given = input.get('given').raw();
  let x1, y1, x2, y2, d, s, a, dx, dy;

  // 2. calculate
  const getNumber = id => input.get(id).number().val();
  switch(given){
    case 'two_points': 
      x1 = getNumber('point_a_1_x'); 
      y1 = getNumber('point_a_1_y'); 
      x2 = getNumber('point_a_2_x'); 
      y2 = getNumber('point_a_2_y');
      if(x1 == x2 && y1 == y2){
        input.error(['point_a_2_x','point_a_2_y'], 'Second point is the same as first.');
      }
      if(!input.valid()) return;
      dx = calc('x2-x1',{x2,x1});
      dy = calc('y2-y1',{y2,y1});    
      s = calc('dy/dx',{dy,dx});
      a = calc('atan(dy/dx)',{dy,dx});
      d = calc('sqrt(dx^2+dy^2)',{dy,dx});
    break;
    case 'slope': 
      x1 = getNumber('point_b_1_x'); 
      y1 = getNumber('point_b_1_y');
      d = getNumber('distance_b');
      s = getNumber('slope_b');
      if(!input.valid()) return;
      a = calc('atan(s)',{s});
      dx = calc('cos(a)*d',{a,d});
      dy = calc('sin(a)*d',{a,d});
      x2 = calc('x1+dx',{x1,dx});
      y2 = calc('y1+dy',{y1,dy});
    break;
    case 'angle': 
      x1 = getNumber('point_c_1_x'); 
      y1 = getNumber('point_c_1_y');
      d = getNumber('distance_c');
      a = getNumber('angle_c');
      if(!input.valid()) return;
      a = calc('a*pi/180',{a});
      dx = calc('cos(a)*d',{a,d});
      dy = calc('sin(a)*d',{a,d});
      x2 = calc('x1+dx',{x1,dx});
      y2 = calc('y1+dy',{y1,dy});
      s = calc('dy/dx',{dy,dx});
    break;
  }
  let aDeg = calc('a*180/pi',{a});

  // 3. output
  _('result_slope').innerHTML = format(s);
  _('result_angle').innerHTML = `${format(a)}rad or ${format(aDeg)}°`;
  _('result_distance').innerHTML = format(d);
  _('result_deltaX').innerHTML = format(dx);
  _('result_deltaY').innerHTML = format(dy);

}
