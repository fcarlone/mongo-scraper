console.log('save.js')
// Grab saved articles as JSON
$.getJSON("/saves", function (data) {
  data.forEach((article) => {
    console.log('saved article', article)
    $("#saved-article").append(
      `<h3 data-id="${article._id}"> ${article.headline}
       <button type="button" class="btn btn-note btn-warning" article-id="${article._id}">Article Notes</button>
       <button type="button" class="btn btn-delete btn-danger" article-id="${article._id}">Delete Article</button>
       <h5> ${article.summary} 
       <a href="http://www.nytimes.com${article.link}" target="_blank">View Article</a>`
    )
  });
});

// Handle delete article on-click event
$(document).on("click", ".btn-delete", function () {
  console.log("delete button clicked")
  // Get article id
  let articleId = $(this).attr("article-id")
  console.log("Article ID", articleId)

  $.get(`/delete/${articleId}`)
    .then(function (article) {
      console.log('article deleted', article)
    });
});


// Handle add note on-clicke event
$(document).on("click", ".btn-note", function () {
  console.log("add note clicked")

  // Get article id
  let articleId = $(this).attr("article-id")
  console.log("Article ID", articleId)

  $.get(`/articles/${articleId}`)
    .then(function (article) {
      console.log('article note', article)
    });
});
