function main(){
  $('.links-button').on('click', function() {
    $(this).next().slideToggle(1000);
    $(this).toggleClass('active');
});
};
