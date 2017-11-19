/**
 * Ts_groupController
 *
 * @description :: Server-side logic for managing Ts_groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getAllGroup: function (req,res) {

    let result = req.session.userinfo;
    let requrement = {};
    if (result['user_role'] === 3) {
      requrement = {barea_id: result['barea_id']};
    } else if (result['user_role'] === 4) {
      requrement = {sarea_id: result['sarea_id']};
    } else if (result['user_role'] === 5) {
      requrement = {dealer_id: result['dealer_id']};
    } else if (result['user_role'] === 6) {
      requrement = {group_id: result['group_id']};
    } else {
      requrement = {};
    }
    Ts_dealer.find(requrement).exec(function(err, dealer){
      if (err) {
        return res.serverError(err);
      }
      let groupIDArr = [];
      if (result['user_role'] === 6) {
        groupIDArr.push(result['group_id']);
      } else {
        for (let a of dealer) {
          groupIDArr.push(a['group_id']);
        }
      }

      Ts_group.find({
        group_id: groupIDArr
      }).exec(function(err, result){
        if (err) {
          return res.serverError(err);
        }

        return res.json(result);
      });

    });
  }
};

