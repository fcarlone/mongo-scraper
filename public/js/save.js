console.log('save.js')
// Grab saved articles as JSON
$.getJSON("/saves", function (data) {
  // Saved article count
  console.log("saved article count", data.length)
  if (data.length === 0) {
    $("#no-saved-articles-container").append(
      `<h3 id="no-saved-article">No Saved Articles</h3>`
    )
  };

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
  $(document).on("click", ".btn-delete", function (event) {
    event.preventDefault();
    console.log("delete button clicked")
    // Get article id
    let articleId = $(this).attr("article-id")
    console.log("Article ID", articleId)

    $.post(`/delete/${articleId}`)
      .then(function (article) {
        console.log('article deleted', article)
      });
    // Reload page after article is deleted
    location.reload();
  });

  // Handle add note on-clicke event
  $(document).on("click", ".btn-note", function (event) {
    console.log("add note clicked")
    // Get article id
    let articleId = $(this).attr("article-id")

    $.get(`/saves/${articleId}`)
      .then(function (article) {
        console.log('article to save note', article)
        // Display previous notes
        console.log("Previous Article Notes:", article.note)
        article.note.forEach((note) => {
          $(".modal-notes").append(
            `<div class="note-container">
             <li>${note.body}
             <button class="btn-danger delete-note float-right" data-note="${note._id}"><i class="fa fa-trash"></i></button>
             </li>
            </div>`
          )
        });

        // Load modal
        const button = $(event.relatedTarget)
        const recipient = button.data('note')
        const modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)

        console.log('recipient', modal)

        $(document).on("click", ".btn-submit", function (event) {
          event.preventDefault();
          console.log('add note')
          let noteInput = $("#message-text").val().trim();
          if (noteInput.length === 0) {
            alert('Add note field cannot be empty');
            location.reload();
          } else {
            console.log("note input", noteInput)

            // POST method to add note
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
                // Reload page after note is saved
                location.reload();
              })
          }
        });
      });
    $(".modal-notes").empty();
  });
  $(document).on("click", ".delete-note", function (event) {
    event.preventDefault()
    console.log("delete note button clicked")
    let noteId = $(this).attr("data-note")
    console.log("***", noteId);

    // Delete note
    $.post(`/delete-note/${noteId}`)
      .then(function (note) {
        console.log('note deleted', note)
      });
    // Reload page after note is saved
    location.reload();
  });

});



