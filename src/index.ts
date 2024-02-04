import { Canister, query, text, update, Void, blob } from 'azle';

// This is a global variable that is stored on the heap
let studentRecords: { [key: string]: any } = {};

export default Canister({
    getStudentRecord: query([text], blob, (studentId) => {
        if (!(studentId in studentRecords)) {
            throw new Error("Student record does not exist");
        }
        return studentRecords[studentId];
    }),
    createStudentRecord: update([text, blob], Void, (studentId, record) => {
        if (studentId in studentRecords) {
            throw new Error("Student record already exists");
        }
        studentRecords[studentId] = { record, subjects: {} }; 
    }),
    addSubject: update([text, text, text], Void, (studentId, subject, grade) => {
        if (!(studentId in studentRecords)) {
            throw new Error("Student record does not exist");
        }
        studentRecords[studentId].subjects[subject] = grade; 
    }),
    updateStudentRecord: update([text, blob], Void, (studentId, record) => {
        if (!(studentId in studentRecords)) {
            throw new Error("Student record does not exist");
        }
        studentRecords[studentId].record = record; 
    }),
    deleteStudentRecord: update([text], Void, (studentId) => {
        if (!(studentId in studentRecords)) {
            throw new Error("Student record does not exist");
        }
        delete studentRecords[studentId]; 
    })
});
