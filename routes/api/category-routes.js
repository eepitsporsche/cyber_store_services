const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
  // be sure to include its associated Products
    include: [
      {
        model: Product
      }
    ]
  })
  //RESPOND WITH DATA OR LOG ERROR
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    req.statusCode(500).json(err);
  });
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
  // be sure to include its associated Products
    include: [
      {
        model: Product
      }
    ]
  })
    //RESPOND WITH DATA OR LOG ERROR
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({message: 'No category found by this ID.'});
      return;
      }
    res.json(categoryData)
    })
    .catch(err => {
      console.log(err);
      req.statusCode(500).json(err);
    });
});


router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {where: {
      id: req.params.id
    }
  })
    //RESPOND WITH DATA OR LOG ERROR
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({message: 'No category found by this ID.'});
      return;
      }
    res.json(categoryData)
    })
    .catch(err => {
      console.log(err);
      req.statusCode(500).json(err);
    });
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
    {
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({message: 'No category found by this ID.'});
      return;
      }
    res.json(categoryData)
    })
    .catch(err => {
      console.log(err);
      req.statusCode(500).json(err);
    });
});

module.exports = router;
