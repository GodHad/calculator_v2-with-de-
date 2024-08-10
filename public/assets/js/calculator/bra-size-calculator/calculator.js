const bandSizesTable = [ 
  // cm, in, int/eu, us, uk, fr/es/be, it, au/nz, jp/ko
  {cm:"55-60",   in:"22-24", eu:"55",  us:"26", uk:"26", fr:"70",  it:"00", au:"4",  jp:"55"},
  {cm:"60-65",   in:"24-26", eu:"60",  us:"28", uk:"28", fr:"75",  it:"0",  au:"6",  jp:"60"},
  {cm:"65-70",   in:"26-28", eu:"65",  us:"30", uk:"30", fr:"80",  it:"1",  au:"8",  jp:"65"},
  {cm:"70-75",   in:"28-30", eu:"70",  us:"32", uk:"32", fr:"85",  it:"2",  au:"10", jp:"70"},
  {cm:"75-80",   in:"30-32", eu:"75",  us:"34", uk:"34", fr:"90",  it:"3",  au:"12", jp:"75"},
  {cm:"80-85",   in:"32-34", eu:"80",  us:"36", uk:"36", fr:"95",  it:"4",  au:"14", jp:"80"},
  {cm:"85-90",   in:"34-36", eu:"85",  us:"38", uk:"38", fr:"100", it:"5",  au:"16", jp:"85"},
  {cm:"90-95",   in:"36-38", eu:"90",  us:"40", uk:"40", fr:"105", it:"6",  au:"18", jp:"90"},
  {cm:"95-100",  in:"38-40", eu:"95",  us:"42", uk:"42", fr:"110", it:"7",  au:"20", jp:"95"},
  {cm:"100-105", in:"40-42", eu:"100", us:"44", uk:"44", fr:"115", it:"8",  au:"22", jp:"100"},
  {cm:"105-110", in:"42-44", eu:"105", us:"46", uk:"46", fr:"120", it:"9",  au:"24", jp:"105"},
  {cm:"110-115", in:"44-46", eu:"110", us:"48", uk:"48", fr:"125", it:"10", au:"26", jp:"110"},
  {cm:"115-120", in:"46-48", eu:"115", us:"50", uk:"50", fr:"130", it:"11", au:"28", jp:"115"},
  {cm:"120-125", in:"48-50", eu:"120", us:"52", uk:"52", fr:"135", it:"12", au:"30", jp:"120"},
  {cm:"125-130", in:"50-52", eu:"125", us:"54", uk:"54", fr:"140", it:"13", au:"32", jp:"125"},
  {cm:"130-135", in:"52-54", eu:"130", us:"56", uk:"56", fr:"145", it:"14", au:"34", jp:"130"},
  {cm:"135-140", in:"54-56", eu:"135", us:"58", uk:"58", fr:"150", it:"15", au:"36", jp:"135"},
  {cm:"140-145", in:"56-58", eu:"140", us:"60", uk:"60", fr:"155", it:"16", au:"38", jp:"140"},
  {cm:"145-150", in:"58-60", eu:"145", us:"62", uk:"62", fr:"160", it:"17", au:"40", jp:"145"},
  {cm:"150-155", in:"60-62", eu:"150", us:"64", uk:"64", fr:"165", it:"18", au:"42", jp:"150"},
];
const bustSizesEu = [
  // cm, int/eu, us, uk, fr/es/be, it, au/nz, jp/ko
  {cm:"0-12",  eu:"AA", us:"A",               uk:"A",       fr:"AA", it:"AA", au:"AA", jp:"A"},
  {cm:"12-14", eu:"A",  us:"B",               uk:"B",       fr:"A",  it:"A",  au:"A",  jp:"B"},
  {cm:"14-16", eu:"B",  us:"B or C",          uk:"B or C",  fr:"B",  it:"B",  au:"B",  jp:"B or C"},
  {cm:"16-18", eu:"C",  us:"C",               uk:"C",       fr:"C",  it:"C",  au:"C",  jp:"C"},
  {cm:"18-20", eu:"D",  us:"D",               uk:"D",       fr:"D",  it:"D",  au:"D",  jp:"D"},
  {cm:"20-22", eu:"E",  us:"E/DD",            uk:"DD",      fr:"E",  it:"E",  au:"DD", jp:"E"},
  {cm:"22-24", eu:"F",  us:"F/DDD",           uk:"E",       fr:"F",  it:"F",  au:"E",  jp:"F"},
  {cm:"24-26", eu:"G",  us:"F/DDD or G/DDDD", uk:"E or F",  fr:"G",  it:"G",  au:"F",  jp:"F or G"},
  {cm:"26-28", eu:"H",  us:"G/DDDD",          uk:"F",       fr:"H",  it:"H",  au:"G",  jp:"G"},
  {cm:"28-30", eu:"I",  us:"H",               uk:"FF",      fr:"I",  it:"I",  au:"H",  jp:"H"},
  {cm:"30-32", eu:"J",  us:"I",               uk:"G",       fr:"J",  it:"J",  au:"I",  jp:"I"},
  {cm:"32-34", eu:"K",  us:"J",               uk:"GG",      fr:"K",  it:"K",  au:"J",  jp:"J"},
  {cm:"34-36", eu:"L",  us:"J or K",          uk:"GG or H", fr:"L",  it:"L",  au:"K",  jp:"J or K"},
  {cm:"36-38", eu:"M",  us:"K",               uk:"H",       fr:"M",  it:"M",  au:"L",  jp:"K"},
  {cm:"38-40", eu:"N",  us:"L",               uk:"HH",      fr:"N",  it:"N",  au:"M",  jp:"L"},
  {cm:"40-42", eu:"O",  us:"M",               uk:"J",       fr:"O",  it:"O",  au:"N",  jp:"M"},
  {cm:"42-44", eu:"P",  us:"N",               uk:"JJ",      fr:"P",  it:"P",  au:"O",  jp:"N"},
  {cm:"44-46", eu:"R",  us:"N or O",          uk:"JJ or K", fr:"R",  it:"R",  au:"P",  jp:"N or O"},
  {cm:"46-48", eu:"S",  us:"O",               uk:"K",       fr:"S",  it:"S",  au:"R",  jp:"O"},
  {cm:"48-50", eu:"T",  us:"P",               uk:"KK",      fr:"T",  it:"T",  au:"S",  jp:"P"},
];
const bustSizesUs = [
  // inch, us, uk, int/eu, fr/es/be, it, au/nz, jp/ko
  {in:"0-4",   us:"AA",     uk:"AA", eu:"AA",     fr:"AA",     it:"AA",     au:"AA",      jp:"AA"},
  {in:"4-5",   us:"A",      uk:"A",  eu:"AA",     fr:"AA",     it:"AA",     au:"AA",      jp:"A"},
  {in:"5-6",   us:"B",      uk:"B",  eu:"A or B", fr:"A or B", it:"A or B", au:"A or B",  jp:"B"},
  {in:"6-7",   us:"C",      uk:"C",  eu:"C",      fr:"C",      it:"C",      au:"C",       jp:"C"},
  {in:"7-8",   us:"D",      uk:"D",  eu:"D",      fr:"D",      it:"D",      au:"D",       jp:"D"},
  {in:"8-9",   us:"E/DD",   uk:"DD", eu:"E or F", fr:"E or F", it:"E or F", au:"DD or E", jp:"E"},
  {in:"9-10",  us:"F/DDD",  uk:"E",  eu:"F or G", fr:"F or G", it:"F or G", au:"E or F",  jp:"F"},
  {in:"10-11", us:"G/DDDD", uk:"F",  eu:"H",      fr:"H",      it:"H",      au:"G",       jp:"G"},
  {in:"11-12", us:"H",      uk:"FF", eu:"I",      fr:"I",      it:"I",      au:"H",       jp:"H"},
  {in:"12-13", us:"I",      uk:"G",  eu:"J or K", fr:"J or K", it:"J or K", au:"I or J",  jp:"I"},
  {in:"13-14", us:"J",      uk:"GG", eu:"K or L", fr:"K or L", it:"K or L", au:"J or K",  jp:"J"},
  {in:"14-15", us:"K",      uk:"H",  eu:"M",      fr:"M",      it:"M",      au:"L",       jp:"K"},
  {in:"15-16", us:"L",      uk:"HH", eu:"N",      fr:"N",      it:"N",      au:"M",       jp:"L"},
  {in:"16-17", us:"M",      uk:"J",  eu:"O or P", fr:"O or P", it:"O or P", au:"N or O",  jp:"M"},
  {in:"17-18", us:"N",      uk:"JJ", eu:"R",      fr:"R",      it:"R",      au:"P",       jp:"N"},
  {in:"18-19", us:"O",      uk:"K",  eu:"S",      fr:"S",      it:"S",      au:"R",       jp:"O"},
  {in:"19-20", us:"P",      uk:"KK", eu:"T",      fr:"T",      it:"T",      au:"S",       jp:"P"},
];
const bustSizesJp = [
  // cm, jp/ko, int/eu, us, uk, fr/es/be, it, au/nz
  {cm:"7.5-10",  jp:"AA", eu:"AA",     us:"AA",     uk:"AA", fr:"AA",     it:"AA",     au:"AA"},
  {cm:"10-12.5", jp:"A",  eu:"AA",     us:"A",      uk:"A",  fr:"AA",     it:"AA",     au:"AA"},
  {cm:"12.5-15", jp:"B",  eu:"A or B", us:"B",      uk:"B",  fr:"A or B", it:"A or B", au:"A or B"},
  {cm:"15-17.5", jp:"C",  eu:"C",      us:"C",      uk:"C",  fr:"C",      it:"C",      au:"C"},
  {cm:"17.5-20", jp:"D",  eu:"D",      us:"D",      uk:"D",  fr:"D",      it:"D",      au:"D"},
  {cm:"20-22.5", jp:"E",  eu:"E or F", us:"E/DD",   uk:"DD", fr:"E or F", it:"E or F", au:"DD or E"},
  {cm:"22.5-25", jp:"F",  eu:"F or G", us:"F/DDD",  uk:"E",  fr:"F or G", it:"F or G", au:"E or F"},
  {cm:"25-27.5", jp:"G",  eu:"H",      us:"G/DDDD", uk:"F",  fr:"H",      it:"H",      au:"G"},
  {cm:"27.5-30", jp:"H",  eu:"I",      us:"H",      uk:"FF", fr:"I",      it:"I",      au:"H"},
  {cm:"30-32.5", jp:"I",  eu:"J or K", us:"I",      uk:"G",  fr:"J or K", it:"J or K", au:"I or J"},
  {cm:"32.5-35", jp:"J",  eu:"K or L", us:"J",      uk:"GG", fr:"K or L", it:"K or L", au:"J or K"},
  {cm:"35-37.5", jp:"K",  eu:"M",      us:"K",      uk:"H",  fr:"M",      it:"M",      au:"L"},
  {cm:"37.5-40", jp:"L",  eu:"N",      us:"L",      uk:"HH", fr:"N",      it:"N",      au:"M"},
  {cm:"40-42.5", jp:"M",  eu:"O or P", us:"M",      uk:"J",  fr:"O or P", it:"O or P", au:"N or O"},
  {cm:"42.5-45", jp:"N",  eu:"R",      us:"N",      uk:"JJ", fr:"R",      it:"R",      au:"P"},
  {cm:"45-47.5", jp:"O",  eu:"S",      us:"O",      uk:"K",  fr:"S",      it:"S",      au:"R"},
  {cm:"47.5-50", jp:"P",  eu:"T",      us:"P",      uk:"KK", fr:"T",      it:"T",      au:"S"},
];
const locations = {
  "Europe (EU) & International (Int)": "eu",
  "USA (US)": "us",
  "UK (UK)": "uk",
  "France (FR) & Spain (ES) & Belgium (BE)": "fr",
  "Italy (IT)": "it",
  "Australia (AU) & New Zealand (NZ)": "au",
  "Japan (JP) & South Korea (KO)": "jp",
};

