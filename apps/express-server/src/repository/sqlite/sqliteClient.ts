import { Database } from 'sqlite3'

const db = new Database('basic-web-app.db')

db.serialize(async () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS device  (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(60) NOT NULL,
        model VARCHAR(60) NOT NULL,
        description VARCHAR(256)
    );`,
  )
  db.run(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(60) NOT NULL,
      mailAddress VARCHAR(120) NOT NULL,
      password VARCHAR(120) NOT NULL,
      salt VARCHAR(120) NOT NULL
    );`)
})
db.exec

export { db }
