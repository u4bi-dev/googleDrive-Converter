onload = () => {

    const db = low(new LocalStorage('db')).defaults({ list : [] }),
          link = db.get('list'),
          [ send, output, image, allRemove, todos ] = document.querySelectorAll('.box');


    link.value().map( (item) => load(item.uuid, item.uri) );
    
    send.focus();
    send.addEventListener('keyup', () => {

        if('https://drive.google.com/file/d/' !== send.value.substring(0,32)) return;
        
        let uuid = uuidv4(),
            uri = send.value.substring(32, 60);

        link.push({ uuid : uuid, uri : uri }).write();        
        load(uuid, uri);
        
        output.value = `https://drive.google.com/uc?export=view&id=${ uri }`;
        view(output);

        send.value = '';
    });

    allRemove.addEventListener('click', () => {
        link.remove().write();
        Object.keys(todos.children).map( (entry) => todos.removeChild(todos.children[0]) )
    });

    const view = (element) => {
        element.focus();
        
        element.setSelectionRange(0 , element.value.length);
        image.style.backgroundImage = `url('${ element.value }`;        
    };

    const uuidv4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    function load(uuid, uri) {
        let entry = document.createElement('p');        
        
        entry.innerHTML = `<input readOnly size="18" value="https://drive.google.com/uc?export=view&id=${ uri }"><span> X </span>`;
        entry.lastChild.dataset.uuid = uuid;
        
        todos.appendChild(entry);

        entry.firstChild.addEventListener('click', (e) => view(entry.firstChild) );
        entry.lastChild.addEventListener('click', () => {
            link.remove( { 'uuid' : entry.lastChild.dataset.uuid } ).write();
            entry.lastChild.parentElement.parentElement.removeChild(entry.lastChild.parentElement);            
        });

    };

};