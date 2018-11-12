$(() => {
  const twitterIntentBaseURL = "https://twitter.com/intent/tweet?text=";
  const maxCharPerPost = 280; 

  $('#text-input-box').bind('input propertychange', function() {
    const text = this.value;
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
              console.log($(this).text());
              window.open(twitterIntentBaseURL + $(this).text());
            })
        ) 
      });

  })

  $('#text-input-box').focus() // focus input box
})
