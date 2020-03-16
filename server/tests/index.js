import app from "../index";
import chai from 'chai';
import chaiHttp from 'chai-http';
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

describe('It should test all the end points', function (){
    it('It should initiate test', (done) => {
        expect(2).to.equal(2)
        done()
    })
    
})