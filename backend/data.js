import bcrypt from "bcrypt";
const data = {
  users: [
    {
      name: "acan",
      email: "thanhloctruong102@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true
    },
    {
      name: "van Ha",
      email: "nguyenvanha@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false
    }
  ],
  products: [
    {
      name: "sgk 11",
      category: "sach",
      image: "/img/1.jpg",
      price: 100,
      countInStock: 10,
      brand: "Kimdong",
      rating: 4.5,
      numReviews: 10,
      description: "hang cao cap"
    },
    {
      name: "sgk 41",
      category: "sach",
      image: "/img/2.jpg",
      price: 100,
      countInStock: 20,
      brand: "Kimdong",
      rating: 4.5,
      numReviews: 10,
      description: "hang cao cap"
    },
    {
      name: "sgk 21",
      category: "sach",
      image: "/img/3.jpg",
      price: 100,
      countInStock: 10,
      brand: "Kimdong",
      rating: 4.5,
      numReviews: 10,
      description: "hang cao cap"
    },
    {
      name: "sgk 1",
      category: "sach",
      image: "/img/4.jpg",
      price: 100,
      countInStock: 0,
      brand: "Kimdong",
      rating: 4.5,
      numReviews: 10,
      description: "hang cao cap"
    }
  ]
};
export default data;
