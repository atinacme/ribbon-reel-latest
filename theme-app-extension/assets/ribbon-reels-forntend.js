const rlCheckbox = document.querySelector('.rl-content-wrap input[type="checkbox"]');
if(rlCheckbox){
    rlCheckbox.addEventListener('change',function(){
        const rlpStatus = rlCheckbox.checked;
        const rlGiftPVid = rlCheckbox.dataset.vid;
        console.log('rlGiftPVid ',rlGiftPVid);
        if(rlpStatus){
            document.querySelector('.rl-popup-main').classList.add('show');
            //document.querySelector('.rl-content-wrap').classList.add("rl-gift-added");
            //addGiftProductCreator(rlGiftPVid);
        }else{
            //document.querySelector('.rl-content-wrap').classList.remove("rl-gift-added");
            //removeGiftProductCreator(rlGiftPVid);
        }
    });
}

document.querySelector('.rl-hdtw').addEventListener('click',function(){
    document.querySelector('.rl-popup-main').classList.add('active-hdtw');
});
document.querySelector('.rl-back-btn').addEventListener('click',function(){
    document.querySelector('.rl-popup-main').classList.remove('active-hdtw');
});
document.querySelector('.rl-close-popup').addEventListener('click',function(){
    document.querySelector('.rl-popup-main').classList.remove('show');
    document.querySelector('.rl-popup-main').classList.remove('active-hdtw');
    rlCheckbox.checked = false;
});

function addGiftProductCreator(vid){
    let formData = {
        'items': [{'id': vid, 'quantity': 1}]
       };
       
       fetch(window.Shopify.routes.root + 'cart/add.js', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(formData)
       })
       .then(response => {return response.json();})
       .catch((error) => {console.error('Error:', error);});       
}

function removeGiftProductCreator(vid){
    fetch("/cart.json")
    .then((cartResponse) => cartResponse.json())
    .then((cartJson) => {
      const cartItems = cartJson.items;
      const vpIndex = cartItems.findIndex((item,index) => item.id == vid) + 1;
      console.log('vpIndex ',vpIndex);

      let formData = {'line': vpIndex,'quantity': 0};
      fetch(window.Shopify.routes.root + 'cart/change.js', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData) })
      .then(response => {return response.json();})
      .catch((error) => {console.error('Error:', error);});
    });       
}