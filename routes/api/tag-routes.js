const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
  // be sure to include its associated Product data
  attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name']
      }
    ]
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    req.statusCode(500).json(err);
  });
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
  // be sure to include its associated Product data
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
      }
    ]
  })
    //RESPOND WITH DATA OR LOG ERROR
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({message: 'No tag found by this ID.'});
      return;
      }
    res.json(tagData)
    })
    .catch(err => {
      console.log(err);
      req.statusCode(500).json(err);
    });
});


router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    req.statusCode(500).json(err);
  });
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
    //RESPOND WITH DATA OR LOG ERROR
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({message: 'No tag found by this ID.'});
      return;
      }
    res.json(tagData)
    })
    .catch(err => {
      console.log(err);
      req.statusCode(500).json(err);
    });
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    //RESPOND WITH DATA OR LOG ERROR
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({message: 'No tag found by this ID.'});
      return;
      }
    res.json(tagData)
    })
    .catch(err => {
      console.log(err);
      req.statusCode(500).json(err);
    });
});

module.exports = router;
