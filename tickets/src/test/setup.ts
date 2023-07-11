import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

let mongo: any;

declare global {
    var signin: () => string[];
}

beforeAll(async () => {
    process.env.JWT_KEY = 'random_key';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signin = () => {

    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'testmail@mail.com'
    }

    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`session=${base64}`];
};


/*
A Required Session Fix and a Global Signin Reminder
In the upcoming lecture, we will be updating our src/test/setup.ts file.

As a reminder, your global signin declaration should look like this after the refactor:

declare global {
  var signin: () => string[];
}
One small fix is required to return the cookie to prevent our tests from failing:

Find the return of the global.signin method and change this:

  return [`express:sess=${base64}`];

to this:

  
*/