const readline = require('readline-sync')


async function getMessage(name, lang) {
    const res = await fetch(`http://localhost:3000/greet?name=${name}&lang=${lang}`)
    const data = await res.json()
    console.log(data);
}


async function postMessage(numList) {
    const res = await fetch(`http://localhost:3000/math/average`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({numbers: numList})
    })
    const data = await res.json()
    console.log(data);
}

async function put(word) {
    const res = await fetch(`http://localhost:3000/shout/${word}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({word: word})
    })
    const data = await res.json()
    console.log(data);
}


async function deleteSome() {
    const res = await fetch(`http://localhost:3000/secure/resource`, {
        method: 'DELETE',
        headers: {
            "x-role": 'admin'
        }
    })
    const data = await res.json()
    console.log(data);
}

async function doAll(name, lang, numList, word, username, password) {
    await getMessage(name)
    await postMessage(numList)
    await put(word)
    if (username === 'admin' && password === '1234'){
        await deleteSome()
    } else {
        console.log('you are not admin');
    }
}


async function doAllSameTime(name, lang, numList, word, username, password){
    const [resGet, resPost, resPut, resDelete] = await Promise.all([
        fetch(`http://localhost:3000/greet?name=${name}&lang=${lang}`).then(res => res.json()),
        fetch(`http://localhost:3000/math/average`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({numbers: numList})
        }).then(res => res.json()),
        fetch(`http://localhost:3000/shout/${word}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({word: word})
        }).then(res => res.json()),
    fetch(`http://localhost:3000/secure/resource`, {
        method: 'DELETE',
        headers: {
            "x-role": 'admin'
        }
    }).then(res => res.json())
    ])
    console.log(resGet);
    console.log(resPost);
    console.log(resPut);
    console.log(resDelete);
}
function readlines() {
    let name = readline.question("what is your name? ")
    let lang = readline.question("what is the lang you want to get the data? ")
    let flags = true
    let listNumber = []
    while (flags) {
        let numbers = readline.question("print the number or 0 for finish your list: ")
        if (numbers === "0") {
            flags = false
        } else {
            listNumber.push(Number(numbers))
        }
    }
    let word = readline.question("print the word: ")
    let username = readline.question("what is your username? ")
    let password = readline.question("what is your password? ")
    return [name, lang, listNumber, word, username, password]
}


module.exports = {getMessage, postMessage, put, deleteSome, doAll, doAllSameTime, readlines}
