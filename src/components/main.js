window.addEventListener('DOMContentLoaded', function () {
  LazyLoadFunction()
  sliderFunction()
  changeOpacity()
  toggleModalChucNangAndSelect2()
  addRowTable('#them_chitiet_chuongtrinhdaotao')
  removeRowTable('#them_chitiet_chuongtrinhdaotao') // add event click the first time
  addRowTable('#them_chitiet_chitieudaotao')
  removeRowTable('#them_chitiet_chitieudaotao') // add event click the first time
  removeRowTable('#danhsach_monhoc') // add event click the first time
})

function LazyLoadFunction() {
  var lazyLoad = new LazyLoad({
    elements_selector: '.lazy',
  })
  lazyLoad.update()
}


function sliderFunction() {
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
}

function changeOpacity() {
  var opacity = parseFloat($('body').css('opacity'))
  if (opacity !== 1) {
    opacity += 0.01
    $('body').css('opacity', opacity)
    setTimeout('changeOpacity()', 10)
  }
}


function toggleModalChucNangAndSelect2() {
  // open modal
  $('.sidebar_chucnang__item').click(function () {
    $('.modal_chucnang__select2').select2({
      dropdownParent: $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`)
    })
    $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`).addClass('show')
    $('body').addClass('overflow-hidden')
  })

  // close modal with Escape key
  $(window).on('keyup', function (event) {
    const keycode = event.which || event.keyCode
    if (keycode == 27 && $('.modal_chucnang__wrapper').hasClass('show')) {
      $('.modal_chucnang__wrapper').removeClass('show')
      $('body').removeClass('overflow-hidden')
    }
  })

  // close modal
  $('.modal_chucnang__close').click(function () {
    $(this).parent().removeClass('show')
    $('body').removeClass('overflow-hidden')
  })
}

//#region event Row Table into Modal Chuc Nang
function addRowTable(idSelector) {
  // console.log(idSelector);
  const td = $(`${idSelector} tbody tr:first-child`).html()
  const tr = `<tr>${td} </tr>`
  $(`${idSelector} .modal_chucnang__button__plus`).click(function () {
    // console.log(this)
    $(`${idSelector} tbody`).append(tr)
    removeRowTable(idSelector)
  })
}
function removeRowTable(idSelector) {
  $(`${idSelector} .modal_chucnang__button__delete`).click(function () {
    $(this).parents('tr').remove()
  })
}
//#endregion