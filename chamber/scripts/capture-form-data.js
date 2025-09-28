const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);

console.log(myInfo.get('first'));
console.log(myInfo.get('last'));
console.log(myInfo.get('title'));
console.log(myInfo.get('email'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('organization'));
console.log(myInfo.get('description'));



//build the message
document.querySelector('#results').innerHTML = `
    <p>Application from <strong>${myInfo.get('first')} ${myInfo.get('last')}</strong></p>
    <p>The <strong>${myInfo.get('title')}</strong> of <strong>${myInfo.get('organization')}</strong></p>
    <p><strong>Phone:</strong> ${myInfo.get('phone')} </p>
    <p><strong>Email:</strong> ${myInfo.get('email')}</p>
    <p><strong>Business Description:</strong> ${myInfo.get('description')}</p>`