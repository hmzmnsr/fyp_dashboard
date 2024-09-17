import React, { useState } from 'react';
import FlexContainer from '../../components/containers/flex.container';
import AddRoadmapPopup from "../../components/popups/roadmap.popup";
import RoadmapTable from "../../components/tables/roadmap.table";

const Programs = () => {
    const [selectedProgram, setSelectedProgram] = useState('bachelors in computer science');
    const [showPopup, setShowPopup] = useState(false);
    const [roadmap, setRoadmap] = useState({});

    const handleTabClick = (program) => {
        setSelectedProgram(program);
        setRoadmap({});
    };

    const handleAddRoadmap = () => {
        setShowPopup(true);
    };

    const addRoadmapEntry = (term, year, semester, courseDetails) => {
        const key = `${term} ${year}`;  // "Fall 2024", "Spring 2028", etc.
        if (!roadmap[key]) {
            roadmap[key] = {};
        }
        if (!roadmap[key][semester]) {
            roadmap[key][semester] = [];
        }
        roadmap[key][semester].push(courseDetails);
        setRoadmap({ ...roadmap });
    };

    const renderProgramContent = () => {
        return (
            <>
                <div className="grid grid-cols-12 mt-10">
                    <div className="col-span-9">
                        <h2 className="text-2xl font-semibold text-primary-color">Semesters Roadmap</h2>
                    </div>
                    <div className="col-span-3 flex justify-end">
                        <button
                            className="px-6 py-3 bg-secondary-color rounded-xl text-white"
                            onClick={handleAddRoadmap}
                        >
                            Add Roadmap
                        </button>
                    </div>
                </div>

                {Object.keys(roadmap).map((termYear) => (
                    <div key={termYear} className='my-10 px-10 py-5 bg-gray-200'>
                        <h3 className="text-2xl font-bold mb-8 pb-4 pt-5 text-primary-color border-b-4 border-red-500">{termYear.charAt(0).toUpperCase() + termYear.slice(1)}</h3> {/* Display "Fall 2024", "Spring 2028" */}
                        {Object.keys(roadmap[termYear]).map((sem) => (
                            <RoadmapTable
                                key={sem}
                                semester={sem}
                                roadmap={roadmap[termYear][sem]}
                            />
                        ))}
                    </div>
                ))}
            </>
        );
    };

    return (
        <FlexContainer className="flex-col w-full px-16 pt-12">
            <div className="grid grid-cols-12">
                <div className='col-span-9 text-primary-color text-3xl font-bold'>
                    Programs Management
                </div>
            </div>

            {/* Top Navbar */}
            <div className="grid grid-cols-12 pt-6">
                <div className="col-span-12">
                    <nav className="flex space-x-8 text-primary-color text-xl font-semibold">
                        {['adp in computer science','bachelors in computer science', 'bachelors in software engineering', 'masters in computer science', 'phd in computer science'].map((program) => (
                            <span
                                key={program}
                                className={`hover:cursor-pointer ${selectedProgram === program ? 'border-b-4 pb-3 border-red-500' : ''}`}
                                onClick={() => handleTabClick(program)}
                            >
                                {program.toUpperCase()}
                            </span>
                        ))}
                    </nav>
                </div>
            </div>

            {renderProgramContent()}

            {showPopup && (
                <AddRoadmapPopup
                    selectedProgram={selectedProgram}
                    setShowPopup={setShowPopup}
                    addRoadmapEntry={addRoadmapEntry}
                />
            )}
            <div className='pb-2'></div>
        </FlexContainer>
    );
};

export default Programs;
 