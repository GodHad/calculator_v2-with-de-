function calculate(){const num=input.get('fraction_number_num').integer().raw();const denom=input.get('fraction_number_denom').natural().raw();if(!input.valid())return;const frac=math.fraction(num,denom);Fractions.outputMixed(frac,'number');}