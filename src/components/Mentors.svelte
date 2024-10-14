<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import SvelteMarkdown from 'svelte-markdown';
  
    let popup_open = false;
    let target_val;
    let is_react = false;
    let data = [];
    let newBatch = [];
    let meta = {};
    let page = 1;
    let loading = false;
    let threshold = 100;
    let y;
    let mentorTypes = [];
  
    $: data = [
      ...data,
      ...newBatch
    ];
  
    function hotel_popup(e) {
      target_val = e.currentTarget.getAttribute("data-target");
      if (target_val) {
        popup_open = true;
      }
    }
  
    function close_popup() {
      popup_open = false;
    }
  
    function chatMessage(item) {
      var navigate = {
        type: "navigate",
        data: {
          route: "PeopleProfile",
          id: item.attributes.externalid
        }
      };
  
      var alert_data = {
        type: "alert",
        data: "Feature coming soon"
      };
      if (item.attributes.externalid) {
        window.ReactNativeWebView?.postMessage(JSON.stringify(navigate));
      } else {
        window.ReactNativeWebView?.postMessage(JSON.stringify(alert_data));
      }
    }
  
    async function getData() {
      loading = true;
      try {
        const response = await axios.get(`https://cms.startupmission.in/api/mentors?populate=*&pagination[page]=${page}&pagination[pageSize]=12`);
        newBatch = response.data.data;
        meta = response.data.meta;
        loading = false;
      } catch (error) {
        console.error('Error fetching mentor data:', error);
        loading = false;
      }
    }
  
    async function getMentorTypes() {
      try {
        const response = await axios.get('https://cms.startupmission.in/api/mentortypes?populate=*,mentors.image');
        mentorTypes = response.data.data;
      } catch (error) {
        console.error('Error fetching mentor types:', error);
      }
    }
  
    onMount(async () => {
      is_react = window.ReactNativeWebView && window.ReactNativeWebView.postMessage;
      getData();
      getMentorTypes();
    });
  
    function checkScroll() {
      let scroll_distance = document.body.scrollHeight - window.innerHeight;
      if (loading) return;
      if (y > scroll_distance - threshold) {
        if (page < meta.pagination.pageCount) {
          page++;
          getData();
        }
      }
    }
  </script>
  
  <svelte:window bind:scrollY={y} on:scroll={checkScroll} />
  
  <div class="sm:px-6 sm:m-0 m-4">
    <div class="">
      {#each mentorTypes as mentorType (mentorType.id)}
        <div>
          <h3 class="text-sm pt-8 pb-2 text-start font-semibold text-black">{mentorType.attributes.mentortype}</h3>
          <div class=" w-full flex flex-col gap-4 text-start items-start justify-start ">
            {#each mentorType.attributes.mentors.data as mentor (mentor.id)}
              <div class="p-3  w-full flex flex-col cursor-pointer" data-target="{mentor.id}" on:click={() => chatMessage(mentor)}>
                <div class="flex flex-row ">
                  {#if mentor.attributes.image.data}
                    <div class=" flex my-auto">
                      <img src="https://cms.startupmission.in{mentor.attributes.image.data.attributes.url}" class="my-auto  flex w-20 h-20 rounded-full border-[2.5px] border-huddle ">
                    </div>
                  {/if}
                  <div class="text-black flex flex-col px-3 text-start">
                    <div class="pb-0 text-base font-semibold pt-2">{mentor.attributes.name}</div>
                    <!-- <div class="p-2 text-sm"><SvelteMarkdown source={mentor.attributes.pname}></SvelteMarkdown></div> -->
                    <div class="text-sm">{mentor.attributes.designation}</div>
                    <div class="text-sm">{mentor.attributes.organisation}</div>

                    
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  
    {#if loading}
      <div class="flex items-center justify-center p-5">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    {/if}
  </div>
  
  {#if popup_open}
    <div class="container">
      <div class="fixed mx-auto inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white sm:m-1 m-4 rounded-xl relative shadow-2xl lg:w-2/4 md:w-3/4 w-full p-8 h-auto">
          <div>
            {#each data as mentor (mentor.id)}
              {#if target_val == mentor.id}
               
                <div>
                    {mentor.attributes.externalid}
                </div>

                {#if is_react}
                  <button on:click={() => chatMessage(mentor)} class="px-5 py-2 font-bold text-white bg-green-500 rounded-md">Chat</button>
                {/if}
  
                <button id="closeButton" on:click={close_popup} class="absolute top-3 right-3 rounded-full bg-slate-900 text-white closePopup">
                  <svg class="h-5 w-5" fill="white" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
  