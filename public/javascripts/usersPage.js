$('button.follow').on('click', function(e){
    e.preventDefault();
    $button = $(this);
    if($button.hasClass('following')){
        if($button.hasClass('location')){
          var field = "location";
        }
        else{
          field = "partner";
        }
        //get the username
        var username = $(this).closest('tr').find('td:nth-child(1)').text();
        //unfollow
        $.ajax({
          url: 'http://localhost:3000/users/stalk/unfollow',
          type: 'POST',
          data: { username : username, field: field},
          success: function(data) {
            alert("Successfully Unfollowed!");
            console.log('success');
            $button.removeClass('following');
            $button.text('Follow');
          },
          error: function () {
            alert("Something went wrong with unfollow Button.");
          }
        });
        
    } 
    else {
      if($button.hasClass('location')){
          var field = "location";
        }
        else{
          field = "partner";
        }
        var username = $(this).closest('tr').find('td:nth-child(1)').text();
        //follow
        $.ajax({
          url: 'http://localhost:3000/users/stalk/follow',
          type: 'POST',
          data: {username:username,field: field},
          success: function(data) {
            alert("Successfully Followed!");
            console.log('success');
            $button.addClass('following');
            $button.text('Following');
          },
          error: function () {
            alert("Something went wrong with Follow Button.");
          }
        });
   
    }
});