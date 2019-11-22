const dbSetup = require('./db-setup');
(async () => {

    const print = (message) => console.log('+++++++++++++++++++++++++++++++\n\x1b[36m%s\x1b[0m', message, '\n');
    
    await dbSetup.initDatabase();
    print('STEP 1: initializing complet 100%');

    process.exit();
})();


