import React from 'react';

const ProgramTable = ({ semester, roadmap, onEdit, onDelete }) => {
    return (
        <div className="pb-8">
            <h4 className="text-xl font-semibold mb-2">Semester {semester}</h4>
            <table className="min-w-full table-fixed">
                <thead className="bg-gray-200 text-left">
                    <tr>
                        <th className="w-1/4 px-4 py-2 text-center">Course Code</th>
                        <th className="w-1/4 px-4 py-2 text-center">Subject Name</th>
                        <th className="w-1/4 px-4 py-2 text-center">Credit Hours</th>
                        <th className="w-1/4 px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roadmap.length > 0 ? (
                        roadmap.map((course, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="px-4 py-2 text-center">{course.courseCode}</td>
                                <td className="px-4 py-2 text-center">{course.subjectName}</td>
                                <td className="px-4 py-2 text-center">{course.creditHours}</td>
                                <td className="px-4 py-2 text-center">
                                    <button className="mr-2 px-6 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded" onClick={() => onEdit(course)}>Edit</button>
                                    <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded" onClick={() => onDelete(course)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-4 py-2 text-center">No courses added for this semester yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProgramTable;
 