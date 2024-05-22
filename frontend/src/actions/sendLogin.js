export const sendLogin = (data) =>
  fetch(`/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((data) => data.json())
    .then((data) => data);
