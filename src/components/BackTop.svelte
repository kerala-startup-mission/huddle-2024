<script>
  let y = 0;

  $: scrolled = y > 150;

  function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
  }

  const handleNav = (e) => {

    e.preventDefault()
    let button = e.target.closest('[data-target]');
    let target = button.getAttribute('data-target');
    let offset = button.getAttribute('data-offset');
    
    window.scroll({
      left:0,
      top:findPos(document.getElementById(target))-offset, 
      behavior:'smooth'
    });

  }

</script>

<svelte:window bind:scrollY={y}/>

<div on:click={handleNav} data-target="home" data-offset="0" class="{scrolled ? 'fixed' : 'hidden'} bottom-5 right-5 cursor-pointer bg-white rounded-full w-14 h-14 flex items-center justify-center z-50 text-huddle">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
  </svg>  
</div>