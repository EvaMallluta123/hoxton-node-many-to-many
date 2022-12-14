import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const db = Database(`./db/data.db`, { verbose: console.log });
const app = express();
app.use(cors());
app.use(express.json());

const port = 3003;
const getApplicantsById = db.prepare(`
SELECT * FROM applicants WHERE id=@id;
`);

const getApplicants = db.prepare(`
SELECT * FROM applicants;
`);
const getInterviewersById = db.prepare(`
SELECT * FROM interviewers WHERE id=@id;
`);

const getInterviewers = db.prepare(`
SELECT * FROM interviewers;
`);

const getInterviewsForApplicant = db.prepare(`
SELECT * FROM interviews WHERE applicantId=@applicantId;
`);

const getInterviewersForApplicant = db.prepare(`
 SELECT interviewers.* FROM interviewers
 JOIN interviews ON interviewers.id=interviews.applicantId
 WHERE interviews.applicantId=@applicantId;
 `);
const getApplicantForInterviewers = db.prepare(`
 SELECT applicants.* FROM applicants
 JOIN interviews ON applicants.id=interviews.interviewerId
 WHERE interviews.interviewerId=interviewerId;
 `);

 const createInterviewers=db.prepare(`
 INSERT INTO interviewers(name,education,work_position) 
VALUES (@name,@education,@work_position);

 `)

app.get(`/applicants/:id`, (req, res) => {
  const applicant = getApplicantsById.get(req.params);

  if (applicant) {
    applicant.interview = getInterviewsForApplicant.all({
      applicantId: applicant.id,
    });
    applicant.interviewers = getInterviewersForApplicant.all({
      applicantId: applicant.id,
    });
    res.send(applicant);
  } else {
    res.status(404).send({ error: `applicant not found` });
  }
});
app.get(`/applicants`, (req, res) => {
    const applicants = getApplicants.all();
  
    for (let applicant of applicants) {
      const interviewers = getInterviewersForApplicant.all({
        applicantId: applicant.id,
      });
      applicant.interviewers = interviewers;
    }
    res.send(applicants);
  });

app.get(`/interviewers/:id`, (req, res) => {
  const interviewer = getInterviewersById.get(req.params);

  if (interviewer) {
    interviewer.applicants = getApplicantForInterviewers.all({
      interviewerId: interviewer.id,
    });
    res.send(interviewer);
  } else {
    res.status(404).send({ error: `interviewer not found` });
  }
});

app.get(`/interviewers`, (req, res) => {
  const interviewers = getInterviewers.all();

  for (let interviewer of interviewers) {
    const applicants = getApplicantForInterviewers.all({
      interviewerId: interviewer.id,
    });
    interviewer.applicants = applicants;
  }
  res.send(interviewers);
});
 
app.post(`/interviewers`, (req, res) => {
    let errors: string[] = []

    if (typeof req.body.name !== 'string') {
      errors.push('Name is missing or not a string')
    }
  
    if (typeof req.body.education !== 'string') {
      errors.push('education is missing or not a string')
    }
    if (typeof req.body.work_position !== 'string') {
        errors.push('work position is missing or not a string')
      }
      if (errors.length === 0) {

        const applicant= getApplicantsById.get({id:req.body.applicantId})
       if (applicant){
        const info = createInterviewers.run(req.body)
        const interviewer=getInterviewersById.get({id:info.lastInsertRowid})
        interviewer.applicant=applicant
        res.send(interviewer)
       }
      }else {
        res.status(400).send({ errors })
      }
  
})


app.listen(port, () => {
  console.log(`App running on:http://localhost:${port}`);
});
