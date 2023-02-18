const form = document.querySelector('#searchForm')
form.addEventListener('submit', async function (e) {
    e.preventDefault(); // 제출하면 새로고침 되는 기본 동작 제거
    removeImages();
    const userSearch = form.elements.query.value // query는 내가 설정한 input name
    // const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${userSearch}`);
    const config = { params: { q: userSearch } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
    form.elements.query.value = '';
})

// 검색 시 이미지 생성
const makeImages = (shows) => {
    let div = document.querySelector('.container');
    for (let one of shows) {
        if (one.show.image) {  // medium of null error가 뜸, 즉 image가 null(없는) 데이터가 있으므로 예외처리
            const img = document.createElement('IMG');
            img.classList.add('mb-2', 'me-2')
            img.src = one.show.image.medium;
            div.appendChild(img);
        }

    }
}

// 다른 검색 시 기존 이미지 삭제
const removeImages = () => {
    const imgs = document.querySelectorAll('IMG')
    if (imgs) {
        for (let img of imgs) {
            img.remove();
        }
    }
}