function selectLocation(element){
  // location
  let location = locations[element.value];

  // size
  const selectedSize = _('size').selectedIndex; 
  const sizeOptions = _('size').options;
  for(let i = sizeOptions.length - 1; i >= 0; i--) {
    sizeOptions.remove(i);
  }
  bandSizesTable.forEach((bandSize,index) => {
    const option = document.createElement("option");
    const size = bandSize[location];
    option.value = size;
    option.innerText = size;
    if(index==selectedSize){
      option.selected = true;
    }
    sizeOptions.add(option);
  });

  // cup
  const selectedCup = _('cup').selectedIndex; 
  const cupOptions = _('cup').options;
  for(let i = cupOptions.length - 1; i >= 0; i--) {
    cupOptions.remove(i);
  }
  let bustDiffs;
  switch(location){
    case "us": case "uk": bustDiffs = bustSizesUs; break;
    case "jp": bustDiffs = bustSizesJp; break;
    default: bustDiffs = bustSizesEu; break;
  }
  bustDiffs.forEach((bustDiff,index) => {
    const option = document.createElement("option");
    const size = bustDiff[location];
    option.value = size;
    option.innerText = size;
    if(index==selectedCup){
      option.selected = true;
    }
    cupOptions.add(option);
  });
}

function calculate(){
  const system =  $('.system-switcher').classList.contains("system-switcher--active") ? "cm":"in";
  const tab = $('[data-tab].tab--active').dataset.tab;
  let bandSizes, bustSizes;
  switch(tab){
    case '0':
      // 1. init & validate
      const bandSize = input.get('band_size'+(system=="in"?"_imperial":"")).positive().val();
      const bustSize = input.get('bust_size'+(system=="in"?"_imperial":"")).positive().gt(bandSize).val();
      if (!input.valid()) return;

      // 2. calculate
      bandSizesTable.forEach(bandSizesRow => {
        const sizes = bandSizesRow[system].split("-").map(Number);
        if(bandSize >= sizes[0] && bandSize < sizes[1]){
          bandSizes = bandSizesRow;
        }
      });
      if(!bandSizes){
        input.error('band_size', 'Value not found in band sizes table');
        return;
      }

      const bustSizesTable = system == "cm" ? bustSizesEu : bustSizesUs;
      bustSizesTable.forEach(bustSizesRow => {
        const diffs = bustSizesRow[system].split("-").map(Number);
        const bustDiff = bustSize - bandSize; 
        if(bustDiff >= diffs[0] && bustDiff < diffs[1]){
          bustSizes = bustSizesRow;
        }
      });
      if(!bustSizes){
        input.error('bust_size', 'Value not found in bust sizes table');
        return;
      }
    break;
    case '1':{
      // 1. init & validate
      const location = locations[input.get('location').raw()];
      const bustSize = input.get('cup').raw();
      const bandSize = input.get('size').raw();
      if (!input.valid()) return;

      // 2. calculate
      bandSizesTable.forEach(bandSizesRow => {
        if(bandSizesRow[location] == bandSize){
          bandSizes = bandSizesRow;
        }
      });
      
      let bustSizesTable;
      switch(location){
        case "us": case "uk": bustSizesTable = bustSizesUs; break;
        case "jp": bustSizesTable = bustSizesJp; break;
        default: bustSizesTable = bustSizesEu;
      }
      bustSizesTable.forEach(bustSizesRow => {
        if(bustSizesRow[location] == bustSize){
          bustSizes = bustSizesRow;
        }
      });
    }break;
  }

  // 3. output
  for(let location in bandSizes){
    if(['cm','in'].includes(location)) continue;
    const bandResultId = `result_${location}_band`;
    _(bandResultId).innerHTML = bandSizes[location]; 
  }
  for(let location in bustSizes){
    if(['cm','in'].includes(location)) continue;
    const bustResultId = `result_${location}_bust`;
    _(bustResultId).innerHTML = bustSizes[location]; 
  }
}
  