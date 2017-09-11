onload = () => {

    const [ send, output, image ] = document.querySelectorAll('.box');
    
    send.focus();
    
    send.addEventListener('keyup', () => {

        if('https://drive.google.com/file/d/' !== send.value.substring(0,32)) return;
        
        output.value = `https://drive.google.com/uc?export=view&id=${ send.value.substring(32, 60) }`; 
        output.focus();
        output.setSelectionRange(0 , output.value.length);
        
        send.value = '';

        image.style.backgroundImage = `url('${ output.value }`;

    });
    
};