import { ACTION_TYPE } from '../actions';

const initialDoctorState = [];

export const doctorReducer = (state = initialDoctorState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_DOCTOR_DATA:
      return { ...state, ...action.payload };
    case ACTION_TYPE.UPDATE_DOCTOR_DATA:
      return {
        ...state,
        doctor: {
          ...state.doctor,
          title: action.payload.title,
        },
      };

    case ACTION_TYPE.SET_SPECIALIST_DATA:
      console.log(action.payload);
      return {
        ...state,
        doctor: {
          ...state.doctor,
          specialists: [...state.doctor.specialists, action.payload],
        },
      };
    case ACTION_TYPE.UPDATE_SPECIALIST_DATA:
      console.log(action.payload);
      return {
        ...state,
        doctor: {
          ...state.doctor,
          specialists: state.doctor.specialists.map((specialist) =>
            specialist._id === action.payload._id ? action.payload : specialist
          ),
        },
      };
    case ACTION_TYPE.DEL_SPECIALIST_DATA:
      console.log(action.payload);
      return {
        ...state,
        doctor: {
          ...state.doctor,
          specialists: state.doctor.specialists.filter(
            (specialist) => specialist._id != action.payload
          ),
        },
      };
    default:
      return state;
  }
};
