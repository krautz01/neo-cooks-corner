const manageProfile = (
  name: string,
  description: string,
  photo: File | null
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const formdata = new FormData();
  if (photo != null) {
    formdata.append("photo", photo, "userPhoto");
  }

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
  };

  fetch(
    `http://165.227.147.154:8081/api/users?name=${name}&description=${description}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

};

export default manageProfile;
