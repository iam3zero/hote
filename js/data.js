/* const $container=$('.gallery-wrap');
const $loadMoreBtn=$('.loadMore >.loadMoreBt');
let $allData=[];
let $added=0;
let $addItemCount=3;
let $filter=$('#gallery-filter');
let $filterData=[];


$.getJSON('./data/video.json', function(data){
    $allData=data;
   // console.log(data)
  
   $loadMoreBtn.click(addItem)
   $filterData=$allData;
    addItem()
   $filter.on('change', 'input[type="radio"]', filterItems)
})

function addItem(data){
    let element=[];
    let slicedData;
    slicedData=$filterData.slice($added, $added +=$addItemCount);
    //console.log(slicedData)
    $.each(slicedData, function(index, item){
        let itemHtml=`
            <li>
                <div>
                    <a href="" class="galleryBt">
                        <span class="g-video">
                            <video autoplay muted   src=${item.video}></video>
                        </span>
                        <span class="g-color"></span>
                        <span class="g-title">
                            <span><strong>${item.title}</strong></span>
                            <span><b>${item.description}</b></span>
                        </span>
                    </a>
                </div>
            </li>
        `
        element.push($(itemHtml).get(0))

        $container.append(element)

        if($added < $allData.length){
            $loadMoreBtn.text('Load More')
        }else{
             $loadMoreBtn.text('End')
        }
        if($added < $filterData.length){
            $loadMoreBtn.text('Load More')
        }else{
             $loadMoreBtn.text('End')
        }
    })
}

function filterItems(){
    let key=$(this).val();
    $filterData=[];
    $added=0;
    $container.empty();
    if(key=='all'){
        $filterData=$allData;
    }else{
        $filterData=$.grep($allData,function(item){
            return item.category === key;
        })
    }
    addItem(true)
} */


const container = document.querySelector('.gallery-wrap');
const loadMoreBtn = document.querySelector('.loadMore > .loadMoreBt');
const filter = document.querySelector('#gallery-filter');

let allData = [];
let filterData = [];
let added = 0;
let addItemCount = 4;

// JSON 불러오기
fetch('./data/video.json')
  .then(res => res.json())
  .then(data => {
    allData = data;
    filterData = allData;

    addItem();

    loadMoreBtn.addEventListener('click', addItem);
    filter.addEventListener('change', filterItems);
  });


// 아이템 추가
function addItem() {
  const slicedData = filterData.slice(added, added + addItemCount);
  added += addItemCount;

  slicedData.forEach(item => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div>
        <a href="" class="galleryBt">
          <span class="g-video">
            <video autoplay muted src="${item.video}"></video>
          </span>
          <span class="g-color"></span>
          <span class="g-title">
            <span><strong>${item.title}</strong></span>
            <span><b>${item.description}</b></span>
          </span>
        </a>
      </div>
    `;

    container.appendChild(li);
  });

  // 버튼 상태 변경
  if (added < filterData.length) {
    loadMoreBtn.textContent = 'Load More';
  } else {
    loadMoreBtn.textContent = 'End';
  }
}


// 필터링
function filterItems(e) {
  if (e.target.type !== 'radio') return;

  const key = e.target.value;

  added = 0;
  container.innerHTML = '';

  if (key === 'all') {
    filterData = allData;
  } else {
    filterData = allData.filter(item => item.category === key);
  }

  addItem();
}
