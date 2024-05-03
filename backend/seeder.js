import dotenv from "dotenv";
import connectDB from "./config/db.js";
import blogs from "./data/blogs.js";
import users from "./data/users.js";
import Blog from "./models/blogModel.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Blog.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleBlogs = blogs.map((blog) => {
      return { ...blog, user: adminUser };
    });

    await Blog.insertMany(sampleBlogs);
    console.log("Data imported");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Blog.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
