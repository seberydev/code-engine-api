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
