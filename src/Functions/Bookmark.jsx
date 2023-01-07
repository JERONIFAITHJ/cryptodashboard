const bookmark = (id) => {
  let arr = JSON.parse(localStorage.getItem('coinInfo')) || [];
  if (arr.length <= 0) {
    arr.push(id);
    localStorage.setItem('coinInfo', JSON.stringify(arr));
    alert('Added coin to your watchlist!');
    return;
  }
  else if(arr.filter(val => val == id).length > 0){
    alert('Coin already present!');
    return;
  }
  else{
    const newArr = [...arr, id];
    localStorage.setItem('coinInfo', JSON.stringify(newArr));
    alert('Added coin to your watchlist!')
    return;
  }
};

export default bookmark;