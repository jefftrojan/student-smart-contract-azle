# Student Records Management Canister

This Motoko canister is designed for managing student records. The code utilizes the "azle" library, which includes modules such as Canister, query, text, update, Void, and blob for working with the DFINITY Internet Computer.

## Global Variable
The canister starts with a global variable studentRecords, initialized as an empty record ({{}}). This variable serves as the storage for student records and is stored on the heap.

## Canister Definition
The canister is defined using the Canister function provided by the "azle" library. It exports a set of functions, both query and update, for interacting with the student records.

### Query Function - getStudentRecord
The getStudentRecord query function takes a studentId (text) as a parameter and returns the corresponding student record (blob). It checks if the student record exists in the studentRecords global variable and throws an error if it doesn't.

## Update Functions
### createStudentRecord
The createStudentRecord update function is used to add a new student record. It takes a studentId (text) and a record (blob) as parameters. It checks if the student record already exists and throws an error if it does. If not, it creates a new student record in the studentRecords global variable, including an empty subjects field.
### addSubject
The addSubject update function allows adding a subject and grade to an existing student record. It takes studentId (text), subject (text), and grade (text) as parameters. It checks if the student record exists, and if so, adds the subject and grade to the subjects field within the student record.
### updateStudentRecord
The updateStudentRecord update function is used to modify the main record field of an existing student record. It takes studentId (text) and record (blob) as parameters, checks if the student record exists, and updates the record field.
### deleteStudentRecord
The deleteStudentRecord update function is designed to delete an existing student record. It takes studentId (text) as a parameter, checks if the student record exists, and deletes it from the studentRecords global variable.