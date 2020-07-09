$(function(){
  function buildHTML(message){
    if(message.image){
      let html =
        `<div class="messagebox">
          <div class="messageinfo">
            <div class="messageinfo__username">
              ${message.user_name}
          </div>
            <div class="messageinfo__date">
              ${message.created_at}
            </div>
          </div>
           <div class="message">
            <div class="message__content">
              ${message.content}
            <img class="Message__image" src="${message.image}"> 
            </div>
        </div>`
    return html;
    } else {
      let html =
      `<div class="messagebox">
          <div class="messageinfo">
            <div class="messageinfo__username">
              ${message.user_name}
        </div>
          <div class="messageinfo__date">
            ${message.created_at}
          </div>
        </div>
          <div class="message">
            <div class="message__content">
            ${message.content}
            </div>
      </div>`
    return html;
      };
  }
  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dateType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      console.log(data);
      let html = buildHTML(data);
      $('.messagefield').append(html);
      $('form')[0].reset();
      $('.messagefield').animate({ scrollTop: $('.messagefield')[0].scrollHeight});
      $('.form2').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.form2').prop("disabled", false);
  });
  });
});