// Grab the articles as a json
$.getJSON("/articles", function (data) {
  data.forEach((article) => {
    console.log('article list', article)
    $("#article").append(
      `<h2> ${article.headline}
       <h3> ${article.summary} 
       <a href="http://www.nytimes.com${article.link}" target="_blank">View Article</a>`
    )
  })
});
