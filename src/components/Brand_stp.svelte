<script>
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    import {Autoplay, Navigation} from 'swiper';
    import 'swiper/css';
    import "swiper/css/navigation";
    import programs from './data/branding_stp.json';

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

  <div class=" px-6 ">
  
    <div class="md:grid-cols-4 sm:grid-cols-2 grid-cols-1 grid gap-6">
        {#each programs as program}
            <div class="pb-10 mb-8 relative flex flex-col cursor-pointer group" data-target="{program.id}" on:click={hotel_popup}>
                <div class="overflow-hidden">
                    <img src="/img/{program.image}" class="rounded-sm group-hover:scale-110 duration-500">
                </div>
                <div class="pt-2 ">
                    <div class="text-white w-full  text-start pb-2 text-lg flex font-normal" style="font-family: Jost, sans-serif;">{program.title}</div>
                </div>
                <div class="h-0.5 bg-white bg-opacity-50 bottom-4 absolute z-[10]  group-hover:bg-huddle w-full">
                    <div class="py-2 text-white" style="font-family: Jost, sans-serif;">
                        <div class="text-xs flex gap-4 pt-2 ">
                            <div>
                                Read More
                            </div>
                            <div class="w-fit rounded-full bg-black group-hover:bg-huddle duration-500 p-1">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>

     
{#if popup_open}

  <div class="" >
        <div  class="fixed inset-0 flex mx-auto  items-center justify-center z-50 bg-black bg-opacity-50 ">
    
            <div class=" bg-white  rounded-md p-1 relative shadow-2xl lg:w-4/5 md:w-3/4 m-8 w-full">

                <div class=" ">
                    {#each programs as program}
        
                        {#if target_val==program.id}
                        <div class=" text-black my-auto    md:text-xl text-lg  p-2 mx-auto flex items-center justify-center font-bold" >{program.title}</div>

                            <div class=" md:flex-row flex-col flex gap-5 p-4 pt-0 my-auto items-center justify-center">
                                <div class=" md:w-1/3 flex my-auto">
                                    <img src="/img/{program.image1}" class="w-full object-contain  mx-auto my-auto flex">
                                </div>
                               <div class=" flex flex-col md:w-2/3 ">
                                <div class=" flex flex-col">
                                   
                                    <div class=" text-black  md:text-base text-xs text-justify font-extralight py-3" >{program.desc}</div>
                                    <div class=" text-black px-3 text-xs">
                                        {#if program.mandatory1}
                                        <h1 class=" text-xs font-semibold">Highlights</h1>
                                        <ul class=" list-disc list-inside">
                                              <li>{program.mandatory1}</li>
                                              <li>{program.mandatory2}</li>
                                        </ul>
                                        {/if}
                                        {#if program.mandatory3}
                                       
                                        <ul class=" list-disc list-inside">
                                              <li>{program.mandatory3}</li>
                                              <li>{program.mandatory4}</li>
                                        </ul>
                                        {/if}
                                    </div>
                                </div>
                                <div class=" flex items-end justify-end flex-col">
                                    <div class=" text-black md:text-sm  text-xs  md:pt-3 pt-1 pb-1 font-semibold" >{program.tech}</div>
                                    <div class=" text-black md:text-sm  text-xs font-extralight md:py-2 py-1  " >{program.details}</div>
                                    <div class=" text-huddle  md:text-sm text-xs font-extralight " >{program.details1}</div>
    
                                </div>
                               {#if program.link}
                               <div class="">
                                <a href="{program.link}" target="_blank" class=" text-sm   bg-huddle text-white px-2 py-1">For More details</a>
                            </div>
                               {/if}
                               </div>
                            </div>
                           
                    
                        {/if}
         
                    {/each}
      
                    <button id="closeButton"  on:click={close_popup} class="absolute m-2 top-1  right-0 rounded-full bg-slate-900 text-white closePopup " >
                      <svg class="h-4 w-4" fill="white" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
          height: 14rem;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        
          
      }
      
      .card-title:hover {
          cursor: default;
          color: rgb(249 66 30 / var(--tw-text-opacity));
      }
  </style>
  

