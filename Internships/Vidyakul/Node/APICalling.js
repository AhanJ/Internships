const axios = require('axios')

axios.get('https://catfact.ninja/fact').then(function (response) { // Method 1
    
    console.log("Fact 1: " + response.data.fact)

  }).catch(function (error) {
    
    console.log(error)

})

const getFact2 = async () => {
    
    const apiResponse = await axios.get('https://catfact.ninja/fact') // Method 2
    console.log('Fact 2: '+ apiResponse.data.fact);
  }

getFact2()

const getFact3 = async () => { // Method 3
    
    const apiResponse = await axios({
        
        method: 'GET',
        url: 'https://catfact.ninja/fact'
    })
    
    console.log('Fact 3: '+ apiResponse.data.fact);
  }

getFact3()

// here the order of facts is random since we are using asynchronous functions since all such functions work indepnedent
// of each other and their results are used as and when available