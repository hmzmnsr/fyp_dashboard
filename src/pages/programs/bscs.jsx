import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexContainer from '../../components/containers/flex.container';
import BSCSPopup from "../../components/popups/bscspopup";
import BSCSTable from "../../components/tables/bscs.table";
import { fetchAllBSCS, deleteBSCS } from "../../redux/actions/bscs.action"; // Updated to import deleteBSCS action

const BSCS = () => {
    const dispatch = useDispatch();
    const [roadmap, setRoadmap] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [error, setError] = useState(null);

    const bscsData = useSelector((state) => state.bscsData); // Replace with the correct state slice

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(fetchAllBSCS()); // Dispatching the action
                // Ensure response is a fulfilled action
                if (response.type === 'bscs/fetchAll/fulfilled') {
                    const roadmapData = response.payload.reduce((acc, entry) => {
                        const key = `${entry.term} ${entry.year}`;
                        if (!acc[key]) {
                            acc[key] = {};
                        }
                        if (!acc[key][entry.semester]) {
                            acc[key][entry.semester] = [];
                        }
                        acc[key][entry.semester] = entry.courses;
                        return acc;
                    }, {});
                    setRoadmap(roadmapData);
                } else {
                    setError("Failed to load roadmap data.");
                }
            } catch (error) {
                console.error("Error fetching roadmap data", error);
                setError("Error fetching roadmap data.");
            }
        };

        fetchData();
    }, [dispatch]); // Added dispatch as a dependency

    const handleAddRoadmap = () => {
        setShowPopup(true);
    };

    const addRoadmapEntry = (term, year, semester, courseDetails) => {
        const key = `${term} ${year}`;
        if (!roadmap[key]) {
            roadmap[key] = {};
        }
        if (!roadmap[key][semester]) {
            roadmap[key][semester] = [];
        }
        if (editingCourse) {
            const updatedSemester = roadmap[key][semester].map(course =>
                course._id === editingCourse._id ? courseDetails : course
            );
            roadmap[key][semester] = updatedSemester;
            setEditingCourse(null);
        } else {
            roadmap[key][semester].push(courseDetails);
        }
        setRoadmap({ ...roadmap });
        setShowPopup(false);
    };

    const handleEditCourse = (termYear, semester, course) => {
        setEditingCourse(course);
        setShowPopup(true);
    };

    const handleDeleteCourse = async (termYear, semester, course) => {
        // Optimistically update the UI
        const updatedCourses = roadmap[termYear][semester].filter(c => c._id !== course._id);
        
        // Update the roadmap state immediately
        setRoadmap(prevRoadmap => ({
            ...prevRoadmap,
            [termYear]: {
                ...prevRoadmap[termYear],
                [semester]: updatedCourses,
            },
        }));

        // Dispatch the delete action
        try {
            await dispatch(deleteBSCS(course._id)); // Use deleteBSCS action
        } catch (error) {
            console.error("Failed to delete course:", error);
            setError("Failed to delete course.");
            // Optionally, revert the optimistic UI update here if needed
        }
    };

    const renderRoadmapContent = () => {
        return (
            <>
                {Object.keys(roadmap).length === 0 ? (
                    <div className="text-center py-4">No roadmap data available</div>
                ) : (
                    Object.keys(roadmap).map((termYear) => (
                        <div key={termYear} className='my-10 px-10 py-5 bg-gray-200'>
                            <h3 className="text-2xl font-bold mb-8 pb-4 pt-5 text-primary-color border-b-4 border-red-500">{termYear.charAt(0).toUpperCase() + termYear.slice(1)}</h3>
                            {Object.keys(roadmap[termYear]).map((sem) => (
                                <BSCSTable
                                    key={sem}
                                    semester={sem}
                                    roadmap={roadmap[termYear][sem]}
                                    onEdit={(course) => handleEditCourse(termYear, sem, course)}
                                    onDelete={(course) => handleDeleteCourse(termYear, sem, course)}
                                />
                            ))}
                        </div>
                    ))
                )}
            </>
        );
    };

    return (
        <FlexContainer className="flex-col w-full">
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

            {error && <div className="text-red-500 text-center">{error}</div>}

            {renderRoadmapContent()}

            {showPopup && (
                <BSCSPopup
                    setShowPopup={setShowPopup}
                    addRoadmapEntry={addRoadmapEntry}
                    editingCourse={editingCourse}
                />
            )}
            <div className='pb-2'></div>
        </FlexContainer>
    );
};

export default BSCS;
