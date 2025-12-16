const readline = require('readline-sync')
const command = require('./appFunc.js')

async function menu() {
    let admin = {
        username: "admin",
        password: "1234"
    }
    let flag = true
    while (flag) {
        console.log(`__________MENU__________
choose one option:
1. get data about your name
2. post list of numbers and get the data about it
3. put word and get the data about the word
4. delete something if you are admin
5. do all 4 option
6. do all option first do the methods and after get the data
0. Exit
_____________________________________________________________
`);
            let name;
            let lang;
            let listNumber;
            let word;
            let username;
            let password;
            let numbers;
            let parameters;
            const choose = readline.question("what is your choose? ")

            switch (Number(choose)) {
                case 1:
                    name = readline.question("what is your name? ")
                    lang = readline.question("what is the lang you want to get the data? ")
                    await command.getMessage(name, lang)
                    break;

                case 2:
                    let flags = true
                    listNumber = []
                    while (flags) {
                        numbers = readline.question("print the number or 0 for finish your list: ")
                        if (numbers === "0") {
                            flags = false
                        } else {
                            listNumber.push(Number(numbers))
                        }
                    }
                    await command.postMessage(listNumber)
                    break

                case 3:
                    word = readline.question("print the word: ")
                    await command.put(word)
                    break

                case 4:
                    username = readline.question("what is your username? ")
                    password = readline.question("what is your password? ")
                    if (username === admin.username && password === admin.password) {
                        await command.deleteSome()
                    } else {
                        console.log('you are not admin');
                    }
                    break

                case 5:
                    parameters = command.readlines()
                    await command.doAll(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5])
                    break

                case 6:
                    parameters = command.readlines()
                    await command.doAllSameTime(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5])
                    break

                case 0:
                    flag = false
            }
        
    }
}

module.exports = {menu}