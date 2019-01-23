const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('Multiple rules test', function () {

    describe('required|minLength|maxLength|alpha', function () {

        it('should return true', async () => {

            let v = new Validator({ name: 'artisan' }, { name: 'required|minLength:5|maxLength:8|alpha' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false due to minLength failed', async () => {

            let v = new Validator({ name: 'art' }, { name: 'required|minLength:5|maxLength:8|alpha' });

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('name');

        });

        it('should return false due to maxLength failed', async () => {

            let v = new Validator({ name: 'artisangang' }, { name: 'required|minLength:5|maxLength:8' });

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('name');

        });

        it('should return true if the number satisfies min and max', async () => {

            let v = new Validator({ rate: '2.29' }, { rate: 'required|numeric|min:1|max:98' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return true if the integer satisfies min and max', async () => {

            let v = new Validator({ rate: '2' }, { rate: 'required|numeric|min:1|max:98' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false if the number does not satisfies min and max', async () => {

            let v = new Validator({ rate: '2.29' }, { rate: 'required|numeric|min:5|max:98' });

            let matched = await v.check();

            assert.equal(matched, false);

            let v2 = new Validator({ rate: '99.9' }, { rate: 'required|numeric|min:5|max:98' });

            let matched2 = await v2.check();

            assert.equal(matched2, false);

        });

        it('should return true if the integer satisfies min and max', async () => {

            let v = new Validator({ rate: 2 }, { rate: 'required|numeric|min:5|max:98' });

            let matched = await v.check();

            assert.equal(matched, false);

            let v2 = new Validator({ rate: 99 }, { rate: 'required|numeric|min:5|max:98' });

            let matched2 = await v2.check();

            assert.equal(matched2, false);

        });
    });

});
