const $idInput = document.getElementById('idInput');
const $pwInput = document.getElementById('pwInput');
const $joinBtn = document.querySelector('.joinBtn');
const $submitBtn = document.querySelector('.submitBtn');
const $loginForm = document.querySelector('.login-form');
const $checkInput = document.querySelector('label[for="checkInput"]');
const $intro = document.querySelector('.intro');

const fetchUsers = async () => {
  try {
    const res = await fetch('/users');
    const userChecks = await res.json();

    $loginForm.onkeyup = (e) => {
      if (e.key !== 'Enter' || $idInput.value === '') return;
      Checksusers();
    };

    $idInput.addEventListener('focusout', (e) => {
      if ($idInput.value === '') {
        $checkInput.textContent = '아이디를 입력해주세요';
        $checkInput.style.display = 'block';
        $idInput.focus();
        return;
      }
    });

    $pwInput.addEventListener('focusout', (e) => {
      if ($pwInput.value === '') {
        $checkInput.textContent = '비밀번호를 입력해주세요';
        $checkInput.style.display = 'block';
        // $pwInput.focus();
        return;
      }
    });

    // console.log(!$idInput.value);
    // if (!$idInput.value) {
    // }

    $idInput.onkeyup = (e) => {
      if (!$idInput.value) return;
      $checkInput.textContent = '';
      if ($idInput.value.length === 0) {
        $checkInput.textContent = '비밀번호를 입력해주세요';
      }
    };

    $pwInput.onkeyup = (e) => {
      if (!$pwInput.value) return;
      $checkInput.textContent = '';
      if ($pwInput.value.length === 0) {
        $checkInput.textContent = '비밀번호를 입력해주세요';
      }
    };

    $submitBtn.onclick = (e) => {
      if (!e.target.matches('.btn-wrap > .submitBtn')) return;
      Checksusers();
    };

    const Checksusers = () => {
      const newitem = [...userChecks].find(({ id, password }) => {
        return id === $idInput.value && password === $pwInput.value;
      });
      if (newitem) {
        sessionStorage.setItem(
          'login',
          JSON.stringify({ id: newitem.id, password: newitem.password, nickName: newitem.nickName })
        );
        window.location.assign('/ingredient.html');
      } else {
        $checkInput.textContent = '아이디/비밀번호를 확인해주세요';
        document.querySelector('label[for="checkInput"]').style.display = 'block';
      }
    };
  } catch (e) {
    console.error(e);
  }
};

window.onload = fetchUsers;

// form초기화
$loginForm.onsubmit = (e) => {
  e.preventDefault();
};

$intro.classList.add('play');
