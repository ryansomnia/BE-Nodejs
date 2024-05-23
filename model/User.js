const conn = require("../config/mysql");

let user = {
  getAllUser: async (result) => {
    let qry = `SELECT * FROM user`;
    conn.query(qry, (err, res) => {
      if (err) {
        console.log("====================================");
        console.log(err);
        console.log("====================================");

        result(null, err);
        return;
      }
      console.log("====================================");
      console.log(res);
      console.log("====================================");
      result(null, res);
    });
  },
  getOneUser: async (payload, result) => {
    console.log('=================pay===================');
    console.log(payload);
    console.log('====================================');
    let qry = `SELECT * FROM user WHERE username = '${payload.username}'`;
    console.log(qry);
    conn.query(qry, (err, res) => {
    if (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");

      return result(err, null);

    }
    console.log("==============res======================");
    console.log(res);
    console.log("====================================");
    return result(null, res);

  })}
};
module.exports = user;
