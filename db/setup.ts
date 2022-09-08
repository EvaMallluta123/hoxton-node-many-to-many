import Database from "better-sqlite3";

const db = Database(`./db/data.db`, { verbose: console.log });

const applicants = [
  {
    name: "John",
    gender: "Male",
    birthday: "23/08/2000",
    profession: "Dentist",
    experience: "2 years",
  },
  {
    name: "Ann",
    gender: "Female",
    birthday: "21/06/1998",
    profession: "Doctor",
    experience: "3 years",
  },
  {
    name: "Ben",
    gender: "Male",
    birthday: "09/12/1987",
    profession: "Student",
    experience: "5 years",
  },
  {
    name: "Beatric",
    gender: "Female",
    birthday: "04/01/1989",
    profession: "Businessman",
    experience: "6 years",
  },
  {
    name: "Albert",
    gender: "Male",
    birthday: "23/08/1979",
    profession: "Professor",
    experience: "10 years",
  },
  {
    name: "Ensa",
    gender: "Female",
    birthday: "22/11/1989",
    profession: "Librarian",
    experience: "6 years",
  },
  {
    name: "Eri",
    gender: "Male",
    birthday: "23/08/1988",
    profession: "Architect",
    experience: "10 years",
  },
  {
    name: "Emi",
    gender: "Female",
    birthday: "07/08/1996",
    profession: "",
    experience: "3 years",
  },
];
const interviewers = [
  {
    name: "Ema",
    education: "Doctor",
    work_position: "hospital director",
  },
  {
    name: "Marsela",
    education: "Economist",
    work_position: "director of the finance department",
  },
  {
    name: "Rigers",
    education: "Mechanic",
    work_position: "local owner",
  },
  {
    name: "Donald",
    education: "Engineer",
    work_position: "director of the IT department",
  },
  {
    name: "Erni",
    education: "Farmer",
    work_position: "farm owner",
  },
];

const interviews=[
    {
        applicantId:"1" ,
        interviewerId:"1",
        date:"02/09/2022"
    },
    {
        applicantId:"1" ,
        interviewerId:"2",
        date:"02/09/2022"
    },
    {
        applicantId:"2" ,
        interviewerId:"1",
        date:"02/09/2022"
    },
    {
        applicantId:"2" ,
        interviewerId:"2",
        date:"02/09/2022"
    },
    {
        applicantId:"2" ,
        interviewerId:"1",
        date:"02/09/2022"
    },
    {
        applicantId:"3" ,
        interviewerId:"1",
        date:"02/09/2022"
    },
    {
        applicantId:"3" ,
        interviewerId:"3",
        date:"02/09/2022"
    },
    {
        applicantId:"3" ,
        interviewerId:"4",
        date:"02/09/2022"
    },
    
    {
        applicantId:"6" ,
        interviewerId:"4",
        date:"02/09/2022"
    },
    {
        applicantId:"8" ,
        interviewerId:"5",
        date:"02/09/2022"
    },
    {
        applicantId:"7" ,
        interviewerId:"5",
        date:"02/09/2022"
    },
    {
        applicantId:"3" ,
        interviewerId:"5",
        date:"02/09/2022"
    },
    {
        applicantId:"8" ,
        interviewerId:"2",
        date:"02/09/2022"
    },
    

]

//Applicants
const dropApplicantsTable = db.prepare(`
DROP TABLE IF EXISTS applicants;
`);
dropApplicantsTable.run();

const createApplicantsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS applicants(
    id INTEGER,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    birthday TEXT,
    profession TEXT NOT NULL,
    experience TEXT NOT NULL,
    PRIMARY KEY(id)
);  `);
createApplicantsTable.run();

const createApplicants = db.prepare(`
INSERT INTO applicants(name, gender,birthday, profession, experience) 
VALUES (@name, @gender,@birthday, @profession, @experience);

`);
for (let applicant of applicants) {
  createApplicants.run(applicant);
}

//Interviewers
const dropInterviewersTable = db.prepare(`
 DROP TABLE IF EXISTS interviewers;
 `);
dropInterviewersTable.run();

const createInterviewersTable = db.prepare(`
CREATE TABLE IF NOT EXISTS interviewers(
    id INTEGER,
   name TEXT NOT NULL,
   education TEXT NOT NULL,
   work_position TEXT NOT NULL,
   PRIMARY KEY(id) ); `);
createInterviewersTable.run();

 const createInterviewers=db.prepare(`
 INSERT INTO interviewers(name,education,work_position) 
VALUES (@name,@education,@work_position);

 `)
 for (let interviewer of interviewers) {
    createInterviewers.run(interviewer);
  }
// interviews
const dropInterviewsTable = db.prepare(`
 DROP TABLE IF EXISTS interviews;
 `);
 dropInterviewsTable.run();
 const createInterviewsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS interviews (
  id INTEGER,
  applicantId INTEGER,
  interviewerId INTEGER,
  date TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (applicantId) REFERENCES applicants(id) ON DELETE CASCADE,
  FOREIGN KEY (interviewerId) REFERENCES interviewers(id) ON DELETE CASCADE
);
`)
createInterviewsTable.run();
 
const createInter = db.prepare(`
INSERT INTO interviews(applicantId,interviewerId,date) 
VALUES (@applicantId, @interviewerId, @date);

`);
for (let interview of interviews) {
    createInter.run(interview);
}