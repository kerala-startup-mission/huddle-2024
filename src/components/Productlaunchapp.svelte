<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import SvelteMarkdown from 'svelte-markdown';
  
    let popup_open = false;
    let target_val;
    let is_react = false;
    let data = [];
    let filteredData = [];
    let sectors = [];
    let selectedSector = 'All';
    let showSectors = false; // Toggle for sector menu
  
    let newBatch = [];
    let meta = {};
    let page = 1;
  
    let loading = false;
    let threshold = 100;
    let y;
  
    $: data = [...data, ...newBatch];
    $: filteredData = selectedSector === 'All'
      ? data
      : data.filter(item => item.attributes.sector.toLowerCase() === selectedSector.toLowerCase());
  
    function hotel_popup(e) {
      target_val = e.currentTarget.getAttribute('data-target');
      if (target_val) {
        popup_open = true;
      }
    }
  
    function close_popup() {
      popup_open = false;
    }
  
    function chatMessage(item) {
      const navigate = {
        type: 'navigate',
        data: {
          route: 'PeopleProfile',
          id: item.attributes.External_ID,
        },
      };
  
      const alert_data = {
        type: 'alert',
        data: 'Feature coming soon',
      };
  
      if (item.attributes.External_ID) {
        window.ReactNativeWebView?.postMessage(JSON.stringify(navigate));
      } else {
        window.ReactNativeWebView?.postMessage(JSON.stringify(alert_data));
      }
    }
  
    async function getData() {
      loading = true;
  
      try {
        const response = await axios.get(
          `https://cms.startupmission.in/api/productlaunch2024s?populate=*&pagination[page]=${page}&pagination[pageSize]=100`
        );
        newBatch = response.data.data;
        meta = response.data.meta;
        loading = false;
  
        // Populate sectors
        const uniqueSectors = [
          ...new Set(response.data.data.map(item => item.attributes.sector)),
        ];
        sectors = ['All', ...uniqueSectors];
      } catch (error) {
        console.error('Error fetching data:', error);
        loading = false;
      }
    }
  
    onMount(async () => {
      is_react = window.ReactNativeWebView && window.ReactNativeWebView.postMessage;
      getData();
    });
  
    function checkScroll() {
      const scroll_distance = document.body.scrollHeight - window.innerHeight;
  
      if (loading) return;
  
      if (y > scroll_distance - threshold) {
        if (page < meta.pagination.pageCount) {
          page++;
          getData();
        }
      }
    }
  
    function selectSector(sector) {
      selectedSector = sector;
      showSectors = false; // Close dropdown
    }

    function formatUrl(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

  </script>
  
  <svelte:window bind:scrollY={y} on:scroll={checkScroll} />
  
  <div class="sm:px-6 sm:m-0 m-4">
 
    <div class="md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 grid-cols-1 grid gap-8">
      {#each filteredData as item (item.id)}
        <!-- Card -->
        <div
          class="pb-10 mb-8 relative flex flex-col cursor-pointer group"
          
        >
        {#if item.attributes.st_web}
        <a href="{formatUrl(item.attributes.st_web)}" target="_blank">
          {#if item.attributes.image?.data}
            <div class="overflow-hidden">
              <img
                src="https://cms.startupmission.in{item.attributes.image.data.attributes.url}"
                class="rounded-2xl group-hover:scale-110 duration-500"
              />
            </div>
          {/if}
          <div class="pt-2">
            <div
              class="text-black w-full text-start pb-2 text-lg flex font-normal"
              style="font-family: Jost, sans-serif;"
            >
              {item.attributes.name}
            </div>
          </div>
         
          <div
            class="h-0.5 bg-black bg-opacity-50 bottom-6 absolute z-[10] group-hover:bg-huddle w-full"
          >
            <div class="py-2 text-white" style="font-family: Jost, sans-serif;">
                <div class="text-xs flex gap-4 pt-1">
                   
                        <div class=" text-black">view</div>
                        <div class="w-fit rounded-full bg-black group-hover:bg-huddle duration-500 p-1">
                        <span>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-2"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                            />
                            </svg>
                        </span>
                        </div>
                   
                </div>
            </div>
          </div>
        </a>
        {:else}
        {#if item.attributes.image?.data}
        <div class="overflow-hidden">
          <img
            src="https://cms.startupmission.in{item.attributes.image.data.attributes.url}"
            class="rounded-sm group-hover:scale-110 duration-500"
          />
        </div>
      {/if}
      <div class="pt-2">
        <div
          class="text-white w-full text-start pb-2 text-lg flex font-normal"
          style="font-family: Jost, sans-serif;"
        >
          {item.attributes.name}
        </div>
      </div>
     
      <div
        class="h-0.5 bg-white bg-opacity-50 bottom-6 absolute z-[10] group-hover:bg-huddle w-full"
      >
        <div class="py-2 text-white" style="font-family: Jost, sans-serif;">
            <div class="text-xs flex gap-4 pt-1">
               
                    <div>view</div>
                    <div class="w-fit rounded-full bg-black group-hover:bg-huddle duration-500 p-1">
                    <span>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-2"
                        >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                        </svg>
                    </span>
                    </div>
               
            </div>
        </div>
      </div>
        {/if}
        </div>
      {/each}
    </div>
  
    {#if loading}
      <div class="flex items-center justify-center p-5">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    {/if}
  </div>
  
