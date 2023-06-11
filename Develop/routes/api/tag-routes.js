const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The "/api/tags" endpoint

//Get all tags with its associated product data
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a tag by its "id" and its associated products
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findbyPK(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body).then((newTag) => {
    res.json(newTag)
  })
});

//Update tag by its "id" value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }).then((tagUpdated) => {
      res.json(tagUpdated)
    }).catch((err)=> res.json(err))
});

//Delete a tag by its "id" value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deletedTag)=> {
    res.json(deletedTag);
  }).catch((err) => res.json(err));
});

module.exports = router;
