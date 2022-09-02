// const mongoose = require('mongoose');
const server = require('../bin/www');
const request = require('request');
const Character = require("../models/character");


const base_url = 'http://localhost:3000/characters';
var token;

describe('Testing Characters', () => {
  beforeAll((done) => {
    request.post({
      headers: { 'Content-type': 'application/json' },
      url: 'http://localhost:3000/auth/login',
      body: '{"email": "admin@disneyapi.com", "password": "adminpass"}'
    }, (err, res, body) => {
      expect(res.statusCode).toBe(200);
      token = JSON.parse(body).token;
      done();
    })
  })


  describe('GET /characters', () => {
    // Test para base de datos con 3 personajes cargados
    it('GET all characters', (done) => {
      request.get({
        headers: { 'x-access-token': token },
        url: base_url
      }, (err, res, body) => {
        let result = JSON.parse(body);
        expect(res.statusCode).toBe(200);
        expect(result.length).toBe(3);
        done();
      })

    })
  })

  describe('POST /characters', () => {
    it('POST one character', (done) => {
      request.post({
        headers: { 'content-type': 'application/json', 'x-access-token': token },
        url: base_url,
        body: '{"id": 10, "picture": "image/mickey.jpg", "name": "Mickey", "age": 18, "weight": 50.3, "history": "Prueba" }'
      }, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        Character.findByPk(10)
          .then((character) => {
            expect(character.name).toBe("Mickey");
            expect(character.age).toBe(18);
            expect(character.weight).toBe(50.3);
          })
        done();
      })
    })
  })

  describe('GET /characters/:id', () => {
    it('GET one character', (done) => {
      request.get({
        headers: { 'x-access-token': token },
        url: base_url + '/10'
      }, (err, res, body) => {
        let result = JSON.parse(body);
        expect(res.statusCode).toBe(200);
        expect(result.name).toBe("Mickey");
        expect(result.age).toBe(18);
        done();
      })

    })
  })

  describe('PUT /characters/:id', () => {
    it('UPDATE one character', (done) => {
      request.put({
        headers: { 'content-type': 'application/json', 'x-access-token': token },
        url: base_url + '/10',
        body: '{"picture": "mickey.jpg", "name": "Mickey Mouse"}'
      }, (err, res, body) => {
        expect(res.statusCode).toBe(204);
        Character.findByPk(10)
          .then((character) => {
            expect(character.name).toBe("Mickey Mouse");
            expect(character.age).toBe(18);
            expect(character.picture).toBe("mickey.jpg");
          })
        done();
      })
    })
  })

  describe('DELETE /characters/:id', () => {
    it('DELETE one character', (done) => {
      request.delete({
        headers: { 'x-access-token': token },
        url: base_url + '/10'
      }, (err, res, body) => {
        expect(res.statusCode).toBe(204);
        done();
      })
    })
  })

});