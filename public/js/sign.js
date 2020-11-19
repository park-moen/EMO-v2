const $form = document.querySelector('form');
const $userId = document.querySelector('#user-id');
const $userPw = document.querySelector('#user-pw');
const $userPwCheck = document.querySelector('#user-pw-check');
const $userNickname = document.querySelector('#user-nickname');
const $alertId = document.querySelector('.alert-id');
const $alertPw = document.querySelector('.alert-pw');
const $alertName = document.querySelector('.alert-name');
const $idReg = document.querySelector('.alert-idReg');
const $pwReg = document.querySelector('.alert-pwReg');
const $signUp = document.querySelector('.sign-up');

$form.onsubmit = (() => {
  const validationStatus = {
    id: false,
    idDb: false,
    pw: false,
    pwCheck: false,
    nickname: false,
    get valid() {
      return this.id && this.idDb && this.pw && this.pwCheck && this.nickname;
    }
  };

  $userId.oninput = (() => {
    const signReg = /^[A-Za-z0-9]{6,12}$/;
    return _.debounce(({ target }) => {
      const getFetch = async () => {
        const data = await fetch('/users');
        const users = await data.json();
        const usersId = users.map(user => user.id);
        const valid = signReg.test(target.value);
        const valid2 = !usersId.includes(target.value);

        if (!valid) {
          $idReg.classList.add('block');
          $alertId.classList.remove('block');
        }
        if (valid && !valid2) {
          $alertId.classList.remove('block');
          $idReg.classList.add('block');
        }
        console.log(valid);

        validationStatus.id = valid;
        $signUp.disabled = !validationStatus.valid;
        console.log(validationStatus);

        if (usersId.includes(target.value)) {
          $alertId.classList.add('block');
          $idReg.classList.remove('block');
        }
        if (!usersId.includes(target.value) && valid) {
          $alertId.classList.remove('block');
          $idReg.classList.remove('block');
        }


        validationStatus.idDb = valid2;
        $signUp.disabled = !validationStatus.valid2;
        console.log(validationStatus);
      };
      getFetch();

    }, 100);
  })();


  $userPw.oninput = (() => {
    const signReg = /^[A-Za-z0-9]{6,12}$/;
    // const valid = target.value.length > 5;

    return _.debounce(({ target }) => {
      const valid = signReg.test(target.value);

      if (validationStatus.pw === valid) {
        $pwReg.classList.add('block');
      }
      if (validationStatus.pw !== valid) {
        $pwReg.classList.remove('block');
      }


      validationStatus.pw = valid;
      console.log(validationStatus);

      $signUp.disabled = !validationStatus.valid;
    }, 300);
  })();

  $userPwCheck.oninput = (() => _.debounce(({ target }) => {
    const valid = $userPw.value === target.value ? true : false;
    if ($userPw.value !== target.value) {
      $alertPw.classList.add('block');

    }
    if ($userPw.value === target.value) {
      $alertPw.classList.remove('block');

    }

    validationStatus.pwCheck = valid;
    $signUp.disabled = !validationStatus.valid;
    console.log(validationStatus);

  }, 100))();

  $userNickname.oninput = (() => {
    const nameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{1,10}$/;

    return _.debounce(({ target }) => {
      const valid = nameReg.test(target.value);
      if (validationStatus.nickname !== valid) {
        $alertName.classList.add('block');
      }
      if (validationStatus.nickname === valid) {
        $alertName.classList.remove('block');
      }
      validationStatus.nickname = valid;
      $signUp.disabled = !validationStatus.valid;
      console.log(validationStatus);
    }, 100);
  })();

  $signUp.onclick = () => {
    alert('hi');
  };

  return async e => {
    e.preventDefault();
    const res = await fetch('/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      // eslint-disable-next-line max-len
      body: JSON.stringify({ id: $userId.value, password: $userPw.value, nickname: $userNickname.value })
    });
  };
})();
