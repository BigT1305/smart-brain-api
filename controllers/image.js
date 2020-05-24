const Clarifai = require ('clarifai');

//Must add your own API key from Clarifai.
const app = new Clarifai.App({
 apiKey: '2960f57155c247e89d82a37e392b1fa8'
});

const handleApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('Unable to work with API.'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('Unable to get entries.'))
}

module.exports = {
  handleImage,
  handleApiCall
};