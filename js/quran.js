window.onload = ()=>{
	// Define elements
	let bookmarkContainer = document.getElementById('bookmark-container');
	let bookmarkIcon      = document.getElementById('bookmark-icon');
	let closeNavLeftBtn   = document.getElementById('close-nav-left');
	let closeNavRightBtn  = document.getElementById('close-nav-right');
	let closePopupBtn     = document.getElementById('close-popup-btn');
	let colorList         = document.getElementById('color-list');
	let fontFamilyList    = document.getElementById('font-family-list');
	let fontSizeList      = document.getElementById('font-size-list');
	let juzAnchors        = document.querySelectorAll('.ca');
	let juzList           = document.getElementById('juz-list');
	let navLeft           = document.getElementById('nav-left');
	let navLeftDrag       = document.getElementById('nav-left-drag');
	let navRight          = document.getElementById('nav-right');
	let navRightDrag      = document.getElementById('nav-right-drag');
	let openNavLeftBtn    = document.getElementById('open-nav-left');
	let openNavRightBtn   = document.getElementById('open-nav-right');
	let pageAnchors       = document.querySelectorAll('.pa');
	let pageInfos         = document.querySelectorAll('.ib');
	let pageList          = document.getElementById('page-list');
	let programInfoBtn    = document.getElementById('program-info-btn');
	let programInfoPopup  = document.getElementById('program-info-popup');
	let quranVerses       = document.getElementById('quran-verses');
	let suraList          = document.getElementById('sura-list');
	let topBtn            = document.getElementById('top-btn');

	// First install event listeners for quick responsiveness then settings if exist
	installEventListeners();
	installSettings();

	function installSettings()
	{
		// Set bookmark
		if (localStorage.getItem('bookmarkTarget'))
		{
			bookmarkTarget = localStorage.getItem('bookmarkTarget');
			bookmarkLabel  = localStorage.getItem('bookmarkLabel');
			setBookmark(bookmarkTarget, bookmarkLabel);
			gotoBookmark(bookmarkTarget);
		}

		// Set colors
		if (localStorage.getItem('settingsColor'))
		{
			settingsColor   = localStorage.getItem('settingsColor');
			colorList.value = settingsColor;
			setColors(settingsColor);
		}

		// Set font family
		if (localStorage.getItem('fontFamily'))
		{
			fontFamily = localStorage.getItem('fontFamily');
			fontFamilyList.value = fontFamily;
			setFontFamily(fontFamily);
		}

		// Set font size
		if (localStorage.getItem('fontSize'))
		{
			fontSize = localStorage.getItem('fontSize');
			fontSizeList.value = fontSize;
			setFontSize(fontSize);
		}
	}

	function installEventListeners()
	{
		// Page infos
		for(let i = 0; i < pageInfos.length; i++)
		{
			pageInfos[i].addEventListener('click', ()=>{pageInfos[i].classList.toggle('open')});
		}

		// Juz anchors
		for(let i=0; i < juzAnchors.length; i++)
		{
			juzAnchors[i].addEventListener('click', addJuzAnchor, false);
		}

		// Page anchors
		for(let i=0; i < pageAnchors.length; i++)
		{
			pageAnchors[i].addEventListener('click', addAnchor, false);
		}

		// Color list
		colorList.addEventListener('change', (e)=>{
			setColors(colorList.value);
		});

		// Font family List
		fontFamilyList.addEventListener('change', ()=>{
			setFontFamily(fontFamilyList.value);
		});

		// Font size list
		fontSizeList.addEventListener('change', (e)=>{
			setFontSize(fontSizeList.value);
		});

		// Sura List
		suraList.addEventListener('change', suraToTop);

		// Juz list
		juzList.addEventListener('change', juzToTop);

		// Page list
		pageList.addEventListener('change', pageToTop);

		// To quran top
		topBtn.addEventListener('click', quranToTop);

		// Clean bookmark
		bookmarkIcon.addEventListener('click', removeBookmark);

		// Program info
		programInfoBtn.addEventListener('click', openInfoPopup);

		closePopupBtn.addEventListener('click', closeInfoPopup);

		// Nav left
		openNavLeftBtn.addEventListener('click', openNavLeft);
		closeNavLeftBtn.addEventListener('click', closeNavLeft);
		navLeftDrag.addEventListener('swipeRight', openNavLeft);
		navLeftDrag.addEventListener('swipeLeft', closeNavLeft);
		navLeft.addEventListener('swipeLeft', closeNavLeft);

		// Nav right
		openNavRightBtn.addEventListener('click', openNavRight);
		closeNavRightBtn.addEventListener('click', closeNavRight);
		navRightDrag.addEventListener('swipeRight', closeNavRight);
		navRightDrag.addEventListener('swipeLeft', openNavRight);
		navRight.addEventListener('swipeRight', closeNavRight);

	}

	function addJuzAnchor()
	{
		bookmarkTarget = this.dataset.cah;
		bookmarkLabel  = this.dataset.cbl;
		setBookmark(bookmarkTarget, bookmarkLabel);
		localStorage.setItem('bookmarkTarget', bookmarkTarget);
		localStorage.setItem('bookmarkLabel', bookmarkLabel);
	}

	function addAnchor()
	{
		bookmarkTarget = this.dataset.pah;
		bookmarkLabel  = this.dataset.pbl;
		setBookmark(bookmarkTarget, bookmarkLabel);
		localStorage.setItem('bookmarkTarget', bookmarkTarget);
		localStorage.setItem('bookmarkLabel', bookmarkLabel);
	}

	function setBookmark(bookmarkTarget, bookmarkLabel)
	{
		bookmark = document.getElementById('bookmark');
		if(bookmark) bookmark.remove();

		newBookmark                = document.createElement('span');
		newBookmark.id             = 'bookmark';
		newBookmark.dataset.target = bookmarkTarget;
		newBookmarkLabel           = document.createTextNode(bookmarkLabel);
		newBookmark.appendChild(newBookmarkLabel);
		newBookmark.addEventListener('click', ()=>{gotoBookmark(bookmarkTarget)});
		bookmarkContainer.appendChild(newBookmark);
	}

	function gotoBookmark(bookmarkTarget)
	{
		closeNavs();
		document.getElementById(bookmarkTarget).scrollIntoView();
	}

	function removeBookmark()
	{
		bookmark = document.getElementById('bookmark')
		if(bookmark) bookmark.remove();
		localStorage.removeItem('bookmarkTarget');
		localStorage.removeItem('bookmarkLabel');
	}

	function setColors(color)
	{
		document.documentElement.style.setProperty('--ntbc', color);
		document.documentElement.style.setProperty('--nsbc', color);
		document.documentElement.style.setProperty('--vnc', color);
		document.documentElement.style.setProperty('--snbc', color);
		document.documentElement.style.setProperty('--btn_hover_color', color);
		localStorage.setItem('settingsColor', color);
		closeNavs();
	}

	function setFontSize(fontSize)
	{
		document.documentElement.style.setProperty('--afs', fontSize);
		localStorage.setItem('fontSize', fontSize);
		closeNavs();
	}

	function setFontFamily(fontFamily)
	{
		document.documentElement.style.setProperty('--aff', fontFamily);
		localStorage.setItem('fontFamily', fontFamily);
		closeNavs();
	}

	function closeNavs()
	{
		navLeft.classList.remove('open');
		navRight.classList.remove('open');
		programInfoPopup.classList.remove('open');
	}

	function closeNavLeft()
	{
		navLeft.classList.remove('open');
	}

	function closeNavRight()
	{
		navRight.classList.remove('open');
	}

	function openNavLeft()
	{
		navLeft.classList.toggle('open');
		navRight.classList.remove('open');
		programInfoPopup.classList.remove('open');
	}

	function openNavRight()
	{
		navLeft.classList.remove('open');
		navRight.classList.toggle('open');
		programInfoPopup.classList.remove('open');
	}

	function openInfoPopup()
	{
		navLeft.classList.remove('open');
		navRight.classList.remove('open');
		programInfoPopup.classList.toggle('open');
	}

	function closeInfoPopup()
	{
		programInfoPopup.classList.remove('open');
	}

	function quranToTop()
	{
		closeNavs();
		document.getElementById('quran-top').scrollIntoView();
	}

	function suraToTop()
	{
		closeNavs();
		document.getElementById('sura_'+suraList.value).scrollIntoView();
	}

	function juzToTop()
	{
		closeNavs();
		document.getElementById('j'+juzList.value).scrollIntoView();
	}

	function pageToTop()
	{
		closeNavs();
		document.getElementById('p'+pageList.value).scrollIntoView();
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
		closeNavLeft();
	}
};
