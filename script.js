let log = new Log(document.querySelector('.log'));

let char = new Knight('Geovani');
let monster = new BigMonster();

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log 
);


stage.start();