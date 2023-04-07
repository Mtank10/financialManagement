const ex=require("express");
const Financial =require('../model/farm');

const router=ex.Router();

// Develop the API endpoints
router.post('/income', (req, res) => {
    const { farmer, amount, date } = req.body;
    const income = new Financial({
      farmer,
      type: 'income',
      amount,
      date,
    });
    income.save().then(() => {
      res.sendStatus(201);
    });
  });
  
  router.post('/expense', (req, res) => {
    const { farmer, amount, date } = req.body;
    const expense = new Financial({
      farmer,
      type: 'expense',
      amount,
      date,
    });
    expense.save().then(() => {
      res.sendStatus(201);
    });
  });
  
  router.get('/financial/:farmer', (req, res) => {
    const { farmer } = req.params;
    Financial.find({ farmer }).then((financials) => {
      const income = financials.filter((f) => f.type === 'income').reduce((acc, f) => acc + f.amount, 0);
      const expense = financials.filter((f) => f.type === 'expense').reduce((acc, f) => acc + f.amount, 0);
      const balance = income - expense;
      res.json({
        income,
        expense,
        balance,
      });
    });
  });

  router.get('/:type',(req,res)=>{
    const {type} =req.params;
    Financial.find({type}).then((financials)=>{
        if(type==='income'){
        const income = financials.filter((f) => f.type === 'income').reduce((acc, f) => acc + f.amount, 0);
        console.log(income);
        res.json({
            income,
        })
        }else{
            const expense = financials.filter((f) => f.type === 'expense').reduce((acc, f) => acc + f.amount, 0);
            res.json({
                expense,
            })
        }
    })
  })
  




module.exports=router;