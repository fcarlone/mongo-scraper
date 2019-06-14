console.log('save.js')
// Grab saved articles as JSON
$.getJSON("/saves", function (data) {
  data.forEach((article) => {
    console.log('saved article', article)
    $("#saved-article").append(
      `<h3 data-id="${article._id}"> ${article.headline}
       <button type="button" class="btn btn-note btn-warning" article-id="${article._id}" data-toggle="modal" data-target="#exampleModal" data-whatever="note">Article Notes</button>
       <button type="button" class="btn btn-delete btn-danger" article-id="${article._id}">Delete Article</button>
       <h5> ${article.summary} 
       <a href="http://www.nytimes.com${article.link}" target="_blank">View Article</a>`
    )
  });
});
$(document).ready(function () {

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
  $(document).on("click", ".btn-note", function (event) {
    console.log("add note clicked")

    // Get article id
    let articleId = $(this).attr("article-id")
    console.log("Article ID", articleId)

    $.get(`/articles/${articleId}`)
      .then(function (article) {
        console.log('article note', article)
      });


    // Load modal
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)

  });

  // $('#exampleModal').on('show.bs.modal', function (event) {
  //   var button = $(event.relatedTarget) // Button that triggered the modal
  //   var recipient = button.data('whatever') // Extract info from data-* attributes
  //   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  //   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  //   var modal = $(this)
  //   modal.find('.modal-title').text('New message to ' + recipient)
  //   modal.find('.modal-body input').val(recipient)
  // });



});
