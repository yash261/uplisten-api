const fetch = require("isomorphic-unfetch");
const htmlToText = require("html-to-text");

module.exports = async (req, res) => {
  const { name } = req.query;
  const { books } = await (
    await fetch(
      `https://librivox.org/api/feed/audiobooks?format=json&extended=1&limit=10&offset=${Math.floor(
        Math.random() * 100
      )}&genre=${name}`
    )
  ).json();

  res.json(
    Object.keys(books).map(key => {
      const book = books[key];
      return {
        id: book.id,
        title: book.title,
        description: htmlToText.htmlToText(book.description),
        language: book.language,
        authors: book.authors,
        total_time: book.totaltime,
        num_sections: book.num_sections
      };
    })
  );
};
