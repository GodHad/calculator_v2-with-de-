function calculate(){
  // 1. init & validate
  const shape = input.get('shape').raw();
  const units = input.get('units').raw();

  // 2. calculate
  let vol = 0;
  const get = id => input.get(id).positive().raw();
  const getOpt = id => input.get(id).optional().positive().raw();
  switch(shape){
    case 'Sphere':{ 
      const r = get('sphere_r');
      if(!input.valid()) return;
      vol = calc(`4/3*pi*${r}^3`);
    }break;
    case 'Cone':{ 
      const r = get('cone_r');
      const h = get('cone_h');
      if(!input.valid()) return;
      vol = calc(`1/3*pi*${r}^2*${h}`);
    }break;
    case 'Cube':{ 
      const a = get('cube_a');
      if(!input.valid()) return;
      vol = calc(`${a}^3`);
    }break;
    case 'Cylinder':{ 
      const r = get('cylinder_r');
      const h = get('cylinder_h');
      if(!input.valid()) return;
      vol = calc(`pi*${r}^2*${h}`);
    }break;
    case 'Rectangular Tank':{ 
      const r = get('tank_r');
      const l = get('tank_l');
      const h = get('tank_h');
      if(!input.valid()) return;
      vol = calc(`${r}*${h}*${l}`);
    }break;
    case 'Capsule':{
      const r = get('capsule_r');
      const h = get('capsule_h');
      if(!input.valid()) return;
      vol = calc(`4/3*pi*${r}^3*${h}+pi*${r}^2*${h}`);
    }break;
    case 'Spherical Cap':{
      let r = getOpt('cap_r');
      let R = getOpt('cap_R');
      let h = getOpt('cap_h');
      input.silent = false;
      if(!(r && R && !h || !r && R && h || r && !R && h)){
        input.error(['cap_r','cap_R','cap_h'], 'The calculator only needs two values.');
      }
      if(!input.valid()) return;
      if(r && R){
        try{
          h = calc(`${R}-sqrt(${R}^2-${r}^2)`);
        } catch(error){
          input.exception(['cap_r','cap_R'], error); return;
        }
      }
      if(r && h){
        R = calc(`(${h}^2+${r}^2)/(2*${h})`); 
      }
      vol = calc(`1/3*pi*${h}^2*(3*${R}-${h})`);
    }break;
    case 'Conical Frustum':{
      const r = get('frustrum_r');
      const R = get('frustrum_R');
      const h = get('frustrum_h');
      if(!input.valid()) return;
      vol = calc(`1/3*pi*${h}*(${r}^2+${r}*${R}+${R}^2)`);
    }break;
    case 'Ellipsoid':{
      const a = get('elipsoid_a');
      const b = get('elipsoid_b');
      const c = get('elipsoid_c');
      if(!input.valid()) return;
      vol = calc(`4/3*pi*${a}*${b}*${c}`);
    }break;
    case 'Square Pyramid':{
      const a = get('pyramid_a');
      const h = get('pyramid_h');
      if(!input.valid()) return;
      vol = calc(`1/3*${a}^2*${h}`);
    }break;
    case 'Tube':{
      const h = get('tube_h');
      const d1 = get('tube_d1');
      const d2 = get('tube_d2');
      if(!input.valid()) return;
      vol = calc(`pi*abs(${d1}^2-${d2}^2)/4*${h}`);
    }break;
  }

  // 3. output
  _('result').innerHTML = vol;
  _('result_unit').innerHTML = units.toLowerCase();
}

window.switchUnits = el => {
  const unit = el.value;
  const units = {
    'Meters': 'm', 
    'Miles': 'mi', 
    'Yards': 'yd', 
    'Feet': 'ft', 
    'Inches': 'in', 
    'Kilometers': 'km', 
    'Centimeters': 'cm', 
    'Millimeters': 'mm', 
    'Micrometers': 'µm', 
    'Nanometers': 'nm', 
    'Angstroms': 'Å'
  };
  $$('.input-field__hint').forEach(el=>{
    el.innerHTML=units[unit];
  });
};

window.addEventListener('load', () => math.config({number:'BigNumber', precision: 9}));
