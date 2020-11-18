let cartmemos = [];
const $cartInput = document.querySelector('.cart-memo-input')
const $cartMemoList = document.querySelector('.cart-memo-list')
const $cartAllBtns = document.querySelector('.cart-all-btns')
const $cartAllRemove = document.querySelector('.cart-all-remove')

const fetchCartMemo = async() => {
  try{
    const res = await fetch('./cartmemos');
    cartmemos = await res.json();
    render();
  } catch (err) {
    console.error(`ERROR:${err}`)
  }
}

const render = () => {
   let htmlMemos =''
  cartmemos.forEach(({id,content,completed}) =>{
    htmlMemos = `<li>
  <input id="${id}" class="checkbox" type ="checkbox" ${completed ? 'checked' : ''}>
  <label for="${id}">${content}</label>
  <i class="remove">x</i>
  </li>`+htmlMemos
  })

  $cartMemoList.innerHTML = htmlMemos
}

window.onload = fetchCartMemo

const getnewMemoId = () => {
  return cartmemos.length ? Math.max(...cartmemos.map(cartmemo =>cartmemo.id.substring(9)))+1:1
} 
  

$cartInput.onkeypress = (e) => {
  if(e.key !=='Enter' || !e.target.value) return;
  const content = $cartInput.value  
  const newMemo = {id:`cart-item${getnewMemoId()}`, content, completed:false}
  cartmemos =[...cartmemos,newMemo]
  render();
  $cartInput.value = ''
}

$cartMemoList.onchange = (e) => {
  const inputId = e.target.id;
  cartmemos = cartmemos.map(cartmemo => {
  return cartmemo.id === inputId ? ({...cartmemo,completed:e.target.checked}):cartmemo })
  render()
}



$cartMemoList.onclick = (e) => {
  if(!e.target.matches('.cart-memo-list > li >i')) return;
  const targetId = e.target.parentNode.firstElementChild.id;
  console.log(targetId)
  cartmemos = cartmemos.filter(({id})=> id !== targetId)
  render()
}


$cartAllBtns.onchange = (e) => {
  cartmemos = cartmemos.map(cartmemo=> ({...cartmemo ,completed:e.target.checked}))
  render();
}


$cartAllRemove.onclick = (e) => {
cartmemos = []
render()
}

