<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  
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
  let selectedStage = ''; // For dropdown filter
  let stpStages=[]

   // Store stp_stages
  
  // Updated mentor data with new stages
  $: filteredData = selectedStage ? 
    mentorTypes.map(mentorType => ({
      ...mentorType,
      attributes: {
        ...mentorType.attributes,
        mentors: {
          data: mentorType.attributes.mentors.data.filter(mentor =>
            mentor.attributes.stp_stages.data.some(stage => stage.attributes.stp_stage === selectedStage)
          )
        }
      }
    })) : mentorTypes;
  
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
      const response = await axios.get('https://cms.startupmission.in/api/mentortypes?populate=*,mentors.image,mentors.stp_stages');
      mentorTypes = response.data.data;

      // Extract stp_stages for the dropdown
      stpStages = [...new Set(
        mentorTypes.flatMap(mentorType =>
          mentorType.attributes.mentors.data.flatMap(mentor =>
            mentor.attributes.stp_stages.data.map(stage => stage.attributes.stp_stage)
          )
        )
      )];
    } catch (error) {
      console.error('Error fetching mentor types:', error);
    }
  }

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

  let showDropdown = false;
  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  function selectStage(stage) {
    selectedStage = stage;
    showDropdown = false;
  }
</script>

<svelte:window bind:scrollY={y} on:scroll={checkScroll} />

<div class="sm:px-6 sm:m-0 m-4">
  <!-- Dropdown for filtering by stage -->
  <!-- The SVG icon, acting as a clickable trigger for the dropdown -->
<div>

    <div class=" flex w-full justify-between ">
      <div class="flex  ">
        <!-- <p>{selectedStage || "All Stages"}</p> -->
      </div>
      <div class="flex">
        <div class=" flex flex-col">
          <button on:click={toggleDropdown} class="flex p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    {#if showDropdown}
    <!-- Dropdown menu -->
    <div class=" text-start w-full mt-2 rounded-md shadow-lg bg-white  bordr-b-0 ring-black ring-opacity-5 z-10">
      <div class="pt-1">
        <button on:click={() => selectStage("")} class="w-full border-b-2  text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Stages</button>
        {#each stpStages as stage}
          <button on:click={() => selectStage(stage)} class="w-full border-b-2 text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{stage}</button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<!-- Display the selected stage -->
<!-- <p>Selected Stage: {selectedStage || "All Stages"}</p> -->
  <div class="">
    {#each filteredData as mentorType (mentorType.id)}
      <div>
        <h3 class="text-xs pt-8 pb-2 text-start font-semibold text-black uppercase">
          {mentorType.attributes.mentortype}
        </h3>
        <div class="w-full flex flex-col gap-2 text-start items-start justify-start">
          {#each mentorType.attributes.mentors.data as mentor (mentor.id)}
            <div class="py-1 w-full flex flex-col cursor-pointer" data-target="{mentor.id}" on:click={() => chatMessage(mentor)}>
              <div class="flex flex-row">
                {#if mentor.attributes.image.data}
                  <div class="flex my-auto">
                    <img src="https://cms.startupmission.in{mentor.attributes.image.data.attributes.url}" class="my-auto flex w-16 h-16 rounded-full border-[2.9px] border-huddle">
                  </div>
                {/if}
                <div class="text-black flex flex-col px-3 text-start">
                  <div class="pb-0 text-sm font-semibold pt-2">{mentor.attributes.name}</div>
                  <div class="text-xs">{mentor.attributes.designation}</div>
                  <div class="text-xs">{mentor.attributes.organisation}</div>
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
              <div>{mentor.attributes.externalid}</div>

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
