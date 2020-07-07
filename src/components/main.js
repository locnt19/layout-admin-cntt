window.addEventListener('DOMContentLoaded', function () {
  LazyLoadFunction()
  new Swiper('.master_page__chucnang__slider', {
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1000,
    navigation: {
      nextEl: '.master_page__chucnang__slider .swiper-button-next',
      prevEl: '.master_page__chucnang__slider .swiper-button-prev'
    }
  })
  $('.sidebar_chucnang__item').click(function () {
    $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`).addClass('show')
    $('body').addClass('overflow-hidden')
  })
  $('.modal_chucnang__close').click(function () {
    $(this).parent().removeClass('show')
    $('body').removeClass('overflow-hidden')
  })

  const tr = `<tr> ${$('#them_chitiet_ctdaotao tbody tr:first-child').html()}</tr>`
  $('.modal_chucnang__button__plus').click(function () {
    $('#them_chitiet_ctdaotao tbody').append(tr)
    $('.modal_chucnang__button__delete').on('click', function () {
      $(this).parents('tr').remove()
    })
  })
  $('.modal_chucnang__button__delete').on('click', function () {
    $(this).parents('tr').remove()
  })

  changeOpacity()
})

function LazyLoadFunction() {
  var lazyLoad = new LazyLoad({
    elements_selector: '.lazy',
  })
  lazyLoad.update()
}

function changeOpacity() {
  var opacity = parseFloat($('body').css('opacity'))
  if (opacity !== 1) {
    opacity += 0.01
    $('body').css('opacity', opacity)
    setTimeout('changeOpacity()', 10)
  }
}