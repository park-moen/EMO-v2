# EMO - 이재료로 모해먹지?

> 패스트 캠퍼스 미니프로젝트로 진행한 사이트입니다.

![Screenshot 2020-11-29 at 21 12 44](https://user-images.githubusercontent.com/66991380/100541655-b8111380-3288-11eb-81d9-91cb6c3bed98.jpg)

![Screenshot 2020-11-29 at 21 12 55](https://user-images.githubusercontent.com/66991380/100541656-b9424080-3288-11eb-9ce8-0d4f499cfb83.jpg)

![Screenshot 2020-11-29 at 21 17 03](https://user-images.githubusercontent.com/66991380/100541659-b9424080-3288-11eb-94b5-7a4510b0313d.jpg)

![Screenshot 2020-11-29 at 21 17 46](https://user-images.githubusercontent.com/66991380/100541660-b9dad700-3288-11eb-9a0d-69320f4b1332.jpg)

![Screenshot 2020-11-29 at 21 18 16](https://user-images.githubusercontent.com/66991380/100541661-bb0c0400-3288-11eb-9cad-e8c9a3b30991.jpg)

![Screenshot 2020-11-29 at 21 19 51](https://user-images.githubusercontent.com/66991380/100541663-bba49a80-3288-11eb-9764-ae316c413f63.jpg)

![Screenshot 2020-11-29 at 21 18 39](https://user-images.githubusercontent.com/66991380/100541664-bc3d3100-3288-11eb-9961-df7e27ed7473.jpg)

![Screenshot 2020-11-29 at 21 19 17](https://user-images.githubusercontent.com/66991380/100541665-bcd5c780-3288-11eb-8a46-28b9604b3d93.jpg)

# 프로젝트 목표

> 1인 가구 증가에 따른 사용자의 냉장고 재료를 기반으로 레시피를 추천해주는 어플입니다.

# 서비스 기능

## 1. 로그인 페이지

- JSON 서버에서 회원 정보를 받아와 조건에 만족한다면 로그인을 진행한다.
- sessionStorage에 현재 로그인한 유저의 정보를 저장한다.

## 2. 회원가입 페이지

- 서버에 동일한 아이디 정보가 있는지 확인한다.
- 아이디는 특수 문자를 제외한 영문, 숫자 6 ~ 12자로 작성가능하게 한다.
- 동일한 비밀번호인지 확인한다.
- 입력 조건이 모두 맞다면 가입하기 버튼을 누를수 있게 한다.
- 입력한 정보를 JSON 서버에 저장한다.
- 회원가입이 완료되면 가입축하 popup을 띄운다.

## 3. 재료추가 페이지

- 아코디언 메뉴를 통해 카테고리와 그에따른 정보를 확인할수 있게한다.
- 사용자가 누른 정보를 기반으로 modal-popup 안에 담아준다.
- modal-popup 안에 정보가 이미 존재한다면 다시한번 눌럿을때 modal-popup 에서 제거한다.
- modal-popup 에 x버튼을 이용해 재료를 삭제할수있도록한다.
- modal-popup 전체삭제기능을 제공한다.
- 요리보기 페이지로 이동하면서 sessionStorage에 modal-popup 안에 data를 전달한다.
- 반응형 작업을통해 pad와 phone에 최적화된 비율을 제공한다.

## 4. 요리보기 페이지

- sessionStorage에 담긴 data를 기반으로 render한다.
- 어떠한 재료를 담았는지 확인할수있도록한다.
- sessionStorage에 담긴 재료를 바탕으로 db에서 데이터를 가져와 요리 가능한 레시피를 제공한다.
- 사용자에게 미리 요리의 난이도를 상,중,하 로 전달한다.
- 북마크 버튼을 누르면 즐겨찾기에 추가되었다는 팝업과 함께 로그인한 사용자에게 레시피에 할당된 db의 query를 전달한다.
- 뒤로가기 버튼을 이용해 재료추가 페이지로 이동할수 있게한다.
- 반응형 작업을통해 pad와 phone에 최적화된 비율을 제공한다.

## 5. 상세보기 페이지

- 요리보기 페이지에서 넘어온 query를 바탕으로 db에서 data를 받아와 render한다.
- sessionStorage에 담긴 data를 기반으로 부족한식재료와 있는식재료를 render한다.
- 추가적으로 필요한 식재료를 클릭하면 장보기 메모에 data를 전달한다.
- 사용자에게 레시피의 난이도를 제공한다.
- 북마크버튼을 누르면 sessionStorage에 query를 전달한다.
- 반응형 작업을통해 pad와 phone에 최적화된 비율을 제공한다.

## 6. 장보기메모 페이지

- 기존에 db에 있던 데이터를 가져와 render 한다.
- 내가 사야할 재료들을 기입할수있도록 한다.
- checkbox를 이용해 내가 무엇을 삿는지 확인할수 있도록한다.
- JSON 서버와 실시간으로 데이터를 주고받으며 데이터 추가, 선택데이터 삭제, 전체삭제, 전체선택기능을 제공한다.
- 반응형 작업을통해 pad와 phone에 최적화된 비율을 제공한다.

## 7. 오늘의요리 페이지

- 오늘의 요리버튼을 누르면 db를 기반으로 random하게 3개의 요리를 render해준다.
- content를 클릭하면 요리에따른 상세보기 페이지로 이동한다.
- db를 기반으로 사용자에게 상, 중, 하 난이도를 보여준다.
- 북마크 기능추가 구현예정
- 반응형 작업을통해 pad와 phone에 최적화된 비율을 제공한다.

## 8. 회원정보 페이지

- 로그인한 유저의 정보를 기반으로 닉네임을 render한다.
- 프로필이미지를 변경할수 있는 버튼 제공한다. - 3차구현필요
- 찜한레시피보기, 나의레시피추가, 나의게시물보기 등 - 3차구현필요
- 카테고리 버튼을 통한 탭메뉴를 제공한다.
- 반응형 작업을통해 pad와 phone에 최적화된 비율을 제공한다.

#개발기간

5일 (2020.11.16 월요일 ~ 2020.11.20 금요일)

# 팀원

- [정세영](https://github.com/Jeong-seyoung)- 기획, 디자인 memo, myinfo 페이지 구현
- [김재민](https://github.com/Kim-Jaemin420) - 기획, DATABASE cuisine, recommend 페이지 구현
- [박명재](https://github.com/park-moen) - 기획, DATABASE signup, recipe 페이지 구현
- [이영상](https://github.com/dunamisyoung) - 기획, 디자인 index, ingredient 페이지구현 github관리
