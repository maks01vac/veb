const courceOne = {
    img:"images/kurs_1.png",
    author:"автор: Александра Иванова",
    title:"Сделаем прекрасный домашний шоколад",
    price:0,
    background:"#FAD1DB",
};
const courceTwo = {
    img:"images/kurs_2.png",
    author:"автор: Александра Иванова",
    title:"Сделаем прекрасный домашний шоколад",
    price:1800,
    background:"#E5E5E5",
};
const courceThree = {
    img:"images/kurs_3.png",
    author:"автор: Александра Иванова",
    title:"Медитация. Основы",
    price:1800,
    background:"#F6ECE3",
};
const courceBlocksInfo = [courceOne, courceTwo, courceThree];
var countCourceBlocksInfo = courceBlocksInfo.length;
console.log(countCourceBlocksInfo);
const CourceBlocks = document.querySelector('.complication_kurs');
console.log(CourceBlocks);
const arrCourceBlock = [];
for(let i=0;i<=countCourceBlocksInfo;i++){
    arrCourceBlock[i] = `<div class="complication_kurs_block flex_block">
    <div class="complication_kurs_def complication_kurs_back">
        <img src="${courceBlocksInfo[i].img}" class="content_img">
    </div>
    <div class="complication_kurs_def flex_block complication_kurs_forward" style="background:${courceBlocksInfo[i].background}">
        <div>
            <p class="kurs_p">${courceBlocksInfo[i].author}</p>
            <h3 class="kurs_фh3">${courceBlocksInfo[i].title}</h3>
        </div>
        <div id="price_block">`
        if(courceBlocksInfo[i].price == 0){
            arrCourceBlock[i]+=`<a href="#" class="buttom_free nav_block_link">бесплатно</a>
            <a href="#" class="buttom_add nav_block_link nav_block_link_community">добавить</a>
        </div>
    </div>
</div>`
        }
        else{
            arrCourceBlock[i]+=`<p class="price">${courceBlocksInfo[i].price} руб.</p>
            <a href="#" class="buttom_add nav_block_link nav_block_link_community">добавить</a>
        </div>
    </div>
</div>`
        }
    CourceBlocks.insertAdjacentHTML('beforeend',arrCourceBlock[i]);
}