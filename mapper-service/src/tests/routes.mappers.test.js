import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);

describe('GET /mappers', () => {
    it('should respond with all mappers', (done) => {
        chai.request(app)
            .get('/mappers')
            .end((err, res) => {
                should.not.exist(err);

                res.status.should.equal(200);
                res.type.should.equal('application/json');

                res.body.length.should.eql(3);
                res.body.forEach((mapper) => {
                    should.exist(mapper.id);
                    should.exist(mapper.inputFormat);
                    should.exist(mapper.outputFormat);
                    should.not.exist(mapper.mappings);
                });
                done();
            });
    });
});
