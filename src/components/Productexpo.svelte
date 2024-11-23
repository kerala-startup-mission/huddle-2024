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
          `https://cms.startupmission.in/api/productexpo2024s?populate=*&pagination[page]=${page}&pagination[pageSize]=100`
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
  </script>
  
  <svelte:window bind:scrollY={y} on:scroll={checkScroll} />
  
  <div class="sm:px-6 sm:m-0 m-4">
    <!-- Filter Icon -->
    <div class=" mb-4  items-end justify-end flex flex-col">
      <button on:click={() => (showSectors = !showSectors)} class="p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>
      </button>
  
      {#if showSectors}
        <div class=" left-0 z-10 bg-white shadow-lg rounded mt-2 md:w-1/3 sm:w-2/3 w-full h-52 overflow-x-hidden overflow-y-scroll">
          {#each sectors as sector}
            <div
              on:click={() => selectSector(sector)}
              class="px-4 py-2 text-black cursor-pointer text-start hover:bg-gray-100"
            >
              {sector}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  
    <div class="md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 grid-cols-1 grid gap-8">
      {#each filteredData as item (item.id)}
        <!-- Card -->
        <div
          class="pb-10 mb-8 relative flex flex-col cursor-pointer group"
          data-target="{item.id}"
          on:click={hotel_popup}
        >
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
          <div class="pt-2">
            <div
              class="text-white w-full text-start text-xs flex font-normal"
              style="font-family: Jost, sans-serif;"
            >
              {item.attributes.sector}
            </div>
          </div>
          <div
            class="h-0.5 bg-white bg-opacity-50 bottom-6 absolute z-[10] group-hover:bg-huddle w-full"
          >
            <div class="py-2 text-white" style="font-family: Jost, sans-serif;">
              <div class="text-xs flex gap-4 pt-1">
                <div>Read More</div>
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
  
  {#if popup_open}
    <!-- Popup Content -->
    <!-- Content code remains the same -->
  {/if}
  
  
  {#if popup_open}
    <div>
      <div
        class="fixed inset-0 flex mx-auto items-center justify-center z-50 bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-md p-4 relative shadow-2xl lg:w-3/4 md:w-3/4 m-8 w-full">
          <div>
            {#each data as item (item.id)}
              {#if target_val == item.id}
               
  
                <div
                  class="md:flex-row flex-col flex gap-5 p-4 pt-0 my-auto"
                >
                  {#if item.attributes.image?.data}
                    <div class="md:w-1/4 w-52 flex my-auto border items-center justify-center">
                      <img
                        src="https://cms.startupmission.in{item.attributes.image.data.attributes.url}"
                        class="w-full object-contain  my-auto flex items-center justify-center mx-auto"
                      />
                    </div>
                  {/if}
                  <div class="flex flex-col md:w-2/3 p-2">
                    <div class="text-black my-auto md:text-xl text-lg flex  font-bold">
                        {item.attributes.name}
                    </div>
                    <div class="flex h-full w-full">
                      <div
                        class="mt-4 text-black text-justify mb-4 md:text-base text-xs"
                      >
                        <SvelteMarkdown source={item.attributes.desc}></SvelteMarkdown>
                      </div>
                    </div>
                    <div class=" text-xs italic text-start items-start justify-start">
                        {item.attributes.sector}
                    </div>
                  </div>
                </div>
                {#if is_react}
                  <button
                    on:click={() => chatMessage(item)}
                    class="px-5 py-2 font-bold text-white bg-green-500 rounded-md"
                  >
                    Chat
                  </button>
                {/if}
              {/if}
            {/each}
  
            <button
              id="closeButton"
              on:click={close_popup}
              class="absolute m-2 top-1 right-0 rounded-full bg-slate-900 text-white closePopup"
            >
              <svg
                class="h-4 w-4"
                fill="white"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
  