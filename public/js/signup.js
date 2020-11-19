// Reg
const signReg = /^$|[A-Za-z0-9]{6,12}$/g;
const nameReg = /^$|[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|*]{2,10}$/;

// DOMs
const $userId = document.querySelector('#user-id');
const $userPw = document.querySelector('#user-pw');
const $pwCheck = document.querySelector('#user-pw-check');
const $nickname = document.querySelector('#user-nickname');
const $idSame = document.querySelector('.alert-id');
const $idReg = document.querySelector('.alert-idReg');
const $pwReg = document.querySelector('.alert-pwReg');
const $pwSame = document.querySelector('.alert-pw');
const $nameReg = document.querySelector('.alert-name');
const $span = document.querySelectorAll('span');
const $signupBtn = document.querySelector('.sign-up');
const $form = document.querySelector('form');

const fetchUsers = async () => {
  const data = await fetch('/users');
  const users = await data.json();
  console.log(users);

  console.log(users.map(user => user.id));
  const userId = users.map(user => user.id);

  $userId.addEventListener('focusout', () => {
    if (signReg.test($userId.value)) {
      // $idReg.style.display = 'none';
      $idReg.classList.remove('block');
      if (userId.includes($userId.value)) {
        console.log($userId.value);

        // $idSame.style.display = 'block';
        $idSame.classList.add('block');
      } else if (userId.includes($userId) === false) {
        // $idSame.style.display = 'none';
        $idSame.classList.remove('block');
      }
    } else if (signReg.test($userId.value) === false) {
      // $idSame.style.display = 'none';
      $idSame.classList.remove('block');
      // $idReg.style.display = 'block';
      $idReg.classList.add('block');
    }
    console.log(userId);

    console.log(userId.includes($userId.value));
  });
};

window.onload = fetchUsers;

$userPw.addEventListener('focusout', () => {
  if (signReg.test($userPw.value)) {
    // $pwReg.style.display = 'none';
    $pwReg.classList.remove('block');
    console.log('none');

  } else if (signReg.test($userPw.value) === false) {
    // $pwReg.style.display = 'block';
    $pwReg.classList.add('block');
    console.log($userPw.value);

    console.log('block');
  }

});

$pwCheck.addEventListener('focusout', () => {
  if ($userPw.value === $pwCheck.value) {
    // $pwSame.style.display = 'none';
    $pwSame.classList.remove('block');
  } else if ($userPw.value !== $pwCheck.value) {
    // $pwSame.style.display = 'block';
    $pwSame.classList.add('block');
  }
  if (!$pwCheck.value) {
    console.log($pwCheck.value);

    // $pwSame.style.display = 'none';
    $pwSame.classList.remove('block');
  }
})

$nickname.addEventListener('keyup', () => {
  if (nameReg.test($nickname.value) === false) {
    console.log($nickname.value);

    // $nameReg.style.display = 'block';
    $nameReg.classList.add('block');
  } else if (nameReg.test($nickname.value) === true) {
    // $nameReg.style.display = 'none';
    $nameReg.classList.remove('block');
  }
});

// [...$span].forEach(span => {
//   if (span.classList.contains('block')) {
//     $signupBtn.setAttribute('disabled', 'disabled');
//     $signupBtn.setAttribute('disabled', false);
//   } else $signupBtn.setAttribute('disabled', false);
// })

$form.onsubmit = e => {
  e.preventDefault();
  let count = 0;
  [...$span].forEach(span => {
    if (span.classList.contains('block')) {
      ++count;
      if (count >= 1) {
        $signupBtn.setAttribute('disabled', 'disabled');
        // console.log($signupBtn.attributes);
        console.log('xxx');
        return;
      }
      if (count === 0) {
        $signupBtn.removeAttribute('disabled');
        // console.log($signupBtn.attributes);
        console.log('ooo');
      }
      window.location.assign('cuisine.html');
    }
  });
};
