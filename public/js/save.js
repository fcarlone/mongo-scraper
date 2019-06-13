console.log('save.js')
// Grab saved articles as JSON
$.getJSON("/saves", function (data) {
  data.forEach((article) => {
    console.log('saved article', article)
  })
})
