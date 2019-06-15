// Grab saved articles as JSON
$.getJSON("/saves", function (data) {
  data.forEach((article) => {
    console.log('saved article', article)
    $("#saved-article").append(
      `<div class="article-container">
       <div class="artilcle-headline">
       <h3 data-id="${article._id}"> ${article.headline}
       <button type="button" class="btn btn-delete btn-danger float-right" article-id="${article._id}">Delete Article</button>
       <button type="button" class="btn btn-note btn-warning float-right" article-id="${article._id}" data-toggle="modal" data-target="#exampleModal" data-whatever="note">Article Notes</button>
       </div>
       <div class="article-summary">
       <h5> ${article.summary} </h5>
       <a href="http://www.nytimes.com${article.link}" target="_blank">View Article</a>
       </div>
       </div>`
    )
  });
});

$(document).ready(function () {

  $(".nav-link-scrape").hide();

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

    $.get(`/saves/${articleId}`)
      .then(function (article) {
        console.log('article note', article)

        // Load modal
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)

        console.log('recipient', modal)

        $(document).on("click", ".btn-submit", function (event) {
          console.log('add note')
          let noteInput = $("#message-text").val().trim();
          console.log("note input", noteInput)

          // GET method to add note
          console.log("Article ID for POST method", articleId)
          $.ajax({
            method: "POST",
            url: `/saves/${articleId}`,
            data: {
              body: $("#message-text").val().trim()
            }
          })
            .then(function (data) {
              console.log('note data', data)
              $("#message-text").empty();
            })
        });
      });
  });

});


