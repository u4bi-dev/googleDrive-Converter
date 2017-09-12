onload = () => {

    const [ send, output, image, allRemove, todos ] = document.querySelectorAll('.box');
    
    send.focus();
    
    send.addEventListener('keyup', () => {

        if('https://drive.google.com/file/d/' !== send.value.substring(0,32)) return;
        
        output.value = `https://drive.google.com/uc?export=view&id=${ send.value.substring(32, 60) }`;
        view(output);

        send.value = '';
        
        let entry = document.createElement('p');        
        
        entry.innerHTML = `<input readOnly size="18" value="${ output.value }"><span> X </span>`;
        todos.appendChild(entry);

        entry.firstChild.addEventListener('click', (e) => view(entry.firstChild) );
        entry.lastChild.addEventListener('click', () => entry.lastChild.parentElement.parentElement.removeChild(entry.lastChild.parentElement));

    });

    allRemove.addEventListener('click', () => Object.keys(todos.children).map( (entry) => todos.removeChild(todos.children[0]) ) );

    const view = (element) => {
        element.focus();
        
        element.setSelectionRange(0 , element.value.length);
        image.style.backgroundImage = `url('${ element.value }`;        
    };

};