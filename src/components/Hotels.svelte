<script>
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    import {Autoplay, Navigation} from 'swiper';
    import 'swiper/css';
    import "swiper/css/navigation";
    import programs from './data/programs_track.json';

    let popup_open=false;
    let target_val


    function hotel_popup(e){
         target_val=e.currentTarget.getAttribute("data-target");
        if(target_val){
      
        popup_open=true;
        }

    }

    function close_popup(){
        popup_open=false;

    }
  </script>
  <div class="mt-8 px-6">
  
<div class=" md:grid-cols-4 sm:grid-cols-2 grid-cols-1 grid gap-10">
    {#each programs as program}
         

    <div class="card relative cursor-pointer " data-target="{program.id}" on:click={hotel_popup} style="background-image: url('/img/{program.image}');">
    <div class="  text-white bg-black w-full bg-opacity-50 bottom-0 absolute p-3 " >{program.title}</div>
  </div>

{/each}


</div>
     
{#if popup_open}

  <div class="" >
        <div  class="fixed inset-0 flex  items-center justify-center z-50 bg-black bg-opacity-50 m-6 ">
    
            <div class=" bg-white  p-6">

                <div class=" rounded-lg relative ">
                    {#each programs as program}
        
                        {#if target_val==program.id}
                            <div class=" md:flex-row flex-col flex gap-5">
                                <div class=" md:w-1/2 flex my-auto">
                                    <img src="/img/{program.image}" class="w-full  h-64  mx-auto my-auto flex">
                                </div>
                                <div class=" md:w-1/2 flex flex-col py-4">
                                    <div class=" text-black  text-xl font-extralight text-start" >{program.title}</div>
                                    <div class=" text-black  text-xs font-extralight py-3 text-start" >{program.address}</div>
                                    <div class=" text-black  text-xs font-extralight py-3 text-start" >{program.number}</div>
                                    <div class=" flex gap-4 pt-6">
                                        {#if program.website}
                                        <div class=" text-white bg-huddle px-3 py-1">
                                            <a href={program.website??"#"} class="text-sm"  target="_blank">WEBSITE</a>
                                        </div>
                                        {/if}
                                        <div class=" text-black border-2 bg-white px-3 py-1 border-black">
                                            <a href={program.location??"#"}  class="text-sm" target="_blank">LOCATION</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                        {/if}
         
                    {/each}
      
                    <button id="closeButton"  on:click={close_popup} class="absolute -top-3 -right-3 rounded-full bg-slate-900 text-white closePopup " >
                      <svg class="h-5 w-5" fill="white" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                   
                </div>
            </div>
        </div>
  </div>

{/if}
  
</div>
  <style>
      .card {
          background-color: white;
          border-radius: 1rem;
          border-bottom-left-radius: 0;
          height: 18rem;
          box-shadow: 2px 2px 2px 2px rgba(0,0,0,.5);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          
      }
      .card-title {
          font-family: 'Josefin Sans', 'sans-serif';
          
          font-size: 1.25rem;
      }
      .card-title:hover {
          cursor: default;
          color: rgb(249 66 30 / var(--tw-text-opacity));
      }
  </style>
  

