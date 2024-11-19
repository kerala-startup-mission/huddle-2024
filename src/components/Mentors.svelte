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

<div class="sm:px-6 px-4">
  <!-- Dropdown for filtering by stage -->
  <!-- The SVG icon, acting as a clickable trigger for the dropdown -->
<div>

    <!-- <div class=" flex w-full justify-between ">
      <div class="flex  ">
        <p>{selectedStage || "All Stages"}</p>
      </div>
      <div class="flex">
        <div class=" flex flex-col">
          <button on:click={toggleDropdown} class="flex p-2">
            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_271_2)">
              <path d="M6.00161 9V16.88C5.96161 17.18 6.06161 17.5 6.29161 17.71C6.68161 18.1 7.31161 18.1 7.70161 17.71L9.71161 15.7C9.94161 15.47 10.0416 15.16 10.0016 14.87V9H10.0316L15.7916 1.62C16.1316 1.19 16.0516 0.56 15.6216 0.22C15.4316 0.08 15.2216 0 15.0016 0H1.00161C0.781607 0 0.571606 0.08 0.381606 0.22C-0.0483939 0.56 -0.128394 1.19 0.211606 1.62L5.97161 9H6.00161Z" fill="#C70000"/>
              </g>
              <defs>
              <clipPath id="clip0_271_2">
              <rect width="17.0013" height="18.0025" fill="white" transform="matrix(-1 0 0 1 17.0015 0)"/>
              </clipPath>
              </defs>
              </svg>
              
          </button>
        </div>
      </div>
    </div> -->

    <!-- Dropdown menu -->
    <div class="text-start  rounded-md bordr-b-0 z-10">
      <div class="pt-1 flex flex-row flex-wrap gap-2">
        <!-- Button for "All" stages -->
        <button 
          on:click={() => selectStage("")} 
          class="rounded-full border border-black text-center p-2 px-3 text-xs 
          {selectedStage === '' ? 'bg-huddle text-white' : 'text-gray-700 hover:bg-gray-100'}">
          All
        </button>
    
        <!-- Buttons for each stage -->
        {#each stpStages as stage}
          <button 
            on:click={() => selectStage(stage)} 
            class="rounded-full border border-black text-center p-2 px-3 text-xs 
            {selectedStage === stage ? 'bg-huddle text-white' : 'text-gray-700 hover:bg-gray-100'}">
            {stage === "Beta Launched/ Early Revenue stage" ? "Revenue stage" : stage}
          </button>
        {/each}
      </div>
    </div>
    
    
</div>

<!-- Display the selected stage -->
<!-- <p>Selected Stage: {selectedStage || "All Stages"}</p> -->
  <div class=" py-0">
    {#each filteredData as mentorType (mentorType.id)}
      <div>
        <h3 class="text-xs pt-6 pb-2 text-start font-semibold text-black uppercase">
          {mentorType.attributes.mentortype}
        </h3>
        <div class="w-full flex flex-col gap-2 text-start items-start justify-start">
          {#each mentorType.attributes.mentors.data as mentor (mentor.id)}
            <div class="py-1 w-full flex flex-col cursor-pointer" data-target="{mentor.id}" on:click={() => chatMessage(mentor)}>
             <div class=" flex  justify-between">
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
                {#if mentor.attributes.calendar_view}
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z" stroke="#C70000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                {/if}
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
