window.onload = ()=>{
	let html        = document.querySelector('html');
	let body        = document.querySelector('body');
	let quranVerses = document.querySelector('#quran-verses');

	let infos       = document.querySelectorAll('.ib');
	for(let i=0; i<infos.length; i++)
	{
		infos[i].addEventListener('click', ()=>{infos[i].classList.toggle('open')});
	}


	let pageAnchors = document.querySelectorAll('.pa');
	let anchorList  = document.querySelector('#anchor-list');

	for(let i=0; i<pageAnchors.length; i++)
	{
		pageAnchors[i].addEventListener('click', addPageAnchor, false);
	}

	if (localStorage.getItem('pageAnchorHref'))
	{
		pageAnchorHref       = localStorage.getItem('pageAnchorHref');
		pageBookmarkLabel    = localStorage.getItem('pageBookmarkLabel');
		setBookmark();
	}

	function addPageAnchor()
	{
		pageAnchorHref       = this.dataset.pah;
		pageBookmarkLabel    = this.dataset.pbl;
		setBookmark();
		localStorage.setItem('pageAnchorHref', pageAnchorHref);
		localStorage.setItem('pageBookmarkLabel', pageBookmarkLabel);
	}

	function setBookmark()
	{
		anchorList.innerHTML = '<i class="rb">b</i> <a class="btn page-bookmark" href="#'+pageAnchorHref+'">p'+pageBookmarkLabel+'</a>';
	}

	// Font Size
	let fontSize   = document.querySelector('#font-size');

	fontSize.addEventListener('change', (e)=>{
		quranVerses.style.fontSize = fontSize.value+'px';
	});

	// Font Family List
	let fontFamilyList = document.querySelector('#font-family-list');

	fontFamilyList.addEventListener('change', ()=>{
		// selectedFont = fontFamilyList[fontFamilyList.selectedIndex].innerText;
		quranVerses.style.fontFamily = fontFamilyList.value;
		localStorage.setItem('font', fontFamilyList.value);
		toggleNavRight();
	});

	// Left Nav
	let openNavLeftBtn  = document.querySelector('#open-nav-left');
	let closeNavLeftBtn = document.querySelector('#close-nav-left');
	let navLeft         = document.querySelector('#nav-left');
	let navLeftDrag     = document.querySelector('#nav-left-drag');

	// Right Nav
	let openNavRightBtn  = document.querySelector('#open-nav-right');
	let closeNavRightBtn = document.querySelector('#close-nav-right');
	let navRight         = document.querySelector('#nav-right');
	let navRightDrag     = document.querySelector('#nav-right-drag');

	openNavLeftBtn.addEventListener('click', openNavLeft);
	closeNavLeftBtn.addEventListener('click', toggleNavLeft);
	navLeftDrag.addEventListener('swipeRight', openNavLeft);
	navLeftDrag.addEventListener('swipeLeft', toggleNavLeft);
	navLeft.addEventListener('swipeLeft', toggleNavLeft);

	openNavRightBtn.addEventListener('click', openNavRight);
	closeNavRightBtn.addEventListener('click', toggleNavRight);
	navRightDrag.addEventListener('swipeRight', toggleNavRight);
	navRightDrag.addEventListener('swipeLeft', openNavRight);
	navRight.addEventListener('swipeRight', toggleNavRight);

	function closeNavs()
	{
		navLeft.classList.remove('open');
		navRight.classList.remove('open');
	}

	function toggleNavLeft()
	{
		navLeft.classList.toggle('open');
	}

	function toggleNavRight()
	{
		navRight.classList.toggle('open');
	}

	function openNavLeft()
	{
		navLeft.classList.toggle('open');
		navRight.classList.remove('open');
	}

	function openNavRight()
	{
		navRight.classList.toggle('open');
		navLeft.classList.remove('open');
	}

	// Suras
	let suraList = document.querySelector('#sura-list');
	suraList.addEventListener('change', suraToTop);

	function suraToTop()
	{
		let sura = document.getElementById('sura_'+suraList.value);
		sura.scrollIntoView();
	}

	// Juz list
	let juzList = document.querySelector('#juz-list');
	juzList.addEventListener('change', juzToTop);

	function juzToTop()
	{
		let juz = document.getElementById('p_'+juzList.value*20);
		juz.scrollIntoView();
	}

	// Pages
	let pageList = document.querySelector('#page-list');
	pageList.addEventListener('change', pageToTop);

	function pageToTop()
	{
		let page = document.getElementById('p_'+pageList.value);
		page.scrollIntoView();
	}

	// Cancelled
	function getSura()
	{
		suraId = suraList.value;
		let formdata = new FormData();

		formdata.append('sura_id', suraId);

		fetch('/get_sura.php', {
			method: 'post',
			body: formdata
		})
		.then(res=>{
			if(!res.ok) throw new Error("HTTP Error, status = " + res.status);
			return res.text();
		})
		.then(res=>{
			quranVerses.innerHTML = res;
			document.scrollTop = 0;
			document.documentElement.scrollTop = 0;
			suraName.innerHTML    = suraList[suraList.selectedIndex].dataset.suraTr+' ('+suraList[suraList.selectedIndex].dataset.suraName+')';
			suraWord.classList.toggle('hidden');
		})
		.catch(err=>{
			console.log(err);
		});
		localStorage.setItem('sura_id', suraId);
		toggleNavLeft();
	}
};
