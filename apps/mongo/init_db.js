db = db.getSiblingDB('tsuchidaDB')

db.createCollection('user')

db.device.insertMany([
  {
    name: 'tsuchida800',
    model: 'CC2L',
    description: '古い',
  },
  {
    name: 'tsuchida80d0',
    model: 'CC2L',
    description: '新しい',
  },
])
