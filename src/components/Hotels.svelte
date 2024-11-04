<script>
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    import { Autoplay, Navigation } from 'swiper';
    import 'swiper/css';
    import "swiper/css/navigation";
    import programs from './data/programs_track.json';

    let popup_open = false;
    let target_val;

    function hotel_popup(e) {
        target_val = e.currentTarget.getAttribute("data-target");
        if (target_val) {
            popup_open = true;
        }
    }

    function close_popup() {
        popup_open = false;
    }

    // Function to generate star rating
    function getStarRating(starCount) {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= starCount ? '★' : '☆'); // Filled star for ratings, empty for not rated
        }
        return stars.join(''); // Join the stars to display in one string
    }
</script>

<div class="mt-8 px-6">
    <div class="md:grid-cols-4 sm:grid-cols-2 grid-cols-1 grid gap-6">
        {#each programs as program}
            <div class="pb-16 mb-8 relative flex flex-col cursor-pointer group" data-target="{program.id}" on:click={hotel_popup}>
                <div class="overflow-hidden">
                    <img src="/img/{program.image}" class="rounded-sm group-hover:scale-110 duration-500">
                </div>
                <div class="pt-2 ">
                    <div class="text-white w-full pt-4 text-start pb-2 text-lg flex font-normal" style="font-family: Jost, sans-serif;">{program.title}</div>
                    <div class="items-end justify-end absolute bottom-6 text-yellow-500">{getStarRating(program.star)}</div> <!-- Star Rating Display -->
                </div>
                <div class="h-0.5 bg-white bg-opacity-50 bottom-4 absolute z-[10] group-hover:opacity-50 group-hover:bg-huddle w-full">
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
        <div class="">
            <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 m-6 ">
                <div class="bg-white p-6 rounded-md max-w-4xl">
                    <div class="rounded-lg relative ">
                        {#each programs as program}
                            {#if target_val == program.id}
                                <div class="md:flex-row flex-col flex gap-5">
                                    <div class="md:w-1/2 flex my-auto">
                                        <img src="/img/{program.image}" class="w-full h-64 mx-auto my-auto flex">
                                    </div>
                                    <div class="md:w-1/2 flex flex-col py-4">
                                        <div class="text-black text-xl font-extralight text-start">{program.title}</div>
                                        <div class="text-black text-sm font-extralight py-3 text-start">{program.address}</div>
                                        <div class="text-black text-sm font-extralight py-3 text-start">{program.number}</div>
                                        <div class=" text-yellow-500 text-start">{getStarRating(program.star)}</div> <!-- Star Rating Display -->

                                        <div class="flex gap-4 pt-6">
                                            {#if program.website}
                                                <div class="text-white bg-huddle px-2 text-center items-center justify-center flex ">
                                                    <a href={program.website ?? "#"} class="text-xs text-center items-center justify-center flex p-2" target="_blank">WEBSITE</a>
                                                </div>
                                            {/if}
                                            <div class="text-black border-2 bg-white px-2 text-center items-center justify-center flex border-black">
                                                <a href={program.location ?? "#"} class="text-xs text-center items-center justify-center flex p-2" target="_blank">LOCATION</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                        <button id="closeButton" on:click={close_popup} class="absolute -top-3 -right-3 rounded-full bg-slate-900 text-white closePopup">
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
