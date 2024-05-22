import { setDoctorData } from './setDoctorData';

export const loadDoctorAsync = (id) => (dispatch) =>
  fetch(`/api/doctors/${id}`)
    .then((doctorData) => doctorData.json())
    .then((doctorData) => {
      dispatch(setDoctorData(doctorData));
    });
