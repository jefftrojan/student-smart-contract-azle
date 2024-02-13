import { Canister, query, text, update, Void, blob } from 'azle';

// Define the structure of a subject
interface Subject {
    [key: string]: string;
}

// Define the structure of a student record
interface StudentRecord {
    record: any;
    subjects: Subject;
}

// This is a global variable that is stored on the heap
// It will hold all the student records
let studentRecords: { [key: string]: StudentRecord } = {};

export default Canister({
    // Query to get a student record
    getStudentRecord: query([text], blob, (studentId: string) => {
        // Check if the student record exists
        if (!(studentId in studentRecords)) {
            throw new Error(`Student record for ${studentId} does not exist`);
        }
        // Return the student record
        return studentRecords[studentId];
    }),
    // Update function to create a student record
    createStudentRecord: update([text, blob], Void, (studentId: string, record: any) => {
        // Check if the student record already exists
        if (studentId in studentRecords) {
            throw new Error(`Student record for ${studentId} already exists`);
        }
        // Create a new student record
        studentRecords[studentId] = { record, subjects: {} }; 
    }),
    // Update function to add a subject to a student record
    addSubject: update([text, text, text], Void, (studentId: string, subject: string, grade: string) => {
        // Check if the student record exists
        if (!(studentId in studentRecords)) {
            throw new Error(`Student record for ${studentId} does not exist`);
        }
        // Add the subject to the student record
        studentRecords[studentId].subjects[subject] = grade; 
    }),
    // Update function to update a student record
    updateStudentRecord: update([text, blob], Void, (studentId: string, record: any) => {
        // Check if the student record exists
        if (!(studentId in studentRecords)) {
            throw new Error(`Student record for ${studentId} does not exist`);
        }
        // Update the student record
        studentRecords[studentId].record = record; 
    }),
    // Update function to delete a student record
    deleteStudentRecord: update([text], Void, (studentId: string) => {
        // Check if the student record exists
        if (!(studentId in studentRecords)) {
            throw new Error(`Student record for ${studentId} does not exist`);
        }
        // Delete the student record
        delete studentRecords[studentId]; 
    })
});
