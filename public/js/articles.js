
// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // Display modal with article count
  $(".modal-body").html(`<h4>Mongo Scraper</h4>
  <h4>scraped ${data.length} articles</h4>`)

  data.forEach((article) => {
    console.log('article list', article)
    $("#article").append(
      `<div class="article-container">
        <div class="artilcle-headline">
        <h3 "data-id="${article._id}"> ${article.headline}
        <button type="button" class="btn btn-save btn-success float-right" article-id="${article._id}" data-toggle="modal" data-target="#exampleModal">Save Article</button>
        </div>
        <div class="article-summary">
        <h5> ${article.summary} </h5>
        <a href="http://www.nytimes.com${article.link}" target="_blank">View Article</a>
        </div>
       </div>`
    )
  })
});

// Handle save article on-click event
$(document).on("click", ".btn-save", function () {
  console.log('save article button')

  // Get article id
  let articleId = $(this).attr("article-id")
  console.log("Article ID", articleId)

  // Grab article to be saved
  $.get(`/articles/${articleId}`)
    .then(function (dbArticle) {
      console.log('Article to be saved', dbArticle)
      // AJAX call to save article
      $.ajax({
        method: "POST",
        url: "saved",
        data: dbArticle
      })
        .then(function (data) {
          // console.log(data)
          $(".modal-body").html(`<h4>Article Saved</h4><h5>${dbArticle.headline}</h5>`);
        })

    });
  $(document).on("click", ".btn-secondary", function () {
    console.log('test')
    location.reload()
  })

});
