//followed codewars for the server.js 

const name = document.querySelector('#result')
//add event listener for click
document.querySelector('#clickMe').addEventListener('click', getPalindrome)


//fetch
function getPalindrome(){
  const userInput = document.querySelector('input').value
  const url = `/userInput`
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    }, method: 'POST', body: JSON.stringify({userInput: userInput})
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      result.textContent = data.result

    document.querySelector('#result').textContent = data.result
  })
}



//mongodb+srv://yorelisacodes:<password>@cluster1.dwnw520.mongodb.net/?retryWrites=true&w=majority