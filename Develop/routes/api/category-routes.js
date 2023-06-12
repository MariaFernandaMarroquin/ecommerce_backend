const router = require('express').Router();
const { Category, Product } = require('../../models');

// The "/api/categories" endpoint

//Get all categories and its associated products
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a category by its "id" and its associated products
router.get('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoriesData){
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  }).then ((newCategory) => {
    res.json(newCategory)
  })
});

//Update a category by its "id" value
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where:{
        id: req.params.id,
      },
    }).then ((categoryUpdated)=> {
      res.json(categoryUpdated)
    }).catch((err)=> res.json(err));
});

//Delete a category by its "id" value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then ((deletedCategory)=> {
    res.json(deletedCategory);
  }).catch((err) => res.json(err));
});

module.exports = router;
