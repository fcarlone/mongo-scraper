console.log('save.js')
// Grab saved articles as JSON
$.getJSON("/saves", function (data) {
  data.forEach((article) => {
    console.log('saved article', article)
    $("#saved-article").append(
      `<h3 data-id="${article._id}"> ${article.headline}
      <button type="button" class="btn btn-warning" article-id="${article._id}">Article Notes</button>
       <button type="button" class="btn btn-danger" article-id="${article._id}">Delete Article</button>
       <h5> ${article.summary} 
       <a href="http://www.nytimes.com${article.link}" target="_blank">View Article</a>`
    )
  })
})
