$(() => {
  const twitterIntentBaseURL = "https://twitter.com/intent/tweet?text=";
  const maxCharPerPost = 280; 
  
  $('#text-input-box').bind('input propertychange', function() {
    // this is the text entered by the user
    const text = this.value;
    var textFragments = splitTextAtPunctuationChars(text);
    // split very long fragments (user might not use punctuation) at whitespaces
    // coming soon
    // textFragments.map( el => {console.log(el); if(el.length > 50){el = el.split(/\s/g)}});
    // console.log(textFragments);

    // will store text-chunks of correct size
    var posts = new Array();
    $("#posts-list").empty();


    // split the long input text into multiple smaller chunks of tweet size
    let currPost = "";
    for(let i = 0; i < textFragments.length; i++) {
      if(currPost.length + textFragments[i].length < maxCharPerPost){
        currPost += textFragments[i];
      } else {
        posts.push(currPost);
        currPost = textFragments[i];
      }
    }
    posts.push(currPost);


    // write those chunks down in a list and add the handle for tweeting
    posts.forEach(element => {
      var curItem = $('<li>').loadTemplate("template/tweet.html", 
      {tweetMessage: element});
      
      $(curItem).find("#tweetButton").click(function(){
        console.log(element);
      })

      $(curItem).find("#copyButton").click(function(){
        console.log(element);
      })
      
      
      $("#posts-list")
        .append( curItem );
        /*  $('<li>', {text: element})
            .click(function(){
              // check the output text with developer tools to assert
              // everything running correctly
              console.log($(this).text());
              window.open(twitterIntentBaseURL + $(this).text());
            })
        ) */
        
    });

    $('#text-input-box').focus(); // focus input box
  })

  function splitTextAtPunctuationChars(text){
    return (""+text).split(/(\.|\?|\!)/g);
  }

})