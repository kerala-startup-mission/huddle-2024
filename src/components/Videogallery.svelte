<script>
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    import {Autoplay, Navigation} from 'swiper';
    import 'swiper/css';
    import "swiper/css/navigation";
    import programs from './data/video.json';

    let popup_open=false;
    let target_val='';
    let currentIndex = 0;

    function hotel_popup(e){
        target_val = e.currentTarget.getAttribute("data-target");
        if(target_val){
            popup_open=true;
        }
    }

    function close_popup(){
        popup_open=false;
    }

    
</script>

<div class="">
  
    <div class="md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid gap-4">
        {#each programs as program}
         <div class="relative flex items-center justify-center youtube-button spl_cursor" data-target="{program.youtube_id}" on:click={hotel_popup}>
            <img src={`https://img.youtube.com/vi/${program.youtube_id}/maxresdefault.jpg`} alt="" class="rounded-md">
            <img src="/img/play.png" alt="" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          </div>
        {/each}

    </div>
     
     {#if popup_open}
        <div class="z-[100]">
            <div class="fixed inset-0 flex mx-auto items-center justify-center bg-[#1c1a22e8] z-[100]">
                <div class="w-full h-full">
                    <div class="w-full h-full">
                        {#each programs as program}
                            {#if target_val==program.youtube_id}
                                <div class="w-full h-full flex gap-5 p-4 my-auto items-center justify-center">
                                    <div class="flex my-auto md:w-1/2 md:h-2/3 h-1/2">
                                        <iframe class="w-full h-full"   src={`https://www.youtube.com/embed/${program.youtube_id}`} frameborder="0" allowfullscreen></iframe>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>
                <button id="closeButton" on:click={close_popup} class="absolute p-3 m-2 top-3 right-3 rounded-full bg-black text-white closePopup">
                    <svg class="h-6 w-6" fill="white" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
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
        color: rgb(249 66 30 / var(--tw-text-opacity));
    }
</style>
