import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../reducers/profile.reducer';
import systemReducer from '../reducers/system.reducer';
import bscsReducer from '../reducers/bscs.reducer';
import bsseReducer from '../reducers/bsse.reducer';
import phdcsReducer from '../reducers/phdcs.reducer';
import mscsReducer from '../reducers/mscs.reducer';
import adpcsReducer from '../reducers/adpcs.reducer';
import galleryReducer from '../reducers/gallery.reducer';
import downloadReducer from '../reducers/download.reducer';
import facultyReducer from '../reducers/faculty.reducer';
import alumniReducer from '../reducers/alumni.reducer';
import eventReducer from '../reducers/event.reducer';



export const store = configureStore({
  reducer: {
    profile: profileReducer,
    system: systemReducer,
    bscs: bscsReducer,
    bsse: bsseReducer,
    phdcs: phdcsReducer,
    adpcs: adpcsReducer,
    mscs: mscsReducer,
    gallery: galleryReducer,
    download: downloadReducer,
    faculty: facultyReducer,
    alumni: alumniReducer,
    event: eventReducer,

  },
});
