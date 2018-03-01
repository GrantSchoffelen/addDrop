// TODO:
//2. mutiple classes
//3. add notification
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    conf = require('./config.js')
    counter = 0;


var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();


    driver.get(conf.url);
    driver.findElement(By.id('98menuBarItem')).click();
    driver.wait(until.elementLocated(By.name('username')), 5 * 1000).then(el => {
        return el.sendKeys(conf.username);
    });
    driver.wait(until.elementLocated(By.name('password')), 5 * 1000).then(el => {
        return el.sendKeys(conf.password);
    });

    driver.findElement(By.name('submit')).click();
    driver.wait(until.elementLocated(By.id('60menuBarItem')), 10 * 1000).then(el => {
        return el.click();
    });
    driver.wait(until.elementLocated(By.id('387subMenuBarItem')), 10 * 1000).then(el => {
        return el.click();
    })
    driver.wait(until.elementLocated(By.name('pageSizeSelect')), 10 * 1000).then(el => {
        el.click();
        return el.findElement(webdriver.By.css("option[value='4']")).click()
    }).then(function(){
        checkForAddButton()
    })

function checkForAddButton(){
    driver.wait(until.elementLocated(By.css("a[id*='29618']")), 4 * 1000).then(el =>{
        console.log('class found')
        return el.click().then(function(){
            console.log('class added')
            driver.switchTo().alert().accept().then(function(){
                driver.quit();
            })
        })
    }).catch( err => {
        driver.navigate().refresh().then(function(){
            driver.switchTo().alert().accept().then(function(){
                counter +=1
                console.log('Class not found: Attempts ' + counter);
                checkForAddButton();
            })
        });
    })
    // driver.wait(until.elementLocated(By.css("a[href*='8345']")), 10 * 1000).then(el =>{
    //     console.log('add button located')
    // })
    // if(true){
    //
    // } else{
    //     driver.navigate().refresh().then(function(){
    //         checkForAddButton()
    //     })
    // }
}


driver.quit();
