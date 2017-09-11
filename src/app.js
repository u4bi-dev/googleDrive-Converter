onload = () => {

    const [ send, output, image ] = document.querySelectorAll('.box');
    
    send.focus();
    
    send.addEventListener('keyup', (e) => {

        output.value = 'https://drive.google.com/uc?export=view&id='+e.target.value.substring(32, 60);
        output.focus();
        output.setSelectionRange(0 , output.value.length);
        send.value = '';

        image.style.backgroundImage = `url('${ output.value }`;

    });
    
};