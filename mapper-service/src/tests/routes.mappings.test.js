import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import DefaultRepository from '../repositories/DefaultRepository';

const should = chai.should();
chai.use(chaiHttp);

const repository = new DefaultRepository();

const validateNotFoundResponse = (error, response, body) => {
    should.not.exist(error);

    response.status.should.equal(404);
    response.body.should.eql(body);
};

describe('GET /mappers/betelgeuse/mappings', () => {
    it('should respond with all mappings of betelgeuse', (done) => {
        chai.request(app).get('/mappers/betelgeuse/mappings').end((err, res) => {
            should.not.exist(err);

            res.status.should.equal(200);
            res.type.should.equal('application/json');

            res.body.should.eql(repository.mappings('betelgeuse'));

            done();
        });
        done();
    });
});

describe('GET /mappers/unknown-mapper/mappings', () => {
    it('should respond with 404 and an error', (done) => {
        chai.request(app).get('/mappers/unknown-mapper/mappings').end((err, res) => {
            validateNotFoundResponse(err, res, { error: ':unknown-mapper' });
            done();
        });
    });
});

describe('PUT /mappers/vega/mappings/mapping', () => {
    it('should add the mapping and return 204', (done) => {
        const mappings = repository.mappings('vega');
        const from = 'shizzle.leet';
        const to = 'cool';
        chai.request(app).put(`/mappers/vega/mappings/${to}`).send({ from }).end((err, res) => {
            should.not.exist(err);

            res.status.should.equal(204);

            const updatedMappings = repository.mappings('vega');
            updatedMappings.length.should.eql(mappings.length + 1);
            const matchingMapping = updatedMappings.find((mapping) => mapping.from === from && mapping.to === to);
            should.exist(matchingMapping);

            done();
        });
    });
});

describe('PUT /mappers/vega/mappings/existing-mapping', () => {
    it('should overwrite the existing mapping and return 204', (done) => {
        const mappings = repository.mappings('alnilam');
        const from = 'distances.betelgeuse';
        const to = 'objectDistances.earth';
        chai.request(app).put(`/mappers/alnilam/mappings/${to.replace(/\./g, '-')}`).send({ from }).end((err, res) => {
            should.not.exist(err);

            res.status.should.equal(204);

            const updatedMappings = repository.mappings('alnilam');
            updatedMappings.length.should.eql(mappings.length);
            const matchingMapping = updatedMappings.find((mapping) => mapping.from === from && mapping.to === to);
            should.exist(matchingMapping);

            done();
        });
    });
});

describe('PUT /mappers/vega/mappings/unknown-mapping', () => {
    it('should respond with 404 and an error', (done) => {
        chai.request(app).put('/mappers/vega/mappings/unknown-mapping').end((err, res) => {
            validateNotFoundResponse(err, res, { error: ':unknown-output-format-property' });
            done();
        });
    });
});

describe('DELETE /mappers/alnilam/mappings/mapping', () => {
    it('should delete the maping and respond with 204', (done) => {
        const mappings = repository.mappings('alnilam');
        const mappingToDelete = mappings[0];
        chai
            .request(app)
            .delete(`/mappers/alnilam/mappings/${mappingToDelete.to.replace(/\./g, '-')}`)
            .end((err, res) => {
                should.not.exist(err);

                res.status.should.equal(204);

                const updatedMappings = repository.mappings('alnilam');
                updatedMappings.length.should.eql(mappings.length - 1);
                const matchingMapping = updatedMappings.find(
                    (mapping) => mapping.from === mappingToDelete.from && mapping.to === mappingToDelete.to,
                );
                should.not.exist(matchingMapping);

                done();
            });
    });
});

describe('DELETE /mappers/alnilam/mappings/unkown-mapping', () => {
    it('should respond with 404 and an error', (done) => {
        chai.request(app).delete('/mappers/alnilam/mappings/unknown-mapping').end((err, res) => {
            validateNotFoundResponse(err, res, { error: ':unknown-output-format-property' });
            done();
        });
    });
});
