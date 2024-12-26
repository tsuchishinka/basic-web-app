import { Database } from "sqlite3";

const execute = async () => {
  const db = new Database("../express-server/yes.db");
  const response = await new Promise((resolve) => {
    db.serialize(async () => {
      // db.run(
      //   `CREATE TABLE devices (
      //       id INTEGER PRIMARY KEY AUTOINCREMENT,
      //       name VARCHAR(60) NOT NULL,
      //       model VARCHAR(60) NOT NULL,
      //       description VARCHAR(256)
      //   );`
      // )
      //   .run(
      //     `INSERT INTO devices (name, model, description)
      //           VALUES ('deviceA', 'CC2L', 'memo1')`
      //   )
      //   .run(
      //     `INSERT INTO devices (name, model, description)
      //           VALUES ('deviceB', 'Axis', 'memo2')`
      //   )
      //   .run(
      //     `INSERT INTO devices (name, model, description)
      //           VALUES ('deviceC', 'safieGo', 'memo3')`
      //   )
      //   .run(
      //     `
      //     DELETE FROM devices WHERE id = 23`,
      //     (err) => {
      //       console.log(err);
      //     }
      //   )
      db.all(`SELECT * FROM user`, (_, rows) => {
        resolve(rows);
      });
      // .all(`SELECT * FROM devices limit ? offset ?`, 2, 1, (_, rows) => {
      //   resolve(rows);
      // });
      // .all(`SELECT * FROM devices WHERE name LIKE '%B%'`, (_, rows) => {
      //   resolve(rows);
      // });
    });
  });
  console.log(response);
  db.exec;
};

export { execute };
