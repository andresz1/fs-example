var express = require("express");
var router = express.Router();
const db = require("../model/helper");

const getAllCats = async () => {
  const result = await db("SELECT * FROM cats");
  const cats = result.data;
  return cats;
};

router.get("/cats", async (req, res) => {
  try {
    const cats = await getAllCats();
    res.send(cats);
  } catch (error) {
    res.send(500);
  }
});

router.get("/cats/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const sql = `
      SELECT * FROM cats WHERE id = ${id};
    `;
    const result = await db(sql);
    const cat = result.data[0];

    if (!cat) {
      res.status(404).send();
      return;
    }

    res.send(cat);
  } catch (error) {
    res.send(500);
  }
});

router.post("/cats", async (req, res) => {
  const body = req.body;

  const sql = `
    INSERT INTO cats(name, age) VALUES ('${body.name}', ${body.age});
  `;

  try {
    await db(sql);

    const cats = await getAllCats();

    res.status(201).send(cats);
  } catch (error) {
    res.send(500);
  }
});

router.put("/cats/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const result = await db(`
      SELECT * FROM cats WHERE id = ${id};
    `);
    const cat = result.data[0];

    if (!cat) {
      res.status(404).send();
      return;
    }

    await db(`
      UPDATE cats
      SET name = '${body.name}', age = ${body.age}
      WHERE id = ${id};
    `);

    const cats = await getAllCats();

    res.status(201).send(cats);
  } catch (error) {
    res.send(500);
  }
});

router.delete("/cats/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db(`
      SELECT * FROM cats WHERE id = ${id};
    `);
    const cat = result.data[0];

    if (!cat) {
      res.status(404).send();
      return;
    }

    await db(`
      DELETE FROM cats WHERE id = ${id};
    `);

    const cats = await getAllCats();

    res.send(cats);
  } catch (error) {
    res.send(500);
  }
});

module.exports = router;
