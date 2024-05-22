import { ACTION_TYPE } from '../actions';

const initialDoctorsState = {};

export const doctorsReducer = (state = initialDoctorsState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_DOCTORS_DATA:
      return { ...state, ...action.payload };
    case ACTION_TYPE.DELETE_DOCTOR_DATA:
      return {
        ...state,
        doctors: state.doctors.filter((doctor) => doctor._id != action.payload),
      };
    case ACTION_TYPE.UPDATE_DOCTORS_DATA:
      return { ...state, doctors: [...state.doctors, action.payload] };
    default:
      return state;
  }
};
