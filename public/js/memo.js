let cartmemos = [];
const $cartInput = document.querySelector('.cart-memo-input')
const $cartMemoList = document.querySelector('.cart-memo-list')
const $cartAllBtns = document.querySelector('.cart-all-btns')
const $cartAllRemove = document.querySelector('.cart-all-remove')

const fetchCartMemo = async () => {
  try{
    const res = await fetch('./cartmemos');
    cartmemos = await res.json();
    render();
  } catch (err) {
    console.error(`ERROR:${err}`)
  }
}

const render = async() => {
   let htmlMemos ='';
  try {
    // const data = await fetch('./cartmemos');
    // cartmemos =await data.json();
    cartmemos.forEach(({id,content,completed}) =>{
      htmlMemos = `<li>
    <input id="${id}" class="checkbox" type ="checkbox" ${completed ? 'checked' : ''}>
    <label for="${id}">${content}</label>
    <i class="remove">x</i>
    </li>`+htmlMemos
    })
  
    $cartMemoList.innerHTML = htmlMemos
  } catch(err){
    console.error(`[ERROR]:${err}`)
  }

}

window.onload = fetchCartMemo

const getnewMemoId = () => {
  return cartmemos.length ? Math.max(...cartmemos.map(cartmemo =>cartmemo.id.substring(9)))+1:1
} 
  

$cartInput.onkeyup = async (e) => {
  if(e.key !=='Enter' || !e.target.value) return;
  try{
    const content = $cartInput.value;  
    const newMemo = {id:`cart-item${getnewMemoId()}`, content, completed:false}
    const res = await fetch('./cartmemos',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(newMemo)
    })
    cartmemos = await res.json();
    render();
  } catch(err){
    console.error(`[ERROR],${err}`)
  }
  $cartInput.value = ''
}

$cartMemoList.onchange = async (e) => {
  const targetId = e.target.id;
  try {
    const res = await fetch (`./cartmemos/${targetId}`,{
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({completed:e.target.checked})
    });
    cartmemos = await res.json();
    render()
  } catch(err){
    console.error(`[ERROR]:${err}`)
  }

  
}


$cartAllBtns.onchange = async (e) => {
 try{
  const res = await fetch('/cartmemos');
  cartmemos = await res.json();
  cartmemos.forEach(({id}) => 
    fetch(`./cartmemos/${id}`,{
    method:'PATCH',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({completed:e.target.checked})
    })
  )
  render()
 } catch(err){
  console.error(`[ERROR]:${err}`)
 }
}

$cartMemoList.onclick = async (e) => {
  if(!e.target.matches('.cart-memo-list > li >i')) return;
  const targetId = e.target.parentNode.firstElementChild.id;
  try{
    const res = await fetch(`./cartmemos/${targetId}`,{method:'DELETE'})
    cartmemos = await res.json();
    render()
  } catch(err){
    console.error(`[ERROR]:${err}`)
  }
  // cartmemos = cartmemos.filter(({id})=> id !== targetId)
}

$cartAllRemove.onclick = async (e) => {
 
    // cartmemos = []
}

