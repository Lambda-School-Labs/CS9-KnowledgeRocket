import React from 'react';
import ReactDOM from 'react-dom';
// Actions
import {
	handleGoogleResponse,
	handleTwitterResponse,
	handleFacebookResponse,
	addUser,
} from '../actions';

describe('action creators', () => {
	describe('addUser', () => {
		it('should accept a user object as an argument', () => {
			const expected = {
				email: expect.any(String),
				password: expect.any(String),
				authType: expect.any(String),
			};

			const user = {
				email: 'knowledgerocket@gmail.com',
				password: 'admin',
				authType: 'add me to the db',
			};

			expect(user).toHaveProperty('email');
			expect(user).toHaveProperty('password');
			expect(user).toHaveProperty('authType');
			expect(user).toMatchObject(expected);
		});
	});

	describe('handleGoogleResponse', () => {
		// clear all actions from mock

		it('should create a user object from a response object', async () => {
			const expected = {
				uid: 'abc',
				email: 'johndoe@yahoo.com',
				token: '123abc',
				authType: '3rdParty',
			};

			const response = {
				credential: {
					accessToken: '123abc',
				},
				user: {
					uid: 'abc',
					email: 'johndoe@yahoo.com',
				},
			};
			expect(handleGoogleResponse(response)).toEqual(expected);
		});

		describe('handleTwitterResponse', () => {
			it('should create a user object from a response object', async () => {
				const expected = {
					uid: 'def',
					email: 'janedoe@yahoo.com',
					token: '456def',
					authType: '3rdParty',
				};
				// describes response object from async call to firebase.auth()
				const response = {
					credential: {
						accessToken: '456def',
					},
					user: {
						uid: 'def',
						providerData: ['janedoe@yahoo.com'],
					},
				};
				expect(handleTwitterResponse(response)).toEqual(expected);
			});
		});

		describe('handleFacebookResponse', () => {
			it('should create a user object from a response object', async () => {
				const expected = {
					uid: 'jkl',
					email: 'janedoe@lambda.com',
					token: '789jkl',
					authType: '3rdParty',
				};
				// describes response object from async call to firebase.auth()
				const response = {
					credential: {
						accessToken: '789jkl',
					},
					user: {
						uid: 'jkl',
						email: 'janedoe@lambda.com',
					},
				};
				expect(handleFacebookResponse(response)).toEqual(expected);
			});
		});
	});
});