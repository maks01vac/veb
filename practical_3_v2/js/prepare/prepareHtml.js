function prepareCources (courceInfo){
    var arrayBlockHtml = [];
    for (let i=0; i<courceInfo.length;i++){
        let elementsCource=courceInfo[i];
        arrayBlockHtml[i]=createContentBlock(elementsCource);
    }
    return arrayBlockHtml.join('');
 }

function createContentBlock(courceBlockHtml){
    var courceBlock = `<div class="complication_kurs_block flex_block">
    <div class="complication_kurs_def complication_kurs_back">
        <img src="${courceBlockHtml.img}" class="content_img">
    </div>
    <div class="complication_kurs_def flex_block complication_kurs_forward" style="background:${courceBlockHtml.background}">
        <div>
            <p class="kurs_p">${courceBlockHtml.author}</p>
            <h3 class="kurs_фh3">${courceBlockHtml.title}</h3>
        </div>
        <div id="price_block">
        ${courceBlockHtml.price == 0 ? `<a href="#" class="buttom_free nav_block_link">бесплатно</a>`
        :`<p class="price">${courceBlockHtml.price} руб.</p>`}
          <a href="#" class="buttom_add nav_block_link nav_block_link_community">добавить</a>
        </div>
    </div>
</div>`
return courceBlock;       
 }



function insertCources(courceJoinBlockInsert){
    const courceMainBlock = document.querySelector('.complication_kurs')
    courceMainBlock.insertAdjacentHTML('beforeend',courceJoinBlockInsert);
}



