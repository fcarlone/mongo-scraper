// Grab the articles as a json
$.getJSON("/articles", function (data) {
  data.forEach((article) => {
    console.log('article list', article)
    $("#article").append(
      `<h3 data-id="${article._id}"> ${article.headline}
       <button type="button" class="btn btn-success" article-id="${article._id}">Save Article</button>
       <h5> ${article.summary} 
       <a href="http://www.nytimes.com${article.link}" target="_blank">View Article</a>`
    )
  })
});

// Handle save article on-click event
$(document).on("click", "button", function () {
  console.log('save article button')

  // Get article id
  let articleId = $(this).attr("article-id")
  console.log("Article ID", articleId)

  // Grab article to be saved
  $.get(`/articles/${articleId}`)
    .then(function (dbArticle) {
      console.log('Article to be saved', dbArticle)
    });

});
