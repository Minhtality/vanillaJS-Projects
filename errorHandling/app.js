try {
    myfunction();
} catch (err) {
    console.log(err.message)
} finally {
    console.log('this will run regardless')
}

console.log('program still continues') 