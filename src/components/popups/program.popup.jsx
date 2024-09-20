import React, { useState } from 'react';

const ProgramPopup = ({ selectedProgram, setShowPopup, addRoadmapEntry }) => {
    const [term, setTerm] = useState('fall');
    const [year, setYear] = useState('2023');
    const [semester, setSemester] = useState('');
    const [courseDetails, setCourseDetails] = useState({
        courseCode: '',
        subjectName: '',
        creditHours: ''
    });

    // Determine the number of semesters based on the selected program
    const getNumberOfSemesters = () => {
        if (selectedProgram.toLowerCase().includes('bachelors')) {
            return 8;
        } else if (selectedProgram.toLowerCase().includes('adp') || selectedProgram.toLowerCase().includes('masters') || selectedProgram.toLowerCase().includes('phd')) {
            return 4;
        }
        return 0; // Default if no match
    };

    const handleSubmit = () => {
        addRoadmapEntry(term, year, semester, courseDetails);
        setShowPopup(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white px-20 py-10 rounded-lg w-3/6">
                <h2 className="text-2xl font-bold mb-4">Add Roadmap</h2>

                <label className="block mb-2">Select Term:</label>
                <select
                    className="w-full mb-4 p-2 border"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                >
                    <option value="fall">Fall</option>
                    <option value="spring">Spring</option>
                </select>

                <label className="block mb-2">Select Year:</label>
                <select
                    className="w-full mb-4 p-2 border"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    {Array.from({ length: 28 }, (_, i) => (
                        <option key={i} value={2023 + i}>{2023 + i}</option>
                    ))}
                </select>

                <label className="block mb-2">Select Semester:</label>
                <select
                    className="w-full mb-4 p-2 border"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                >
                    <option value="">--Select Semester--</option>
                    {Array.from({ length: getNumberOfSemesters() }, (_, i) => (
                        <option key={i} value={i + 1}>Semester {i + 1}</option>
                    ))}
                </select>

                <label className="block mb-2">Course Code:</label>
                <input
                    type="text"
                    className="w-full mb-4 p-2 border"
                    value={courseDetails.courseCode}
                    onChange={(e) => setCourseDetails({ ...courseDetails, courseCode: e.target.value })}
                />

                <label className="block mb-2">Subject Name:</label>
                <input
                    type="text"
                    className="w-full mb-4 p-2 border"
                    value={courseDetails.subjectName}
                    onChange={(e) => setCourseDetails({ ...courseDetails, subjectName: e.target.value })}
                />

                <label className="block mb-2">Credit Hours:</label>
                <input
                    type="number"
                    className="w-full mb-4 p-2 border"
                    value={courseDetails.creditHours}
                    onChange={(e) => setCourseDetails({ ...courseDetails, creditHours: e.target.value })}
                />

                <div className="flex justify-end">
                    <button
                        className="px-5 py-2 bg-gray-300 hover:bg-gray-400 rounded mr-4"
                        onClick={() => setShowPopup(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-8 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProgramPopup;
