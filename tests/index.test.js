import Server from "../src/models/Server.js";
import request from "supertest";

const server = new Server();
const app = server.app;
let userTest = 0;

describe('GET /users/getusers', () => {
    test('should respond whit a 200 status code', async () => {

        const res = await request(app).get('/users/getusers');
        expect(res.statusCode).toBe(200);

    });

    test('should return a list of users', async () => {

        const res = await request(app).get('/users/getusers');
        expect(res.body).toBeInstanceOf(Array);

    });
});

describe('POST /users/createUsers', () => {

    describe('given the user\'s data', () => {

        const newUser = {
            user:{
                name: "Test",
                email:"test@user.com",
                birthDate:"2001-07-28",
                address: {
                    street: "Centro",
                    state: "Chiapas",
                    city: "Tuxtla GTZ",
                    country: "Mexico",
                    zip:"29000"
                }
            }
        }

        test('should respond whit a 200 status code', async () => {
            const res = await request(app).post('/users/createUsers').send(newUser);
            expect(res.statusCode).toBe(201);
        });

        test('should respond whit a the user created', async () => {
            const res = await request(app).post('/users/createUsers').send(newUser);
            expect(res.body.user).toBeDefined();
            userTest = res.body.user.id;
        });

        test('should respond whit a description that say "CREATED"', async () => {
            const res = await request(app).post('/users/createUsers').send(newUser);
            expect(res.body.description).toEqual('CREATED');
        });

    });

    describe('when the user\'s data is missing', () => {

        test('should respond whit a 405 status code', async () => {
    
            const res = await request(app).post('/users/createUsers').send();
            expect(res.statusCode).toBe(405);
            expect(res.body.description).toEqual('Invalid input');
    
        });

    });

});

describe('GET /users/getusersById/:userId', () => {

    describe('given the user\'s id', () => {

        test('should respond whit a 200 status code', async () => {

            const res = await request(app).get(`/users/getusersById/${userTest}`);
            expect(res.statusCode).toBe(200);
    
        });

        test('should respond whit user data', async () => {

            const res = await request(app).get(`/users/getusersById/${userTest}`);
            expect(res.body.user).toBeInstanceOf(Object);
    
        });

    });

    describe('when the user\'s id is invalid or the user is not found', () => {

        test('should respond whit a 400 status code', async () => {

            const res = await request(app).get('/users/getusersById/id');
            expect(res.statusCode).toBe(400);
    
        });

        test('should respond whit a 404 status code', async () => {

            const res = await request(app).get('/users/getusersById/0');
            expect(res.statusCode).toBe(404);
    
        });

    });

});

describe('PUT /users/updateUsersById/:userId', () => {

    describe('given the user\'s data to update', () => {

        const updateUser = {
            user:{
                name: "TestUpdate",
                birthDate:"1998-07-28",
                address: {
                    city: "New York",
                    country: "US"
                }
            }
        }

        test('should respond whit a 200 status code', async () => {

            const res = await request(app).put(`/users/updateUsersById/${userTest}`).send(updateUser);
            expect(res.statusCode).toBe(200);
    
        });

        test('should respond whit user updated', async () => {

            const res = await request(app).put(`/users/updateUsersById/${userTest}`).send(updateUser);
            expect(res.body.user).toBeInstanceOf(Object);
    
        });

    });

    describe('when the user\'s id is invalid or the user is not found', () => {

        test('should respond whit a 400 status code', async () => {

            const res = await request(app).put('/users/updateUsersById/id');
            expect(res.statusCode).toBe(400);
    
        });

        test('should respond whit a 404 status code', async () => {

            const res = await request(app).put('/users/updateUsersById/0');
            expect(res.statusCode).toBe(404);
    
        });

    });

});

describe('DELETE /users/deleteUsersById/:userId', () =>{

    describe('given the user\'s id', () => {

        test('should respond whit a 200 status code', async () => {

            const res = await request(app).delete(`/users/deleteUsersById/${userTest}`);
            expect(res.statusCode).toBe(200);
    
        });

    });

    describe('when the user\'s id is invalid or the user is not found', () => {

        test('should respond whit a 400 status code', async () => {

            const res = await request(app).delete('/users/deleteUsersById/id');
            expect(res.statusCode).toBe(400);
    
        });

        test('should respond whit a 404 status code', async () => {

            const res = await request(app).delete('/users/deleteUsersById/0');
            expect(res.statusCode).toBe(404);
    
        });

    });
});