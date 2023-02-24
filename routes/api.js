/**
 * @swagger
 * tags:
 *   name: Terms
 *   description: The terms managing API
 * /api/search?search=yourSearch:
 *   get:
 *     summary: Get list of terms that are related to the search by title
 *     tags: [Terms]
 *     parameters:
 *       - name: search
 *         in: path
 *         description: search
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: List of terms that are related to the search by title.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       500:
 *         description: Server error
 * /api/search-one?search=yourSearch:
 *   get:
 *     summary: Get the first term that is related to the search by title
 *     tags: [Terms]
 *     parameters:
 *       - name: search
 *         in: path
 *         description: search
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: First term that is related to the search by title.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       500:
 *         description: Server error
 * /api/description?search=yourSearch:
 *   get:
 *     summary: Get list of terms that are related to the search by description
 *     tags: [Terms]
 *     parameters:
 *       - name: search
 *         in: path
 *         description: search
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: List of terms that are related to the search by description.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       500:
 *         description: Server error
 * /api/description-one?search=yourSearch:
 *   get:
 *     summary: Get the first term that matches the search by description
 *     tags: [Terms]
 *     parameters:
 *       - name: search
 *         in: path
 *         description: search
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: First term that matches the search by description.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       500:
 *         description: Server error
 * /api/title?search=yourSearch:
 *   get:
 *     summary: Get only titles from a list of terms that are related to the title search
 *     tags: [Terms]
 *     parameters:
 *       - name: search
 *         in: path
 *         description: search
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Only titles from a list of terms that are related to the title search.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       500:
 *         description: Server error
 * /api/title-one?search=yourSearch:
 *   get:
 *     summary: Get the first title that is related to the search by title
 *     tags: [Terms]
 *     parameters:
 *       - name: search
 *         in: path
 *         description: search
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: First title that is related to the search by title.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       500:
 *         description: Server error
 * /api/description-title?search=yourSearch:
 *   get:
 *     summary: Get only descriptions from a list of terms that are related to the title search
 *     tags: [Terms]
 *     parameters:
 *       - name: search
 *         in: path
 *         description: search
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Only descriptions from a list of terms that are related to the title search.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       500:
 *         description: Server error
 * /api/description-title-one?search=yourSearch:
 *   get:
 *     summary: Get the first description that matches the search by title
 *     tags: [Terms]
 *     parameters:
 *       - name: search
 *         in: path
 *         description: search
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: First description that matches the search by title.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       500:
 *         description: Server error
 * /api/random:
 *   get:
 *     summary: Get a list of random terms
 *     tags: [Terms]
 *     responses:
 *       200:
 *         description: List of random terms.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       500:
 *         description: Server error
 * /api/random-one:
 *   get:
 *     summary: Get a random term
 *     tags: [Terms]
 *     responses:
 *       200:
 *         description: Random term.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Term:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the term
 *         term:
 *           type: string
 *           description: The title of the term
 *         normalized:
 *           type: string
 *           description: The normalized title of the term
 *         meaning:
 *           type: string
 *           description: The meaning of the term
 *       example:
 *         id: 63f8e16a0f5e1a1f24d1ec95
 *         term: non-parametric (statistics)
 *         normalized: non-parametric (statistics)
 *         meaning: A branch of statistical tests which do not assume a known distribution of the population which the samples were taken from (Kruskal-Wallis and Dunn test are examples of non-parametric tests).
 */

const express = require("express");
const router = express.Router();
const Term = require("../lib/database/models/Term");
const getRandomInt = require("../lib/utilities/getRandomInt");
const normalizeString = require("../lib/utilities/normalizeString");

/*
  /api/search (GET) (Obtener lista de términos que se relacionen con la búsqueda por título)
*/

router.get("/search", async function (req, res, next) {
  try {
    const search = normalizeString(req.query.search);

    const data = await Term.find({
      normalized: { $regex: new RegExp(search, "i") },
    });

    return res.status(200).json(data);
  } catch (_) {
    return res.status(500).end();
  }
});

