import request from 'supertest';
import { app } from '../../app';

it('returns a 401 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'random_new_title',
            price: 10
        })
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'random new title',
            price: 10
        })
        .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/ticket')
        .set('Cookie', global.signin())
        .send({
            title: 'random old title',
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'random new title',
            price: 100
        })
        .expect(401);


});


it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/ticket')
        .set('Cookie', cookie)
        .send({
            title: 'random old title',
            price: 20
        });

    await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        }).expect(400);

    await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'valid title',
            price: -10
        }).expect(400)
});


it('updates the ticket when provided correct inputs', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/ticket')
        .set('Cookie', cookie)
        .send({
            title: 'random old title',
            price: 20
        });

    const title = 'new valid title';
    const price = 20;
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title,
            price
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});
