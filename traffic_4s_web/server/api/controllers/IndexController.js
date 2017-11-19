module.exports = {

  index(req, res) {
    res.view('index/index');
  },
  main(req, res) {
    res.view('index/main');
  }

};