/*
  /api/search-one (GET) (Obtener el primer término que se relacione con la búsqueda por título)
*/

router.get("/search-one", async function (req, res, next) {
  try {
    const search = normalizeString(req.query.search);

    const data = await Term.findOne({
      normalized: { $regex: new RegExp(search, "i") },
    });

    return res.status(200).json(data);
  } catch (_) {
    return res.status(500).end();
  }
});

/*
  /api/description (GET) (Obtener lista de términos que se relacionen con la búsqueda por descripción)
*/

router.get("/description", async function (req, res, next) {
  try {
    const search = normalizeString(req.query.search);

    const data = await Term.find({
      meaning: { $regex: new RegExp(search, "i") },
    });

    return res.status(200).json(data);
  } catch (_) {
    return res.status(500).end();
  }
});

/*
  /api/description-one (GET) (Obtener el primer término que se relacione con la búsqueda por descripción)
*/

router.get("/description-one", async function (req, res, next) {
  try {
    const search = normalizeString(req.query.search);

    const data = await Term.findOne({
      meaning: { $regex: new RegExp(search, "i") },
    });

    return res.status(200).json(data);
  } catch (_) {
    return res.status(500).end();
  }
});

/*
  /api/title (GET) (Obtener solo títulos de una lista de términos que se relacionen con la búsqueda por título)
*/

router.get("/title", async function (req, res, next) {
  try {
    const search = normalizeString(req.query.search);

    const data = await Term.find(
      {
        normalized: { $regex: new RegExp(search, "i") },
      },
      "-normalized -meaning"
    );

    return res.status(200).json(data);
  } catch (_) {
    return res.status(500).end();
  }
});

/*
  /api/title-one (GET) (Obtener el primer título que se relacione con la búsqueda por título)
*/

router.get("/title-one", async function (req, res, next) {
  try {
    const search = normalizeString(req.query.search);

    const data = await Term.findOne(
      {
        normalized: { $regex: new RegExp(search, "i") },
      },
      "-normalized -meaning"
    );

    return res.status(200).json(data);
  } catch (_) {
    return res.status(500).end();
  }
});

/*
  /api/description-title (GET) (Obtener solo descripciones de una lista de términos que se relacionen con la búsqueda por título)
*/

router.get("/description-title", async function (req, res, next) {
  try {
    const search = normalizeString(req.query.search);

    const data = await Term.find(
      {
        normalized: { $regex: new RegExp(search, "i") },
      },
      "-normalized -term"
    );

    return res.status(200).json(data);
  } catch (_) {
    return res.status(500).end();
  }
});

/*
  /api/description-title-one (GET) (Obtener la primera descripción que se relacione con la búsqueda por título)
*/

router.get("/description-title-one", async function (req, res, next) {
  try {
    const search = normalizeString(req.query.search);

    const data = await Term.findOne(
      {
        normalized: { $regex: new RegExp(search, "i") },
      },
      "-normalized -term"
    );

    return res.status(200).json(data);
  } catch (_) {
    return res.status(500).end();
  }
});

/*
  /api/random (GET) (Obtener una lista de términos random)
*/

router.get("/random", async function (req, res, next) {
  try {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    const randomIndex = getRandomInt(0, characters.length - 1);
    const randomCharacter = characters[randomIndex];

    const data = await Term.find({
      meaning: { $regex: new RegExp(randomCharacter, "i") },
    });

    return res.status(200).json(data);
  } catch (_) {
    return res.status(500).end();
  }
});

/*
  /api/random-one (GET) (Obtener un término random)
*/

router.get("/random-one", async function (req, res, next) {
  try {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    const randomIndex = getRandomInt(0, characters.length - 1);
    const randomCharacter = characters[randomIndex];

    const data = await Term.findOne({
      meaning: { $regex: new RegExp(randomCharacter, "i") },
    });

    return res.status(200).json(data);
  } catch (_) {
    return res.status(500).end();
  }
});

module.exports = router;
