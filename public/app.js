window.addEventListener('load', ()=>{
    console.log('Window loaded');
    let feed = document.getElementById('feed');

    //fetch all messages from server
    fetch('/messages')
    .then(response => response.json())
    .then(data => {
        //console.log(data);

        //add messages to html
        let messages = data.data;

        for(let i=0; i<messages.length; i++){
            console.log(messages[i]);
            let message = messages[i].message;
            let time = messages[i].time;

            let newMessage = document.createElement('p');
            let newMessageContent = `${time}:${message}`;
            newMessage.innerHTML = newMessageContent;
            feed.appendChild(newMessage);
        }
    })
    .catch(err =>{
        console.log(err);
    });


    //submit button
    let msgButton = document.getElementById('msg-submit');
    msgButton.addEventListener('click', ()=>{
        //console.log('clicked');

        let msgValue = document.getElementById('msg-input').value;
        console.log(msgValue);

        //create a post request
        let messageObject = {
            message: msgValue
        };

        //stringify
        let messageObjectJSON = JSON.stringify(messageObject);

        fetch('/new-message', {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: messageObjectJSON
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);

            //add new msg to feed
            let message = data.message.message;
            let time = data.message.time;
            let newMessage = document.createElement('p');
            let newMessageContent = `${time}: ${message}`;
            newMessage.innerHTML = newMessageContent;
            feed.appendChild(newMessage);
            feed.insertBefore(newMessage, feed.firstChild);
        })
        .catch(err =>{
            console.log(err);
        });
    });
})