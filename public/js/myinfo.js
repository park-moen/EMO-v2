const $myInfoCategory = document.querySelector('.my-info-category') 

$myInfoCategory.onclick = (e) => {
  if(e.target.matches('#tab1,#tab2,#tab3')){
    document.querySelectorAll('.tab').forEach($tab => {
      $tab.classList.toggle('active', e.target.id=== $tab.classList[1] )
    })
    // e.target.nextElementSibling.classList.add('active');
  }
}