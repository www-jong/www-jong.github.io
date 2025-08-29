(function() {
	// 년도
	var yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// 헤더 타이틀 클릭 시 맨 위로 이동
	var titleLink = document.querySelector('.site-header .title-link');
	if (titleLink) {
		titleLink.addEventListener('click', function(e) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	// FAB 동작
	var toTopBtn = document.querySelector('.fab .to-top');
	if (toTopBtn) {
		toTopBtn.addEventListener('click', function() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	var toPdfBtn = document.querySelector('.fab .to-pdf');
	if (toPdfBtn) {
		toPdfBtn.addEventListener('click', function() {
			window.print();
		});
	}

	// 사이드바 자동 생성: content 영역의 h2를 목차로 구성
	var content = document.getElementById('content');
	var nav = document.querySelector('.sidebar-nav[data-auto-nav="true"]');
	if (content && nav) {
		var headings = content.querySelectorAll('h2');
		headings.forEach(function(h, idx) {
			// id가 없으면 생성
			if (!h.id) {
				var slug = h.textContent.trim().toLowerCase().replace(/[^가-힣a-z0-9\s-]/g, '').replace(/\s+/g, '-');
				var base = slug || ('section-' + (idx + 1));
				var unique = base; var n = 1;
				while (document.getElementById(unique)) { unique = base + '-' + (++n); }
				h.id = unique;
			}
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.href = '#' + h.id;
			a.textContent = h.textContent;
			li.appendChild(a);
			nav.appendChild(li);
		});
	}

	// 활성 섹션 하이라이트
	var links = nav ? nav.querySelectorAll('a') : [];
	if (links.length > 0) {
		var sections = Array.prototype.map.call(links, function(a) {
			var el = document.getElementById(decodeURIComponent(a.hash.slice(1)));
			return el;
		}).filter(Boolean);

		var onScroll = function() {
			var fromTop = window.scrollY + 100;
			var current = sections[0];
			for (var i = 0; i < sections.length; i++) {
				if (sections[i].offsetTop <= fromTop) current = sections[i];
			}
			links.forEach(function(a) { a.classList.remove('active'); });
			if (current) {
				var active = nav.querySelector('a[href="#' + current.id + '"]');
				if (active) active.classList.add('active');
			}
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
	}

	// 앵커 클릭 시 기본 스크롤(수직) 유지
})();

