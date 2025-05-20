const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  res.send("Lab02");
});
router.get('/name', (req, res) => {
  res.send('Simrandeep Singh');
});


router.get('/greeting', (req, res) => {
  res.send('Name: Simrandeep Singh, Student Number: n01648916');
});

router.get('/add', (req, res) => {
  const x = parseInt(req.query.x);
  const y = parseInt(req.query.y);
  
  if (isNaN(x) || isNaN(y)) {
    return res.status(400).send('Please provide valid x and y parameters');
  }
  
  const sum = x + y;
  res.send(`The sum of ${x} and ${y} is ${sum}`);
});


router.get('/calculate', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const operation = req.query.operation;
  
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send('Please provide valid a and b parameters');
  }
  
  let result;
  switch (operation) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      if (b === 0) {
        return res.status(400).send('Cannot divide by zero');
      }
      result = a / b;
      break;
    case '**':
      result = Math.pow(a, b);
      break;
    default:
      return res.status(400).send('Invalid operation. Use +, -, *, /, or **');
  }
  
  res.send(`The result of ${a} ${operation} ${b} = ${result}`);
});

module.exports = router;