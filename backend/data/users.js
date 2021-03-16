import bcrypt from 'bcryptjs'

const users = [
  {name: 'Admin User', email: 'admin@example.com', password: bcrypt.hashSync('123456', 10), isAdmin: true},
  {name: 'John Doe', email: 'john@example.com', password: bcrypt.hashSync('123456', 10) },
  {name: 'Harry Whit', email: 'harry@example.com', password: bcrypt.hashSync('123456', 10)},
]

export default users