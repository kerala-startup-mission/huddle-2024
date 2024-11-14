<script>
    import { onMount, onDestroy } from "svelte";
    let currentIndex = 0;
    let locations =
    [

    {
        "title": "The Leela Kovalam, a Raviz Hotel",
        "image": "/img/hotels/leela.png",
       
        "star":5
    },
    {
        "title": "Gokulam Grand Turtle on the Beach",
        "image": "/img/hotels/turtile-on-beach-main-image 1.png",
        
        "star":5
    },
    {
        "title": "Swagath Holiday Resorts",
        "image": "/img/hotels/gallery6 1.png",
        
        "star":3
    },
    {
        "title": "Getaway Beach Resort Kovalam",
        "image": "/img/hotels/head-1536x1010 1.png",
       
        "star":4
    },

    {
        "title": "Hotel Sea Face Kovalam",
        "image": "/img/hotels/banner1 1.png",
       
        "star":3
    },

    {
        "title": "The Neelakanta",
        "image": "/img/hotels/v1-3 1.png",
       
        "star":3
    },
  
   {
       "title": "Poovar Island",
       "image": "/img/hotels/p1.jpg",
       "location":"https://www.google.com/maps/place/Poovar+Island+Resort/@8.3073682,77.0817971,17z/data=!3m1!4b1!4m9!3m8!1s0x3b05a999ab9f3cc3:0x1f8fe8eaeee7badd!5m2!4m1!1i2!8m2!3d8.3073682!4d77.0817971!16s%2Fg%2F11b5s2df6t?authuser=0&hl=en&entry=ttu"
      
   },
   {
       "title": "Kovalam Beach",
       "image": "/img/hotels/p2.jpg",
       "location":"https://www.google.com/maps/place/Kovalam+Tourist+Village/@8.4105547,76.9767275,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05a51064555555:0x47d0c99366c53e83!8m2!3d8.4105547!4d76.9767275!16s%2Fg%2F11sskrmk1g?authuser=0&hl=en&entry=ttu"
      
   },
   {
       "title": "Aazhimala Siva Temple",
       "image": "/img/hotels/p3.jpg",
       "location":"https://www.google.com/maps/place/Azhimala+Beach/@8.3570401,77.012581,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05afe08fdc2c3d:0xed1b59f59b65ee1e!8m2!3d8.3570401!4d77.012581!16s%2Fg%2F11qqc2d3s7?authuser=0&hl=en&entry=ttu"
      
   },
   {
       "title": "Vizhinjam Lighthouse",
       "image": "/img/hotels/p4.jpg",
       "location":"https://www.google.com/maps/place/Vizhinjam+Lighthouse+(Kovalam+Lighthouse)/@8.3825726,76.9804753,17.25z/data=!4m14!1m7!3m6!1s0x3b05a5960e90dc0f:0x6c20be6dc7c83670!2sVizhinjam+Lighthouse+(Kovalam+Lighthouse)!8m2!3d8.3829234!4d76.9798227!16s%2Fm%2F011x3w7z!3m5!1s0x3b05a5960e90dc0f:0x6c20be6dc7c83670!8m2!3d8.3829234!4d76.9798227!16s%2Fm%2F011x3w7z?authuser=0&hl=en&entry=ttu"
      
   },
   {
       "title": "Pozhikkara Beach",
       "image": "/img/hotels/p5.jpg",
       "location":"https://www.google.com/maps/place/Pozhikkara+Beach/@8.4248334,76.9577427,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05a5b8ca4fa201:0x6f764ee057e4ba0c!8m2!3d8.4248334!4d76.9577427!16s%2Fg%2F11j5jgdz0g?authuser=0&hl=en&entry=ttu"
      
   },
   {
       "title": "Rock Cut Cave Temple",
       "image": "/img/hotels/p6.jpg",
       "location":"https://www.google.com/maps/place/Rock+Cut+Cave+Temple/@8.3825061,76.991425,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05a596a1439201:0xef06cdc9b13da2e!8m2!3d8.3825061!4d76.991425!16s%2Fm%2F02rjsgl?authuser=0&hl=en&entry=ttu"
      
   },
   {
       "title": "Chowara Beach",
       "image": "/img/hotels/p7.jpg",
       "location":"https://www.google.com/maps/place/Chowara+Beach/@8.3561421,77.012179,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05af55072742ed:0x2e6e6dee4507696c!8m2!3d8.3561421!4d77.012179!16s%2Fg%2F11n0thjd63?authuser=0&hl=en&entry=ttu"
      
   },
   {
       "title": "Somatheeram Beach",
       "image": "/img/hotels/p8.jpg",
       "location":"https://www.google.com/maps/place/Somatheeram+Beach/@8.3550661,77.0150218,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05a986372cfba1:0xfe3274b92917af52!8m2!3d8.3550661!4d77.0150218!16s%2Fg%2F11ng55fp9c?authuser=0&hl=en&entry=ttu"
      
   },

    {
        "title": "Pop Tavern Private Pool Villa Kovalam by VOYE HOMES",
        "image": "/img/hotels/3d6fc98a-ee43-4a0b-b4ad-b8c3ce9ae34b 1.png",
       
        "star":4.5
    },
    {
        "title": "Country Club Kovalam Beach",
        "image": "/img/hotels/Clubbing 1.png",
      
        "star":3
    },
    {
        "title": "KTDC Samudra",
        "image": "/img/hotels/samudra-inner-banner 1.png",
        
        "star":3
    },
    {
        "title": "The Byke Puja Samudra Beach Resort Kovalam",
        "image": "/img/hotels/Exter-13 1.png",
       
        "star":3
    },
    {
        "title": "Uday Samudra Leisure Beach Hotel",
        "image": "/img/hotels/UDS_Kovalam_15_blww1g 1.png",
        
        "star":5
    },
    {
        "title": "Taj Green Cove Resort & Spa, Kovalam",
        "image": "/img/hotels/c5ecb3702acb39cef1098acc222db3df2dde4a14-912x966 1.png",
        
        "star":5
    },
    {
        "title": "Molly's Retreat",
        "image": "/img/hotels/rs=w_1535,m 1 (1).png",
        
        "star":3
    },
    {
        "title": "Amara Ayurveda Retreat",
        "image": "/img/hotels/11.png",
        
        "star":4
    },
    {
        "title": "Aadisaktthi Leisure Resort Kovalam",
        "image": "/img/hotels/551dc9_1599b8cb640c453abefb716376c2f635~mv2 1.png",
       
        "star":4
    },
    {
        "title": "Sagara Beach Resort",
        "image": "/img/hotels/Homepage-About-us 1.png",
       
        "star":3
    },
    {
        "title": "Treebo Trend Green Palm Resorts",
        "image": "/img/hotels/Common_11_ 1.png",
       
        "star":3
    },
    {
        "title": "Soma Palmshore",
        "image": "/img/hotels/seafacing 1.png",
       
        "star":3
    },
    {
        "title": "La Promenade Hotel",
        "image": "/img/hotels/1a 1.png",
        
        "star":2
    },
    {
        "title": "Lagoona Beach Resort",
        "image": "/img/hotels/Lobby-Lagoona 1.png",
        
        "star":4
    },
    {
        "title": "Beach & Lake Ayurvedic Resort, Kovalam",
        "image": "/img/hotels/1758577151 1.png",
       
        "star":3
    },
    {
        "title": "Travancore Island Resort",
        "image": "/img/hotels/deluxe_room 1.png",
       
        "star":3
    },
    {
        "title": "Hotel Port Palace",
        "image": "/img/hotels/spotlight-4 1.png",
        
        "star":3
    },
    {
        "title": "View Heights Resort",
        "image": "/img/hotels/team_details 1.png",
       
        "star":3
    },
    {
        "title": "Samudra Theeram Beach Resort",
        "image": "/img/hotels/aa42e5_59c210cd254048e3bba23415b5a4b7e3~mv2_d_7006_5189_s_4_2 1.png",
        
        "star":3
    }
    
 ];
 
 
     // const itemsPerSlide = 2; // Number of items per view
     // const prevSlide = () => {
    //   currentIndex = (currentIndex - itemsPerSlide + locations.length) % locations.length;
    // };
     // const nextSlide = () => {
    //   currentIndex = (currentIndex + itemsPerSlide) % locations.length;
    // };
     // onMount(() => {
    //   const interval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds
    //   onDestroy(() => clearInterval(interval));
    // });

    function getStarRating(starCount) {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= starCount ? '★' : '☆'); // Filled star for ratings, empty for not rated
        }
        return stars.join(''); // Join the stars to display in one string
    }
  </script>
 
 
 <div id="default-carousel" class=" relative w-full" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="relative gap-4 h-[450px] overflow-hidden rounded-lg">
         <!-- Item 1 -->
         <a href="/nearby_attractions" target="_blank" class="z-40">
            <h1 class=" text-white p-4 font-semibold ">Find Perfect Stays and Unmissable Sights Close to the Venue!</h1>
        </a>
         {#each locations as location, index}
            <div class="hidden duration-700 px-4 ease-in-out md:w-1/2 h-[400px]" data-carousel-item>
                <img src={location.image}  class=" rounded-3xl absolute object-cover p-4 flex h-[300px] w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                <div class=" absolute  -bottom-10 left-0  bg-opacity-80 p-4 pb-0 w-full">
                    <h2 class="text-lg text-white font-semibold pt-1">{location.title}</h2>
                    {#if location.star}
                        <div class="items-end justify-end  text-yellow-500">{getStarRating(location.star)}</div> <!-- Star Rating Display -->
                    {/if}
                    <a href="/nearby_attractions" target="_blank" class="text-white text-sm hover:underline">View More</a>
                </div>
            </div>
        {/each}
    </div>
  </div>
 
 
 
 
 
 