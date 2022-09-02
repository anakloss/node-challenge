// const mongoose = require('mongoose');
const server = require('../bin/www');
const request = require('request');
const Movie = require("../models/movie");


const base_url = 'http://localhost:3000/movies';
var token;

describe('Testing Movies', () => {
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


  describe('GET /movies', () => {
    // Test para base de datos con 1 pelicula cargada
    it('GET all movies', (done) => {
      request.get({
        headers: { 'x-access-token': token },
        url: base_url
      }, (err, res, body) => {
        let result = JSON.parse(body);
        expect(res.statusCode).toBe(200);
        expect(result.length).toBe(1);
        done();
      })

    })
  })

  describe('POST /movies', () => {
    it('POST one movie', (done) => {
      request.post({
        headers: { 'content-type': 'application/json', 'x-access-token': token },
        url: base_url,
        body: '{"id": 10, "picture": "image/lightyear.jpg", "title": "Lightyear", "create_date": "2022", "calification": 5 }'
      }, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        Movie.findByPk(10)
          .then((movie) => {
            expect(movie.title).toBe("Lightyear");
            expect(movie.calification).toBe(5);
          })
        done();
      })
    })
  })

  describe('GET /movies/:id', () => {
    it('GET one movie', (done) => {
      request.get({
        headers: { 'x-access-token': token },
        url: base_url + '/10'
      }, (err, res, body) => {
        let result = JSON.parse(body);
        expect(res.statusCode).toBe(200);
        expect(result.title).toBe("Lightyear");
        expect(result.calification).toBe(5);
        done();
      })

    })
  })

  describe('PUT /movies/:id', () => {
    it('UPDATE one movie', (done) => {
      request.put({
        headers: { 'content-type': 'application/json', 'x-access-token': token },
        url: base_url + '/10',
        body: '{"picture": "lightyear.jpg", "title": "Lightyear (Latino)"}'
      }, (err, res, body) => {
        expect(res.statusCode).toBe(204);
        Movie.findByPk(10)
          .then((movie) => {
            expect(movie.title).toBe("Lightyear (Latino)");
            expect(movie.calification).toBe(5);
            expect(movie.picture).toBe("lightyear.jpg");
          })
        done();
      })
    })
  })

  describe('DELETE /movies/:id', () => {
    it('DELETE one movie', (done) => {
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