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
        var parent = $(this).parent().text();
        var username = $(this).closest('tr').find('td:nth-child(1)').text();
        //var username = JSON.stringify($(this).closest('td').filter('.username'));
        console.log(username + field);
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
        var parent = $(this).parent().text();
        var username = $(this).closest('tr').find('td:nth-child(1)').text();
        console.log(username + field);
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