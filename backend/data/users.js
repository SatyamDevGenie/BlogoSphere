import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Satyam Sawant",
    email: "satyamsawant54@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Vedang Kanade",
    email: "vedangkanade45@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
