// 부드러운 스크롤 및 ScrollSpy 초기화
document.addEventListener('DOMContentLoaded', function(){
  const { body } = document;
  const nav = document.querySelector('[data-bs-spy="scroll"]');
  if(nav){
    bootstrap.ScrollSpy.getOrCreateInstance(body, { target: '#mainNav', offset: 80 });
  }
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href && href.length > 1){
        const el = document.querySelector(href);
        if(el){
          e.preventDefault();
          el.scrollIntoView({ behavior:'smooth', block:'start' });
          history.replaceState(null, '', href);
        }
      }
    });
  });
});


