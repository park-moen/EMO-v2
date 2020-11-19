let users = '';

const $myName = document.querySelector('.my-name');

const fetchUsers = async () => {
  try {
    const res = await fetch(`/users/${id}`);
    users = await res.json();
    render()
  } catch (err) {
    console.error(err);
  }
}

const render = () => {
  $myName.textContent = users.nickName;
}

window.onload = fetchUsers;