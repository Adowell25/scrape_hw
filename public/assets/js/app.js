$(function () {

    // Scrape Articles Button --------------------------------------------------------------------------------------------
    $("#scrape-articles").on('click', () => {
  
      $.ajax({
        method: 'GET',
        url: '/api/scrape'
      })
        .then(function (message)  {
          console.log(message, "MESSAGE");
          
        });
  
      //  location.reload();
    });
  
    // Submit Note Button ------------------------------------------------------------------------------------------------
    $('#submit-note').on('click', function (event) {
      event.preventDefault();
      var thisId = $(this).attr('data-id');
  
      var newNote = {
        title: $('#note-title').val(),
        body: $('#note-body').val(),
        articleId: thisId,
        // updated: moment().format('HH:mm ddd D MMM YY')
      };
      // console.log(newNote);
  
      if (newNote.title === '' || newNote.body === '') {
        alert('Please include all fields for the note.')
      } else {
        $.ajax({
          method: 'POST',
          url: `/articles/${thisId}`,
          data: newNote
        })
          .then(data => console.log(data));
  
        $('#note-title').val('');
        $('#note-body').val('');
  
        location.reload()
      }
    });
  
    // Delete Note Button ------------------------------------------------------------------------------------------------
    $('.delete-note').on('click', function () {
      var noteId = $(this).attr('data-id');
      var articleId = $(this).attr('data-article');
  
      $.ajax({
        method: 'DELETE',
        url: `/articles/${articleId}/${noteId}`
      })
        .then(data => console.log(data));
  
      location.reload()
    });
  
    // Edit Note Button --------------------------------------------------------------------------------------------------
    $('.edit-note').on('click', function () {
      var noteId = $(this).attr('data-id');
  
      $.ajax({
        method: 'GET',
        url: `/notes/${noteId}`
      })
        .then(note => {
          $('.modal-body #update-title').val(note.title);
          $('.modal-body #update-body').val(note.body);
          $('.modal-footer #update-note')
            .attr({
              'data-id': note._id,
              'data-article': note.articleId
            });
          $('.modal').modal('show')
        });
  
    });
  
    // Update Note Button (Modal) ----------------------------------------------------------------------------------------
    $('#update-note').on('click', function () {
      var noteId = $(this).attr('data-id');
      var articleId = $(this).attr('data-article');
  
      var updatedNote = {
        title: $('#update-title').val(),
        body: $('#update-body').val(),
        articleId: articleId
      };
      // console.log(updatedNote);
  
      $.ajax({
        method: 'POST',
        url: `/notes/${noteId}`,
        data: updatedNote
      })
        .then(note => console.log(note));
  
      location.reload()
    })
  
  });