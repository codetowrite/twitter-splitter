$(() => {
  const twitterIntentBaseURL = "https://twitter.com/intent/tweet?text=";
  const maxCharPerPost = 280; 

  $('#text-input-box').bind('input propertychange', function() {
    // this is the text entered by the user
    const text = this.value;
    // will store text-chunks of correct size
    var posts = new Array();
    $("#posts-list").empty();

    // split the long input text into multiple smaller chunks of tweet size
    for(let i = 0; i < text.length; i += maxCharPerPost) {
      posts.push(text.slice(i, i + maxCharPerPost));
    }

    // write those chunks down in a list and add the handle for tweeting
    posts.forEach(element => {
      $("#posts-list")
        .append( 
          $('<li>', {text: element})
            .click(function(){
              // check the output text with developer tools to assert
              // everything running correctly
              console.log($(this).text());
              window.open(twitterIntentBaseURL + $(this).text());
            })
        ) 
      });

  })

  $('#text-input-box').focus() // focus input box
})
