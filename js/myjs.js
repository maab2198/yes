document.addEventListener("DOMContentLoaded", function(){
	const recordingClasses = document.querySelectorAll(".recording-classes, .order-call-js");
	const trialLessonIconClose = document.querySelector(".trial-lesson__icon-close span");
	const mainContainerTrialLesson = document.querySelector(".main-container-trial-lesson");
	const next = document.querySelector(".next");
	const previous = document.querySelector(".previous");
	const containerListReviews = document.querySelector(".container-list-reviews");
	const listReviews = document.querySelector(".list-reviews");
	let count = 0; /* індекс видимого відгуку */
	/* create elements */
	const listReviewsItem = document.querySelector(".list-reviews__item");
	let index = 0; // кількість завантажених відгуків
	const scrollBar = document.querySelector(".scroll-bar");
	/*list of references for which we cancel the standard action*/
	const listReferences = document.querySelectorAll(".map-js, .order-call-js");
	/* список з відгуками */
	const listReviewsDescription = [
		{src : "img/teacher-Alla.jpg",
			alt :"Алла Ристовская",
			title :"Алла Ристовская",
			content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam inventore quisquam ipsa, cumque ex delectus voluptate doloremque, accusamus, nulla voluptates veritatis sed sit officia eveniet amet aut iure. Nostrum, laborum.",
			href :"https://vk.com",
		},
		{
			src :"img/teacher-Anastasia.jpg",
			alt :"Анастасия Левчук",
			title :"Анастасия Левчук",
			content :"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit officia eveniet optio voluptatem nesciunt neque sunt alias fugiat nihil esse ratione tenetur, blanditiis quam in assumenda ea delectus ad deleniti aspernatur repudiandae sapiente architecto! Tempore illo magni recusandae aperiam. Eos.",
			href :"https://vk.com",
		},
		{
			src :"img/teacher-Yevgeny.jpg",
			alt :"Евгений Пак",
			title :"Евгений Пак",
			content :"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque adipisci officia at ducimus, excepturi, vitae optio hic eaque atque earum rem rerum debitis sequi. Consectetur doloribus excepturi dolore inventore. Ut laudantium cumque consectetur eius voluptatibus hic cupiditate facilis perspiciatis quae sit placeat, aut reprehenderit non? Unde iure optio dolor eius!",
			href :"https://vk.com",
		}
	];

	const listReviewsDescriptionLength = listReviewsDescription.length;//довжина списку відгуків
	const containerMap = document.querySelector(".main-container-map");
	const containerMapIconClose = document.querySelector(".map__icon-close");
	const linkMapAll = document.querySelectorAll(".map-js");
	let listHideTitle = document.getElementsByClassName('hide-title');
	const preloader = document.querySelector(".main-container-preloader");
	const listImg = document.querySelectorAll("img");
	let percentageDownload = document.querySelector(".percentage-download");
	let step =Math.floor( 100 / (listImg.length - 1));
	let listDownloadElement = document.getElementsByClassName("download-js");/* список елементів які вантажаться */
	
	trialLessonIconClose.addEventListener("click",ChangingStatusWindowFreeLesson);
		for(let index = 0; index < listImg.length; index ++){
			listImg[index].addEventListener("load", function(){
			
			if( this.classList.contains("download-js") || this.classList.contains("logo-js")){
				percentageDownload.innerHTML = (  parseInt(percentageDownload.innerHTML) + step ) + " %";
			}
		});
	}

	for(let i = 0; i < linkMapAll.length; i++){
		linkMapAll[i].addEventListener("click",showMap);
	}
	
	containerMapIconClose.addEventListener("click",showMap);

	for(let i = 0; i < recordingClasses.length ; i++){
		recordingClasses[i].addEventListener("click", ChangingStatusWindowFreeLesson);
	}

	/*list of references for which we cancel the standard action*/
	for(let i = 0; i < listReferences.length; i++){
		listReferences[i].addEventListener("click", function(event){
			 event.preventDefault();
		});
	}

	/* маска вводу */
	function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
    }
	}
 
  function mask(event) {
    var matrix = this.defaultValue,
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, "");
    def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function(a) {
        return val.charAt(i++) || "_"
    });
    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
    setCursorPosition(i, this)
	}
 
  var input = document.querySelector(".trial-lesson__tel");
  input.addEventListener("input", mask, false);


	next.addEventListener("click", changeReviews);

	previous.addEventListener("click", changeReviews);

	function changeReviews(){
		offset = parseFloat(listReviews.style.marginLeft);
		if(this.classList.contains("next")){
				if( count == 0){
					previous.disabled = false ;
				}
				if( index == count && index < listReviewsDescriptionLength ){createNewListReviewsItem();}

				if( count < listReviewsDescriptionLength ){
					listReviews.style.marginLeft = (offset - 100) + "%";
					++count;
					changeWidthScrollBar ();
					if( count == listReviewsDescriptionLength ){
						next.disabled = true ;
					}
				}

		} else{
			if( count == 1){
					previous.disabled = true ;
				}
				if( count == listReviewsDescriptionLength ){
						next.disabled = false ;
					}
			listReviews.style.marginLeft = (offset + 100) + "%";/*widthContainer*/
			--count;
			changeWidthScrollBar ();
		}
	}
	/* зміна клонованого відгуку */
	function createNewListReviewsItem(){
		const new_listReviewsItem = listReviewsItem.cloneNode(true);
		const img = new_listReviewsItem.querySelector(".list-reviews__img img");
		img.src = listReviewsDescription[index].src ;
		img.alt = listReviewsDescription[index].alt;
		const title = new_listReviewsItem.querySelector(".list-reviews__title");
		title.innerHTML = listReviewsDescription[index].title;
		const content = new_listReviewsItem.querySelector(".list-reviews__content p");
		content.innerHTML = listReviewsDescription[index].content;
		const link = new_listReviewsItem.querySelector(".list-reviews__content a");
		link.href = listReviewsDescription[index].href;
		/* вставка клонованого відгуку */
		listReviews.appendChild(new_listReviewsItem);
		++index;/* кількість вставленних елементів */
	}

	function changeWidthScrollBar (){
		scrollBar.style.width =((( count + 1 ) / ( listReviewsDescriptionLength + 1 ) ) * 100) + "%";
	}

	/**/
	function ChangingStatusWindowFreeLesson(){
		mainContainerTrialLesson.classList.toggle("main-container-trial-lesson--open");
	}

	function showMap(){
		if( this.classList.contains("map-js")){
			let iframe = document.querySelector("iframe");
			//console.log(!iframe);
			if(!iframe){
				iframe = document.createElement("iframe");
				iframe.src = "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d71975.51169713752!2d37.23799040519078!3d55.68490650412884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0LMuINCc0L7RgdC60LLQsCDRg9C7LiDQodC10LLQtdGA0L3QsNGPLCAzNQ!5e0!3m2!1sru!2sua!4v1531650122093";
				document.querySelector(".container-map").appendChild(iframe);
			}
		}
		containerMap.classList.toggle("main-container-map--open");
	}

	/* зміна ширини ScrollBar при завантажені */
	changeWidthScrollBar ();

	/* event for window */
	window.addEventListener("load",function(){
		requestAnimationFrame(showHideTitle);
		requestAnimationFrame(loadSomethink);
		preloader.classList.add("main-container-preloader--hide");

	});

	window.addEventListener("scroll",function(){
		requestAnimationFrame(showHideTitle);
		requestAnimationFrame(loadSomethink);
	});

	function showHideTitle(){
		for(let i = 0; i < listHideTitle.length; i++){
			let coorTitle = listHideTitle[i].getBoundingClientRect();
			let heightWindow = document.documentElement.clientHeight;
			if(coorTitle.top > 0 && coorTitle.top < heightWindow){
				listHideTitle[i].classList.remove("hide-title");
			}

		}
	}
	/* load img or background */
	function loadSomethink(){
		for( let i = 0; i < listDownloadElement.length; i++){
			let coor = listDownloadElement[i].getBoundingClientRect();
			let heightWindow = document.documentElement.clientHeight;
			/* element with displa:none.getBoundingClientRect() == 0  */
			if((coor.top > 1 && coor.top < heightWindow * 1.25 ) || (coor.bottom > -20 && coor.bottom < heightWindow && coor.bottom != 0)){
				if( listDownloadElement[i].tagName == "IMG"){
					listDownloadElement[i].src = listDownloadElement[i].getAttribute('data-src');
					//listDownloadElement[i].classList.remove("download-js");
					listDownloadElement[i].addEventListener("load",function(){
						this.classList.remove("download-js");
					})
				} else{
					listDownloadElement[i].style.backgroundImage = listDownloadElement[i].getAttribute('data-src');
					listDownloadElement[i].classList.remove("download-js");

				}
				
			}
		}
	}
	
});