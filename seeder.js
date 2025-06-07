const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const faker = require('faker');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Event = require('./models/Event');

// Connect to DB
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB Connected for Seeding...');
};

const clearData = async () => {
  try {
    await Event.deleteMany();
    await User.deleteMany();
    console.log('Data Cleared...');
  } catch (err) {
    console.error(err);
  }
};

const seedData = async () => {
  try {
    await clearData();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('secret123', salt);

    // Create users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: hashedPassword,
      });
      users.push(user);
    }
    const createdUsers = await User.insertMany(users);
    console.log('Users Seeded...');

    // Create events
    const events = [];
    for (let i = 0; i < 10; i++) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const event = new Event({
        title: faker.lorem.sentence(),
        location: `${faker.address.city()}, ${faker.address.country()}`,
        date: faker.date.future(),
        description: faker.lorem.paragraph(),
        userId: randomUser._id,
      });
      events.push(event);
    }
    await Event.insertMany(events);
    console.log('Events Seeded...');

    console.log('Data Seeding Complete!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const runSeeder = async () => {
    await connectDB();
    if (process.argv[2] === '-d') {
        await clearData();
        process.exit();
    } else {
        await seedData();
    }
}

runSeeder();