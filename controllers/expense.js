const expense = require('../models/expenses');
const Expense = require('../models/expenses');

exports.postAddExpense=async (req,res,next)=>{
 await Expense.create({
    amount:req.body.amount,
    description:req.body.description,
    category: req.body.category
 })
 .then(result=> res.json(result.dataValues.id))
 .catch(err => console.log(err));
}


exports.getDeleteExpense = async (req, res, next) => {
    const id = req.params.id;
    try {
      const numDeleted = await Expense.destroy({
        where: {
          id: id
        }
      });
      if (numDeleted === 0) {
        res.status(404).json({ message: 'Expense not found' });
      } else {
        res.json({ message: 'Expense deleted successfully' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occurred while deleting the expense' });
    }
  };

exports.getAllData = async(req,res,next)=>{
    Expense.findAll()
    .then(data=>res.json(data));
}