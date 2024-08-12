<script>
    import { onMount } from 'svelte';
    import axios from 'axios';

    let data = [];
    let loading = false;

    async function getData() {
        loading = true;

        try {
            const response = await axios.get(`https://cms.startupmission.in/api/partnershiptypes?populate=*,partners.Image`);
            data = response.data.data;

            // Sort data based on the order attribute of partnership types
            data.sort((a, b) => a.attributes.order - b.attributes.order);

            // Sort each partner within each partnership type based on the order attribute of partners
            data.forEach(item => {
                if (item.attributes.partners && item.attributes.partners.data.length > 0) {
                    item.attributes.partners.data.sort((a, b) => a.attributes.order - b.attributes.order);
                }
            });

            console.log(data);
            loading = false;
        } catch (error) {
            console.error('Error fetching data:', error);
            loading = false;
        }
    }

    onMount(getData);
</script>

<div class="px-8 items-center justify-center text-center mx-auto">
    <div class="flex flex-wrap justify-center items-center text-centergap-2">
        {#each data as item (item.id)}
            {#if item.attributes.partners && item.attributes.partners.data.length > 0}
                <div class={"flex flex-col flex-wrap text-center mx-auto items-center justify-center " + ((item.attributes.partners.data.length > 7) ? "md:col-span-7" : "md:col-span-" + item.attributes.partners.data.length)}>
                    <div class="text-center pb-2 pt-6">
                        {#if item.attributes.Type}
                            <h2 class="text-sm font-semibold text-white">{item.attributes.Type}</h2>
                        {/if}
                    </div>
                    <div class="flex flex-wrap flex-row gap-2 items-center justify-center">
                        {#each item.attributes.partners.data as partner (partner.id)}
                            {#if partner.attributes.Websitelink}
                                <a href={partner.attributes.Websitelink} target="_blank" class="rounded-md w-32 md:w-40 md:h-24">
                                    <img src={"https://cms.startupmission.in" + partner.attributes.Image.data.attributes.url} alt={partner.attributes.Label} class="w-full h-full rounded-md mb-2" />
                                </a>
                            {:else}
                                <a class="rounded-md w-32 md:w-40 md:h-24">
                                    <img src={"https://cms.startupmission.in" + partner.attributes.Image.data.attributes.url} alt={partner.attributes.Label} class="w-full h-full rounded-md mb-2" />
                                </a>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}
    </div>

    {#if loading}
        <div class="flex items-center justify-center mt-4">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
        </div>
    {/if}
</div>

<div class="px-8 pt-6 items-center justify-center text-center mx-auto">
    <div class="flex flex-wrap justify-center items-center text-centergap-2">
        <div class="flex flex-col flex-wrap text-center mx-auto items-center justify-center">
            <div class="text-center pb-2">
                <h2 class="text-sm font-semibold text-white">Powered by</h2>
            </div>
            <div class="flex flex-wrap flex-row gap-2 items-center justify-center">
                <a href="https://keralait.org/" target="_blank" class="rounded-md w-32 md:w-40 md:h-24">
                    <img src="/img/partners/keralait.png" alt="" class="w-full h-full rounded-md mb-2">
                </a>
                <a href="https://startupmission.kerala.gov.in/" target="_blank" class="rounded-md w-32 md:w-40 md:h-24">
                    <img src="/img/partners/ksum.png" alt="" class="w-full h-full rounded-md mb-2">
                </a>
            </div>
        </div>
    </div>
</div>
