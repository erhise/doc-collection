const copyToClipboard = str => {
    // create a textarea element
    const el = document.createElement('textarea');

    // set its value to string and make it "invisible"
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';

    // append the textarea element to the document
    document.appendChild(el);

    // check if there is any previously selection
    const selected = document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();

    // copy and remove the textarea element (only works aligned with user input)
    document.execCommand('copy');
    document.body.removeChild(el);

    // restore the original selection if existed
    if (selected !== false) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
}

export default copyToClipboard;
