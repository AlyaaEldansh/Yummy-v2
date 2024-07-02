// $($(function () {
let homeScreen = [];
let searchResult = [];
let result = [];
let allCategories =[];
let allArea = [];
let gredients = [];
let allCategoryMeals = [];
let allAreaMeals = [];
let allGredientMeals = [];
let meal = [];

$('.ancors a[href="#"]').click(function(){
    $('.close').addClass('hidden')
    $('.toggle').removeClass('hidden');
    // $('.main').removeClass('pl-80').addClass('pl-12');
    $('.sidenav').removeClass('flex').addClass('hidden');
    $('.header').removeClass('ml-60').addClass('ml-0');
});
$('.toggle').click(function(){
    $('.toggle').addClass('hidden')
        $('.close').removeClass('hidden');
        $('.sidenav').removeClass('hidden').addClass('flex');
        $('.header').addClass('ml-60');
    });

    $('.close').click(function(){
        $('.close').addClass('hidden')
            $('.toggle').removeClass('hidden');
            // $('.main').removeClass('pl-80').addClass('pl-12');
            $('.sidenav').removeClass('flex').addClass('hidden');
            $('.header').removeClass('ml-60').addClass('ml-0');
        });

        // $('.caption1').hover(function () {
        //         // over
        //         $('.caption1').removeClass('opacity-0').addClass('opacity-60')
        //        $('.caption1').animate({height:''},500);
        //     });
        // $('.caption1').blur(function () {
        //     // out
        //     $('.caption1').removeClass('opacity-60').addClass('opacity-0')
        //     $('.caption1').slideDown(500);
        // });

        // $('.category').click(function(){
        //     window.location.assign('./categories.html');
        // });
        // $('.area').click(function(){
        //     window.location.assign('./area.html');
        // })
        // $('.ingredient').click(function(){
        //     window.location.assign('./ingredients.html');
        // })

        // home function
        
        function displaySearchPage(arr)
        {
            let box=``;
            box+=`<div class="container bg-black py-12 gap-2 flex flex-col">
            <div class="w-[85%] flex flex-row flex-wrap justify-center items-center gap-6 mx-auto pl-12">
                <input type="text" class="search-name border border-white rounded-md bg-transparent text-white p-2 w-[45%] focus:border-blue-500 focus:shadow-lg focus:shadow-blue-400" placeholder="Search By Name">
                <input type="text" class="search-letter border border-white rounded-md bg-transparent text-white p-2 w-[45%] focus:border-blue-500 focus:shadow-lg focus:shadow-blue-400" maxlength="1" placeholder="Search By First letter">
            </div>
            <div class="main-search w-[85%] flex flex-row flex-wrap justify-center items-center gap-3 mx-auto pl-12">

            </div>
        </div>`
        $('.s-section').html(box);
        };

        $('.search').click(function(){
            $('.f-section').addClass('hidden');
            $('.s-section').removeClass('hidden');
            displaySearchPage();
            $('.search-name').keyup(function(){
                searchByName($(this).val());
            });
            $('.search-letter').keyup(function(){
                searchByLetter(`${$(this).val()}`);
            });
        });


        async function getHome()
        {
            let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
            let data = await response.json();
            homeScreen = data.meals;
            // console.log(homeScreen);
            displayMeals(homeScreen);
        };

        getHome();

        function displayMeals(arr)
        {
            let box = ``;
            for( let i = 0 ; i < arr.length ; i++)
            {
            box+=`<div class="w-72 relative cursor-pointer" onclick="getMeal(${arr[i].idMeal})">
            <img src="${arr[i].strMealThumb}" class="w-full rounded-lg" alt="foods">
            <div class="caption absolute rounded-lg top-0 bottom-0 right-0 left-0 hover:bg-white opacity-0 hover:opacity-60">
                <h2 class="text-3xl font-semibold">${arr[i].strMeal}</h2>
            </div>
            </div>`
            }
            $('.main').html(box);
        };

        // search display

        function displaySearchResult(arr)
        {
            let box = ``;
            for( let i = 0 ; i < arr.length ; i++)
            {
            box+=`<div class="w-72 relative cursor-pointer" onclick="getMeal(${arr[i].idMeal})">
            <img src="${arr[i].strMealThumb}" class="w-full rounded-lg" alt="foods">
            <div class="caption absolute rounded-lg top-0 bottom-0 right-0 left-0 hover:bg-white opacity-0 hover:opacity-60">
                <h2 class="text-3xl font-semibold">${arr[i].strMeal}</h2>
            </div>
            </div>`
            }
            $('.main-search').html(box);
        };

        // $('.').click()
        // {
        //     for( let i ; i < searchResult.length ; i++)
        //     {
        //     displaySearchMeal(searchResult[i].idMeal);
        //     };
        // };

        // search by name

        async function searchByName(word)
        {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`);
            let data = await response.json();
            result = data.meals.slice(0,20);
            // console.log(result);
            displaySearchResult(result);
        };

        // search by charcter

        async function searchByLetter(char="a")
        {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`);
            let data = await response.json();
            searchResult = data.meals.slice(0,20);
            // console.log(searchResult);
            displaySearchResult(searchResult);
        };

        // category functions

        async function getCategories()
        {
            let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            let finalData = await response.json();
            allCategories = finalData.categories;
            // console.log(allCategories);
            displayCategories();
        };

        $('.category').click(function(){
            $('.s-section').addClass('hidden');
            $('.f-section').removeClass('hidden');
            getCategories();
        });

        function displayCategories()
        {
            let box = ``;
            for (let i = 0; i < allCategories.length; i++) 
            {
                box+=`<div class="w-72 relative cursor-pointer category-meals" onclick="haveCategoryMeals('${allCategories[i].strCategory}')">
                <img src="${allCategories[i].strCategoryThumb}" class="w-full rounded-lg" alt="foods">
                <div class="category-caption absolute text-center pt-2 top-0 bottom-0 right-0 left-0 rounded-lg hover:bg-white opacity-0 hover:opacity-60">
                    <h2 class="text-3xl font-semibold pb-2">${allCategories[i].strCategory}</h2>
                    <p>${allCategories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>`     
            }
            $('.main').html(box);
        };

        // category meals functions

        async function haveCategoryMeals(arr)
        {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${arr}`);
            let finalData = await response.json();
            allCategoryMeals = finalData.meals.slice(0,20);
            // console.log(allCategoryMeals);
            displayMeals(allCategoryMeals);
        };

        // area functions

        async function getArea()
        {
            let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
            let allData = await response.json();
            allArea = allData.meals;
            // console.log(allArea);
            displayArea();
        };

        $('.area').click(function(){
            $('.s-section').addClass('hidden');
            $('.f-section').removeClass('hidden');
            getArea();
        });

        
        function displayArea()
        {
            let cartona =``;
            for (let i = 0; i < allArea.length;i++) 
            {
                cartona+=`<div class="w-72 cursor-pointer flex flex-col justify-center items-center text-white" onclick="haveAreaMeals('${allArea[i].strArea}')">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h2 class="text-3xl font-semibold">${allArea[i].strArea}</h2>
            </div>` 
            }
            $('.main').html(cartona);
        };

        // area meals functions

        async function haveAreaMeals(arr)
        {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${arr}`);
            let finalData = await response.json();
            allAreaMeals = finalData.meals.slice(0,20);
            // console.log(allAreaMeals);
            displayMeals(allAreaMeals);
        };

        // ingredients functions

        async function getIngredient()
        {
            let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
            let allData = await response.json();
            gredients = allData.meals.slice(0,20);
            // console.log(gredients);
            displayGredient();
        };

        $('.ingredient').click(function(){
            $('.s-section').addClass('hidden');
            $('.f-section').removeClass('hidden');
            getIngredient();
        });
       
        function displayGredient()
        {
            let box =``;
            for(let i = 0; i < gredients.length ; i++)
            {
                box+=`<div class="w-72 cursor-pointer text-center flex flex-col justify-center items-center text-white" onclick="haveIngredientMeals('${gredients[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h2 class="text-3xl font-semibold mb-4">${gredients[i].strIngredient}</h2>
                <p>${gredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>`
            }
            $('.main').html(box);
        };

        // ingredients meals functions

        async function haveIngredientMeals(arr)
        {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${arr}`);
            let finalData = await response.json();
            allGredientMeals = finalData.meals.slice(0,20);
            // console.log(allGredientMeals);
            displayMeals(allGredientMeals);
        };

        // final meal function

        async function getMeal(arr)
        {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${arr}`);
            let finalData = await response.json();
            meal = finalData.meals;
            // console.log(meal);
            displayMeal(meal);
            displaySearchMeal(meal);
        };
        
        function displayMeal(arr)
        {
            let box = ``;
            for( let i = 0 ; i < arr.length ; i++)
            {
            box+=`<div class="w-[34%] pl-6 ">
            <img src="${arr[i].strMealThumb}" class="w-full rounded-md" alt="food">
            <h1 class="text-white text-3xl font-semibold">${arr[i].strMeal}</h1>
        </div>
        <div class="w-[64%] pl-4">
            <h1 class="text-3xl font-semibold text-white pb-2">Instructions</h1>
            <p class="text-white py-2">${arr[i].strInstructions}</p>
                <h1 class="text-3xl font-semibold text-white pb-2">Area : <span class="text-2xl font-semibold">${arr[i].strArea}</span></h1>
                <h1 class="text-3xl font-semibold text-white pb-2">Category : <span class="text-2xl font-semibold">${arr[i].strCategory}</span></h1>
                <h1 class="text-3xl font-semibold text-white mb-4">Recipes : </h1>
                <div class="flex flex-wrap justify-start items-start gap-3">
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure1} ${arr[i].strIngredient1}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure2} ${arr[i].strIngredient2}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure3} ${arr[i].strIngredient3}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure4} ${arr[i].strIngredient4}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure5} ${arr[i].strIngredient5}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure6} ${arr[i].strIngredient6}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure7} ${arr[i].strIngredient7}</span>
                </div>
                <h1 class="text-3xl font-semibold text-white my-8">Tags : </h1>
                <div class="flex flex-wrap justify-start items-start gap-3 my-4">
                    <span class="text-sm p-2 bg-red-300 rounded-md text-red-900">${arr[i].strTags}</span>
                </div>
                <a href="https://www.bbcgoodfoodme.com/" class="py-2 px-4 rounded-md text-white bg-green-700 hover:bg-green-800 my-4">Source</a>
                <a href="${arr[i].strYoutube}" class="py-2 px-3 rounded-md text-white bg-red-600 hover:bg-red-700 my-4">Youtube</a>
        </div>`}
        $('.main').html(box);
        // $('.s-section').html(box);
        };

        function displaySearchMeal(arr)
        {
            let box=``;
            for(let i = 0 ; i <arr.length ; i++)
            {
            box+=`<div class="container bg-black py-12">
            <div class="main w-[85%] flex flex-row flex-wrap mx-auto gap-6">
            <div class="w-[34%] pl-6 ">
            <img src="${arr[i].strMealThumb}" class="w-full rounded-md" alt="food">
            <h1 class="text-white text-3xl font-semibold">${arr[i].strMeal}</h1>
        </div>
        <div class="w-[64%] pl-4">
            <h1 class="text-3xl font-semibold text-white pb-2">Instructions</h1>
            <p class="text-white py-2">${arr[i].strInstructions}</p>
                <h1 class="text-3xl font-semibold text-white pb-2">Area : <span class="text-2xl font-semibold">${arr[i].strArea}</span></h1>
                <h1 class="text-3xl font-semibold text-white pb-2">Category : <span class="text-2xl font-semibold">${arr[i].strCategory}</span></h1>
                <h1 class="text-3xl font-semibold text-white mb-4">Recipes : </h1>
                <div class="flex flex-wrap justify-start items-start gap-3">
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure1} ${arr[i].strIngredient1}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure2} ${arr[i].strIngredient2}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure3} ${arr[i].strIngredient3}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure4} ${arr[i].strIngredient4}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure5} ${arr[i].strIngredient5}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure6} ${arr[i].strIngredient6}</span>
                    <span class="text-sm p-2 bg-blue-200 rounded-md text-gray-800">${arr[i].strMeasure7} ${arr[i].strIngredient7}</span>
                </div>
                <h1 class="text-3xl font-semibold text-white my-8">Tags : </h1>
                <div class="flex flex-wrap justify-start items-start gap-3 my-4">
                    <span class="text-sm p-2 bg-red-300 rounded-md text-red-900">${arr[i].strTags}</span>
                </div>
                <a href="https://www.bbcgoodfoodme.com/" class="py-2 px-4 rounded-md text-white bg-green-700 hover:bg-green-800 my-4">Source</a>
                <a href="${arr[i].strYoutube}" class="py-2 px-3 rounded-md text-white bg-red-600 hover:bg-red-700 my-4">Youtube</a>
        </div>
        </div>  
        </div>`
            }
            $('.s-section').html(box);
        };

        function displayContactPage()
        {
            let box=``;
            box+=`<div class="container bg-black flex flex-col justify-center items-center absolute top-0 bottom-0 left-0 right-0 py-12">
            <div class="form w-[80%] flex flex-col flex-wrap items-center pl-12">
                    <div class="flex flex-row flex-wrap justify-center gap-6">
                        <div class="w-[40%]">
                            <input type="text" class="name input-field border-white rounded-md p-2 w-full focus:border-blue-500 focus:shadow-lg focus:shadow-blue-400" placeholder="Enter Your Name">
                            <span class="text-sm p-2 bg-red-300 rounded-md text-red-900 hidden my-4 text-center">Special characters and numbers not allowed</span>
                        </div>
                    <div class="w-[40%]">
                        <input type="email" class="email input-field border-white rounded-md p-2 w-full focus:border-blue-500 focus:shadow-lg focus:shadow-blue-400" placeholder="Enter Your Email">
                        <span class="text-sm p-2 bg-red-300 rounded-md text-red-900 hidden my-4 text-center">Email not valid *exemple@yyy.zzz</span>
                    </div>
                    <div class="w-[40%]">
                        <input type="tel" class="phone input-field border-white rounded-md p-2 w-full focus:border-blue-500 focus:shadow-lg focus:shadow-blue-400" placeholder="Enter Your Phone">
                        <span class="text-sm p-2 bg-red-300 rounded-md text-red-900 hidden my-4 text-center">Enter valid Phone Number</span>
                    </div>
                    <div class="w-[40%]">
                        <input type="number" class="age input-field border-white rounded-md p-2 w-full focus:border-blue-500 focus:shadow-lg focus:shadow-blue-400" placeholder="Enter Your Age">
                        <span class="text-sm p-2 bg-red-300 rounded-md text-red-900 hidden my-4 text-center">Enter valid age</span>
                    </div>
                    <div class="w-[40%]">
                        <input type="password" class="password input-field border-white rounded-md p-2 w-full focus:border-blue-500 focus:shadow-lg focus:shadow-blue-400" placeholder="Enter Your Password">
                        <span class="text-sm p-2 bg-red-300 rounded-md text-red-900 hidden my-4 text-center">Enter valid password *Minimum eight characters, at least one letter and one number:*</span>
                    </div>
                    <div class="w-[40%]">
                        <input type="password" class="repassword input-field border-white rounded-md p-2 w-full focus:border-blue-500 focus:shadow-lg focus:shadow-blue-400 block" placeholder="Repassword">
                        <span class="text-sm p-2 bg-red-300 rounded-md text-red-900 hidden my-4 text-center">Enter valid repassword</span>
                    </div>
                    </div>
                    <button disabled class="submit mt-4 border border-red-800 py-2 px-2 rounded-md bg-transparent text-red-800 block">Submit</button>
                
            </div>
        </div>`
        $('.s-section').html(box);
        };

        $('.contact').click(function(){
            $('.f-section').addClass('hidden');
            $('.s-section').removeClass('hidden');
            displayContactPage();

            // regux and form validation

            let nameFlag = false;
            let mailFlag = false;
            let phoneFlag = false;
            let ageFlag = false;
            let passwordFlag = false;
            let repasswordFlag = false;
        
        
            $('.name').keyup( function(){
            const regexName = /^[a-zA-Z]+$/;
           if(!regexName.test($(this).val()) || $(this).val().trim() === '')
           {
            $(this).next().removeClass('hidden');
           }
           else
           {
            $(this).next().addClass('hidden');
            nameFlag = true;
           }
            });
            $('.email').keyup( function(){
                const reguxMail = /^[a-zA-Z]+\@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
               if(!reguxMail.test($(this).val()) || $(this).val().trim() === '')
               {
                $(this).next().removeClass('hidden');
               }
               else
               {
                $(this).next().addClass('hidden');
                mailFlag = true;
               }
            });
    
            $('.phone').keyup( function(){
                const regexPhone = /^[0-9]{10}$/;
               if(!regexPhone.test($(this).val()) || $(this).val().trim() === '')
               {
                $(this).next().removeClass('hidden');
               }
               else
               {
                $(this).next().addClass('hidden');
                phoneFlag = true;
               }
            });
    
            $('.age').keyup( function(){
                const regexAge = /^([1-9]{1}[0-9]?)$/;
               if(!regexAge.test($(this).val()) || $(this).val().trim() === '')
               {
                $(this).next().removeClass('hidden');
               }
               else
               {
                $(this).next().addClass('hidden');
                ageFlag = true;
               }
            });
    
            $('.password').keyup( function(){
                const regexPassword = /^([a-zA-Z0-9+]{8})$/;
               if(!regexPassword.test($(this).val()) || $(this).val().trim() === '')
               {
                $(this).next().removeClass('hidden').addClass('block');
               }
               else
               {
                $(this).next().addClass('hidden').removeClass('block');
                passwordFlag = true;
               }
            });
    
            $('.repassword').keyup( function(){
                const regexPassword = /^([a-zA-Z0-9+]{8})$/;
                const valid = regexPassword.test($(this).val()) && regexPassword.test($('.password').val());
               if(valid)
               {
                $(this).next().addClass('hidden').removeClass('block');
                repasswordFlag = true;
                
               }
               else
               {
                $(this).next().removeClass('hidden').addClass('block');
               }
            });
    
            $('.input-field').keyup(function checkBtn()
            {
                if(nameFlag==true && mailFlag==true && phoneFlag==true && ageFlag==true && passwordFlag==true && repasswordFlag==true)
                {
                    $('.submit').prop('disabled',false);
                    $('.submit').click(function(){
                        $('.input-field').val('');
                    })
                    $('.submit').removeClass('bg-transparent text-red-800').addClass('bg-red-800 text-white');
                }
                else
                {
                    $('.submit').prop('disabled',true)
                    $('.submit').addClass('bg-transparent text-red-800').removeClass('bg-red-800 text-white');
    
                }
            });
        });

        // $('.input-field').keyup(function(){
        //    let allFields = Array.from(document.querySelectorAll('.input-field'));
        //     for (let i = 0; i < allFields.length; i++) 
        //     {
        //         if(allFields[i].value.trim() === '')
        //         {
        //             return empty = allFields[i].value.trim();
        //         }
        //     }
        //     if(empty && ($('.repassword').val() === $('.password').val()))
        //     {
        //         $('.submit').submit(function (e) { 
        //             e.preventDefault();
        //         });
        //         $('.submit').prop('disabled',true).addClass('bg-transparent text-red-800').removeClass('bg-red-800 text-white');           
        //     }
        //     else
        //     {
        //         $('.submit').prop('disabled',false).addClass('bg-red-800 text-white').removeClass('bg-transparent text-red-800');
        //     }
        // });


    // }))