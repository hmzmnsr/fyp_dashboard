import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../reducers/profile.reducer';
import systemReducer from '../reducers/system.reducer';
import galleryReducer from '../reducers/gallery.reducer';
import downloadReducer from '../reducers/download.reducer';
import facultyReducer from '../reducers/faculty.reducer';
import programsReducer from '../reducers/program.reducer';
import alumniReducer from '../reducers/alumni.reducer';


export const store = configureStore({
  reducer: {
    profile: profileReducer,
    system: systemReducer,
    gallery: galleryReducer,
    download: downloadReducer,
    faculty: facultyReducer,
    programs: programsReducer, 
    alumni: alumniReducer,
  },
});
