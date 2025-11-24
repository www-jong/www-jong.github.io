// Portfolio - Fixed Version
// 좌측 네비게이션 + 다크/라이트 모드 + 테마 시스템

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio initializing...');
    
    // ============================================
    // 테마 시스템 초기화
    // ============================================
    
    // 저장된 테마 불러오기 및 적용 (CSS는 body.light-mode 기준)
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
    
    // 테마 토글 버튼
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        updateThemeButton();
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            const next = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', next);
            updateThemeButton();
            console.log('🎨 Theme changed to:', next);
        });
    }
    
    function updateThemeButton() {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('.theme-icon');
        console.log(icon);
        if (!icon) return;
        const isLight = document.body.classList.contains('light-mode');
        if (isLight) {
            icon.textContent = '☀️';
        } else {
            console.log('라이트 모드');
            icon.textContent = '🌙';
        }
    }

    // ============================================
    // 네비게이션 및 스크롤
    // ============================================
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .detail-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active link
                    updateActiveLink(href);
                }
            }
        });
    });

    // Active navigation highlighting on scroll
    const sections = document.querySelectorAll('.section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                updateActiveLink('#' + sectionId);
            }
        });
    }
    
    function updateActiveLink(href) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`.nav-link[href="${href}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    window.addEventListener('scroll', highlightNav);

    // ============================================
    // 프로젝트 카드 인터랙션
    // ============================================
    
    // Project cards click to scroll to detail
    const projectCards = document.querySelectorAll('.project-summary-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('detail-link')) return;
            
            const projectId = this.getAttribute('data-project');
            const detailSection = document.getElementById('project-' + projectId);
            
            if (detailSection) {
                detailSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // 애니메이션
    // ============================================
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.edu-item, .award-card, .cert-card, .project-summary-card, .content-block');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Smooth appearance for sections
    const sectionContainers = document.querySelectorAll('.section-container');
    sectionContainers.forEach(container => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(30px)';
        container.style.transition = 'all 0.8s ease-out';
    });
    
    const containerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sectionContainers.forEach(container => {
        containerObserver.observe(container);
    });

    // ============================================
    // 호버 효과
    // ============================================
    
    // Add hover effect enhancement for project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add progress indicator for skills (optional animation)
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // PDF 내보내기 최적화
    // ============================================
    
    window.addEventListener('beforeprint', function() {
        console.log('📄 Preparing for PDF export...');
        // Expand all sections for printing
        document.querySelectorAll('.section').forEach(section => {
            section.style.minHeight = 'auto';
            section.style.pageBreakAfter = 'always';
        });
    });
    
    window.addEventListener('afterprint', function() {
        console.log('✅ PDF export completed!');
        // Restore section heights
        document.querySelectorAll('.section').forEach(section => {
            section.style.minHeight = '100vh';
        });
    });

    // ============================================
    // 섹션 분할 (스크롤 스냅 대응)
    // ============================================

    function paginateTallSections() {
        if (window.innerWidth < 1024) return;

        const sections = document.querySelectorAll('.section[id]');

        sections.forEach(section => {
            if (section.dataset.paginated === 'true') return;
            paginateSection(section);
        });
    }

    function paginateSection(section) {
        const container = section.querySelector('.section-container');
        if (!container) return;

        const computedStyle = window.getComputedStyle(section);
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
        const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
        const maxContentHeight = window.innerHeight - paddingTop - paddingBottom;

        if (maxContentHeight <= 0) return;

        const children = Array.from(container.children);
        if (children.length === 0) return;

        const stickyNodes = children.filter(child =>
            child.classList.contains('section-title') ||
            child.classList.contains('section-subtitle') ||
            child.hasAttribute('data-sticky')
        );

        const contentNodes = children.filter(child => !stickyNodes.includes(child));
        if (contentNodes.length === 0) return;

        const childHeights = contentNodes.map(child => child.offsetHeight);
        const totalHeight = childHeights.reduce((sum, height) => sum + height, 0);

        if (totalHeight <= maxContentHeight + 4) return;

        const groups = [];
        let currentGroup = [];
        let currentHeight = 0;

        contentNodes.forEach((child, index) => {
            const blockHeight = childHeights[index];

            if (currentHeight + blockHeight > maxContentHeight && currentGroup.length > 0) {
                groups.push(currentGroup);
                currentGroup = [];
                currentHeight = 0;
            }

            currentGroup.push(child);
            currentHeight += blockHeight;
        });

        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }

        if (groups.length <= 1) return;

        container.innerHTML = '';
        stickyNodes.forEach(node => container.appendChild(node));
        groups[0].forEach(node => container.appendChild(node));
        section.dataset.paginated = 'true';

        let insertAfter = section;

        for (let i = 1; i < groups.length; i++) {
            const dummySection = section.cloneNode(false);
            dummySection.removeAttribute('id');
            dummySection.dataset.dummySection = 'true';

            const dummyContainer = container.cloneNode(false);
            dummyContainer.innerHTML = '';
            stickyNodes.forEach(node => dummyContainer.appendChild(node.cloneNode(true)));
            dummySection.appendChild(dummyContainer);

            groups[i].forEach(node => dummyContainer.appendChild(node));

            insertAfter.parentNode.insertBefore(dummySection, insertAfter.nextSibling);
            insertAfter = dummySection;
        }
    }

    window.addEventListener('load', function() {
        setTimeout(paginateTallSections, 300);
    });

    // ============================================
    // 키보드 네비게이션
    // ============================================
    
    document.addEventListener('keydown', function(e) {
        const currentSection = getCurrentSection();
        
        // Arrow Down: Next section
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            navigateToNextSection(currentSection, 1);
        }
        
        // Arrow Up: Previous section
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            navigateToNextSection(currentSection, -1);
        }
        
        // T: Toggle theme
        if (e.key === 't' || e.key === 'T') {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                if (themeToggle) themeToggle.click();
            }
        }
    });

    function getCurrentSection() {
        const scrollY = window.pageYOffset + window.innerHeight / 2;
        let current = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section;
            }
        });
        
        return current;
    }

    function navigateToNextSection(currentSection, direction) {
        if (!currentSection) return;
        
        const sectionsArray = Array.from(sections);
        const currentIndex = sectionsArray.indexOf(currentSection);
        const nextIndex = currentIndex + direction;
        
        if (nextIndex >= 0 && nextIndex < sectionsArray.length) {
            sectionsArray[nextIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // ============================================
    // 초기화 완료
    // ============================================
    
    // Initialize: scroll to top on page load
    window.scrollTo(0, 0);

    console.log('✅ Portfolio initialized successfully!');
    console.log('📌 Keyboard shortcuts:');
    console.log('   - Ctrl + ↑/↓: Navigate sections');
    console.log('   - Ctrl + T: Toggle theme');
    console.log('🎨 Current theme:', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// ============================================
// 테마 프리셋 (선택적)
// ============================================

// CSS 변수를 통해 테마 변경
function changeThemeColor(primaryColor, primaryDark, primaryLight, secondary) {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', primaryColor);
    root.style.setProperty('--theme-primary-dark', primaryDark);
    root.style.setProperty('--theme-primary-light', primaryLight);
    root.style.setProperty('--theme-secondary', secondary);
    
    // 로컬 스토리지에 저장
    const themeColors = { primaryColor, primaryDark, primaryLight, secondary };
    localStorage.setItem('themeColors', JSON.stringify(themeColors));
}

// 테마 프리셋
const THEME_PRESETS = {
    green: {
        primary: '#10b981',
        primaryDark: '#059669',
        primaryLight: '#34d399',
        secondary: '#14b8a6'
    },
    purple: {
        primary: '#8b5cf6',
        primaryDark: '#7c3aed',
        primaryLight: '#a78bfa',
        secondary: '#ec4899'
    },
    blue: {
        primary: '#3b82f6',
        primaryDark: '#2563eb',
        primaryLight: '#60a5fa',
        secondary: '#06b6d4'
    },
    orange: {
        primary: '#f97316',
        primaryDark: '#ea580c',
        primaryLight: '#fb923c',
        secondary: '#f59e0b'
    }
};

// 테마 적용 함수 (콘솔에서 사용 가능)
function applyThemePreset(presetName) {
    const preset = THEME_PRESETS[presetName];
    if (preset) {
        changeThemeColor(preset.primary, preset.primaryDark, preset.primaryLight, preset.secondary);
        console.log(`✅ ${presetName} 테마가 적용되었습니다!`);
    } else {
        console.log('❌ 사용 가능한 테마:', Object.keys(THEME_PRESETS).join(', '));
    }
}

// 저장된 테마 색상 불러오기
const savedColors = localStorage.getItem('themeColors');
if (savedColors) {
    const colors = JSON.parse(savedColors);
    changeThemeColor(colors.primaryColor, colors.primaryDark, colors.primaryLight, colors.secondary);
}

// 전역으로 노출 (개발자 도구에서 사용 가능)
window.applyThemePreset = applyThemePreset;
window.THEME_PRESETS = THEME_PRESETS;