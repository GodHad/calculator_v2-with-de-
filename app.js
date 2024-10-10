//    ,     #_
//    ~\_  ####_
//   ~~  \_#####\
//   ~~     \###|
//   ~~       \#/ ___  
//    ~~       V~' '->
//     ~~~         /
//       ~~._.   _/
//          _/ _/
//        _/m/'
const express = require('express');
const path = require('path');
const cors =  require('cors');
const https =  require('https');
const fs =  require('fs');
const app = express();
const port = 3000;

const calculators = [
    'gpa-calculator',
    'tip-calculator',
    'bac-calculator',
    'average-calculator',
    'mixed-number-calculator',
    'bra-size-calculator',
    'mortgage-calculator',
    'bmi-calculator',
    'grade-calculator',
    'percentage-calculator',
    'army-body-fat-calculator',
    'auto-loan-calculator',
    'body-fat-percentage-calculator',
    'decimal-to-fraction-calculator',
    'density-calculator',
    'gcf-calculator',
    'lcm-calculator',
    'loan-calculator',
    'permutation-calculator',
    'quartile-calculator',
    'rounding-calculator',
    'mean-calculator',
    'mean-median-mode-calculator',
    'period-calculator',
    'scientific-notation-calculator',
    'sig-fig-calculator',
    'significant-figures-calculator',
    'standard-form-calculator',
    'time-duration-calculator',
    'variance-calculator',
    'roman-numeral-converter',
    "future-value-calculator", 
    "compound-interest-calculator", 
    "age-calculator", 
    "date-calculator", 
    "investment-calculator", 
    "amortization-calculator", 
    "retirement-calculator", 
    "calorie-calculator", 
    "interest-calculator", 
    "simple-interest-calculator", 
    "binary-calculator", 
    "payment-calculator", 
    "personal-loan-calculator", 
    "apr-calculator", 
    "refinance-calculator", 
    "business-loan-calculator", 
    "pregnancy-weight-gain-calculator", 
    "salary-calculator", 
    "pregnancy-calculator", 
    "ovulation-calculator", 
    "bmr-calculator", 
    "401k-calculator", 
    "home-loan-calculator", 
    "margin-calculator", 
    "annuity-calculator", 
    "fha-loan-calculator", 
    "sales-tax-calculator", 
    "present-value-calculator", 
    "credit-card-payoff-calculator", 
    "rental-property-calculator", 
    "roi-calculator",
    "adding-fractions-calculator",
    "body-type-calculator",
    "calories-burned-calculator",
    "circle-calculator",
    "cube-root-calculator",
    "cubic-yards-calculator",
    "cylinder-volume-calculator",
    "decimal-to-percent-calculator",
    "equivalent-fractions-calculator",
    "force-calculator",
    "fraction-to-decimal-calculator",
    "gas-cost-calculator",
    "hours-and-minutes-calculator",
    "hours-calculator",
    "ideal-weight-calculator",
    "integer-calculator",
    "kinetic-energy-calculator",
    "lcd-calculator",
    "long-division-calculator",
    "math-equation-solver",
    "meters-to-feet-converter",
    "mixed-fraction-calculator",
    "mortgage-payment-calculator",
    "numbers-to-words-converter",
    "odds-calculator",
    "percent-to-fraction-calculator",
    "percentile-calculator",
    "probability-calculator",
    "proportion-calculator",
    "protein-calculator",
    "pythagorean-theorem-calculator",
    "quadratic-formula-calculator",
    "ratio-calculator",
    "right-triangle-calculator",
    "roofing-calculator",
    "sample-size-calculator",
    "simple-investment-calculator",
    "simplifying-fractions-calculator",
    "sip-calculator",
    "slope-calculator",
    "square-footage-calculator",
    "square-root-calculator",
    "standard-deviation",
    "tdee-calculator",
    "time-to-decimal-calculator",
    "triangle-calculator",
    "velocity-calculator",
    "volume-calculator",
    "work-hours-calculator",
    "z-score-calculator",
    "area-calculator",
    "shoes-calculator"
];
app.use(cors("*"));
const publicPath = path.resolve(__dirname, 'public', 'assets');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/embed/:name/assets', express.static(publicPath));
app.use('/:name/assets', express.static(publicPath));

calculators.forEach(route => {
    app.get('/' + route, (req, res) => {
        res.sendFile(path.join(__dirname, route, 'index.html'));
    })
    app.get('/' + route + '/de', (req, res) => {
        res.sendFile(path.join(__dirname, route, 'index-de.html'));
    })
    app.get('/embed/' + route, (req, res) => {
        res.sendFile(path.join(__dirname, route, 'index.html'));
    })    
    app.get('/embed/' + route + '/de', (req, res) => {
        res.sendFile(path.join(__dirname, route, 'index-de.html'));
    })
});

app.listen(port, () => {
    console.log('Server is running at port 3000');
})