window.addEventListener('DOMContentLoaded', function () {
  LazyLoadFunction()
  sliderFunction()
  changeOpacity()
  toggleModalChucNangAndSelect2()
  eventRowTable('#them_chitiet_chuongtrinhdaotao')
  eventRowTable('#them_chitiet_chitieudaotao')
  eventRowTable('#danhsach_monhoc')
  eventRowTable('#danhsach_khoabomon')
  eventRowTable('#danhsach_chucvu')
  eventRowTable('#danhsach_diemsinhvien')
  eventRowTable('#danhsach_giaovien')
  eventRowTable('#danhsach_cotdiemlophocphan')
  eventRowTable('#danhsach_diemsinhvienlophocphan')
  eventRowTable('#danhsach_giaovienlophocphan')
  eventRowTable('#danhsach_lophocphan')
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

function eventRowTable(idSelector) {
  addRowTable(idSelector)
  removeRowTable(idSelector)
  editRowTable(idSelector)
  saveRowTable(idSelector)
}

function addRowTable(idSelector) {
  const td = $(`${idSelector} tfoot tr:first-child`).html()
  const tr = `<tr>${td} </tr>`
  $(`${idSelector} .modal_chucnang__button__plus`).click(function () {
    $(`${idSelector} tbody`).prepend(tr)
    editRowTable(idSelector)
    removeRowTable(idSelector)
  })
}
function removeRowTable(idSelector) {
  $(`${idSelector} .modal_chucnang__button__delete`).click(function () {
    $(this).parents('tr').remove()
  })
}

function editRowTable(idSelector) {
  $(`${idSelector} .modal_chucnang__button__edit`).click(function () {
    $(this).parents('tr').find('input').removeAttr('disabled')
    $(this).parents('tr').find('select').removeAttr('disabled')
    $(this).parents('tr').find('textarea').removeAttr('disabled')
  })
}

function saveRowTable(idSelector) {
  $(`${idSelector} .modal_chucnang__button__save`).click(function () {
    console.log('click');
    $(`${idSelector} tbody input`).attr('disabled', true)
    $(`${idSelector} tbody select`).attr('disabled', true)
    $(`${idSelector} tbody textarea`).attr('disabled', true)
  })
}
//#endregion