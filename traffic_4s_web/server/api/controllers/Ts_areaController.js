/**
 * Ts_areaController
 *
 * @description :: Server-side logic for managing Ts_areas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var finData = [];

function getSortedData (data, ifUser, areaIDArr, userRole) {

  if ((userRole == 1 || userRole == 2) && ifUser == 0) {
    finData = [{name:'全国'}];
  } else {
    finData = [];
  }

  let idArr = [];
  let level = 2;
  for (let a of data) {
    idArr.push(a['id']);
    if (level > a['level']) {
      level = a['level'];
    }
  }
  sortedData(data, idArr, 0, ifUser, level, areaIDArr);
  return finData;
}

function sortedData (data, idArr, count, ifUser, level, areaIDArr) {

  if (data != undefined && data.length != 0) {
    if (count == idArr.length) {
      return finData;
    } else {
      let nextLv = [];
      for (let a = 0; a < data.length; a++) {
        if (data[a]['pid'] == idArr[count]) {

          if (data[a]['level'] == 1) {
            Object.assign(data[a], {levelArr: [data[a]['pid'], data[a]['id']]});
          }
          if (data[a]['level'] == 2) {

            Object.assign(data[a], {levelArr: [areaIDArr[data[a]['pid']], data[a]['pid'], data[a]['id']]});

          }

          if (data[a]['level'] != 2 || ifUser != 1) {
            nextLv.push(data[a]);
          }

        }
      }

      let listData = data[count];

      if (listData['levelArr'] == undefined || listData['levelArr'] == null) {
        if (listData['level'] == 1) {
          Object.assign(listData, {levelArr: [listData['pid'], listData['id']]});
        }
        if (listData['level'] == 2) {
          Object.assign(listData, {levelArr: [areaIDArr[listData['pid']], listData['pid'], listData['id']]});
        }
      }
      if (nextLv.length != 0) {
        Object.assign(listData, {chiledren: nextLv});
      }
      if (listData['level'] == level) {
        finData.push(listData);
      }
      sortedData(data, idArr, count + 1, ifUser, level, areaIDArr);
    }
  } else {

    return finData;
  }
}

module.exports = {
	getAreaData: function (req, res) {
    let user = req.session.userinfo;
    let requirement = {};

    let areaArr = [];

    Ts_area.find().exec(function (err, area) {
      if (err) {
        return res.serverError(err);
      }
      for (var i = 0; i < area.length; i++) {
        areaArr[area[i]['id']] = area[i]['pid'];
      }

      if (user['user_role'] == 1 || user['user_role'] == 2) {
        requirement = {
          sort: {level:1, id:1, pid:1}
        }
      }
      if (user['user_role'] == 3) {
        requirement = {
          or: [
            {id: user['barea_id']},
            {pid: user['barea_id']}
          ],
          sort: {level:1, id:1, pid:1}
        }
      }
      if (user['user_role'] == 4) {
        requirement = {
          or: [
            {id: user['sarea_id']},
            {pid: user['sarea_id']}
          ],
          sort: {level:1, id:1, pid:1}
        }
      }

      if (user['user_role'] != 5 && user['user_role'] != 6) {
        Ts_area.find(requirement).exec(function (err, usersNamedFinn) {
          if (err) {
            return res.serverError(err);
          }

          return res.json(getSortedData(usersNamedFinn, 0, areaArr, user['user_role']));
        });
      } else {

        let requment = {};
        if (user['user_role'] == 5) {
          requment = {dealer_id: user['dealer_id']};
        } else {
          requment = {group_id: user['group_id']};
        }

        Ts_dealer.find(requment).exec(function (err, dealer){
          if (err) {
            return res.serverError(err);
          }
          if (dealer.length != 0) {
            Ts_area.find({
              id: dealer[0]['province']
            }).exec(function (err, usersNamedFinn) {
              if (err) {
                return res.serverError(err);
              }

              return res.json(getSortedData(usersNamedFinn, 0, areaArr, user['user_role']));
            });
          } else {
            return res.json([]);
          }
        })
      }
    });
  },
  getAreaForUser: function (req, res) {
    let user = req.session.userinfo;
    let requirement = {};
    let areaArr = [];

    Ts_area.find().exec(function (err, area) {
      if (err) {
        return res.serverError(err);
      }
      for (var i = 0; i < area.length; i++) {
        areaArr[area[i]['id']] = area[i]['pid'];
      }

      if (user['user_role'] == 1 || user['user_role'] == 2) {
        requirement = {
          sort: {level:1, id:1, pid:1}
        }
      }
      if (user['user_role'] == 3) {
        requirement = {
          or: [
            {id: user['barea_id']},
            {pid: user['barea_id']}
          ],
          sort: {level:1, id:1, pid:1}
        }
      }
      if (user['user_role'] == 4) {
        requirement = {
          where: {
            pid: user['sarea_id']
          },
          sort: {level:1, id:1, pid:1}
        }
      }

      if (user['user_role'] != 5 && user['user_role'] != 6) {
        Ts_area.find(requirement).exec(function (err, usersNamedFinn) {
          if (err) {
            return res.serverError(err);
          }

          return res.json(getSortedData(usersNamedFinn, 1, areaArr, user['user_role']));
        });
      } else {
        let requment = {};
        if (user['user_role'] == 5) {
          requment = {dealer_id: user['dealer_id']};
        } else {
          requment = {group_id: user['group_id']};
        }

        Ts_dealer.find(requment).exec(function (err, dealer){
          if (err) {
            return res.serverError(err);
          }
          if (dealer.length != 0) {
            Ts_area.find({
              id: dealer[0]['province']
            }).exec(function (err, usersNamedFinn) {
              if (err) {
                return res.serverError(err);
              }
              return res.json(getSortedData(usersNamedFinn, 1, areaArr, user['user_role']));
            });
          } else {
            return res.json([]);
          }
        })
      }

    });
  }
};

