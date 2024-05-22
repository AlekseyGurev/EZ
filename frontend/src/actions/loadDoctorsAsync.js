import { setDoctorsData } from './setDoctorsData';

export const loadDoctorsAsync = () => (dispatch) =>
  fetch(`/api/doctors`)
    .then((doctorsData) => doctorsData.json())
    .then((doctorsData) => {
      dispatch(setDoctorsData(doctorsData));
    });
