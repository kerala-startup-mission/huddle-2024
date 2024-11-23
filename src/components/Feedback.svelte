<script>

  import Utensils from 'lucide-svelte/icons/utensils';
  import Bath from 'lucide-svelte/icons/bath';
  import ClipboardList from 'lucide-svelte/icons/clipboard-list';
  import Car from 'lucide-svelte/icons/car';
  import Star from 'lucide-svelte/icons/star';
  import MicVocal from 'lucide-svelte/icons/mic-vocal';

  let feedbacks = [
    {
      name: "Registration",
      icon: ClipboardList,
      campaign_id: "KKbSKG3UQcNTuxfvKYMJ9RQs",
      journey: "feedback",
    },
    {
      name: "Parking",
      icon: Car,
      campaign_id: "3YCLyamjeNJPAQKePN3dFJ3H",
      journey: "feedback",
    },
    {
      name: "Washroom",
      icon: Bath,
      campaign_id: "NcS2T4zwEbud7sbB3N4VUPW6",
      journey: "feedback",
    },
    {
      name: "Food",
      icon: Utensils,
      campaign_id: "oraECAR8M8aoVcQ4L8vr7iNn",
      journey: "feedback",
    },
    {
      name: "Sound System",
      icon: MicVocal,
      campaign_id: "bqVKjTkjbo6fvao8qoNLTXrR",
      journey: "feedback",
    },
    {
      name: "Overall Experience",
      icon: Star,
      campaign_id: "yWnEy3hBisodFtpjYSMPJRQb",
      journey: "feedback",
    },
  ];

  function Navigate(feedback) {

    var navigate = {
      type: "navigate",
      data: {
        route: "Feedback",
        campaign: feedback.campaign_id,
        journey: feedback.journey,
        point: 'App'
      }
    };
  
    var alert_data = {
      type: "alert",
      data: "Feature Not Available"
    };

    window.ReactNativeWebView?.postMessage(JSON.stringify(navigate));

  }

</script>

<div class="space-y-4">
  {#each feedbacks as feedback}
    <div class="flex p-5 border rounded-lg  gap-3 items-center hover:bg-gray-200 cursor-pointer" on:click={() => Navigate(feedback)}>
      <div class="text-huddle">
        <svelte:component this={feedback.icon}  />
      </div>
      <div class=" text-xl">
        {feedback.name}
      </div>
    </div>
  {/each}

</div>