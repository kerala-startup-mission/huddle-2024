<script>
    import programs from './data/programs_places.json';

    let popup_open = false;
    let target_val;
</script>

<div class="mt-8 px-6">
    <div class="md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 grid gap-3">
        {#each programs as program}
        <a href={program.location ?? "#"} target="_blank">
            <div class=" relative cursor-pointer  group hover:opacity-70 hover:bg-black h-[40vh] overflow-hidden hover:duration-700">
                <img src={`/img/${program.image}`} alt={program.title} class="w-full h-full object-cover hover:scale-125 duration-700">
                <div class="tooltip absolute bottom-0 right-0 m-3 bg-black text-white text-sm p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-end flex z-40">
                    {program.title}
                </div>
                <div class="location-icon absolute bottom-0 left-0 m-3">
                    <img src="/img/hotels/icons8-location-64.png" class="w-8 h-8 opacity-90">
                </div>
            </div>
        </a>
        {/each}
    </div>
</div>

<style>
    .card {
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
        position: relative;
    }
    .tooltip {
        background-color: rgb(0, 0, 0);
        color: white;
        padding: 5px;
        border-radius: 5px;
        text-align: center;
        white-space: nowrap;
    }
    .location-icon {
        pointer-events: none;
    }
</style>
