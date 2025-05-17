const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Subject = require('../models/Subject');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Course API', () => {
  let subjectId;
  before(async () => {
    const subject = await Subject.create({
      title: { en: 'Test Subject', ar: 'موضوع اختبار' },
      description: { en: 'Test', ar: 'اختبار' }
    });
    subjectId = subject._id;
  });

  it('should create a course', (done) => {
    chai.request(app)
      .post('/api/courses')
      .set('Cookie', 'token=valid-teacher-token') // Mocked token
      .send({
        subject_id: subjectId,
        title_en: 'Algebra',
        title_ar: 'الجبر',
        description_en: 'Intro to algebra',
        description_ar: 'مقدمة في الجبر'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Course created');
        done();
      });
  });
});