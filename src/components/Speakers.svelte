<script>
  import {onMount} from 'svelte';

  let speaker_list = [];

  export let title;
  export let label;
  export let category;

  let full_view = true;

  function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return curtop;
    }
  }

  function handleView(e) {
    full_view = true;

    console.log(findPos(document.getElementById("speakers"))+1, findPos(document.getElementById("speakers")) );

    window.scroll({
      left:0,
      top:findPos(document.getElementById(category))+500, 
      behavior:'smooth'
    });

  }

  onMount(()=>{
    fetch(`https://events.startupmission.in/api/event/huddle-global-2024/speakers?category=${category}`)
        .then(response => response.json())
        .then((json) => {
          speaker_list = json;
        });
  });

</script>


{#each Object.entries(speaker_list) as [category, speakers]}
  <div class="mx-auto speakers__container overflow-hidden { full_view ? "" : "max-h-[1000px]"} openTrans relative">

    <div class="grid grid-cols-2 gap-3  lg:grid-cols-5 md:gap-10 md:grid-cols-4 sm:gap-5">

      <div class="mb-20 text-center flex flex-col justify-center">
        <h1 class="md:text-4xl text-2xl font-black text-white">{title}</h1>
      </div>

      {#each speakers as {name, designation, organisation, photo, linkedin}}

        <div class="max-w-[18rem] speaker">
      
          <div class="bg-cover rounded-2xl h-[16rem]  w-full mx-auto  cursor-pointer bg-center" style={ 'background-image: url(' +photo+');' }>

            {#if linkedin}
              <a class="linkedin" href={linkedin} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-linkedin" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                  <line x1="8" y1="11" x2="8" y2="16"></line>
                  <line x1="8" y1="8" x2="8" y2="8.01"></line>
                  <line x1="12" y1="16" x2="12" y2="11"></line>
                  <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
                </svg>
              </a>
            {/if}
  
            

          </div>

          <div class="content">
            <h3>{name}</h3>
            <p>{designation}</p>
            {#if organisation}
              <p>{organisation}</p>
            {/if}
            <div class="mt-2 h-1 w-20 bg-yellow-400"></div>
          </div>
      
        </div>
        
      {/each}
    </div>

    {#if !full_view}
      <div  class="flex items-center justify-center bg-gradient-to-t from-huddle from-25% via-[#c70000bd] to-transparent h-24 bottom-0 absolute w-full z-[10]">
        <button on:click={handleView} class="border border-white text-white rounded-full px-5 py-3">
          View More
        </button>
      </div>
    {/if}


  </div>
{/each}


<style lang="scss">
  .openTrans{
    transition: max-height .45s cubic-bezier(.44, .99, .48, 1);
  }

  .speaker{
    position: relative;
    //width: 100%;
    overflow: hidden;

    &:hover{
      &::after{
        top: 0;
      }

      .content{
        top: 30%;
        p{
          visibility: visible;
        }
      }

      .linkedin{
        right: 20px;
      }
    }

    .linkedin{
      position: absolute;
      top: 20px;
      right: -30px;
      transition: all 500ms ease;
      z-index: 2;
      color: #00afef;
    }

    .content{
      position: absolute;
      top: 78%;
      z-index: 2;
      padding: 3px 10px 15px 10px;
      transition: all 500ms ease;
      color: white;
      
      h3{
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: .5rem;
        

      }

      p{
        font-size: .9rem;
        font-weight: 300;
        
        visibility: hidden;
        transition: all 500ms ease;
      }
    }

    
      &::after{
        position: absolute;
        content: '';
        left: 0;
        top: 75%;
        border: 15px;
        right: 0;
        bottom: 0;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1;
        transition: all 500ms ease
      }
      
  }
</style>